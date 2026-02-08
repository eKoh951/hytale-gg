# In-Site Survey System

Build a self-hosted, Typeform-style survey system on hytale.gg with step-by-step progress tracking, multilingual support (en/es, pt later), backed by Supabase and rendered with `@hytale` registry components.

---

## Architecture Summary

| Decision | Choice | Why |
|----------|--------|-----|
| Survey definitions | **Code-driven** (TypeScript config files) | Only 2 surveys, well-defined, avoids building a CMS |
| Response storage | **Supabase tables** with JSONB answers | Flexible for 7 question types |
| Auth | **Anonymous-first**, auto-link if logged in | Most respondents come from Reddit/Discord without accounts |
| Duplicate prevention | **localStorage token + IP rate limit** | No login required but prevents ballot stuffing |
| Primary keys | **`bigint identity`** | Per supabase-postgres best practices (sequential, no fragmentation) |
| i18n | **English + Spanish** from day 1 via next-intl messages. Portuguese scaffolded. | Survey distributed to LATAM communities too |
| State management | **`useReducer` + Context** (no external library) | React 19 built-ins are sufficient; matches AuthProvider pattern |
| Completion tracking | **Save progress to DB on each step** (like Typeform) | Enables drop-off analysis per question |
| Layout | **Responsive** — 1 question/screen on mobile, 1 section/screen on desktop | Best UX per device |
| UI components | **`@hytale` registry** (Card, Button, Input, etc.) | Branded experience |

### Current Stack Context
- Next.js 16, React 19, TypeScript, Supabase (`adkjqnhytspczubeqvnc`)
- Auth: Discord OAuth, `AuthProvider` with `state/actions/meta` composition pattern
- UI: shadcn/ui new-york + `@hytale` registry, Tailwind CSS 4, framer-motion
- i18n: next-intl (en/es), `messages/en.json` / `messages/es.json`
- Existing components: Button, Card, Input, Label, Textarea, Badge, Tabs, Switch, Skeleton, Sonner (toast)

---

## Phase 1: Database Schema (Supabase MCP migrations)

### Tables

```sql
-- 1. surveys — metadata only (questions defined in code)
create table surveys (
  id bigint generated always as identity primary key,
  slug text unique not null,          -- 'player-discovery', 'server-owner'
  title text not null,
  description text,
  status text not null default 'draft'
    check (status in ('draft', 'active', 'closed')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. survey_responses — one row per submission attempt
--    Created on survey START (not on submit) to track abandonment
create table survey_responses (
  id bigint generated always as identity primary key,
  survey_id bigint references surveys(id) not null,
  respondent_id uuid references auth.users(id),  -- nullable (anonymous OK)
  session_token text not null,                    -- localStorage UUID for dedup
  locale text not null default 'en',              -- language they took the survey in
  current_step integer not null default 0,        -- last completed step (for drop-off)
  total_steps integer not null,                   -- total steps in survey
  started_at timestamptz default now(),
  completed_at timestamptz,                       -- null = abandoned
  screened_out boolean default false,
  metadata jsonb default '{}',                    -- user_agent, referrer, device_type
  created_at timestamptz default now()
);

-- 3. survey_answers — one row per question per response
--    Upserted on each step (save-as-you-go)
create table survey_answers (
  id bigint generated always as identity primary key,
  response_id bigint references survey_responses(id) on delete cascade not null,
  question_key text not null,                     -- 'q1', 'q2', 'q14b', etc.
  answer jsonb not null,                          -- flexible per question type
  answered_at timestamptz default now(),          -- when this specific Q was answered
  unique(response_id, question_key)
);
```

### JSONB Answer Formats

