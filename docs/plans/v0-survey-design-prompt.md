# v0 Survey Frontend Design Prompt

Comprehensive prompt for v0 to design all survey UI components for the hytale.gg in-site survey system.

---

## How to Use

Copy the prompt below into v0. It contains everything v0 needs: design system, component APIs, question types with real examples, layout requirements, and the file structure to output.

---

## v0 Prompt

```
Design a Typeform-style multi-step survey system for a gaming server directory (hytale.gg). The survey must feel polished, immersive, and mobile-first — like Typeform but with a dark gaming aesthetic.

## Design System

Dark-first gaming theme. Use these CSS variables (already defined in the project):

- Background: #050505 (--background)
- Card: #111111 (--card)
- Primary (purple): #8B4FC1 (--primary) — brand color, use for progress bar, selected states, focus rings
- Secondary (yellow): #FFB800 (--secondary) — use for CTAs, highlights, badges
- Muted: #1A1A1A (--muted)
- Muted foreground: #9CA3AF (--muted-foreground)
- Border: #262626 (--border)
- Destructive: #EF4444 (--destructive) — validation errors
- Radius: 0.625rem (--radius)
- Font: Geist Sans (body), Montserrat (headings)

## Available UI Components (already installed, import from @/components/ui/*)

Use ONLY these — do not invent new primitives:

### Card — survey container
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
```

### Button — navigation + option selection
```tsx
import { Button } from "@/components/ui/button"
// Variants: default, destructive, outline, secondary, ghost, link
// Sizes: default, sm, lg, icon
```

### RadioGroup — single-select questions
```tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
```

### Checkbox — multi-select questions
```tsx
import { Checkbox } from "@/components/ui/checkbox"
```

### Progress — animated progress bar
```tsx
import { Progress } from "@/components/ui/progress"
// Props: value (0-100)
```

### Slider — point allocation
```tsx
import { Slider } from "@/components/ui/slider"
// Props: value, min, max, onValueChange
```

### Label
```tsx
import { Label } from "@/components/ui/label"
```

### Input — number inputs for point allocation
```tsx
import { Input } from "@/components/ui/input"
```

### Textarea — open text questions
```tsx
import { Textarea } from "@/components/ui/textarea"
```

### Badge — selection counter
```tsx
import { Badge } from "@/components/ui/badge"
// Variants: default, secondary, destructive, outline
```

### Other available: Skeleton, Sonner (toast), Tabs, Switch, Tooltip

### Utility
```tsx
import { cn } from "@/lib/utils"
```

## What to Design

Create these components as separate files. All are `"use client"` components. Use TypeScript + Tailwind CSS 4. Use `framer-motion` for animations (already installed).

### 1. `components/survey/survey-shell.tsx`

The main wrapper that contains the entire survey experience. Structure:

- Full-viewport centered layout (like Typeform)
- Card as the main container, max-w-2xl on desktop, full-width on mobile
- Top: animated Progress bar showing completion %
- Below progress: step counter text ("Question 3 of 17")
- Center: scrollable content area for the current question(s)
- Bottom: navigation buttons (Back / Next / Submit)
- Smooth slide transitions between steps (framer-motion AnimatePresence)
- Props: `children`, `progress` (0-100), `currentStep`, `totalSteps`, `onNext`, `onBack`, `onSubmit`, `canGoNext`, `canGoBack`, `isLastStep`, `isSubmitting`

### 2. `components/survey/survey-progress.tsx`

Animated progress bar + step text.

- Uses the Progress component
- Shows "Question {current} of {total}" below the bar
- Smooth animated transition when value changes (framer-motion)
- Purple (primary) fill color

### 3. `components/survey/survey-navigation.tsx`

Back / Next / Submit buttons at the bottom of the survey.

- Back button: ghost variant, left-aligned, hidden on first step
- Next button: default variant (purple), right-aligned
- Submit button: secondary variant (yellow), replaces Next on last step
- Loading spinner on Submit when `isSubmitting`
- Keyboard shortcut: Enter = Next (show hint text "Press Enter ↵")
- Props: `onNext`, `onBack`, `onSubmit`, `canGoNext`, `canGoBack`, `isLastStep`, `isSubmitting`

