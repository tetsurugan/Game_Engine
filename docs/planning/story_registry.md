# Story & module registry

**Doctrine:** [`design_doctrine.md`](design_doctrine.md). **Personality / anchors / relational variants:** [`personality_continuity_doctrine.md`](personality_continuity_doctrine.md). **Private judgments (event → access → verdict → tendency):** [`relational_verdicts_doctrine.md`](relational_verdicts_doctrine.md). **Cross-world / cross-era inheritance:** [`world_connection_doctrine.md`](world_connection_doctrine.md). **Story class** is **internal (engine only)**—never the primary player-facing label. **Era** and **template** organize the **anthology**; see [`eras_and_scales.md`](eras_and_scales.md).

**Concept archive:** [`story_concepts/verge_clan_mara_verge.md`](story_concepts/verge_clan_mara_verge.md) (**Mara Verge** / full clan saga — planning); **shipped proof stub:** `verge_mara_anchor`. [`story_concepts/gyre_mythic_recurrence.md`](story_concepts/gyre_mythic_recurrence.md) (**Gyre**). [`story_concepts/rumor_girl_future_locked_prequel.md`](story_concepts/rumor_girl_future_locked_prequel.md) — **future-locked prequel** to **`rumor_girl`** (planning only).

Canonical list of modules. Update when adding/removing entries, changing **gates**, **dependencies**, or **player copy**.

---

## Column legend

| Column | Purpose |
|--------|---------|
| **Module id** | `StoryDefinition.id` in code (`src/stories/`) |
| **Working title** | Authoring / menu alignment (`playerTitle` or `title`) |
| **Era** | Planning bucket from [`eras_and_scales.md`](eras_and_scales.md) |
| **Story class** | Internal: `stable` \| `pressured` \| `distorted` \| `possessed` \| `witness` |
| **Module template** | Interaction shape — [`module_templates.md`](module_templates.md) |
| **Status** | `shipped` \| `in_dev` \| `concept` (authoring; browse still uses unlock rules) |
| **Unlock category** | `open` \| `outcome_gated` \| `world_gated` \| `role_gated` \| `secret` \| `mutually_exclusive` |
| **Depends on** | Echoes, endings, or modules that **gate** appearance or start (design intent) |
| **Unlocks / closes** | What becomes available or **mutex**-removed after play |
| **Main echo scale** | Dominant **reach** of emitted memory — [`eras_and_scales.md`](eras_and_scales.md) scales |

---

## Registry table