| Type | JSONB shape |
|------|------------|
| single_select | `{"selected": "pvp_factions"}` |
| multi_select | `{"selected": ["opt_a", "opt_b", "opt_c"]}` |
| csat_scale | `{"value": 4}` |
| maxdiff | `{"most": "reviews", "least": "lfg"}` |
| point_allocation | `{"points": {"traffic_sources": 30, "conversion": 25, ...}}` |
| open_text | `{"text": "I want fair ranking..."}` |
| conditional | `{"selected": "low_lag"}` (options filtered by prior answer) |

### RLS Policies

```sql
-- surveys: public read
create policy "Anyone can read active surveys"
  on surveys for select using (status = 'active');

-- survey_responses: anon can insert + update own (via session_token)
create policy "Anyone can start a response"
  on survey_responses for insert to anon, authenticated with check (true);
create policy "Update own response by session"
  on survey_responses for update
  using (session_token = current_setting('request.headers')::json->>'x-session-token')
  with check (session_token = current_setting('request.headers')::json->>'x-session-token');

-- survey_answers: anon can insert/upsert
create policy "Anyone can submit answers"
  on survey_answers for insert to anon, authenticated with check (true);
create policy "Anyone can update own answers"
  on survey_answers for update to anon, authenticated using (true);
```

> **Note**: RLS for responses/answers will use Server Actions with the service role key, so the anon policies above are a safety net. The actual writes go through authenticated server-side calls.

### Indexes

```sql
create index idx_responses_survey_id on survey_responses(survey_id);
create index idx_responses_session on survey_responses(session_token);
create index idx_responses_completion on survey_responses(survey_id, completed_at);  -- for completion rate queries
create index idx_answers_response_id on survey_answers(response_id);
```

### Seed Data

```sql
insert into surveys (slug, title, description, status) values
  ('player-discovery', 'Player Server Discovery Survey', 'Validate hytale.gg assumptions with real Hytale players', 'active'),
  ('server-owner', 'Server Owner Survey', 'Understand server owner needs, growth challenges, and willingness to pay', 'active');
```

---

## Phase 2: Survey Config (TypeScript) + i18n

### File Structure

```
lib/surveys/
  types.ts                    -- Survey, Question, Option, Section types
  player-discovery.ts         -- Player survey config (17 Qs, 6 sections)
  server-owner.ts             -- Owner survey config (18+ Qs, 6 sections)
  validation.ts               -- Per-type validation (exact 3, sum=100, etc.)
  get-survey.ts               -- Lookup survey config by slug

messages/en.json              -- Add "survey" namespace with all Q text
messages/es.json              -- Spanish translations for all Q text
```

### Type Definitions

```typescript
type QuestionType =
  | 'single_select' | 'multi_select' | 'csat_scale'
  | 'maxdiff' | 'point_allocation' | 'open_text';

interface Option {
  key: string;                  -- 'pvp_factions' — stable key for storage
  labelKey: string;             -- i18n message key: 'survey.player.q3.options.pvp'
  screenOut?: boolean;          -- ends survey if selected
}

interface Question {
  key: string;                  -- 'q1', 'q14b'
  type: QuestionType;
  titleKey: string;             -- i18n key: 'survey.player.q1.title'
  subtitleKey?: string;         -- i18n key for instruction text
  options?: Option[];
  constraints?: {
    min?: number;
    max?: number;               -- multi_select max
    exact?: number;             -- top 3
    sum?: number;               -- 100-point allocation
  };
  dependsOn?: {                 -- conditional question (like Q8 depends on Q7)
    questionKey: string;
    useSelectedAsOptions: boolean;
  };
}

interface Section {
  key: string;                  -- 'screening', 'discovery', etc.
  titleKey: string;             -- i18n key
  questions: Question[];
}

interface SurveyConfig {
  slug: string;
  titleKey: string;
  descriptionKey: string;
  sections: Section[];
  thankYouKey: string;          -- i18n key for thank you message
}
```

### i18n Approach

All question text lives in `messages/en.json` and `messages/es.json` under a `survey` namespace:

