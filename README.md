# The Vow Between — POV Anthology Engine

**Working repo name:** use **`pov-project`** (or your org’s equivalent) on GitHub under **tetsurugan**.

## What this is

- A **modular interactive anthology engine**: data-driven stories on one runtime, not a single branching quiz.
- **Browser / mobile-browser MVP**: responsive UI, touch-friendly choices, light PWA manifest (`public/manifest.webmanifest`); no native app stack.
- **Persistent world state** per player: `localStorage` profile with **echoes**, **world flags**, **world consequence marks**, **completed endings**, in-progress runtime — see `src/engine/storage.ts`.
- **Narrative systems** in the engine: **hidden truth** vs **belief**, **continuation / variant** metadata, **world consequences** (marks, flags), **story surfacing** (open, rumor, teaser, gated), **personality** lanes where authored, and **`requiresAnyFlags`** OR-gates for aftermath consumers.

## Shipped proof lanes (content)

| Lane | Module id(s) | Notes |
|------|----------------|-------|
| **Paladin** | `paladin_promise`, proof echoes, witnesses | Complete proof cluster (order / mercy / dark / peace lies / broken saint, etc.). |
| **Gyre** | `gyre_mythic_anchor`, `gyre_witness_survivor_aftermath` | Mythic anchor + Survivor-family witness slice. |
| **Verge** | `verge_mara_anchor` | Mara / clan gravity — interpretation as governance. |
| **Rumor Girl** | `rumor_girl`, **`court_aftermath`** | Modern obsession / rumor / shock seeds; **`court_aftermath`** consumes Rumor Girl aftermath flags (`requiresAnyFlags`). |

**Planning & doctrine** live under [`docs/planning/`](docs/planning/) — start with [`design_doctrine.md`](docs/planning/design_doctrine.md), [`branch_scope_doctrine.md`](docs/planning/branch_scope_doctrine.md), [`eras_and_scales.md`](docs/planning/eras_and_scales.md).

---

A modular, web-based interactive story engine built in React + TypeScript.

The design goal is not a branching-quiz app. It's an anthology where
different stories can have different relationships to player agency (stable,
pressured, distorted, possessed, witness) — **internal** labels; players see titles, tone, and unlock hints.

---

## Quickstart

```bash
npm install
npm run dev
```

Then open the printed URL.

```bash
npm run build   # type-check + production build
npm run preview # preview production build
npm run lint
npm run test    # Vitest: gates, conditions, profile writes, authoring validation, narration, resolvers
npm run test:watch
```

Progress is persisted to `localStorage` under the key `pov.profile.v1`.

**Browser support:** The UI is intended to play well in **desktop and mobile browsers** (responsive layout, touch-friendly choices, safe-area padding). A minimal **Web App Manifest** (`public/manifest.webmanifest`) supports “Add to Home Screen” style behavior where the OS allows it; there is **no** offline service worker unless you add one later.

---

## First push to GitHub (example: `tetsurugan/pov-project`)

Create an empty repo on GitHub named **`pov-project`**, then from this folder:

```bash
git init
git add .
git commit -m "Initial anthology engine MVP foundation"
git branch -M main
git remote add origin git@github.com:tetsurugan/pov-project.git
# or: git remote add origin https://github.com/tetsurugan/pov-project.git
git push -u origin main
```

Include **`docs/planning/`** in the push if you want design doctrine and registry docs versioned with the code.

---

## Stack

- React 19 + TypeScript, Vite
- Tailwind CSS (v3) for styling
- Zustand for runtime state
- React Router for navigation
- Zod for story schema validation
- Vitest for engine unit tests (`*.test.ts` under `src/engine/__tests__`)

---

## Project layout

```
src/
  app/              Application shell (App, router)
  components/       Presentational components (scene card, choices, vows, stats)
  engine/           Data-driven story engine (pure, UI-agnostic)
    __tests__/              Vitest suites (gates, conditions, profile, pending, narration)
    types.ts                Core type definitions
    schemas.ts              Zod schemas mirroring types
    conditionEvaluator.ts   Evaluates choice/ending conditions
    consequenceApplier.ts   Applies variable/flag/vow mutations
    choiceResolver.ts       Visible-choice filtering + scene advancement
    endingResolver.ts       Priority-ordered ending matching
    echoManager.ts          Persisted cross-story echo flags
    personalityInterpreter.ts  Personality lookup + tag checks
    storage.ts              localStorage read/write for profile
    storyEngine.ts          Story validation + runtime factory
    index.ts                Public barrel
  pages/            Routed screens (home, select, intro, play, profile)
  store/            Zustand store (orchestrates engine + persistence)
  stories/          Story content, one folder per story
    paladin_promise/
      personalities.ts
      scenes.ts
      endings.ts
      story.ts
    index.ts                Story registry
```

### Engine flow

1. `startStory(storyId, personalityId?)` returns **true** if a new run was
   started; it is a no-op (returns **false**) when the story is missing, not
   on the main shelf, or not **startable** per **`getStoryBrowseState`**
   (`evaluateStorySurfacing`, with **`allStories: storyRegistry`** so optional
   **`continuationHint`** can resolve). On success it builds an
   initial `StoryRuntimeState` from the story definition (initial variables,
   vow states, starting scene).
2. When the player selects a choice, the store:
   - validates the choice's `conditions` via `evaluateConditions`,
   - applies its `consequences` via `applyConsequences`,
   - advances `currentSceneId` to `nextSceneId`,
   - persists the runtime into the `PersistedProfile` in `localStorage`.
3. When a scene has no `nextSceneId` (terminal choice), is marked
   `isTerminal`, or has no visible choices left, the engine runs
   `resolveEnding`, which walks endings in priority order and picks the first
   whose conditions match.