| Module id | Working title | Era | Story class | Module template | Status | Unlock category | Depends on | Unlocks / closes (design) | Main echo scale |
|-----------|---------------|-----|-------------|-----------------|--------|-----------------|------------|---------------------------|-----------------|
| `paladin_promise` | Paladin Promise | Medieval / holy / arena / curse | `stable` | narrative | **shipped** | open | — | Multiple endings; **`worldlineCommit`** on `paladin_aftermath`; **proof cluster shipped** (order/mercy, two witnesses, secret dark) — **no further Paladin modules planned for this pass** | personal → hard |
| `paladin_proof_order_echo` | The Sanctioned Road | Medieval / holy / arena / curse | `stable` | narrative | **shipped** | outcome_gated | Paladin **faithful_blade** + worldline `order_sanctioned` | Tiny aftermath proof; **mutex** with mercy proof | personal → hard |
| `paladin_proof_mercy_echo` | The Hand They Remember | Medieval / holy / arena / curse | `stable` | narrative | **shipped** | outcome_gated | Paladin **shield_of_the_weak** + worldline `mercy_remembered` | Tiny aftermath proof; **mutex** with order proof | personal → hard |
| `paladin_witness_peace_lies` | The Peace We Did Not Believe | Medieval / holy / arena / curse | `stable` | narrative | **shipped** | outcome_gated | Paladin **`tarnished_oath`** + `peace_by_lies` + mark **`paladin_compromised_by_lies`** | **Witness** — quiet compromise / records (clerk POV); rumor pre-discovery | personal → hard |
| `paladin_witness_broken_saint` | The Light That Left All at Once | Medieval / holy / arena / curse | `stable` | narrative | **shipped** | outcome_gated | Paladin **`broken_saint`** + `oath_fracture` + mark **`paladin_fracture_catchall`** | **Witness** — public fracture / damaged belief (acolyte POV); **`fracture_bleak_*`** excluded via mark; rumor pre-discovery | personal → hard |
| `paladin_what_walks_after_oath` | What Walks After the Oath | Medieval / holy / arena / curse | `stable` | narrative | **shipped** | secret | Paladin **`dark_mirror_*`** unlock + worldline + continuity mark | Single-scene **proof** continuation; not for every fracture | hard |
| `dark_paladin_followup` | The Oath That Broke *(working)* | Medieval / holy / arena / curse | `pressured` or `possessed` | narrative | concept | outcome_gated | TBD — full-length dark arc beyond **`paladin_what_walks_after_oath`** proof | Hypothetical expanded sequel / tournament pressure; **not** the secret shelf row | hard / mythic |
| `rumor_girl` | Rumor Girl | Modern / media fracture | `stable` | narrative | **shipped** | open | — | **Modern obsession proof:** rumor / cheating / interpretation; **`hidden`** objective cheat + accountable break + words not mockery; **`belief`** `refused_healthier_exit`, `she_hears_cruel_theater`; **`suspicion` / `humiliation`**; **four personalities**; **seven grounded endings** + **buried shock** (orbit/anchor + refused exit + `suspicion`≥6); echoes + marks + witness / belief-gap flags — **aftermath consumer:** **`court_aftermath`** | personal → hard |
| `rumor_girl_future_locked_prequel` | *(working title TBD)* — companion romance chapter | Modern | `stable` | narrative | concept | outcome_gated | **`rumor_girl_proof_resolved`** (+ bucket mapping per concept doc) | **Future-locked prequel:** POV girl helps shy best friend pursue crush (later **`rumor_girl`** dyad); **retroactive closure** — RG picks **closure family**, prequel picks **flavor** — [`story_concepts/rumor_girl_future_locked_prequel.md`](story_concepts/rumor_girl_future_locked_prequel.md) | personal |
| `berserker_curse` | Berserker Mark *(working)* | Medieval / curse | `possessed` | survival_instinct | concept | role_gated or outcome_gated | Optional prior **feral** or order-collapse echoes | Alters duel / healing / witness modules; territory **world** echoes | world / hard |
| `boxer_tournament` | Crown of the Ring *(working)* | Modern / arena | `stable` or `pressured` | duel_tournament | concept | world_gated | Optional `underground_fighting_banned` **false** path | Emits champion / injury echoes; variant intros | world |
| `underground_fight_club` | Pits Below *(working)* | Modern / fractured | `pressured` | duel_tournament | concept | secret or outcome_gated | Lack of ban / corruption echoes | May emit `underground_fighting_banned` or `dark_champion_exists`; **mutex** with clean sports arc | world / hard |
| `court_aftermath` | The Morning After Verdict | Modern / media fracture | `witness` | witness_interpretation | **shipped** | outcome_gated | Mark **`rumor_girl_proof_resolved`** + **any** of **`rumor_girl_witness_aftermath_invited`** \| **`rumor_girl_belief_gap_soft`** (`requiresAnyFlags`) | **Small record/witness proof** after **`rumor_girl`** — friend POV; hidden vs record vs **relational verdict**; echo **`rumor_girl_court_aftermath_logged`**; mark **`rumor_girl_court_aftermath_touched`** — [`court_aftermath/story.ts`](../../src/stories/court_aftermath/story.ts) | personal → world |
| `verge_mara_anchor` | The Living Rulebook | Near-future / clan network | `stable` | narrative | **shipped** | open | — | **First Verge proof:** cousin POV; Mara as **living rulebook**; `hidden` `mara_intended_brake_not_anoint` vs `belief` `heard_anointment`; **`room_heat`**; endings **`verge_proof_orbit_misread`** / **`verge_proof_line_held`**; echoes **`verge_proof_*`**; mark **`verge_mara_anchor_touched`**. Not full succession saga — [`story_concepts/verge_clan_mara_verge.md`](story_concepts/verge_clan_mara_verge.md) | personal → world |
| `verge_clan_mara` | The Last True Verge *(concept)* | Modern / near-future | `pressured` or `stable` | narrative | concept | open or outcome_gated | — | Full Mara / clan arc placeholder; branch families + aftershocks in concept doc; **playable proof** is **`verge_mara_anchor`** | personal → world |
| `ai_psychosis_fragment` | Static Saint *(working)* | Modern / AI | `distorted` | distorted_perception | concept | outcome_gated | Optional media / mental-health echo stack | **Mythic-leaning** if “awakening” treated as civilizational; else personal | personal → mythic |
| `alien_observer` | The Archive Opens *(working)* | Far future / observer | `witness` | observer_documentary | concept | secret | Mythic **observer** gate (design TBD) | Locks or reveals **branch families**; meta-library framing | mythic |
| `gyre_mythic_anchor` | The One the Path Took | BC mythic + cross-era echoes | `stable` | narrative | **shipped** | open | — | **Gyre proof:** **visitor / current-loop** POV; four emotional endings / `gyre_echo_*`; **`gyre_mythic_anchor_touched`**. **Aftermath planning:** Survivor vs Replacement — [`story_concepts/gyre_aftermath_families.md`](story_concepts/gyre_aftermath_families.md). Emotional core: [`gyre_mythic_recurrence.md`](story_concepts/gyre_mythic_recurrence.md) | mythic |
| `gyre_witness_survivor_aftermath` | The Name Still Fits Wrong | BC mythic + cross-era echoes | `stable` | narrative | **shipped** | outcome_gated | Mark **`gyre_mythic_anchor_touched`** | **Survivor-family** witness slice only: **companion POV** after the threshold; damaged survival, not substitution. Rumor before gate; echo **`gyre_survivor_fracture_witnessed`**. Variant group **`gyre_survivor_aftermath`** / **`companion_witness`**. **Not** Replacement line — [`story_concepts/gyre_aftermath_families.md`](story_concepts/gyre_aftermath_families.md) | personal → mythic |
| `god_war_branch` | When Heaven Chose Sides *(working)* | BC / mythic | `pressured` or `witness` | narrative | concept | mutually_exclusive | Prior holy-order or mythic priming (TBD) | **Closes** some medieval “clean church” paths; opens apocrypha modules | mythic |
| `world_consequence_lab` | Worldline lab | Side / misc | `stable` | narrative | **in_dev** | open | — | **`wc_demo_mutex`** worldline + `wc_lab_terminal_echo`; demo **`closeHistoryMarks`** | — |
| `wc_follow_soft` | Soft follow-up *(lab)* | Side / misc | `stable` | narrative | **in_dev** | outcome_gated | Echo + righteous worldline; not **`wc_soft_followup_invitable`** closed | Mutex when lab ends ruthless (**`blockedWhenHistoryClosed`**) | — |
| `wc_follow_hard` | Hard follow-up *(lab)* | Side / misc | `stable` | narrative | **in_dev** | outcome_gated | Echo + fallen worldline | — | — |
| `belief_inference_lab` | Belief / inference lab | Side / misc | `stable` | narrative | **in_dev** | open | — | Proves **`belief`** vs **`hiddenTruth`** | — |
| `pressured_narration_lab` | Pressured narration lab | Side / misc | `pressured` | narrative | **in_dev** | open | — | Forced follow-up + narration banners | — |
| `slice_of_life_example` | Small Hours *(working)* | Side / slice-of-life | `stable` | slice_of_life_social | concept | open | — | Optional **personal** keys only; may soft-gate easter-egg intros | personal |