```json
{
  "survey": {
    "player": {
      "title": "Player Server Discovery Survey",
      "q1": {
        "title": "How long have you been playing Hytale multiplayer?",
        "subtitle": "",
        "options": {
          "not_played": "I haven't played multiplayer yet",
          "less_1_week": "Less than 1 week",
          "1_2_weeks": "1-2 weeks",
          ...
        }
      },
      ...
    },
    "common": {
      "next": "Next",
      "back": "Back",
      "submit": "Submit",
      "progress": "Question {current} of {total}",
      "alreadyCompleted": "You've already completed this survey. Thank you!",
      "screenedOut": "Thanks for your interest! This survey is for {audience}."
    }
  }
}
```

Portuguese: scaffold `messages/pt.json` with empty survey namespace, to be filled later. Add `'pt'` to `SUPPORTED_LOCALES` when ready.

---

## Phase 3: State Management — `useReducer` + Context

**No external library.** React 19's `useReducer` is ideal for multi-step form state with complex transitions. Matches the existing `AuthProvider` composition pattern.

### Reducer

```typescript
type SurveyAction =
  | { type: 'SET_ANSWER'; questionKey: string; answer: unknown }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SCREEN_OUT' }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR'; error: string }
  | { type: 'RESTORE_PROGRESS'; step: number; answers: Record<string, unknown> };

interface SurveyState {
  currentStep: number;          -- which step (section on desktop, question on mobile)
  answers: Record<string, unknown>;
  isSubmitting: boolean;
  isComplete: boolean;
  isScreenedOut: boolean;
  error: string | null;
}
```

### SurveyProvider (state / actions / meta)

```typescript
interface SurveyContextValue {
  state: SurveyState;
  actions: {
    setAnswer: (questionKey: string, answer: unknown) => void;
    nextStep: () => Promise<void>;   -- saves to DB, then advances
    prevStep: () => void;
    submit: () => Promise<void>;
  };
  meta: {
    surveyConfig: SurveyConfig;
    totalSteps: number;
    progress: number;              -- 0-100
    canGoNext: boolean;            -- current step validated?
    canGoBack: boolean;
    isMobile: boolean;             -- controls layout mode
  };
}
```

### Save-as-you-go (Typeform-style tracking)

On every `nextStep()`:
1. Upsert answers for the current step's questions into `survey_answers`
2. Update `survey_responses.current_step` to track progress
3. If screened out → set `screened_out = true`
4. On final submit → set `completed_at = now()`

This means a response row is created **on survey start** (not on submit), so we capture everyone who began, even if they abandon.

**Drop-off analysis query**:
```sql
select current_step, count(*) as drop_count
from survey_responses
where survey_id = 1 and completed_at is null and screened_out = false
group by current_step order by current_step;
```

---

## Phase 4: Frontend Components

### File Structure

```
components/survey/
  survey-provider.tsx           -- useReducer + Context (state/actions/meta)
  survey-shell.tsx              -- Card layout, progress bar, navigation
  survey-step.tsx               -- Renders current step (section or single Q)
  survey-progress.tsx           -- Animated progress bar
  survey-navigation.tsx         -- Back / Next / Submit buttons
  survey-thank-you.tsx          -- Thank you + optional Discord input
  survey-screen-out.tsx         -- "Thanks but not for you" screen
  question-renderer.tsx         -- Dispatches to correct question component
  question-types/
    single-select.tsx           -- Styled radio cards
    multi-select.tsx            -- Checkbox cards with counter badge
    csat-scale.tsx              -- 1-5 emoji/number scale
    maxdiff.tsx                 -- Most/Least table rows
    point-allocation.tsx        -- Sliders + number inputs, live sum counter
    open-text.tsx               -- Textarea
```

### Existing UI Components Used

- **Card** (CardHeader, CardContent, CardFooter) — survey container
- **Button** — navigation, option selection (radio/checkbox as styled buttons)
- **Input** — point allocation number inputs
- **Label** — question labels
- **Textarea** — open text questions
- **Badge** — selection counter ("2 of 3 selected")
- **Skeleton** — loading state
- **Sonner** — validation error toasts

