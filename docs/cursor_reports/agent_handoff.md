# Agent handoff — operational snapshot

Quick handoff for a fresh ChatGPT thread or Cursor agent. **Not** full design doctrine.

**Maintain this file** at the end of each meaningful work block (not every tiny edit). Pair with: **`latest_report.md`** = what just changed · **`change_log.md`** = history · **this file** = what matters *right now*.

---

## Current phase

- **Current phase:** **MVP 0.1 freeze** — finish/polish/ship per **[`mvp_freeze_checklist.md`](../planning/mvp_freeze_checklist.md)** · Paladin cluster · **Gyre** anchor + Survivor aftermath · **Verge** **`verge_mara_anchor`** · **`rumor_girl`** + **`court_aftermath`**. **No new lanes** until checklist release bar met.
- **Current date of last update:** 2026-04-21
- **Updated by:** Cursor agent (browser + mobile MVP readiness pass)

---

## Current state in one paragraph

**Paladin** complete. **Gyre** + Survivor witness. **Verge** **`verge_mara_anchor`**. **Modern** **`rumor_girl`** + **`court_aftermath`** (friend POV; unified OR gate on witness flag, belief-gap flag, or fatal mark). **UI:** responsive / mobile-ready + light **PWA** manifest. **MVP:** **[`mvp_freeze_checklist.md`](../planning/mvp_freeze_checklist.md)** is the **hard 0.1 boundary**. **Planning:** **future-locked prequel** — [`story_concepts/rumor_girl_future_locked_prequel.md`](../planning/story_concepts/rumor_girl_future_locked_prequel.md) (**frozen** for 0.1).

---

## Current top priorities

Next **3** only (**MVP 0.1** — polish/ship, not new lanes per **[`mvp_freeze_checklist.md`](../planning/mvp_freeze_checklist.md)**):

1. **Release bar:** pass checklist **§1.4** (build / test / lint / authoring validation) and **§3** (shelf, copy, mobile sanity).
2. **Registry + shelf honesty:** no ghost shipped promises; rumors/teasers/continuations curated for **§1.1** modules only.
3. **Blocker-only fixes:** engine/UI fixes that unblock **§1.1** play — **not** new modules, **not** Replacement/Verge tree/prequel (**§2** frozen).

---

## Active anchor / focus

- **Primary focus:** **MVP 0.1 ship readiness** — [`mvp_freeze_checklist.md`](../planning/mvp_freeze_checklist.md).
- **Secondary focus:** Copy/polish on **frozen** content set; profile/surfacing edge cases.
- **Tertiary focus:** Handoff + **`latest_report`** after each block.

---

## Do not expand right now

- **See [`mvp_freeze_checklist.md`](../planning/mvp_freeze_checklist.md) §2** — Replacement line, Verge tree, prequel implementation, new anchors, full witness handler, etc.
- **No new Paladin modules** for 0.1.
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

**Prioritize:** **[`mvp_freeze_checklist.md`](../planning/mvp_freeze_checklist.md)** (0.1 boundary) · [`branch_scope_doctrine.md`](../planning/branch_scope_doctrine.md) · [`story_registry.md`](../planning/story_registry.md)

---

## Latest meaningful completed work

- **Browser + mobile MVP readiness** — primary pages + shared components + `index.css` + `index.html` Apple web-app meta; **no** new lanes.
- **`court_aftermath`** — Rumor Girl record proof; **`requiresAnyFlags`** + **`requiresAnyWorldConsequenceMarks`** OR group; **`missing_any_profile_or`**; **`courtAftermath.test.ts`**.
- **`relational_verdicts_doctrine.md`** — private judgments (event / access / verdict / tendency); **design** law 9 + registry + branch_scope.
- **`personality_continuity_doctrine.md`** — player lanes, fixed anchors, relational variants; linked from **design** / **branch_scope** / **registry**.
- **Browser + mobile readiness** — `page-shell` / safe-area / touch targets; Profile **world flags** + **marks** when present; **`manifest.webmanifest`**.
- **`verge_mara_anchor`** — verified; **`vergeMaraAnchor.test.ts`**; **`rumor_girl`** — modern obsession + shock seed.
- **`gyre_mythic_anchor`** + **`gyre_witness_survivor_aftermath`** — unchanged this task.
- **Paladin cluster** — complete.

---

## Current next task

**MVP 0.1:** work through **[`mvp_freeze_checklist.md`](../planning/mvp_freeze_checklist.md)** (checklists §1–§3); defer **§2** items to post-0.1.

---

## Why this task matters

**Scope drift** is the main risk pre-0.1. The freeze checklist makes the **anthology slice** and **release bar** explicit so work stays on **ship**, not **new lanes**.

---

## Constraints for the next task

- **`mvp_freeze_checklist.md` §4** — no new lanes unless **unblocker**; prefer polish/registry/shelf.
- **`validateStoryRegistryAuthoring`** on registry edits.

---

## Risks / watchouts

- **Sprawl:** every **`verge_proof_*`** or **`rumor_girl_*`** echo does **not** earn its own sequel row by default.
- **Canon:** Mara **death / successor** tracks stay **planning** until a module **commits** a branch.

---

## Paste recipes (Cursor / ChatGPT)

**Ultra-short status:** MVP **0.1 freeze** active — **[`mvp_freeze_checklist.md`](../planning/mvp_freeze_checklist.md)** · anthology slice complete · next = **polish + release bar**, not new lanes.

**Read order:** briefing → **`latest_report`** → **`rumor_girl/story.ts`** → [`rumor_girl_future_locked_prequel.md`](../planning/story_concepts/rumor_girl_future_locked_prequel.md) (concept) → registry.

---

## Profile hooks (quick)

- **`verge_mara_anchor_touched`**, **`verge_proof_*`** — Verge proof.
- **`rumor_girl_proof_resolved`**, **`rumor_girl_fatal_aftermath_seeded`**, **`rumor_girl_court_seed_stack`** (echo), **`rumor_girl_witness_aftermath_invited`** (flag) — Rumor Girl.
- **`gyre_mythic_anchor_touched`**, **`gyre_echo_*`**, **`gyre_survivor_fracture_witnessed`** — Gyre anchor + Survivor witness.
- **Paladin** — worldlines + marks per registry / **`world_echoes.md`** (cluster complete).
