# Change log (Cursor implementation reports)

## 2026-04-27 — GitHub Pages: back to Actions artifact deploy + `npm install`

**Summary:** Workflow uses **`npm install`** (not **`npm ci`**) for CI parity with a working Vite portfolio pipeline; **`configure-pages`**, **`upload-pages-artifact`**, **`deploy-pages`**. **README** / **briefing**: Pages source = **GitHub Actions** again.

---

## 2026-04-27 — GitHub Pages: deploy via `gh-pages` branch (peaceiris)

**Summary:** Replaced **`upload-pages-artifact` / `deploy-pages`** workflow with **`peaceiris/actions-gh-pages`** pushing **`dist/`** to branch **`gh-pages`**. **Pages** must use **Deploy from branch → `gh-pages` / (root)** — **`main`** was still serving unbuilt **`index.html`** (blank site). **README** + **CHATGPT_CODEBASE_BRIEFING** updated.

**Reports:** `docs/cursor_reports/latest_report.md` (light)

---

## 2026-04-24 — Ship 0.1.0 + GitHub Pages (`Game_Engine`)

**Summary:** **`package.json`** version **0.1.0**. **Vite** `base` from **`VITE_BASE_PATH`** (default `/`; **`/Game_Engine/`** for Pages). **`createBrowserRouter`** **`basename`** from **`import.meta.env.BASE_URL`**. **`index.html`** `%BASE_URL%` for favicon + manifest; **`manifest.webmanifest`** `start_url: "./"`. **`.github/workflows/deploy-github-pages.yml`** — `npm ci`, `npm test`, `npm run build` with **`VITE_BASE_PATH=/Game_Engine/`**, **`cp dist/index.html dist/404.html`**, **`actions/deploy-pages`**. **`npm run build:gh-pages`** helper. **README** Pages URL + Settings note.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-24 — Tiny copy / feel polish (shelf, intro, play, ending, profile)

**Summary:** **Player-facing wording only** — no story edits, no branches, no engine logic. **`StorySelectPage`:** hero + kickers + row eyebrows (**Ready** / **Waiting** / **Secret · waiting**). **`StoryIntroPage`:** hidden/rumor/teaser/locked/startable copy; **What it’s waiting on**; **Ready when you are**; personality heading. **`StoryPlayPage`:** loading + lost-scene copy. **`ChoiceList`:** empty state. **`PlayNarrationBanner`:** human labels for pressured post-choice / arrival (not raw kind strings). **`EndingScreen`:** **Closing**, **Echoes that remain**, button labels. **`ProfilePage`:** subtitle, section/helper/confirm copy. **Tests:** unchanged count, all pass.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-24 — MVP stability / release-prep (profile erase + browse shelf honesty)

**Summary:** **Release-bar pass** — `npm test` / `npm run lint` / `npm run build` clean; **`validateStoryRegistryAuthoring(storyRegistry)`** still **0 errors** via tests. **Fix:** **`createEmptyPersistedProfile()`** in **`storage.ts`** — **`loadProfile`** + **`useStoryStore.clearAll`** use the same full empty shape (**`worldlineBranches`**, **`worldConsequenceMarks`**, **`closedHistoryMarks`** no longer missing after erase). **`isReleaseBrowseStory()`** in **`storyPresentation.ts`** — **`StorySelectPage`** lists only non-**`in_dev`** modules (**`allStories`** still full registry for continuation hints). **`storage.test.ts`**. **No** new story content or lanes.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-21 — Anthology shelf / discovery polish (browse + intro curation)

**Summary:** **Release curation only** — no new story content, no new lanes, no Street RPG. **`StorySelectPage`:** curatorial hero + **section kickers** (rumors / horizon / shelf); **main shelf** sorted **unlocked then locked**, registry order within bands; row eyebrows **Open** / **Held closed** / **Secret · held closed**; **continuation** via **`shelf-continuation-hint`**; **locked rows** drop **`roleHint`**; removed redundant bottom locked line. **`StoryIntroPage`:** **`intro-state-eyebrow`** variants for **playable / rumor / teaser / locked / secret / hidden**; tightened threshold copy; locked **“Why it waits”**; **`intro-continuation-hint`**. **`storyPlayerCopy`:** synthesized continuation **`An echo of “…”`** (replaces **`Continues from`** for default hints); test + types JSDoc. **`index.css`:** browse/intro utilities for section intro, kickers, eyebrows, continuation hints.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-21 — Browser / mobile MVP polish pass (checklist: pages + components + CSS)

