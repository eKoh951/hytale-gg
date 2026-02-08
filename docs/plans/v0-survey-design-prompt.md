# v0 Survey Frontend Design Prompt

Build the UI layer for an already-wired survey system on hytale.gg (a Hytale gaming server directory).

---

## How to Use

Copy the prompt below into v0. The entire backend, state management, types, i18n, Server Actions, and routing are already built. v0 only needs to build the visual components that consume the existing `useSurvey()` hook.

---

## v0 Prompt

```
Build the frontend UI for a Typeform-style multi-step survey on a gaming server directory (hytale.gg). The entire backend is already built — you are ONLY building the visual components that plug into an existing React Context.

## ⚠️ CRITICAL: What Already Exists (DO NOT rebuild these)

The following are already built and working. Your components consume them — do not recreate any of this:

1. **`SurveyProvider`** — React Context with useReducer. Already wraps the survey page.
2. **`useSurvey()` hook** — returns `{ state, actions, meta }`. This is your only API.
3. **Server Actions** — save-as-you-go persistence to Supabase. Already wired.
4. **Survey configs** — question definitions for 2 surveys (player + owner), 35+ questions total.
5. **i18n translations** — English + Spanish, all question text stored in message files.
6. **Validation** — per-question validation runs automatically. `meta.canGoNext` tells you if the step is valid.
7. **Routing** — `/en/survey/player-discovery` and `/en/survey/server-owner` already work.

## The `useSurvey()` Hook — YOUR ONLY API

Every component you build should import and use this hook:

```tsx
import { useSurvey } from '@/components/survey/survey-provider'

const { state, actions, meta } = useSurvey()
```

### `state` — current survey state
```ts
{
  responseId: number | null       // DB row ID (set after first "Next")
  currentStep: number             // 0-indexed current step
  answers: Record<string, SurveyAnswer>  // all answers keyed by question key
  isSubmitting: boolean           // true during final submit
  isComplete: boolean             // true after successful submit
  isScreenedOut: boolean          // true if user hit a screen-out option
  error: string | null            // error message if submit failed
}
```

### `actions` — functions to call
```ts
{
  setAnswer: (questionKey: string, answer: SurveyAnswer) => void  // set/update an answer
  nextStep: () => Promise<void>   // validate + save + advance (or screen out)
  prevStep: () => void            // go back one step
  submit: () => Promise<void>     // save final step + mark complete
}
```

### `meta` — computed metadata
```ts
{
  surveyConfig: SurveyConfig      // full survey definition
  totalSteps: number              // total steps (adapts to mobile/desktop)
  progress: number                // 0-100 completion percentage
  canGoNext: boolean              // true if current step is valid
  canGoBack: boolean              // true if not on first step
  isMobile: boolean               // true if viewport < 768px
  currentQuestions: Question[]    // questions for the current step
}
```

## Answer Types — what `setAnswer` expects

Each question type has a specific answer shape:

```ts
// single_select
{ selected: string, other?: string }

// multi_select
{ selected: string[], other?: string }

// csat_scale
{ value: number }  // 1-5

// maxdiff
{ most: string, least: string }

// point_allocation
{ points: Record<string, number> }  // must sum to constraints.sum (default 100)

