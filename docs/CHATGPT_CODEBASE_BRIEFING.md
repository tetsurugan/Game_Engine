# POV Project — Codebase briefing (for LLM context)

This document summarizes what the repository **currently does**, how major pieces fit together, and **practical recommendations**. It is meant to be pasted into ChatGPT or another model as grounding context.

**Path in repo:** `docs/CHATGPT_CODEBASE_BRIEFING.md`

---

## 1. What this project is

**Working name:** “The Vow Between” / POV interactive anthology engine.

**Intent:** A **modular interactive fiction engine** (TypeScript + React) where many short **stories/modules** share one runtime. Stories are **data-driven** (`StoryDefinition` + scenes/choices/endings). Cross-story memory lives in a **persisted profile**: global echoes, completed endings, **world flags**, and **unlocked module ids**—not full savegame handoffs between authors.

**Design stance (from code + planning docs):**

- **Story classes** (`stable`, `pressured`, `distorted`, `possessed`, `witness`) are **internal engine hooks**—they are **not** meant as player-facing menu labels.
- **Player-facing** copy uses titles, summaries, tone hints, unlock hints, and **surfacing states** (hidden, rumor, teaser, listed locked/secret, startable).

**MVP 0.1 control:** **[`docs/planning/mvp_freeze_checklist.md`](planning/mvp_freeze_checklist.md)** — hard **in/out** scope, **frozen** post-0.1 items, **quality gates**, and **scope guardrails** before release. Active work should align with **finishing/polish/shipping** the frozen content set, not opening new anthology lanes until after 0.1.

**Current content:** **Paladin** cluster **complete**. **Gyre:** **`gyre_mythic_anchor`** + **`gyre_witness_survivor_aftermath`** ([`gyre_aftermath_families.md`](planning/story_concepts/gyre_aftermath_families.md)). **Verge:** **`verge_mara_anchor`** (*The Living Rulebook*) — **two-scene** proof: cousin/corridor POV; Mara as **living rulebook** (third-rate clan → ascendant; interpretation as governance); **`hiddenTruth.flags.mara_intended_brake_not_anoint`** vs **`belief.flags.heard_anointment`** vs **visible** table line + **`room_heat`**; endings **`verge_proof_orbit_misread`** / **`verge_proof_line_held`**; not mythic — see [`verge_clan_mara_verge.md`](planning/story_concepts/verge_clan_mara_verge.md). **Modern grounded:** **`rumor_girl`** — obsession / cheating rumors / interpretation; **`hidden`** vs **`belief`** vs **`suspicion`/`humiliation`**; **four personalities**; **seven grounded endings** + **narrow shock** path. **`court_aftermath`** — **shipped** **two-scene** **witness/record** aftermath (**read** neutral language → **hallway** relational judgment); gates **`rumor_girl_proof_resolved`** + OR group: flags **`rumor_girl_witness_aftermath_invited`** \| **`rumor_girl_belief_gap_soft`** **or** mark **`rumor_girl_fatal_aftermath_seeded`** (`requiresAnyFlags` + **`requiresAnyWorldConsequenceMarks`**, block **`missing_any_profile_or`**); friend POV; echo **`rumor_girl_court_aftermath_logged`**. Labs: **`belief_inference_lab`**, **`world_consequence_lab`**, **pressured narration lab** (`in_dev` where noted).

---

## 2. Tech stack

| Layer | Choice |
|--------|--------|
| UI | React 19, Vite 8, React Router 7 |
| State | Zustand (`src/store/useStoryStore.ts`) |
| Validation | Zod 4 (`src/engine/schemas.ts`) mirrors `src/engine/types.ts` |
| Styling | Tailwind CSS 3 |
| Persistence | `localStorage` key `pov.profile.v1` via `src/engine/storage.ts` |

**Scripts:** `npm run dev`, `build` (tsc + vite), **`build:gh-pages`** (production build with `VITE_BASE_PATH=/Game_Engine/` + `404.html` copy for GitHub Pages), `lint` (eslint), **`test`** / **`test:watch`** (Vitest, `src/engine/__tests__/**/*.test.ts`). **Public deploy:** push to **`main`** runs **`.github/workflows/deploy-github-pages.yml`**: **`npm install`**, **`npm test`**, **`npm run build`**, **`configure-pages`**, **`upload-pages-artifact`**, **`deploy-pages`**. **GitHub Pages** source = **GitHub Actions**. Live: **https://tetsurugan.github.io/Game_Engine/** (Vite **`base`** + Router **`basename`** from **`import.meta.env.BASE_URL`**).