**Summary:** **Release polish only** — no new lanes, no content expansion, no Street RPG. **`StorySelectPage`:** region **dividers**, **title-before-continuation** hierarchy, **teaser line-clamp**, **shelf** gaps + **52px-class** row targets. **`StoryIntroPage`:** **intro-cta-stack**, tighter **above-fold** rhythm, clearer **rumor/secret/locked** labels. **`StoryPlayPage`:** **`page-shell--play`** bottom inset; **scrollable** vow/stat rail on **`md+`**. **`ProfilePage`:** **`profile-section-heading`**, vertical chip lists on narrow screens, **danger zone** for erase. **Components:** **`StoryHeader`**, **`SceneCard`**, **`ChoiceList`**, **`PlayNarrationBanner`**, **`EndingScreen`**, **`PersonalitySelector`** (selection ring), **`VowPanel`**, **`StatPanel`**. **`index.css`:** safe-area **`calc`** padding, browse/profile utilities, **choice** focus + disabled, prose **`break-words`**. **`index.html`:** **`apple-mobile-web-app-title`**.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Street RPG / Forgotten Trajectory POV integration planning package

**Summary:** Added **post-MVP add-on** planning docs for **Street RPG** (dual protagonist, patricide spine, aftermath families A–D, open canon seams, integration doctrine). **Files:** `docs/planning/story_concepts/street_rpg_core.md`, `street_rpg_aftermath_families.md`, `street_rpg_open_canon_seams.md`, `street_rpg_pov_integration_note.md`. **`story_registry.md`:** concept-archive links + **Street RPG** appendix table (canonical anthology module list **unchanged**). **`latest_report.md`** updated for this synthesis; **no** story rewrite or new endings invented.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-21 — Browser + mobile MVP readiness pass (primary pages, no new lanes)

**Summary:** **UX polish** for **desktop + mobile browser**: **`StorySelectPage`** (section labels, spacing, rumor/teaser/shelf readability, **`line-clamp-6`** on shelf summaries for small viewports), **`StoryIntroPage`**, **`StoryPlayPage`** (grid gap, bottom padding), **`ProfilePage`** (section dividers, cards, erase control). Components: **`PlayNarrationBanner`**, **`ChoiceList`**, **`SceneCard`**, **`StoryHeader`**, **`EndingScreen`**, **`PersonalitySelector`**, **`VowPanel`**. **`index.css`**: safe-area **top** on `body`, **`prose-story`** / **`choice-btn`** / **`browse-section-label`**, **`page-shell`** bottom inset. **`index.html`**: **`apple-mobile-web-app-*`**. **`README`** browser note. Docs: **`latest_report`**, **`agent_handoff`**, **`CHATGPT_CODEBASE_BRIEFING`**. **MVP freeze:** no content lanes or engine features.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-21 — MVP 0.1 hard freeze checklist (`mvp_freeze_checklist.md`)

**Summary:** New **[`docs/planning/mvp_freeze_checklist.md`](../planning/mvp_freeze_checklist.md)** — repo control doc: **§1** what ships in 0.1 (Paladin mainline + proof cluster, Gyre anchor + Survivor aftermath, Verge anchor, Rumor Girl, court_aftermath, core systems, mobile/browser baseline, build/test/lint/validator, docs framing); **§2** explicit **post-0.1 freeze** (Replacement, extra Gyre aftermaths, prequel implementation, Verge tree, new Paladin/anchors, observer, full handlers, major engine, etc.); **§3** quality gates (content, shelf, stability, mobile, release framing); **§4** scope guardrails; **§5** MVP-ready rule. Light updates: **`agent_handoff.md`**, **`backlog.md`**, **`story_registry.md`** (freeze link), **`CHATGPT_CODEBASE_BRIEFING.md`**, **`latest_report.md`**.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-21 — `court_aftermath` proof pass: two scenes, fatal OR gate, profile marks in snapshot

**Summary:** Expanded **`court_aftermath`** — **two** short scenes (`court_aftermath_read` → `court_aftermath_hallway`); copy sharpens **relational verdicts** (multiple incompatible private readings + **action tendency**); gates now **`requiresAnyWorldConsequenceMarks`:** `rumor_girl_fatal_aftermath_seeded` in the **same OR group** as witness / belief-gap flags (`missing_any_profile_or` replaces `missing_any_world_flag`). **`RuntimeProfileSnapshot.worldConsequenceMarks`** + **`toRuntimeProfileSnapshot`**; **`profile.worldConsequenceMarks`** in **`resolveTarget`** for ending conditions. Third closing **`court_aftermath_close_fatal_mark`** (priority 19) for fatal mark without witness flag, mutex **not** `belief_gap_soft`. Tests: mixed-death startable, fatal-only OR gate, fatal closing, gate OR marks. Docs: registry, **`world_echoes.md`**, briefing, **`latest_report.md`**, **`agent_handoff.md`**.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-21 — `court_aftermath` Rumor Girl record proof + `requiresAnyFlags`

