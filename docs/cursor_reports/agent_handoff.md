# Agent handoff — operational snapshot

Quick handoff for a fresh ChatGPT thread or Cursor agent. **Not** full design doctrine.

**Maintain this file** at the end of each meaningful work block (not every tiny edit). Pair with: **`latest_report.md`** = what just changed · **`change_log.md`** = history · **this file** = what matters *right now*.

---

## Current phase

- **Current phase:** Paladin **closed** · **Gyre** anchor + Survivor witness · **Verge** **`verge_mara_anchor`** · **Modern** **`rumor_girl`** + **`court_aftermath`** record proof. Gyre **Replacement** still **unopened**.
- **Current date of last update:** 2026-04-21
- **Updated by:** Cursor agent (`court_aftermath` + `requiresAnyFlags`)

---

## Current state in one paragraph

**Paladin** complete. **Gyre** + Survivor witness. **Verge** **`verge_mara_anchor`**. **Modern** **`rumor_girl`** + **`court_aftermath`** (friend POV, `requiresAnyFlags` gate on witness **or** belief-gap). **UI:** responsive / mobile-ready + light **PWA** manifest. **Planning:** **future-locked prequel** — [`story_concepts/rumor_girl_future_locked_prequel.md`](../planning/story_concepts/rumor_girl_future_locked_prequel.md) (not shipped).

---

## Current top priorities

Next **3** only:

1. **Verge** aftershock (or tiny **Rumor** variant) — **one** slice gated on **`verge_mara_anchor_touched`** / **`verge_proof_*`**; **`court_aftermath`** is **shipped**.
2. **Gyre** variants / **Replacement** still disciplined — not both at saga scale.
3. **Registry honesty** — concept vs shipped; **`validateStoryRegistryAuthoring`** on registry edits.

---

## Active anchor / focus

- **Primary focus:** One **Verge** aftershock or disciplined **Gyre** variant — **`court_aftermath`** + **`verge_mara_anchor`** proofs **shipped**; no succession saga.
- **Secondary focus:** Gyre **Replacement** still deferred; Gyre **variants** only if needed.
- **Tertiary focus:** Handoff + **`latest_report`** after each block.

---

## Do not expand right now

- **No new Paladin modules** this phase.
- **No full Verge succession tree** or **full Gyre saga** — proofs and slices only.
- **No** duplicate engine layers.

---

## Most relevant source-of-truth files

### Always read

- [`docs/CHATGPT_CODEBASE_BRIEFING.md`](../CHATGPT_CODEBASE_BRIEFING.md)
- [`docs/cursor_reports/latest_report.md`](latest_report.md)
- [`docs/cursor_reports/change_log.md`](change_log.md)

### Then read for this phase

- [`src/stories/verge_mara_anchor/story.ts`](../../src/stories/verge_mara_anchor/story.ts)
- [`src/stories/rumor_girl/story.ts`](../../src/stories/rumor_girl/story.ts)
- [`src/stories/court_aftermath/story.ts`](../../src/stories/court_aftermath/story.ts)
- [`docs/planning/story_concepts/verge_clan_mara_verge.md`](../planning/story_concepts/verge_clan_mara_verge.md)
- [`src/stories/gyre_mythic_anchor/story.ts`](../../src/stories/gyre_mythic_anchor/story.ts)
- [`docs/planning/branch_scope_doctrine.md`](../planning/branch_scope_doctrine.md)
- [`docs/planning/personality_continuity_doctrine.md`](../planning/personality_continuity_doctrine.md)
- [`docs/planning/relational_verdicts_doctrine.md`](../planning/relational_verdicts_doctrine.md)

---

## Relevant planning docs for this phase

- [`design_doctrine.md`](../planning/design_doctrine.md), [`personality_continuity_doctrine.md`](../planning/personality_continuity_doctrine.md), [`relational_verdicts_doctrine.md`](../planning/relational_verdicts_doctrine.md), [`branch_scope_doctrine.md`](../planning/branch_scope_doctrine.md), [`world_connection_doctrine.md`](../planning/world_connection_doctrine.md), [`story_registry.md`](../planning/story_registry.md), [`world_echoes.md`](../planning/world_echoes.md), [`backlog.md`](../planning/backlog.md)

**Prioritize:** [`branch_scope_doctrine.md`](../planning/branch_scope_doctrine.md) · [`personality_continuity_doctrine.md`](../planning/personality_continuity_doctrine.md) · [`relational_verdicts_doctrine.md`](../planning/relational_verdicts_doctrine.md) · [`story_registry.md`](../planning/story_registry.md) · [`verge_clan_mara_verge.md`](../planning/story_concepts/verge_clan_mara_verge.md)

---

## Latest meaningful completed work

- **`court_aftermath`** — Rumor Girl record proof; **`requiresAnyFlags`** gate; **`courtAftermath.test.ts`**.
- **`relational_verdicts_doctrine.md`** — private judgments (event / access / verdict / tendency); **design** law 9 + registry + branch_scope.
- **`personality_continuity_doctrine.md`** — player lanes, fixed anchors, relational variants; linked from **design** / **branch_scope** / **registry**.
- **Browser + mobile readiness** — `page-shell` / safe-area / touch targets; Profile **world flags** + **marks** when present; **`manifest.webmanifest`**.
- **`verge_mara_anchor`** — verified; **`vergeMaraAnchor.test.ts`**; **`rumor_girl`** — modern obsession + shock seed.
- **`gyre_mythic_anchor`** + **`gyre_witness_survivor_aftermath`** — unchanged this task.
- **Paladin cluster** — complete.

---

## Current next task

**Verge** echo/witness slice or **Rumor** future-locked prequel (scoped) — cap **`branch_scope`**.

---

## Why this task matters

**Rumor Girl** proves **ordinary modern** drama (obsession, rumor, interpretation) on the same engine as myth and clan gravity; **court seeds** keep modular doctrine intact.

---

## Constraints for the next task

- **Small** proof or slice; reuse surfacing, gates, echoes, marks.
- **`validateStoryRegistryAuthoring`** on registry edits.

---

## Risks / watchouts

- **Sprawl:** every **`verge_proof_*`** or **`rumor_girl_*`** echo does **not** earn its own sequel row by default.
- **Canon:** Mara **death / successor** tracks stay **planning** until a module **commits** a branch.

---

## Paste recipes (Cursor / ChatGPT)

**Ultra-short status:** Paladin ✓ · Gyre ✓ · Verge ✓ · **`rumor_girl`** ✓ · next = court/witness consumer or Verge aftershock, one slice.

**Read order:** briefing → **`latest_report`** → **`rumor_girl/story.ts`** → [`rumor_girl_future_locked_prequel.md`](../planning/story_concepts/rumor_girl_future_locked_prequel.md) (concept) → registry.

---

## Profile hooks (quick)

- **`verge_mara_anchor_touched`**, **`verge_proof_*`** — Verge proof.
- **`rumor_girl_proof_resolved`**, **`rumor_girl_fatal_aftermath_seeded`**, **`rumor_girl_court_seed_stack`** (echo), **`rumor_girl_witness_aftermath_invited`** (flag) — Rumor Girl.
- **`gyre_mythic_anchor_touched`**, **`gyre_echo_*`**, **`gyre_survivor_fracture_witnessed`** — Gyre anchor + Survivor witness.
- **Paladin** — worldlines + marks per registry / **`world_echoes.md`** (cluster complete).