**Browser / mobile (MVP 0.1 polish):** Single web codebase for **desktop and mobile browsers** — `src/index.css` **`page-shell`** (bottom padding **`max` + `calc(env(safe-area-inset-bottom))`**), **`page-shell--play`** (extra bottom inset on **`/play`**), **`prose-story`** (`break-words`, `last:mb-0`), **`choice-btn`** (**~56px** min-height on small screens, disabled + **`:focus-visible`**), **`browse-section-label`** / **`browse-region-divider`** / **`intro-cta-stack`** / **`profile-section-heading`**. **Pages:** **`StorySelectPage`** (rumors / horizon / shelf **dividers**, **title → continuation → summary** hierarchy, **`line-clamp`** on teasers + shelf summaries on small viewports), **`StoryIntroPage`** (threshold spacing + **`intro-cta-stack`**), **`StoryPlayPage`** (**scrollable** vow/stat **`md:`** rail via **`max-h` + `overflow-y-auto`**), **`ProfilePage`** (section rhythm + vertical chip lists on narrow screens + **erase** in a **danger** band). **`index.html`:** `apple-mobile-web-app-capable`, **`apple-mobile-web-app-title`**, `apple-mobile-web-app-status-bar-style`. **Light PWA:** `public/manifest.webmanifest` + `theme-color` + `viewport-fit=cover` — **no** service worker unless added later.

---

## 3. Repository layout (source only)

```
src/
  app/           App shell, React Router
  components/    Scene, choices, vows, stats, ending, personality picker, story header
  engine/        Pure story engine (+ `__tests__/` Vitest suites for core seams)
  pages/         Home, story list, intro, play, profile
  store/         Zustand: profile + runtime + actions
  stories/       storyRegistry; `paladin_*`, `gyre_*`, `verge_mara_anchor/`, `rumor_girl/`, `court_aftermath/`, labs, `world_consequence_lab/`
docs/
  planning/      Doctrine, backlog, registry, eras, echoes (design)
  cursor_reports/ Implementation reports / change log
```

---

## 4. End-to-end runtime flow

1. **Browse** (`/stories`): `StorySelectPage` iterates **`storyRegistry.filter(isReleaseBrowseStory)`** (omits **`authoringAvailability: "in_dev"`** labs from the public shelf; full **`storyRegistry`** is still passed as **`allStories`** into **`getStoryBrowseState`** for continuation hints). Each row uses **`getStoryBrowseState(story, profile, { allStories: storyRegistry })`** → **`evaluateStorySurfacing`**. Entries split into **Rumors**, **On the horizon** (teasers), and **main list** by surfacing state.
2. **Intro** (`/stories/:id`): `StoryIntroPage` branches on **`surfacing.state`** (hidden / rumor / teaser / locked / startable). **Begin** calls `startStory` only when browse says the story is on the **main list** and **startable**.
3. **Play** (`/play/:id`): `StoryPlayPage` shows scene, choices, vows, stats; **`PlayNarrationBanner`** renders the store’s **`playNarrationFrame`** (resolved after each non-ending choice) with **short player-facing section labels** instead of raw pressured kind strings in the UI chrome. `selectChoice` runs **`resolveChoice`** → may advance scene or trigger **ending resolution**. **Choice and ending conditions** may read persisted history via **`RuntimeProfileSnapshot`** (built by **`toRuntimeProfileSnapshot(profile)`** in the store) and explicit targets like **`profile.worldFlags.*`**, **`profile.globalEchoes`**, **`profile.completedEndings.<storyId>`**, **`profile.unlockedModuleIds`**, **`profile.worldConsequenceMarks`** (array; use **`includes`** in conditions). For **pressured** stories, the store first applies **`stripEphemeralNarrationTransport`** (clears prior hook narration lines and **`followUp`** arrival fields used only for the last beat), then **`flushPressuredPendingSignals`**, then **`resolvePlayNarration`** → **`playNarrationFrame`** for the UI.
4. **Ending**: `resolveEnding` picks highest-priority matching ending (same optional snapshot); store calls **`applyResolvedEndingToProfile`** (echoes, `completedEndings`, **`worldFlags`**, **`worldlineCommit`**, **`worldConsequenceMarks`**, **`unlockedModuleIds`**, etc., from ending metadata).
5. **Mid-scene durable flags**: Choices may include **`setWorldFlag`** consequences; **`resolveChoice`** returns **`profileWorldFlagWrites`**, merged in the store **before** optional ending resolution. Ending resolution uses a snapshot built **after** those merges so new flags affect the same tick’s ending match when applicable.