**Summary:** Shipped **`court_aftermath`** (*The Morning After Verdict*): **witness**-class **friend POV** after **`rumor_girl`**; gates **`rumor_girl_proof_resolved`** + **OR** `rumor_girl_witness_aftermath_invited` \| `rumor_girl_belief_gap_soft` via new **`requiresAnyFlags`** (`storyGateEvaluation`, types, Zod, authoring guard); rumor surfacing; **two** closings (shock vs soft seed); echo **`rumor_girl_court_aftermath_logged`**, mark **`rumor_girl_court_aftermath_touched`**. Tests **`courtAftermath.test.ts`**, gate tests. **`story_registry.md`**, **`world_echoes.md`**, **`backlog.md`**, **`agent_handoff.md`**, briefing, **`latest_report.md`**.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-21 — Relational verdicts doctrine (private judgments → action)

**Summary:** New **[`docs/planning/relational_verdicts_doctrine.md`](../planning/relational_verdicts_doctrine.md)** — **not** facts/rumors/traits alone: **private readings** of others; **four layers** (objective event, awareness/access, private verdict, action tendency); scalability + flow effects + **taxonomy** + approval checklist + **light** implementation sketch (marks/echoes/variants; optional future `verdictMarks`). **Distinct from** [`personality_continuity_doctrine.md`](../planning/personality_continuity_doctrine.md). **`design_doctrine.md`** (law 9 + related), **`story_registry.md`**, **`branch_scope_doctrine.md`**, **`agent_handoff.md`**, **`CHATGPT_CODEBASE_BRIEFING.md`**, **`latest_report.md`**.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-21 — Personality continuity & relational affinity doctrine

**Summary:** New **[`docs/planning/personality_continuity_doctrine.md`](../planning/personality_continuity_doctrine.md)** — **player personality** as **continuity lane**; **fixed anchor** characters (e.g. Mara) vs **relational variants** (small, biased expressions); **relational affinity / casting pressure**; three-layer model (player + NPC); examples (**Gyre**, **Verge**, **Rumor Girl**); doctrine-safe caps. **`design_doctrine.md`** (law 8 + related), **`story_registry.md`**, **`branch_scope_doctrine.md`**, **`agent_handoff.md`**, **`CHATGPT_CODEBASE_BRIEFING.md`**, **`latest_report.md`** — light links only.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-21 — Browser + mobile-browser MVP readiness (responsive / touch)

**Summary:** **Responsive + touch-friendly** pass on **Home, Stories, Intro, Play, Profile** — `page-shell` / `back-nav`, safe-area padding, **min 44px** buttons, `touch-manipulation`, responsive **prose** and **PlayNarrationBanner**; play grid **sticky** side rail on `md+`; story list **sections** + **On the shelf** divider; **Profile** shows **world flags** + **consequence marks** when set. **Light PWA:** `manifest.webmanifest`, `theme-color`, `viewport-fit=cover` — **no** SW/offline. **`latest_report.md`**, **`agent_handoff.md`**, **`CHATGPT_CODEBASE_BRIEFING.md`**, **`README.md`**.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-21 — Verge Mara anchor: proof verification + full-chain tests

**Summary:** **`verge_mara_anchor`** **verified** as the **small** modern / near-future **Mara Verge** proof (two scenes; **hidden** `mara_intended_brake_not_anoint` vs **belief** `heard_anointment`; **`room_heat`**; endings **`verge_proof_orbit_misread`** / **`verge_proof_line_held`**). **`vergeMaraAnchor.test.ts`**: two **`resolveChoice`** full-chain tests; **`choiceResolver`** import casing for **`tsc -b`**. **`latest_report.md`**, **`agent_handoff.md`**, **`CHATGPT_CODEBASE_BRIEFING.md`**.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Rumor Girl future-locked prequel (planning concept)

**Summary:** Added **[`docs/planning/story_concepts/rumor_girl_future_locked_prequel.md`](../planning/story_concepts/rumor_girl_future_locked_prequel.md)** — **companion romance** chapter (help him get the girl while secretly in love); **chronology before** `rumor_girl`, **play / closure after** — **retroactive closure**: **`rumor_girl` outcome groups → four closure families**; **prequel state → flavor**; shy guy **human** not cartoon; **branch_scope** / variant discipline; proposed echoes/flags/marks **documentation only**. **`story_registry.md`** concept row **`rumor_girl_future_locked_prequel`**, **`backlog.md`**, **`agent_handoff.md`**, **`latest_report.md`**.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Rumor Girl modern proof (`rumor_girl`)

