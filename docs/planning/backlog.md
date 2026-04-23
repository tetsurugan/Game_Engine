# Backlog — prioritized tasks

**Doctrine:** [`design_doctrine.md`](design_doctrine.md), **[`branch_scope_doctrine.md`](branch_scope_doctrine.md)** (sequel eligibility & branch budgets). **MVP 0.1 boundary (freeze):** **[`mvp_freeze_checklist.md`](mvp_freeze_checklist.md)** — **in/out scope, quality gates, scope guardrails**; use before adding lanes or shipped rows. **World taxonomy:** [`eras_and_scales.md`](eras_and_scales.md), [`story_registry.md`](story_registry.md), [`module_templates.md`](module_templates.md).

Statuses: **todo** | **in progress** | **done** | **blocked**

**Until MVP 0.1 ships:** default priorities = **finish, polish, and stabilize** the frozen content set (see checklist §1), not **new anchor lanes**. Longer backlog rows below include **post-0.1** work — treat **`mvp_freeze_checklist.md` §2** as authoritative for freeze.

---

## P0 — Foundation

| Status | Title | Description | Dependencies |
|--------|--------|-------------|--------------|
| done | Engine + Paladin prototype | Playable narrative; echoes in `localStorage` | — |
| done | Story-class hook layer | Handlers wired; registry | — |
| done | Pressured config + pending flush | Tiers + signal consumption | — |
| done | Hidden truth layer | `hidden.*` targets; objective vs visible split | — |
| done | Player-facing presentation | `getStoryPlayerPresentation`, `getStoryBrowseState`; no `storyClass` in primary UI | — |
| done | Optional authoring metadata | `era`, `moduleTemplate`, `authoringAvailability` on `StoryDefinition` (planning parity with registry) | — |
| done | **Story availability / unlock rule evaluation** | `evaluateStoryAvailability()` in `src/engine/storyGateEvaluation.ts`; `getStoryBrowseState` delegates; store `startStory` uses browse state (`isListable` + `isStartable`) | — |
| done | **Story-level gate metadata (v1)** | `requiresEchoes`, `excludesEchoes`, `requiresFlags`, `excludesFlags`, `requiresEndings`, `lockedUntilEchoes`, `isHiddenUntilUnlocked`; validated in Zod; internal only | — |
| todo | **Echo “spend” / consumption semantics** | Optional doctrine for expending echoes; today echoes persist and gates read only | — |
| done | **Permanent world-state + ending unlock writes** | `EndingDefinition.worldFlags` + `unlocks` → profile; `setWorldFlag` on choices; `applyResolvedEndingToProfile`; `requiresUnlockedModuleIds` in gate evaluator | — |

---

## P1 — Core expansion

| Status | Title | Description | Dependencies |
|--------|--------|-------------|--------------|
| done | **Belief / inference state** | Engine: `belief.*` targets + consequences; `belief_inference_lab`; see briefing | Hidden truth |
| todo | **Forced / mutated narration layer** | `distorted` handler: choice display + annotations; ending eval vs truth player didn’t see | Hooks |
| todo | **distorted handler** | Implements narration layer for `distorted_perception` template | Above |
| todo | **possessed handler + config** | Partial override / impulse paths; config-driven like pressured where possible; `survival_instinct` template | Hooks |
| todo | **witness handler** | Interpretation / indirect agency for `witness_interpretation` + `observer_documentary` | Hooks |
| todo | **Profile world flags** | Coarse gates (e.g. `underground_fighting_banned`) alongside echoes | P0 unlock |
| todo | **Module template helpers** | Thin functions: “pick duel variant from echoes,” phase conventions—**not** new engines | Unlock API |
| todo | **Module-specific playstyle variants** | Support follow-ups that play differently while still sharing world memory: e.g. warrior escalation, bard/support rhythm-text flow, caveman survival/instinct branch; reuse templates instead of making isolated engines | Module template helpers |
| done | **Vitest for engine** | Core seams + `resolveChoice` / `resolveEnding` + belief layer | — |