**Gate evaluation** (`storyGateEvaluation.ts`) is **read-only** on the profile: mutex echoes/flags, required echoes/flags/endings/unlocked modules, lock echoes, plus surfacing presentation. It does **not** write profile state.

**Profile writes** remain only in **`applyResolvedEndingToProfile`**, **`mergeWorldFlagWrites`**, and **`persistRuntime`** — not inside `evaluateConditions` / `resolveTarget`.

---

## 5. Engine modules (concise map)

| Module | Role |
|--------|------|
| `types.ts` | All core interfaces: story, scenes, choices, consequences, endings, runtime, profile, story-class unions, surfacing-related authoring fields |
| `schemas.ts` | Zod schemas for validating a loaded story |
| `storyEngine.ts` | `validateStory`, `createInitialRuntime`, `getScene` |
| `conditionEvaluator.ts` | `resolveTarget` / `evaluateConditions`: runtime paths + optional **`profile.*`** when `RuntimeProfileSnapshot` is passed |
| `runtimeProfileSnapshot.ts` | `toRuntimeProfileSnapshot` — shallow read-only copy of profile for in-play conditions (includes **`worldConsequenceMarks`**) |
| `consequenceApplier.ts` | Applies runtime consequences; **`setWorldFlag` is stripped** before application—handled as profile writes in `choiceResolver` + store |
| `choiceResolver.ts` | Personality appends, story-class hooks, partitions world-flag consequences, advances scene / terminal |
| `endingResolver.ts` | Priority-sorted ending match + `beforeEndingResolve` hook |
| `storyClassRegistry.ts` | Maps `storyClass` → handler object |
| `storyClasses/*.ts` | **`stable`** implemented; **`pressured`** has real config-driven behavior; **`distorted`**, **`possessed`**, **`witness`** are placeholders |
| `pressured/*` | Tiered pressure evaluation + `engineMeta.pressured` |
| `pendingSignals/*` | Flush consumed pressured signals, forced follow-up scenes |
| `playNarration.ts` | **`resolvePlayNarration`**: authorable + hook lines from `engineMeta`; **`strip*`** helpers for one-shot display transport |
| `echoManager.ts` | `persistEchoes` (global echoes + completed endings per story) |
| `profileOutcomes.ts` | `mergeWorldFlagWrites`, `applyResolvedEndingToProfile` |
| `storyGateEvaluation.ts` | `evaluateStorySurfacing`, legacy `evaluateStoryAvailability`; optional **`allStories`** for **`continuationHint`** |
| `continuationRouting.ts` | Continuation index, **`evaluateFollowUpsForAnchor`**, **`summarizeVariantGroup`** (surfacing always via `evaluateStorySurfacing`) |
| `storyPlayerCopy.ts` | `getStoryPlayerPresentation`, **`resolveContinuationPresentationHint`** |
| `storyPresentation.ts` | `getStoryBrowseState`, **`isReleaseBrowseStory`** (release shelf filter); forwards **`EvaluateStorySurfacingOptions`** |
| `storage.ts` | **`createEmptyPersistedProfile`**, load/save/clear profile JSON (`pov.profile.v1`) |
| `worldConsequences.ts` | Merge **`worldlineCommit`**, marks, **`closeHistoryMarks`** from endings into **`PersistedProfile`** |
| `authoringValidation.ts` | **`validateStoryRegistryAuthoring`** — warnings/errors for continuations, variant groups, surfacing heuristics, worldlines (tooling; not run in play) |

---

## 6. Data model highlights

### `StoryDefinition` (authoring)