4. A resolved ending's `echoes` are merged into the profile's `globalEchoes`;
   optional `worldFlags` and `unlocks` (module ids) are merged into the
   profile via `applyResolvedEndingToProfile`. Choices may use a
   `setWorldFlag` consequence for immediate durable flags. Gates read
   `worldFlags` and `unlockedModuleIds` in `evaluateStorySurfacing`.

### Conditions & consequences

Conditions target values by dotted path. **Runtime:** `variables.*`,
`flags.*`, `vows.*`, `hidden.variables.*`, `hidden.flags.*`,
`belief.variables.*`, `belief.flags.*` (POV inference, optional layer),
`personality`, `echoes` (in-run slice), `scene`, `ending`. **Persisted profile** (during
play, when the store passes a snapshot): `profile.worldFlags.<id>`,
`profile.globalEchoes`, `profile.completedEndings.<storyId>`,
`profile.unlockedModuleIds`. Operators: `eq`, `neq`, `gt`, `gte`, `lt`,
`lte`, `includes`. Multiple conditions combine with AND.

Consequences include:
- `setVariable` — set a numeric / boolean / string variable
- `incrementVariable` — add to a numeric variable
- `setFlag` — set a boolean flag
- `setVowState` — move a vow to `kept` / `strained` / `broken`
- `setWorldFlag` — durable `profile.worldFlags` (merged on choice resolve)
- plus hidden-truth variants (`setHiddenVariable`, etc.)
- plus **belief** variants (`setBeliefVariable`, `incrementBeliefVariable`, `setBeliefFlag`)

### Continuations & variants (first pass)

- **Metadata:** optional **`continuationOf`**, **`variantGroup`**, **`variantId`**, **`playerContinuationHint`** on `StoryDefinition` (see `branch_scope_doctrine.md` — most endings stay echo/flag-only).
- **Helpers:** `src/engine/continuationRouting.ts` — follow-ups for an anchor, variant-group summaries; each row uses **`evaluateStorySurfacing`** for gates.
- **UI:** browse/intro may show a single subtle **`continuationHint`** when the registry is supplied to **`getStoryBrowseState`**.

### World consequence depth (first pass)

- **Profile:** optional **`worldlineBranches`** (mutex one branch per group id), **`worldConsequenceMarks`**, **`closedHistoryMarks`** — merged from **`EndingDefinition`** via **`worldConsequences.ts`** inside **`applyResolvedEndingToProfile`** (alongside existing **`worldFlags`** / echoes / unlocks).
- **Story gates:** **`requiresWorldlineBranch`**, **`excludesWorldlineBranches`**, **`requiresWorldConsequenceMarks`**, **`excludesWorldConsequenceMarks`**, **`blockedWhenHistoryClosed`** — all read only in **`evaluateStorySurfacing`**.
- **Lab:** `world_consequence_lab` + **`wc_follow_soft`** / **`wc_follow_hard`** in the registry (`in_dev`).

### Authoring validation (tooling)

- **`validateStoryRegistryAuthoring(stories, { baselineProfile? })`** in `src/engine/authoringValidation.ts` — errors/warnings for continuation anchors, cycles, duplicate story ids, **`requiresEndings`** integrity, variant-group mutex on a baseline profile, surfacing copy gaps, and worldline contradictions. Not used during play; the test suite includes a **registry snapshot** assert (`errorCount === 0`).

---

## Story classes

Every story declares a `storyClass`:

- `stable` — player is largely in control (Paladin Promise uses this).
- `pressured` — stress / obsession pushes back on choices.
- `distorted` — information is unreliable; narration can lie.
- `possessed` — instinct / compulsion overrides the player.
- `witness` — player interprets rather than acts.

Only `stable` is fully exercised in the prototype, but the engine seams for
choice interception / mutation live in `choiceResolver.resolveChoice` — future
classes will hook in there.

---

## Adding a new story

1. Create `src/stories/<your_story_id>/` with:
   - `personalities.ts`
   - `scenes.ts`
   - `endings.ts`
   - `story.ts` (wires it together and runs it through `validateStory`)
2. Register it in `src/stories/index.ts`:
   ```ts
   export const storyRegistry: StoryDefinition[] = [
     paladinPromiseStory,
     yourStory,
   ];
   ```
3. It will appear automatically on the story select page.

Everything is data-driven. There is no story-specific React code. If you find
yourself wanting to branch on a specific story id inside the engine or UI,
that's a smell — add the capability to the story schema instead.

### Where to add new story classes later

- `src/engine/types.ts` — extend the `StoryClass` union.
- `src/engine/choiceResolver.ts` — this is the seam for choice interception,
  mutation, and forced-action overrides. Keep story-class behaviour here so
  it stays out of the UI.
- `src/engine/personalityInterpreter.ts` — expand to express tone shifts /
  modifiers that other classes can read.

---

## Paladin Promise — prototype story

- Class: `stable`
- Personalities: `stern_devout`, `compassionate_convert`
- Vows: `protect_innocent`, `obey_order`, `speak_no_lie`
- Variables: `divine_favor`, `village_trust`, `order_loyalty`
- Scenes: `arrival → sanctuary → village_search → breaking_point`
- Endings: `faithful_blade`, `shield_of_the_weak`, `tarnished_oath`,
  `broken_saint`
- Echoes: `duty_over_compassion`, `broke_rank_for_innocent`,
  `truth_sacrificed_for_peace`, `oathbound_soul_snapped`

---

## Non-goals in this prototype

- No multiplayer, networking, or cloud save
- No real localization pipeline (but content is structured to add one later:
  logic is keyed by ids, never by display text)
- No CMS / admin UI
- No asset pipeline beyond fonts