### Components to install from `@hytale` or `@shadcn`

- **Progress** — animated progress bar (need to add)
- **RadioGroup** — for single-select questions (need to add)
- **Checkbox** — for multi-select questions (need to add)
- **Slider** — for point allocation (need to add)

### Responsive Layout

Detect with `useMediaQuery` hook (or Tailwind `md:` breakpoint):
- **Mobile** (< 768px): 1 question per screen → more steps, less scrolling
- **Desktop** (≥ 768px): 1 section per screen → fewer steps, all context visible

`totalSteps` in the provider adapts based on `isMobile`:
- Mobile: `totalSteps = totalQuestions`
- Desktop: `totalSteps = totalSections`

---

## Phase 5: Route + Server Actions + i18n

### Route

```
app/[locale]/survey/[slug]/page.tsx      -- Server Component: load config, check status
app/[locale]/survey/[slug]/actions.ts    -- Server Actions: startSurvey, saveStep, submitSurvey
```

### Server Actions

```typescript
// actions.ts
'use server'

async function startSurvey(slug: string, sessionToken: string, locale: string, totalSteps: number)
  // → Creates survey_response row, returns response_id

async function saveStep(responseId: bigint, step: number, answers: Record<string, unknown>)
  // → Upserts survey_answers for the step's questions, updates current_step

async function submitSurvey(responseId: bigint, finalAnswers: Record<string, unknown>)
  // → Final upsert + set completed_at

async function checkExisting(sessionToken: string, surveySlug: string)
  // → Returns response if already started (for resume or "already completed")
```

### i18n Config

Add to `routing.ts`:
```typescript
'/survey': {
  en: '/survey',
  es: '/encuesta'
}
```

Add to `next.config.ts` rewrites:
```typescript
{ source: '/es/encuesta/:slug*', destination: '/es/survey/:slug*' }
```

---

## Implementation Order

| Step | What | Key Files |
|------|------|-----------|
| **1** | DB migration: 3 tables + RLS + indexes + seed | Supabase MCP `apply_migration` |
| **2** | Install missing UI components (Progress, RadioGroup, Checkbox, Slider) | `pnpm dlx shadcn@latest add` |
| **3** | Survey types + validation helpers | `lib/surveys/types.ts`, `validation.ts` |
| **4** | Player survey config | `lib/surveys/player-discovery.ts` |
| **5** | Owner survey config | `lib/surveys/server-owner.ts` |
| **6** | i18n: Add `survey` namespace to `en.json` + `es.json` | `messages/*.json` |
| **7** | SurveyProvider (useReducer + Context) | `components/survey/survey-provider.tsx` |
| **8** | Question type components (all 6) | `components/survey/question-types/*` |
| **9** | Survey shell, progress, navigation | `components/survey/survey-shell.tsx` etc. |
| **10** | Survey page + Server Actions | `app/[locale]/survey/[slug]/*` |
| **11** | i18n routing (routing.ts + next.config.ts) | `i18n/routing.ts`, `next.config.ts` |
| **12** | Thank you + screen-out screens | `components/survey/survey-thank-you.tsx` |
| **13** | Polish: framer-motion animations, mobile UX testing | All survey components |

---

## Completion Analytics (built into schema, admin dashboard later)

The schema tracks everything needed for Typeform-style analytics:
- **Completion rate**: `completed_at IS NOT NULL / total responses`
- **Drop-off by step**: `GROUP BY current_step WHERE completed_at IS NULL`
- **Screen-out rate**: `screened_out = true / total`
- **Time to complete**: `completed_at - started_at`
- **Per-question answer time**: `answered_at` timestamps on each answer
- **Locale breakdown**: `GROUP BY locale`
- **Device breakdown**: `metadata->>'device_type'`

Admin dashboard to visualize these → deferred to a future phase.