- **Narrative:** `scenes`, `choices`, `variables`, `flags` (runtime), `vows`, `personalities`, `endings`, optional **`hiddenTruth`** (objective facts the POV may not know), optional **`belief`** (what the POV believes / has inferred — parallel namespace, not a reuse of visible flags).
- **Continuity (optional):** **`continuationOf`**, **`variantGroup`**, **`variantId`**, **`playerContinuationHint`** — see **`continuationRouting.ts`** and **`branch_scope_doctrine.md`**.
- **Internal:** `storyClass`, optional `pressuredConfig`, optional **`pressuredNarration`** (per-resolution and per-arrival line arrays; no engine-default prose).
- **Gates / surfacing:** `requiresEchoes`, `excludesEchoes`, `requiresFlags`, `excludesFlags`, `requiresEndings`, `requiresUnlockedModuleIds`, **`requiresWorldlineBranch`**, **`excludesWorldlineBranches`**, **`requiresWorldConsequenceMarks`**, **`excludesWorldConsequenceMarks`**, **`blockedWhenHistoryClosed`**, `lockedUntilEchoes`, `isHiddenUntilUnlocked`, `preDiscoverySurfacing`, rumor/teaser/secret list copy, `continuationOf`, `variantGroup`, `variantId`, etc.
- **Planning-only:** `era`, `moduleTemplate`, `authoringAvailability`, `unlockCategory`.

### `EndingDefinition`

- `conditions`, `echoes`, optional **`worldFlags`**, **`unlocks`** (story/module ids → `profile.unlockedModuleIds`).
- **World consequence depth (optional):** **`worldlineCommit`** (mutex family → winning `branchId`), **`worldConsequenceMarks`** (named tags, deduped on profile), **`closeHistoryMarks`** (permanent closure ids for **`blockedWhenHistoryClosed`** gates). Applied in **`applyResolvedEndingToProfile`** via **`worldConsequences.ts`** after **`worldFlags`** merge.

### `PersistedProfile`

- `globalEchoes`, `completedEndings`, **`worldFlags`**, **`unlockedModuleIds`**, optional **`worldlineBranches`** (one `branchId` per `groupId`), **`worldConsequenceMarks`**, **`closedHistoryMarks`**, `lastRuntime`.

### World consequence depth (durable history)

- **Purpose:** Anthology-scale commitments beyond boolean **`worldFlags`**: mutex **worldlines**, named **marks**, and **permanent closures** — without a second surfacing evaluator. **`evaluateStorySurfacing`** remains the only gate reader.
- **vs `worldFlags`:** Flags are coarse booleans; **worldlines** express “only one branch of this family can hold” (underground thrives vs banned); **marks** bundle narrative tags; **closures** permanently block modules that list **`blockedWhenHistoryClosed`**.
- **Authoring — endings:** **`worldlineCommit`**, **`worldConsequenceMarks`**, **`closeHistoryMarks`** (see **`EndingDefinition`**).
- **Authoring — stories:** **`requiresWorldlineBranch`**, **`excludesWorldlineBranches`**, **`requiresWorldConsequenceMarks`**, **`excludesWorldConsequenceMarks`**, **`blockedWhenHistoryClosed`**.
- **Doctrine:** Most outcomes still stop at echoes/flags; use this layer for load-bearing forks per **`branch_scope_doctrine.md`**.
- **Proof:** **`world_consequence_lab`** + **`wc_follow_soft`** / **`wc_follow_hard`** (`in_dev`) — one mutex group, closure mutex on the soft follow-up.
- **Authoring checks:** **`validateStoryRegistryAuthoring(stories, { baselineProfile? })`** in **`authoringValidation.ts`** — dangling **`continuationOf`**, cycles, duplicate ids, **`requiresEndings`** refs, variant-group baseline mutex, rumor/teaser/secret copy, **`isHiddenUntilUnlocked`** without gates, worldline require/exclude clash, unreachable **`requiresWorldlineBranch`**, multiple **`worldlineCommit`** branches per group within one story (warning). Not invoked at runtime; use in tests / CI / Cursor tasks.
- **Future:** `profile.*` condition targets for worldlines/marks in play; deeper reachability (SMT / graph) if needed.

### `StoryRuntimeState`