**Summary:** Shipped **`rumor_girl`** — **grounded** modern obsession / rumor / cheating interpretation; **`hidden`** (objective cheat, accountable in-person break, words **not** mockery) vs **`belief`** (`refused_healthier_exit`, `she_hears_cruel_theater`) vs **`suspicion`/`humiliation`**; **four personalities**; **seven** human-scale endings + **narrow buried shock** for **obsessive idealist** / **fearful dependent** only (`refused_healthier_exit` + `suspicion`≥6 + terminal choice); **court/witness seeded** via **`rumor_girl_court_seed_stack`**, **`rumor_girl_witness_aftermath_invited`**, **`rumor_girl_fatal_aftermath_seeded`** — **no** `court_aftermath` build. Tests **`rumorGirl.test.ts`**. **`story_registry.md`**, **`world_echoes.md`**, **`backlog.md`**, briefing, **`agent_handoff.md`**, **`latest_report.md`**.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Verge Mara anchor proof (`verge_mara_anchor`)

**Summary:** Shipped **first Verge / modern-near-future anchor** — **`verge_mara_anchor`** (*The Living Rulebook*): **cousin / corridor** POV; **Mara** as center of dysfunctional **clan gravity** (success from punchline to feared; interpretation as governance); **Theo** succession pressure; Mara’s line **“Let appetite stay hungry one more quarter”** — **`hidden.flags.mara_intended_brake_not_anoint`** vs **`belief.flags.heard_anointment`**; **`room_heat`**; endings **`verge_proof_orbit_misread`** / **`verge_proof_line_held`**; echoes **`verge_proof_orbit_misread`**, **`verge_proof_dependency_named`**; mark **`verge_mara_anchor_touched`**. Open entry; era **`near_future`**. Tests **`vergeMaraAnchor.test.ts`**. **`story_registry.md`**, **`world_echoes.md`**, **`verge_clan_mara_verge.md`** status, briefing, **`agent_handoff.md`**, **`latest_report.md`**.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Gyre Survivor witness aftershock (`gyre_witness_survivor_aftermath`)

**Summary:** Shipped **one** small **Survivor-family** witness module — **`gyre_witness_survivor_aftermath`** (*The Name Still Fits Wrong*): **companion POV** after `gyre_mythic_anchor`; **damaged survival** (name bracing, third-person slip, kindness-as-debt); **not** Replacement (ending text explicit). **Gate:** **`gyre_mythic_anchor_touched`**; rumor surfacing before gate; **`hidden.flags.companion_read_is_true`**; ending echo **`gyre_survivor_fracture_witnessed`**. **`continuationOf`** + **`gyre_survivor_aftermath` / `companion_witness`**. Tests **`gyreWitnessSurvivorAftermath.test.ts`**. Registry, **`world_echoes.md`**, **`gyre_aftermath_families.md`**, **`backlog.md`**, briefing, **`agent_handoff.md`**, **`latest_report.md`**.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Gyre aftermath families (planning / sequel discipline)

**Summary:** Added **[`docs/planning/story_concepts/gyre_aftermath_families.md`](../planning/story_concepts/gyre_aftermath_families.md)** — **two** main sequel buckets (**Survivor** vs **Replacement**): many emotional endings and echoes stay rich, but continuation routing **collapses** to these families + **variants** inside each; shipped **`gyre_mythic_anchor`** endings documented as **Survivor** variants only; **Replacement** reserved for future commits (*wrong one returned*, substitution). Includes **clue/warning kit** for replacement (tells, notes, code phrases, emotional warnings, rituals), proposed **future** engine keys (`gyre_survivor_line`, `gyre_replacement_line`, `gyre_substitution_seeded`, `gyre_wrong_one_walks_free`, continuation-family ids, etc.) — **documentation only**, minimal code. **Aligned:** [`branch_scope_doctrine.md`](../planning/branch_scope_doctrine.md) (Gyre example rewritten), [`gyre_mythic_recurrence.md`](../planning/story_concepts/gyre_mythic_recurrence.md), [`world_connection_doctrine.md`](../planning/world_connection_doctrine.md), [`story_registry.md`](../planning/story_registry.md), [`world_echoes.md`](../planning/world_echoes.md), [`backlog.md`](../planning/backlog.md), [`agent_handoff.md`](agent_handoff.md), briefing, **`latest_report.md`**.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Gyre anchor: loop-reveal + quadrant endings