### 4. `components/survey/question-types/single-select.tsx`

Radio-card style single select. NOT plain radio buttons — each option is a clickable card.

- Each option rendered as a bordered card/button that highlights on selection
- Selected state: primary border + subtle primary bg tint
- Hover state: border brightens
- RadioGroup + RadioGroupItem internally for accessibility
- Shows the option label prominently
- If an option has `screenOut: true`, it should still be selectable (logic handled elsewhere)
- Props: `questionKey`, `title`, `subtitle?`, `options: {key, label}[]`, `value`, `onChange`

**Example question to design for**:
```
Title: "How long have you been playing Hytale multiplayer?"
Options:
- I haven't played multiplayer yet
- Less than 1 week
- 1-2 weeks
- 3-4 weeks
- More than a month
```

### 5. `components/survey/question-types/multi-select.tsx`

Checkbox-card style multi-select with constraint display.

- Each option as a clickable card with Checkbox
- Badge showing "2 of 3 selected" (secondary variant) — updates live
- When max reached, unselected options become visually disabled (opacity)
- Selected state: primary border + check icon
- Props: `questionKey`, `title`, `subtitle?`, `options: {key, label}[]`, `value: string[]`, `onChange`, `constraints: { min?, max?, exact? }`
- Validation message below: "Pick exactly 3" or "Select up to 2"

**Example question to design for**:
```
Title: "Pick your TOP 3 most important features in a server directory:"
Subtitle: "Select exactly 3"
Constraints: { exact: 3 }
Options:
- Fair ranking that doesn't favor big/paying servers
- Detailed analytics (who visits, where they come from)
- Player reviews visible on my listing
- Ability to respond to player reviews publicly
- Creator/YouTuber reviews of my server
- Automated server status monitoring
- Discord notifications (new review alerts, server status updates)
- Easy server claiming and verified owner badge
- Auto-imported listing from other directories (zero setup)
```

### 6. `components/survey/question-types/csat-scale.tsx`

Horizontal 1-5 scale with labels.

- 5 clickable segments, horizontally laid out
- Each shows the number and label below
- Selected state: primary fill, scale up slightly
- Mobile: still horizontal but more compact
- Feels like a rating widget, not radio buttons
- Props: `questionKey`, `title`, `subtitle?`, `labels: {value: number, label: string}[]`, `value`, `onChange`

**Example question to design for**:
```
Title: "How satisfied are you with how easy it is to find good Hytale servers?"
Labels:
- 1: Very dissatisfied
- 2: Dissatisfied
- 3: Neutral
- 4: Satisfied
- 5: Very satisfied
```

### 7. `components/survey/question-types/maxdiff.tsx`

Most Important / Least Important table. This is the most unique component.

- Table/list layout with 3 columns: "Most Important" | Feature | "Least Important"
- Each row has a feature label in the center
- Left and right columns have radio-style selectors (only one "Most" and one "Least" can be selected)
- A feature CANNOT be both Most and Least
- Selected "Most": primary (purple) highlight
- Selected "Least": muted/destructive subtle highlight
- Mobile: stack as cards instead of table. Each card has the feature, with "Most" and "Least" buttons below it
- Props: `questionKey`, `title`, `subtitle?`, `options: {key, label}[]`, `value: {most: string | null, least: string | null}`, `onChange`

**Example question to design for**:
```
Title: "Which is MOST important and LEAST important to you?"
Subtitle: "Pick one most, one least"
Options:
- Read player reviews with specific ratings (community, performance, fairness)
- Watch a video review showing actual gameplay on the server
- See real-time player count and peak hours
- Server "vibe tags" (e.g., "Chill builders", "Hardcore PvP", "Beginner-friendly")
```

### 8. `components/survey/question-types/point-allocation.tsx`