- Current scene, variables, flags, vow states, history, optional **`hiddenTruth`** (objective), optional **`belief`** (POV inference), `engineMeta` (e.g. **`pressured`** audit / pending / **`followUp`**, optional **`playNarration`** hook lines from `afterChoiceResolve`).

### Belief / inference (POV layer)

- **Authoring:** `StoryDefinition.belief` — optional `variables` / `flags` with defaults (`BeliefDefinition`, mirrors `hiddenTruth` shape).
- **Runtime:** `StoryRuntimeState.belief` — `{ variables, flags }`; initialized in **`createInitialRuntime`** when authored; omitted when unused (keeps saves small).
- **Conditions:** `belief.variables.<id>`, `belief.flags.<id>` via **`resolveTarget`** / **`evaluateConditions`** (same semantics as `hidden.*` for missing flags → false).
- **Consequences:** `setBeliefVariable`, `incrementBeliefVariable`, `setBeliefFlag` in **`applyConsequences`**; Zod in **`consequenceSchema`**.
- **Merges:** **`mergeRuntimePatch`** accepts **`StoryRuntimePatch`** — nested **`belief`** (and **`hiddenTruth`**) may be **partial** objects; merged deeply like hidden truth.
- **Distinction:** **`hiddenTruth`** = objectively true in the fiction; **`belief`** = what the POV currently accepts — they can disagree (rumor, obsession, unreliable synthesis). Not shown in standard play UI unless you add bespoke chrome.
- **Proof modules:** **`belief_inference_lab`** (`in_dev`). **`gyre_mythic_anchor`** / **`gyre_witness_survivor_aftermath`** — Gyre + Survivor witness (see §1). **`verge_mara_anchor`** — Mara / clan orbit; **`rumor_girl`** — modern rumor/obsession + buried shock; **`court_aftermath`** — record/witness aftermath (unified OR: **`requiresAnyFlags`** + **`requiresAnyWorldConsequenceMarks`** on Rumor Girl seeds). Shock path seeds include **`rumor_girl_court_seed_stack`** (echo) / **`rumor_girl_witness_aftermath_invited`** / **`rumor_girl_fatal_aftermath_seeded`** (mark).

### Continuation / variant routing (anthology continuity)

- **Authoring (internal):** `continuationOf: { storyId, suggestedVariantId? }`, optional **`variantGroup`** / **`variantId`**, optional **`playerContinuationHint`** (full line override for browse/intro). Not every module needs these — see **`branch_scope_doctrine.md`** (echo-only / aftershock / variant swap vs direct sequel).
- **Canonical helpers:** **`src/engine/continuationRouting.ts`** — index follow-ups by anchor, **`evaluateFollowUpsForAnchor`**, **`summarizeVariantGroup`**, list filters (**`filterFollowUpsListed`**, etc.). Each row’s **`surfacing`** comes only from **`evaluateStorySurfacing`** (no second gate implementation).
- **Surfacing integration:** **`evaluateStorySurfacing(story, profile, { allStories? })`** and **`getStoryBrowseState(..., { allStories? })`**. When **`allStories`** includes the anchor, **`playerFacing.continuationHint`** may be set: either **`playerContinuationHint`** or synthesized **An echo of “…”** via **`resolveContinuationPresentationHint`** in **`storyPlayerCopy.ts`** (so default hints read as lineage, not a promise of an immediate follow-up row).
- **Player UI:** **`StorySelectPage`** / **`StoryIntroPage`** show **`continuationHint`** as a subtle secondary line (**`shelf-continuation-hint`** / **`intro-continuation-hint`**) — no `storyClass` or engine ids.
- **Variants:** Multiple definitions may share **`variantGroup`**; use **`requiresEndings`**, **`requiresFlags`**, mutex **`excludes*`** so only the intended branch is **startable** at a time. The router reports **`startableStoryIds`** / **`visibleStoryIds`**; it does not pick a “winner” when two are startable (authoring should prevent that).
- **Future work:** richer **`suggestedVariantId`** consumption, tooltips / “also in this thread” panels, explicit **aftershock** tier in metadata (still optional).

### Play narration (forced / strained / mutated tone)