---

## P2 — Content production

| Status | Title | Description | Dependencies |
|--------|--------|-------------|--------------|
| done | **Gyre mythic anchor proof** | `gyre_mythic_anchor` — first non-Paladin anchor; hidden vs belief; open entry | Belief + hidden truth |
| done | **Gyre Survivor witness slice** | **`gyre_witness_survivor_aftermath`** — companion POV; gate **`gyre_mythic_anchor_touched`**; echo **`gyre_survivor_fracture_witnessed`** | Anchor + branch_scope |
| todo | **Gyre follow-ups (disciplined)** | Further slices only **inside** Survivor or **Replacement** families — not one sequel per echo; **Replacement** line not opened | [`gyre_aftermath_families.md`](story_concepts/gyre_aftermath_families.md) |
| done | **Verge Mara anchor proof** | **`verge_mara_anchor`** — Mara / clan gravity; hidden vs belief; open | Belief + hidden |
| done | **Rumor Girl modern proof** | **`rumor_girl`** — obsession / rumor / buried shock; court seed | Belief + hidden |
| done | **`court_aftermath`** proof | Gated on **`rumor_girl_proof_resolved`** + **`requiresAnyFlags`** witness \| belief-gap — [`court_aftermath/story.ts`](../../src/stories/court_aftermath/story.ts) | branch_scope |
| todo | Next modern slice | e.g. Verge witness aftershock, or echo-keyed variant | branch_scope |
| todo | **`rumor_girl_future_locked_prequel`** (when scoped) | Implement per [`rumor_girl_future_locked_prequel.md`](story_concepts/rumor_girl_future_locked_prequel.md) — **four** closure families; RG maps **bucket**, prequel maps **flavor** | `rumor_girl` + branch_scope |
| done | Witness / court prototype | **`court_aftermath`** shipped | P1 witness |
| todo | Duel template demo | `boxer_tournament`, `underground_fight_club`, or warrior branch variant; prove combat/confrontation module can swap encounters based on echoes/worldFlags | P0 unlock + flags |
| todo | Support / performance module demo | Bard, ritualist, or morale-support chapter using text/music/support-oriented interaction instead of direct combat | Module template helpers |
| todo | Survival / instinct module demo | Caveman, animal, or berserker-adjacent fragment proving instinct-heavy play can feel different while still feeding the same world memory system | P1 possessed + module helpers |
| todo | Registry + matrix update per ship | `story_registry.md`, `unlock_matrix.md`, `world_echoes.md`, `eras_and_scales.md` cross-check | Process |
| todo | Localization structure | Text ids; player-facing fields translatable | Presentation |

---

## P3 — Polish / tooling

| Status | Title | Description | Dependencies |
|--------|--------|-------------|--------------|
| todo | **Debug inspector** | Dev overlay: internal `storyClass`, `era`, `moduleTemplate`, hidden truth snapshot, raw echoes — `import.meta.env.DEV` only | — |
| todo | Authoring checklist | PR: doctrine, registry row, unlock matrix, echo **level** + tier | — |
| todo | Planning index | README / `docs/planning/` links including **`eras_and_scales.md`** | — |

---

## Maintenance

- **MVP 0.1:** Before pulling new work from this backlog, run **[`mvp_freeze_checklist.md`](mvp_freeze_checklist.md) §4** (scope guardrails).
- **P0** stays **small**; split tasks if any row becomes a mega-project.
- **Blocked** items need “blocked by: …”.
- Tasks must **not** add player-visible **`storyClass`** labels—see doctrine.
- New modules should justify whether they are a **template variant** or a truly new template before adding new engine complexity.
- **New follow-up modules:** run the checklist in **`branch_scope_doctrine.md`**; default is **echo / flag / variant**, not a full sequel row.