// open_text
{ text: string }
```

## Question Type — what `currentQuestions[i]` looks like

```ts
{
  key: string                          // e.g. "q1", "q14b"
  type: 'single_select' | 'multi_select' | 'csat_scale' | 'maxdiff' | 'point_allocation' | 'open_text'
  titleKey: string                     // i18n key — use t(question.titleKey) to get translated text
  subtitleKey?: string                 // optional i18n key for subtitle
  options?: { key: string, labelKey: string, screenOut?: boolean }[]
  constraints?: { min?: number, max?: number, exact?: number, sum?: number }
  dependsOn?: { questionKey: string, useSelectedAsOptions: boolean }
  hasOtherOption?: boolean             // if true, "other" option has a text input
}
```

**Important**: All text is i18n keys, not raw strings. Use `useTranslations()` from `next-intl`:
```tsx
import { useTranslations } from 'next-intl'
const t = useTranslations()
// Then: t(question.titleKey), t(option.labelKey), t('survey.common.next'), etc.
```

Common i18n keys available:
- `survey.common.next` / `survey.common.back` / `survey.common.submit`
- `survey.common.progress` (template: "Question {current} of {total}")
- `survey.common.mostImportant` / `survey.common.leastImportant`
- `survey.common.selectedCount` (template: "{count} of {max} selected")
- `survey.common.selectedExact` (template: "Select exactly {count}")
- `survey.common.pointsRemaining` (template: "{points} points remaining")
- `survey.common.otherPlaceholder` → "Please specify..."
- `survey.common.csat.1` through `survey.common.csat.5` → scale labels

## Design System

Dark-first gaming theme. Use these CSS variables (already defined in the project):

- Background: #050505 (--background)
- Card: #111111 (--card)
- Primary (purple): #8B4FC1 (--primary) — brand color, progress bar, selected states, focus rings
- Secondary (yellow): #FFB800 (--secondary) — CTAs, highlights, badges
- Muted: #1A1A1A (--muted)
- Muted foreground: #9CA3AF (--muted-foreground)
- Border: #262626 (--border)
- Destructive: #EF4444 (--destructive) — validation errors
- Radius: 0.625rem (--radius)
- Font: Geist Sans (body), Montserrat (headings)

## Available UI Primitives (import from @/components/ui/*)

Use ONLY these — do not invent new primitives:

- `Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter` from `@/components/ui/card`
- `Button` from `@/components/ui/button` — variants: default, destructive, outline, secondary, ghost, link / sizes: default, sm, lg, icon
- `RadioGroup, RadioGroupItem` from `@/components/ui/radio-group`
- `Checkbox` from `@/components/ui/checkbox`
- `Progress` from `@/components/ui/progress` — props: value (0-100)
- `Slider` from `@/components/ui/slider` — props: value, min, max, onValueChange
- `Label` from `@/components/ui/label`
- `Input` from `@/components/ui/input`
- `Textarea` from `@/components/ui/textarea`
- `Badge` from `@/components/ui/badge` — variants: default, secondary, destructive, outline
- `cn()` from `@/lib/utils` — clsx + twMerge wrapper

Also available if needed: Skeleton, Sonner (toast), Tabs, Switch, Tooltip

## What to Build

All files are `"use client"` components. Use TypeScript + Tailwind CSS. Use `framer-motion` for animations (already installed).

### 1. UPDATE `app/[locale]/survey/[slug]/survey-shell.tsx`

This file already exists as a scaffold. It sets up `SurveyProvider` with all Server Action callbacks. You need to **replace the placeholder `<div>` inside the provider** with the full survey UI. The file already handles: loading existing responses, session tokens, and wiring Server Actions.

Your job: Inside the `<SurveyProvider>` children, render:
- A `<SurveyLayout>` component (or inline) that reads `useSurvey()` and shows:
  - Loading skeleton while `loading` is true
  - "Already completed" screen if `initialData?.completed`
  - Screen-out screen if `state.isScreenedOut`
  - Thank-you screen if `state.isComplete`
  - Otherwise: the active survey step (progress + questions + navigation)
- Full-viewport centered layout (like Typeform)
- Card as the main container, max-w-2xl on desktop, full-width on mobile
- Top: animated Progress bar showing `meta.progress`
- Center: render `meta.currentQuestions` using a question renderer
- Bottom: navigation (Back / Next / Submit)
- Smooth slide transitions between steps (framer-motion AnimatePresence)

### 2. `components/survey/question-renderer.tsx`

Dispatcher that renders the correct question type component based on `question.type`.

- Receives a `Question` object from `meta.currentQuestions`
- Reads the current answer from `state.answers[question.key]`
- Calls `actions.setAnswer(question.key, newAnswer)` when the user interacts
- For `dependsOn` questions (e.g., Q8 depends on Q7): read `state.answers[question.dependsOn.questionKey]` and use the selected values as the option list

### 3. `components/survey/question-types/single-select.tsx`

Radio-card style. NOT plain radio buttons — each option is a full-width clickable card/button.

- Selected state: primary border + subtle primary bg tint
- Hover state: border brightens
- If `question.hasOtherOption` and user selects "other", show an Input below it
- Call `actions.setAnswer(question.key, { selected: optionKey })` on click
- If "other" selected: `{ selected: 'other', other: textValue }`

**Example to design for**: "How long have you been playing Hytale multiplayer?" with 5 options

### 4. `components/survey/question-types/multi-select.tsx`

Checkbox-card style with constraint display.

- Badge showing "2 of 3 selected" — updates live
- When limit reached, unselected options become visually disabled (opacity)
- Call `actions.setAnswer(question.key, { selected: [...keys] })` on toggle
- If `hasOtherOption` and "other" is selected, show text input
- Read constraints from `question.constraints` (exact, max, min)

**Example**: "Pick your TOP 3 most important features" with 9 options, `{ exact: 3 }`

### 5. `components/survey/question-types/csat-scale.tsx`

Horizontal 1-5 satisfaction scale.

- 5 clickable segments, horizontally laid out
- Each shows number + label from `survey.common.csat.{n}` i18n keys
- Selected: primary fill, scale up slightly
- Mobile: still horizontal but compact
- Call `actions.setAnswer(question.key, { value: n })`

### 6. `components/survey/question-types/maxdiff.tsx`

Most Important / Least Important table. The most unique component.

- Desktop: table with 3 columns — "Most Important" | Feature | "Least Important"
- Each row has radio-style selectors. Only ONE "Most" and ONE "Least" across all rows.
- A feature CANNOT be both Most and Least
- Selected "Most": primary (purple) highlight. Selected "Least": muted highlight
- Mobile: stack as cards. Each card has the feature label, with "Most" and "Least" buttons below
- Call `actions.setAnswer(question.key, { most: key, least: key })`
- Column headers use `t('survey.common.mostImportant')` and `t('survey.common.leastImportant')`

**Example**: 4-5 options like "Read player reviews...", "Watch a video review...", etc.

### 7. `components/survey/question-types/point-allocation.tsx`

100-point budget allocation with sliders + number inputs.

- Each option: label + Slider (0-100) + number Input
- Live total counter at top: "75 points remaining" with Badge
- Badge color: muted when > 0 remaining, primary when = 0, destructive when < 0
- Sliders and inputs sync bidirectionally
- Target sum from `question.constraints.sum` (default 100)
- Call `actions.setAnswer(question.key, { points: { [key]: n, ... } })`

**Example**: 6 analytics features, distribute 100 points

### 8. `components/survey/question-types/open-text.tsx`

Textarea for open-ended questions.

- Textarea with character count
- Use `t(question.subtitleKey)` as placeholder if available, otherwise `t('survey.common.otherPlaceholder')`
- Call `actions.setAnswer(question.key, { text: value })`

### 9. `components/survey/survey-thank-you.tsx`

Completion screen after submission.

- Celebration animation (framer-motion)
- Reads `meta.surveyConfig.thankYou.titleKey` and `descriptionKey` for text via `t()`
- If `thankYou.showDiscordInput` is true, show Discord username input + save button
- Props: `titleKey: string`, `descriptionKey: string`, `showDiscordInput?: boolean`

### 10. `components/survey/survey-screen-out.tsx`

Friendly screen when user is screened out.

- Reads `meta.surveyConfig.screenOut.titleKey` and `descriptionKey` for text
- Friendly tone — no negative feeling
- Optional link back to homepage
- Props: `titleKey: string`, `descriptionKey: string`

## Layout & Responsive Rules

- **Mobile (< 768px)**: 1 question per screen. `meta.currentQuestions` will have exactly 1 question. `meta.isMobile` is true.
- **Desktop (≥ 768px)**: 1 section per screen. `meta.currentQuestions` will have multiple questions (all from the same section). Show them stacked vertically in a scrollable area.
- `meta.totalSteps` already adapts (17 questions on mobile, 6 sections on desktop for the player survey).

## Animation Requirements

- **Step transitions**: framer-motion `AnimatePresence` with `motion.div`. Slide right on forward, slide left on back. Use `initial`, `animate`, `exit` with opacity + x-transform.
- **Selection feedback**: subtle scale + border animation on option select
- **Progress bar**: animate smoothly with framer-motion, not jump
- **Keyboard**: Enter = Next (show hint "Press Enter ↵"), all elements focusable

## Important Rules

- Do NOT rebuild `SurveyProvider`, Server Actions, types, or validation. They exist and work.
- All text comes from i18n via `t()` — NEVER hardcode user-facing text.
- Use `cn()` for conditional Tailwind classes.
- Next.js 16 with React 19. Use `"use client"` at top of every file.
- Use Tailwind CSS utilities only. No custom CSS.
- Dark theme is default. All designs on dark backgrounds.
- Overall vibe: **Typeform meets Discord meets Steam** — clean, focused, one thing at a time, purple/yellow accents on dark.
```

---

## After v0 Generates

The generated components need to be:
1. Placed in their file paths as specified above
2. The `survey-shell.tsx` scaffold updated to render the full UI inside `<SurveyProvider>`
3. Possibly minor type adjustments to match the exact `SurveyAnswer` union types

Everything else (DB, Server Actions, i18n, routing, state management, validation) is already done and working.