- **Authoring:** `StoryDefinition.pressuredNarration` — `postChoiceByKind` / `postChoiceByChoice` keyed by **`PressuredResolutionKind`**, and `sceneArrivalByKind` keyed by **`followUp.arrivalKind`** (`free` \| `forced` \| `mutated`).
- **Hooks:** `AfterChoiceResolveResult.postChoiceNarrationLines` appends to **`engineMeta.playNarration.hookPostChoiceLines`** (works for any `storyClass`; useful for future **possessed** / **distorted** handlers).
- **Resolution:** **`resolvePlayNarration(story, runtime)`** reads `lastResolution`, `followUp`, hook lines, and story copy; returns **`ResolvedPlayNarration`** (`postChoice` + optional `sceneArrival`).
- **Display state:** Zustand **`playNarrationFrame`** is set after each successful play **`selectChoice`** that does not jump to the ending screen; cleared on start/continue/reset/clear and when an ending resolves. The UI does not re-derive narration from raw runtime — it renders the frame only.
- **One-shot transport:** **`stripEphemeralNarrationTransport`** at the **start** of the next choice removes stale **`hookPostChoiceLines`** and **`followUp.arrivalKind` / `forcedToSceneId`** so banners do not repeat; audited **`lastResolution`** and **`consumedHistory`** remain.

---

## 7. Surfacing states (player-facing buckets)

From **`evaluateStorySurfacing`**:

- **`hidden`** — not in rumor/teaser/main list (e.g. mutex or undiscovered default).
- **`rumor`** / **`teaser`** — off main list; need authored `preDiscoverySurfacing` + copy.
- **`listed_locked`** / **`listed_secret`** — on main list but not startable until `lockedUntilEchoes` (secret uses `listPresentationStyle` + `secretListHint`).
- **`startable`** — full intro/play.

### Paladin Promise — dark trajectory ladder (proof, not a morality engine)

Paladin illustrates **continuation-worthy dark** vs **ordinary fracture** without a general morality system:

- **Shared fall:** `kneel_and_break` sets a kneel/fracture vow pattern and personality-specific ruin flags (`paladin_dark_doctrine_ruin` stern; `paladin_dark_mercy_ruin` compassionate — see `scenes.ts`).
- **Ascension (sequel-worthy in this proof):** `dark_mirror_doctrine` / `dark_mirror_mercy` — same pattern plus **thresholds** on `order_loyalty` / `village_trust`; commit **`paladin_aftermath` / `dark_mirror_walks`**, grant **`unlock_paladin_what_walks_after_oath`**, emit **`paladin_dark_continuity_earned`** and flavor marks. Unlocks the **secret** shelf row **`paladin_what_walks_after_oath`** (“What Walks After the Oath” — no “Dark Paladin Route” UI label).
- **Ordinary fracture (scar, no secret sequel):** `fracture_bleak_stern` / `fracture_bleak_mercy` — same kneel + ruin, thresholds **not** met; **`oath_fracture`**, **`paladin_fracture_without_ascension`**, no continuation unlock.
- **Other bad paths still matter:** e.g. **`tarnished_oath`** → **`peace_by_lies`**, mark **`paladin_compromised_by_lies`**; **`faithful_blade`** / **`shield_of_the_weak`** unchanged proofs; catch-all **`broken_saint`** for odd vow shapes.

**Witness aftershocks (non-sequel, two flavors):** **`paladin_witness_peace_lies`** — **`tarnished_oath`**, **`peace_by_lies`**, mark **`paladin_compromised_by_lies`**; clerk POV; quiet institutional / domestic silence; **`preDiscoverySurfacing` rumor**. **`paladin_witness_broken_saint`** — **`broken_saint`**, **`oath_fracture`**, mark **`paladin_fracture_catchall`** (distinguishes catch-all fracture from **`fracture_bleak_*`** which share **`oath_fracture`** but carry **`paladin_fracture_without_ascension`**); acolyte POV; public spiritual wound, uneasy sigil; rumor before gates. Neither grants the paladin a direct continuation.

Vitest: **`paladinDarkContinuation.test.ts`**, **`paladinWitnessPeaceLies.test.ts`**, **`paladinWitnessBrokenSaint.test.ts`**.

---

## 8. UI pages (behavioral summary)