*Templates in code use snake_case ids:* `narrative`, `duel_tournament`, `survival_instinct`, `witness_interpretation`, `distorted_perception`, `observer_documentary`, `slice_of_life_social` — see `StoryModuleTemplateId` in `src/engine/types.ts`.

---

## Deprecated / merged naming

Older planning rows may have used ids like `paladin_fallen_knight`, `rumor_chain`, `underground_trial`, `feral_border`. When implementing, **prefer the ids in the table above** or alias in code comments so the registry stays single-source.

---

## Player-facing copy in code

The shell uses **`getStoryPlayerPresentation`** (`src/engine/storyPresentation.ts`):

| Field | Purpose |
|-------|---------|
| `playerTitle` | Menu / header (falls back to `title`) |
| `playerSummary` | Blurb (falls back to `description`) |
| `playerRoleHint` | Framing (falls back to `playerRole`) |
| `playerToneHint` | Eyebrow / mood |
| `playerUnlockHint` | When **listed but locked** |

**Browse visibility:** `evaluateStorySurfacing(story, profile, { allStories? })` (via `getStoryBrowseState`) — gate metadata, `preDiscoverySurfacing` (`hidden` / `rumor` / `teaser`), `listPresentationStyle` (`standard` / `secret`), `lockedUntilEchoes`. **`unlockCategory`** is planning / analytics, not a player taxonomy string.