**Summary:** Reauthored **`gyre_mythic_anchor`**: **visitor / current-loop** POV vs hostile **Gyre**; **hidden** `spiral_stayed_was_prior_visitor` + `under_rage_thread_of_care`; **belief** `grasps_loop_truth` × `closure_heals` → four endings (**`gyre_loop_truth_mercy`**, **`gyre_loop_truth_razor`**, **`gyre_loop_blind_grace`**, **`gyre_loop_blind_bitter`**) and echoes **`gyre_echo_*`**; **personalities** **Devoted / Yearning / Resentful / Numb** (player **stance**, aligned with planning Gyre modes). Gyre never states the loop; copy hints through ash-prints / stutter-reflection. **`weariness`** + personality appends on early choices. Tests **`gyreMythicAnchor.test.ts`**, **`world_echoes.md`**, **`story_registry.md`**, reports/briefing.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Gyre mythic anchor proof (`gyre_mythic_anchor`) — superseded narrative

**Summary (historical):** First **non-Paladin** anchor initially shipped as **stayed-behind** POV with **`other_self_care_sincere`** / **`accepts_the_reach`** and two endings — **replaced** by loop-reveal structure above; echo ids **`gyre_proof_*`** retired in favor of **`gyre_echo_*`**.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Agent handoff template (`docs/cursor_reports/agent_handoff.md`)

**Summary:** Added **[`docs/cursor_reports/agent_handoff.md`](agent_handoff.md)** — short operational handoff (current phase, priorities, do-not-expand, source-of-truth reads, next task, constraints, risks, Cursor/ChatGPT paste recipes). Intended to refresh after meaningful work blocks alongside **`latest_report.md`**. **`latest_report.md`** links to it.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — World connection doctrine (cross-era inheritance)