| Route | Component | Notes |
|--------|-----------|--------|
| `/` | `HomePage` | Entry |
| `/stories` | `StorySelectPage` | Rumors / teasers / main list |
| `/stories/:id` | `StoryIntroPage` | Surfacing-aware; no `storyClass` labels |
| `/play/:id` | `StoryPlayPage` | Scene + choices + vows/stats; ending screen |
| `/profile` | `ProfilePage` | Echoes + completed endings; **erase profile** |

---

## 9. What is solid vs stub

**Implemented and wired:**

- Data-driven scenes/choices, conditions, consequences (including **`setWorldFlag`** → profile).
- Endings with echoes + **world flags** + **unlocks** persisted.
- Pressured story class with tiers, pending signals, flush path.
- Hidden truth layer (types + conditions + consequences for hidden vars/flags).
- **Belief / inference layer:** optional `belief` authoring + runtime; `belief.*` conditions; belief consequences; **`belief_inference_lab`** demonstrates disagreement with hidden truth.
- **Continuation / variant routing:** **`continuationRouting.ts`** + surfacing **`allStories`** option; optional **`continuationHint`** on browse/intro.
- **World consequence depth:** **`worldConsequences.ts`** + profile fields + gate fields on **`StoryDefinition`** / **`EndingDefinition`**; lab **`world_consequence_lab`**.
- Profile persistence, surfacing/gates, player copy separation from `storyClass`.
- Paladin Promise as full sample; endings set distinct **`highstone_*`** world flags and **`worldlineCommit`** on **`paladin_aftermath`**; **`paladin_proof_*_echo`** aftermath pair proves mutex follow-ups.
- **Pressured play narration:** authorable lines + optional hook lines; lab story demonstrates **forced** resolution + **forced** arrival copy after **`forced_followup_scene`**.
- **Profile-aware in-play conditions:** store passes **`toRuntimeProfileSnapshot(profile)`** into **`getVisibleChoices`**, **`resolveEnding`**, and **`shouldResolveEnding`** visibility checks. Targets under **`profile.*`** read the snapshot only; **`echoes`** still means **in-run** `state.unlockedEchoes` (not the same as **`profile.globalEchoes`**).

**Thin / placeholder:**

- `distorted`, `possessed`, `witness` handlers (hooks exist; behavior minimal or empty).

### Automated tests (Vitest)

- **Runner:** Vitest 3, **`npm run test`** (CI-style) / **`npm run test:watch`**. Config: root **`vitest.config.ts`** (Node environment; no browser).
- **Location:** **`src/engine/__tests__/`** — one file per seam, shared **`fixtures.ts`** for minimal `StoryDefinition` / profile / runtime builders.
- **Covered:** **`evaluateStorySurfacing`**, **`continuationRouting`**, **`worldConsequences`**, **`validateStoryRegistryAuthoring`**, **`paladinProofAftermath`** (Paladin worldline → proof module gates), **`conditionEvaluator`**, **`profileOutcomes`**, **`flushPressuredPendingSignals`**, **`resolvePlayNarration`**, **`beliefLayer`**, **`resolveChoice`** / **`getVisibleChoices`**, **`resolveEnding`**.
- **Intentionally not covered yet:** **`storyEngine`** (`validateStory`, `createInitialRuntime`, `getScene` edge cases), **Zustand** store + **React** UI, full **`consumedHistory` cap** stress test, isolated **`evaluatePressuredSnapshot`** unit tests, **`beforeChoiceVisible`** beyond what **`getVisibleChoices`** already hits, production **`distorted` / `possessed` / `witness`** handlers (still empty). Add tests under **`src/engine/__tests__/`** as new `*.test.ts` files.

---

## 10. Recommendations (prioritized)

### High value / low regret

1. **Expand Vitest** to `validateStory` / `createInitialRuntime`, **`evaluatePressuredSnapshot`**, and store-level integration if needed; keep tests pure and fixture-driven.
2. **Profile page:** optionally show **world flags** and **unlocked module ids** in dev-friendly form (or behind `import.meta.env.DEV`) so authors verify Paladin outcomes without opening DevTools.

### Product / UX

3. **Echo ids on EndingScreen / Profile:** they are humanized (`_` → space) but still **implementation-ish**; consider replacing with in-fiction labels from a small map or `EndingDefinition` metadata when you care about polish.
4. **Error boundary + validateStory on boot:** `validateStory` throws; ensure failed stories don’t brick the app in production builds.