**Continuation / variant routing (engine):** `src/engine/continuationRouting.ts` indexes **`continuationOf`** and groups **`variantGroup`**; surfacing tiers still come from **`evaluateStorySurfacing`** only. Optional **`playerContinuationHint`** or synthesized “Continues from …” appears in **`playerFacing.continuationHint`** when the full registry is passed. Doctrine: not every row in this table implies a direct sequel — see [`branch_scope_doctrine.md`](branch_scope_doctrine.md). When documenting **Depends on**, name the **connection mode** (myth, witness, consequence, etc.) where helpful — see [`world_connection_doctrine.md`](world_connection_doctrine.md).

**World consequence depth (engine):** `src/engine/worldConsequences.ts` merges **`worldlineCommit`**, **`worldConsequenceMarks`**, **`closeHistoryMarks`** from endings into **`PersistedProfile`**. Gates on **`StoryDefinition`** (`requiresWorldlineBranch`, `excludesWorldlineBranches`, mark requires/excludes, **`blockedWhenHistoryClosed`**) are evaluated only in **`evaluateStorySurfacing`**. Complements **`worldFlags`**; does not replace them.

**Optional authoring metadata:** `era`, `moduleTemplate`, `authoringAvailability` on `StoryDefinition` — parity with this table; **not** shown as raw enums in primary UI.

---

## Adding a row

1. If the module **inherits** from another era or anchor, skim **[`world_connection_doctrine.md`](world_connection_doctrine.md)** — state **what survived**, **who remembers**, **what changed**, and the **connection level** (echo-only vs civilizational).
2. Add story under `src/stories/<id>/` and register in `src/stories/index.ts`.
3. Run **`validateStoryRegistryAuthoring(storyRegistry)`** (`src/engine/authoringValidation.ts`) in tests or a script to catch continuation / variant / surfacing / worldline mistakes early.
4. Set **`era`**, **`moduleTemplate`**, **`authoringAvailability`**, **`unlockCategory`** on the definition when known.
5. Update **`unlock_matrix.md`** if gates or mutex change.
6. New echoes → **`world_echoes.md`** with **scale** + permanence tier.
7. Confirm **Story Select** does not surface **`storyClass`** as a label.

## Mutual exclusivity

Document **closes** / **excludes** in **Unlocks / closes** and detail in **`unlock_matrix.md`**.