**Summary:** Added **[`docs/planning/world_connection_doctrine.md`](../planning/world_connection_doctrine.md)** — practical doctrine for linking new worlds/eras to old ones via memory, consequence, myth, witness, artifact, institutional residue; **six connection modes**, **four levels** (echo-only → civilizational), **what survived / who remembers / what changed**, weak-link warnings, **engine mapping** (writes vs reads), **worked examples** (Paladin shipped; Gyre/Verge planning), **world types**, **approval checklist**. Light links from **`design_doctrine.md`** (new scope law #7), **`eras_and_scales.md`**, **`world_echoes.md`**, **`story_registry.md`**, **`branch_scope_doctrine.md`**, **`CHATGPT_CODEBASE_BRIEFING.md`**.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Second Paladin witness proof (`broken_saint`) + cluster cap

**Summary:** Shipped **`paladin_witness_broken_saint`** (“The Light That Left All at Once”) — acolyte POV after **`broken_saint`**: gates **`requiresEndings` `broken_saint`**, **`requiresWorldlineBranch` `oath_fracture`**, **`requiresWorldConsequenceMarks` `paladin_fracture_catchall`** (excludes **`fracture_bleak_*`** via mark). Rumor pre-discovery. Contrasts peace-lies witness (quiet compromise). Tests **`paladinWitnessBrokenSaint.test.ts`**; peace-lies incompatible list extended. Docs: briefing, registry, **`world_echoes.md`**, **`unlock_matrix.md`**, **`branch_scope_doctrine.md`**. **Paladin proof cluster treated complete; no further Paladin stubs in this phase.**

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Witness proof: pre-discovery rumor (`paladin_witness_peace_lies`)

**Summary:** **`paladin_witness_peace_lies`** gains **`preDiscoverySurfacing: "rumor"`** + subtle **`rumorText`** (chapel / copied peace / quiet well — no spoil of exact gates). Until **`requiresEndings` / `requiresWorldlineBranch` / `requiresWorldConsequenceMarks`** all pass, surfacing stays **`rumor`** (`appearsInBrowse`, not **`isListed`**, not **`isStartable`**). Full tarnished stack unchanged for **startable**. Tests updated in **`paladinWitnessPeaceLies.test.ts`**. Docs: briefing, **`latest_report.md`**, **`story_registry.md`**, **`unlock_matrix.md`**.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Paladin witness aftermath proof (`tarnished_oath` / peace_by_lies)

**Summary:** Shipped **`paladin_witness_peace_lies`** (“The Peace We Did Not Believe”) — single-scene **witness** stub: chapel clerk POV after the paladin’s lie preserved peace. Gates: **`requiresEndings`** **`tarnished_oath`**, **`requiresWorldlineBranch`** **`paladin_aftermath` / `peace_by_lies`**, **`requiresWorldConsequenceMarks`** **`paladin_compromised_by_lies`**. **`variantGroup` `paladin_proof_aftermath`**, **`variantId` `peace_by_lies`**. Not a paladin sequel; demonstrates **aftershock** without **`paladin_what_walks_after_oath`**. Tests **`paladinWitnessPeaceLies.test.ts`**. Docs: briefing, registry, **`unlock_matrix.md`**, **`world_echoes.md`**, **`branch_scope_doctrine.md`**.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Secret Paladin dark continuation proof (narrow sequel gate)

**Summary:** Paladin **`kneel_and_break`** sets personality ruin flags. **Ascension** endings **`dark_mirror_doctrine`** / **`dark_mirror_mercy`** (thresholds on `order_loyalty` / `village_trust`) commit **`paladin_aftermath` / `dark_mirror_walks`**, grant **`unlock_paladin_what_walks_after_oath`** + **`paladin_dark_continuity_earned`**. **Ordinary fracture** **`fracture_bleak_*`** uses **`oath_fracture`** + **`paladin_fracture_without_ascension`** without that unlock. Shipped secret micro-module **`paladin_what_walks_after_oath`** (player title “What Walks After the Oath”) gated by unlock + worldline + mark; **`listPresentationStyle` secret**. Compromise / order paths gain consequence marks where applicable. Tests **`paladinDarkContinuation.test.ts`**; **`paladinProofAftermath.test`** extended. Docs: briefing, **`world_echoes.md`**, **`unlock_matrix.md`**, **`story_registry.md`**, **`branch_scope_doctrine.md`**.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Paladin world-consequence proof (aftermath pair)

**Summary:** Paladin endings gain `worldlineCommit` (`paladin_aftermath`: order_sanctioned, mercy_remembered, peace_by_lies, oath_fracture). Shipped modules `paladin_proof_order_echo` / `paladin_proof_mercy_echo` — continuationOf Paladin, requiresEndings + requiresWorldlineBranch, mutually exclusive by worldline; tarnished/broken saint open neither. Tests `paladinProofAftermath.test.ts`. Docs: briefing, `world_echoes.md`, `unlock_matrix.md`, `story_registry.md`.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Authoring validator (continuations / variants / world consequences)

**Summary:** `authoringValidation.ts` — `validateStoryRegistryAuthoring` reports errors/warnings for duplicate ids, continuation anchors/cycles/siblings, variant groups on baseline profile, surfacing copy / hidden-until-unlocked heuristics, `requiresEndings` refs, worldline require-exclude clash, unreachable worldline requires, multi-branch worldline endings per story. Tests `authoringValidation.test.ts` + registry `errorCount === 0`. Docs: briefing, README, `story_registry.md`.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — World consequence depth (first pass)

**Summary:** `PersistedProfile.worldlineBranches`, `worldConsequenceMarks`, `closedHistoryMarks`; `EndingDefinition` world consequence fields merged in `worldConsequences.ts` via `applyResolvedEndingToProfile`; `StoryDefinition` gate fields read in `evaluateStorySurfacing` only. Proof stories `world_consequence_lab`, `wc_follow_soft`, `wc_follow_hard`. Tests `worldConsequences.test.ts`. Storage + fixtures defaults. Docs: briefing, README, `world_echoes.md`, `unlock_matrix.md`, `story_registry.md`.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Continuation / variant routing (first pass)

**Summary:** `continuationRouting.ts` — index by `continuationOf`, `evaluateFollowUpsForAnchor`, `summarizeVariantGroup`, browse filters; all surfacing via `evaluateStorySurfacing`. Options `{ allStories }` on `evaluateStorySurfacing` / `getStoryBrowseState`; `playerFacing.continuationHint` from `playerContinuationHint` or `resolveContinuationPresentationHint`. UI: select/intro; store passes `storyRegistry`. Tests: `continuationRouting.test.ts`. Docs: briefing, README, `story_registry.md`.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Belief / inference runtime layer (first pass)

**Summary:** Optional `StoryDefinition.belief` + `StoryRuntimeState.belief` (`variables` / `flags`); condition targets `belief.variables.*`, `belief.flags.*` in `resolveTarget`; consequences `setBeliefVariable`, `incrementBeliefVariable`, `setBeliefFlag` in `applyConsequences`; `mergeRuntimePatch` deep-merges partial `belief` via `StoryRuntimePatch`. Proof story `belief_inference_lab` (hidden alibi true, belief trust false until choice updates belief). Tests: `beliefLayer.test.ts`. Docs: `CHATGPT_CODEBASE_BRIEFING.md` §6, README conditions/consequences, `latest_report.md`.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Story concept: Gyre (mythic recurrence)

**Summary:** Added `docs/planning/story_concepts/gyre_mythic_recurrence.md` — stayed-behind self / recurrence wound; retired “Loop” naming for **Gyre**; emotional core (leaver may truly love; Gyre may be unable to believe); interpretations, personality variants (Devoted, Yearning, Resentful, Numb), six outcome families + **Claimed Inheritance** / **wrong one returned** follow-up; `hidden` vs `belief` vs visible; hooks, echo/flag/unlock ids, 12 titles. Registry: `gyre_mythic_anchor` placeholder + concept archive link; `eras_and_scales.md`: cross-era myth seed note.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Story concept: Mara Verge / Verge clan

**Summary:** Added `docs/planning/story_concepts/verge_clan_mara_verge.md` — core premise, four branch outcomes (untranslated death, survival w/o evolution, passing of fire, incomplete transfer), aftershock module hooks, echo/worldFlag/unlock id ideas, continuation & surfacing patterns, themes, titles (**The Last True Verge**). `story_registry.md`: concept link + placeholder row `verge_clan_mara`. Planning only.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Branch scope doctrine (planning)

**Summary:** Added `docs/planning/branch_scope_doctrine.md` — anti-sprawl rules, sequel eligibility, branch budgets (4–6 endings, 0–2 direct continuations, 0–3 aftershocks), tier table (continuation / aftershock / witness / echo / variant), module justification tags, Gyre + Verge clan examples, approval checklist. Updated `design_doctrine.md` (scope law #6, related doc link), `backlog.md` (doctrine link, maintenance note; belief + Vitest rows marked done).

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Vitest: resolveChoice + resolveEnding

**Summary:** `choiceResolver.test.ts`, `endingResolver.test.ts`; extended `fixtures.ts` with `profileSnapshot`, `progressionStory`. Covers progression, terminal, personality appends, world-flag partitioning, pressured append + meta, stubbed `beforeChoiceResolve` / `afterChoiceResolve`, `getVisibleChoices` + profile snapshot; ending priority, no match, profile ending conditions, stubbed `beforeEndingResolve` (delta + evaluationState). Docs: briefing, README blurb, `latest_report.md`.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Vitest engine test suite (first pass)

**Summary:** Vitest 3 + `vitest.config.ts` (Node); `npm run test` / `test:watch`. Tests in `src/engine/__tests__/` for `evaluateStorySurfacing`, `conditionEvaluator`, `profileOutcomes`, `flushPressuredPendingSignals`, `resolvePlayNarration` (+ shared `fixtures.ts`). Docs: README, `CHATGPT_CODEBASE_BRIEFING.md`. Not covered: `resolveChoice`, `resolveEnding`, store/UI.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Play narration layer (pressured / forced / arrival)

**Summary:** `StoryDefinition.pressuredNarration` + Zod; `resolvePlayNarration`, `stripEphemeralNarrationTransport`, `engineMeta.playNarration.hookPostChoiceLines` from `AfterChoiceResolveResult.postChoiceNarrationLines`. Store `playNarrationFrame` after each play choice; `PlayNarrationBanner` on `StoryPlayPage`. Proof: `pressured_narration_lab` (forced tier + forced follow-up copy). `getVisibleChoices` now passes `profileSnapshot` into `evaluateConditions`. Updated `CHATGPT_CODEBASE_BRIEFING.md`.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Profile-aware runtime conditions

**Summary:** `RuntimeProfileSnapshot` + `toRuntimeProfileSnapshot`; `resolveTarget` / `evaluateConditions` accept optional snapshot; `profile.worldFlags.*`, `profile.globalEchoes`, `profile.completedEndings.<storyId>`, `profile.unlockedModuleIds`. Store passes snapshot into `getVisibleChoices`, `resolveEnding`, and terminal detection. Paladin `memory_of_faithful_blade` choice demo (replay after `faithful_blade`). Updated `CHATGPT_CODEBASE_BRIEFING.md`.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — World flags + ending unlock writes

**Summary:** `EndingDefinition.worldFlags` and `unlocks` persist to `profile.worldFlags` and `unlockedModuleIds`; new consequence `setWorldFlag` merges on choice resolve. `applyResolvedEndingToProfile` centralizes ending-driven profile updates. `requiresUnlockedModuleIds` + gate reason `missing_unlocked_module`. Paladin endings each set a `highstone_*` world flag. Storage initializes `unlockedModuleIds`.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Story surfacing / presentation states

**Summary:** Introduced `StorySurfacingState` and `evaluateStorySurfacing()` with `playerFacing` copy, `isListed` vs `appearsInBrowse`, and optional `sequencing` for continuations/variants. Extended `StoryDefinition` with `preDiscoverySurfacing`, rumor/teaser/secret list fields, `continuationOf`, `variantGroup`, `variantId`. Split `getStoryPlayerPresentation` into `storyPlayerCopy.ts` to avoid circular imports. Browse page: rumor + teaser sections + main list; intro routes by surfacing state. `evaluateStoryAvailability` kept as legacy mapping.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Canonical story gate evaluator + profile worldFlags

**Summary:** Added `evaluateStoryAvailability` in `src/engine/storyGateEvaluation.ts` (mutex, requires/excludes echoes & flags, `requiresEndings`, `lockedUntilEchoes`). Extended `StoryDefinition` + Zod with gate fields; `PersistedProfile.worldFlags` + storage/init. `getStoryBrowseState` delegates to evaluator; `startStory` unchanged aside from profile shape. Updated `docs/planning/backlog.md`.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Eras, scales, registry taxonomy + optional story metadata

**Summary:** Added **`docs/planning/eras_and_scales.md`** (era buckets, personal/world/mythic echo scales, template/echo/influence notes). Expanded **`story_registry.md`**, **`module_templates.md`** (seven templates), **`world_echoes.md`** (echo levels + examples), **`backlog.md`** (P0–P3 engine-first). Linked new doc from **`design_doctrine.md`**, **`roadmap.md`**, **`README.md`**. **Code:** optional `StoryDefinition.era`, `moduleTemplate`, `authoringAvailability` + Zod; Paladin Promise seeded. No engine behavior change.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Player-facing story shell (no storyClass in UI)

**Summary:** Extended `StoryDefinition` with optional player-facing fields and `StoryUnlockCategory`; added `src/engine/storyPresentation.ts` (`getStoryPlayerPresentation`, `getStoryBrowseState`). Story select, intro, and header use presentation + browse state; internal `storyClass` is not rendered in player TSX. Paladin Promise seeded with immersive copy. `startStory` enforces list/unlocked gates and returns `boolean`. Updated `docs/planning/backlog.md` (presentation row → done). Build and lint clean.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Design doctrine + planning alignment

**Summary:** Added `docs/planning/design_doctrine.md` (vision, internal vs player-facing language, scope laws, unlock + permanence doctrine, module templates, possessed clarification, examples). Updated `roadmap.md`, `backlog.md`, `story_registry.md`, `unlock_matrix.md`, `module_templates.md`, `world_echoes.md` for alignment. README links to doctrine first. No code changes.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Planning / documentation layer (`docs/planning/`)

**Summary:** Added `roadmap.md`, `backlog.md` (P0–P3), `story_registry.md`, `unlock_matrix.md`, `world_echoes.md`, `module_templates.md` with seeded content aligned to the current engine and Paladin Promise. Updated `latest_report.md`. Linked `docs/planning/` from `README.md`. No application code changes.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Hidden truth layer + possessed semantics

**Summary:** Added `story.hiddenTruth` / `runtime.hiddenTruth`, `hidden.variables.*` and `hidden.flags.*` condition targets, and hidden consequence types (`setHiddenVariable`, `incrementHiddenVariable`, `setHiddenFlag`). Updated `mergeRuntimePatch` and `createInitialRuntime`. Expanded `possessed` story-class documentation (handler still placeholder). Paladin and pressured behavior unchanged.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Pending signal consumption + forced follow-up

**Summary:** Added `flushPressuredPendingSignals()`, a registry (`forced_followup_scene`, `pre_scene_consequence`) with `registerPendingSignalHandler()`, and structured `engineMeta.pressured` fields `consumedHistory` + `followUp`. Store flushes after each pressured choice (before ending check) and on continue. Stable/Paladin unchanged.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Pressured story-class config + engineMeta audit

**Summary:** Replaced the empty `pressured` handler with config-driven behavior: `StoryDefinition.pressuredConfig` + `evaluatePressuredSnapshot()` for tiered numeric variables, choice hide/disable/relabel/annotate, appended consequences, `engineMeta.pressured.lastResolution` (`normal` | `strained` | `mutated` | `forced`), and `pending` signals. Added Zod validation and engine helpers under `src/engine/pressured/`. Stable / Paladin Promise unchanged.

**Reports:** `docs/cursor_reports/latest_report.md`

---

## 2026-04-23 — Story-class hooks + personality appends

**Summary:** Added `StoryClassHandler` hook points (`beforeChoiceVisible`, `beforeChoiceResolve`, `afterChoiceResolve`, `beforeEndingResolve`), registry + pass-through `stable` handler and empty placeholders for `pressured`, `distorted`, `possessed`, `witness`. Integrated hooks into `choiceResolver` and `endingResolver`. Introduced `personalityAppendConsequences` on choices and `engineMeta` on runtime; expanded Paladin Promise scenes with per-personality appends. Updated store/play page/choice list for new APIs. Added `docs/cursor_reports/latest_report.md` (full detail).

**Reports:** `docs/cursor_reports/latest_report.md`