100-point allocation with sliders and number inputs.

- Each feature has: label, Slider (0-100), and a number Input showing current value
- Live total counter at the top: "75 / 100 points used" with a Badge
- Total bar changes color: muted when < 100, primary when = 100, destructive when > 100
- Users can adjust sliders OR type in the Input directly (they sync)
- Cannot proceed until total = exactly 100
- Mobile: full-width sliders, number input beside each
- Props: `questionKey`, `title`, `subtitle?`, `features: {key, label}[]`, `value: Record<string, number>`, `onChange`, `total: number` (default 100)

**Example question to design for**:
```
Title: "You have 100 points to spend on what info matters most to you. Distribute them:"
Features:
- Where your players come from
- How well your listing converts
- Whether players stick around
- What players say about you
- How you compare to similar servers
- Track which promotions work
```

### 9. `components/survey/question-types/open-text.tsx`

Simple textarea for open-ended questions.

- Textarea with character count
- Placeholder text
- Optional: shows a subtle prompt/encouragement
- Props: `questionKey`, `title`, `subtitle?`, `placeholder?`, `value`, `onChange`, `maxLength?`

**Example question to design for**:
```
Title: "What ONE thing would make you immediately list your server on a new directory?"
Placeholder: "Tell us what matters most to you..."
```

### 10. `components/survey/question-renderer.tsx`

Dispatcher component that renders the correct question type based on config.

- Switch on `question.type` to render the appropriate component
- Passes `value` and `onChange` from parent
- Props: `question: Question`, `value: unknown`, `onChange: (value: unknown) => void`, `answers: Record<string, unknown>` (for conditional questions)
- For conditional questions (where `question.dependsOn` is set), filter options based on the referenced question's answer

### 11. `components/survey/survey-thank-you.tsx`

Completion screen shown after survey submission.

- Confetti or celebration animation (framer-motion)
- Thank you message (large heading)
- Brief description text
- Optional Discord username input + submit button
- "Follow @pixelkoh for updates" link
- Feels celebratory and rewarding

### 12. `components/survey/survey-screen-out.tsx`

Screen shown when user is screened out (e.g., "I haven't played multiplayer yet").

- Friendly tone — "Thanks for your interest!"
- Explains why they can't continue (e.g., "This survey is for active multiplayer players")
- No negative feeling — they helped by answering honestly
- Optional link back to homepage

## Layout & Animation Requirements

- **Transitions**: Use framer-motion `AnimatePresence` with `motion.div` for step transitions. Slide from right when going forward, slide from left when going back. Use `initial`, `animate`, `exit` with opacity + x-transform.
- **Mobile-first**: All components must look great on 375px width. Test the design at both mobile and desktop widths.
- **Keyboard accessible**: All interactive elements must be focusable and operable via keyboard
- **Selection feedback**: When selecting options, use a subtle scale + border animation
- **Progress feels alive**: The progress bar should animate smoothly, not jump

## Important Notes

- Do NOT use any components that aren't listed above. Build complex UI from the primitives.
- All text content should be passed as props (title, subtitle, option labels) — NOT hardcoded. The actual text comes from i18n translations.
- Use `cn()` from `@/lib/utils` for conditional classes (it's a `clsx` + `twMerge` wrapper)
- This is a Next.js 16 project with React 19. Use `"use client"` at top of every file.
- Use Tailwind CSS utility classes. Do NOT write custom CSS.
- Dark theme is default. Design for dark backgrounds.
- The overall vibe: Typeform meets Discord meets Steam — clean, focused, one thing at a time, with a gaming aesthetic (purple/yellow accents on dark).
```

---

## After v0 Generates

Once v0 produces the components, I (Cascade) will:
1. Integrate them into the project
2. Wire up the `SurveyProvider` (useReducer + Context) with state management
3. Create the Server Actions for save-as-you-go persistence
4. Add i18n translations (en/es) for all survey content
5. Set up the route at `app/[locale]/survey/[slug]/page.tsx`