### Architecture

5. **Avoid circular imports:** `storyPlayerCopy` exists to keep `storyGateEvaluation` ↔ `storyPresentation` clean—keep new cross-engine imports in that pattern.
6. **`echoes` vs `profile.globalEchoes`:** the **`echoes`** condition target is **in-run** `unlockedEchoes`; durable cross-session echoes use **`profile.globalEchoes`** (or other `profile.*` targets).

### Scaling content

7. **Code-split stories** or lazy `storyRegistry` if the anthology grows large.
8. **Authoring tooling:** optional CLI that validates all stories in `src/stories` and prints surfacing/gate errors.

---

## 11. Quick file index for common tasks

| Task | Start here |
|------|------------|
| Add a new story | `src/stories/<id>/`, register in `src/stories/index.ts`, `validateStory` in `story.ts` |
| Change gates / surfacing | `src/engine/types.ts` + `storyGateEvaluation.ts` + Zod `schemas.ts` |
| Change what endings write | `EndingDefinition` + `profileOutcomes.ts` + store `selectChoice` |
| Profile-aware in-scene conditions | `types.ts` (`Condition` targets), `conditionEvaluator.ts`, `runtimeProfileSnapshot.ts`; store must pass snapshot into `getVisibleChoices` / `resolveEnding` |
| Change browse UI | `StorySelectPage.tsx`, `StoryIntroPage.tsx` |
| Change play loop | `useStoryStore.ts`, `choiceResolver.ts`, `endingResolver.ts`, `conditionEvaluator.ts`, `runtimeProfileSnapshot.ts`, `playNarration.ts` |
| Add pressured / possessed “system took the wheel” copy | `types.ts` (`pressuredNarration`, hook lines), story JSON, `resolvePlayNarration`; optional handler `postChoiceNarrationLines` |
| Add / run engine unit tests | `src/engine/__tests__/*.test.ts`, `fixtures.ts`, root `vitest.config.ts`; `npm run test` |
| POV belief vs objective truth | `types.ts` (`belief`, `Belief*`), `schemas.ts`, `conditionEvaluator.ts`, `consequenceApplier.ts`, `runtimeMerge.ts` (`StoryRuntimePatch`), `storyEngine.ts`; demo `src/stories/belief_inference_lab/` |
| Continuations & variant groups | `types.ts` (`continuationOf`, `variantGroup`, `playerContinuationHint`), `continuationRouting.ts`, `storyGateEvaluation.ts` (`EvaluateStorySurfacingOptions`), `storyPlayerCopy.ts` (`resolveContinuationPresentationHint`); pass `allStories` from `getStoryBrowseState` / `startStory` |
| Worldlines / consequence marks / closures | `types.ts` (`EndingDefinition` / `StoryDefinition` / `PersistedProfile` fields), `worldConsequences.ts`, `profileOutcomes.ts` (`applyResolvedEndingToProfile`), `storyGateEvaluation.ts`, `storage.ts` (load defaults), `schemas.ts` |
| Continuity / variant authoring QA | `authoringValidation.ts` — call with `storyRegistry` or fixture lists; see `authoringValidation.test.ts` |

---

## 12. Planning docs (human context)

Under **`docs/planning/`**: `design_doctrine.md` (normative), **`personality_continuity_doctrine.md`** (player personality lanes vs fixed anchors vs relational variants), **`relational_verdicts_doctrine.md`** (private judgments: event → access → verdict → action tendency; marks/variants not full simulation), **`branch_scope_doctrine.md`** (sequel eligibility & anti-sprawl budgets), **`world_connection_doctrine.md`** (cross-era / cross-setting inheritance: modes, levels, approval checklist), `eras_and_scales.md`, `story_registry.md`, `world_echoes.md`, `module_templates.md`, `backlog.md`, etc. These describe **intent**; the **source of truth for behavior** is the TypeScript engine + store.

Under **`docs/cursor_reports/`**: **`agent_handoff.md`** (short “where we are / what next / what not to do” for new agents), **`latest_report.md`**, **`change_log.md`**.

---

*Generated as a snapshot of the codebase structure and behavior. Update this file when major engine or persistence contracts change.*
