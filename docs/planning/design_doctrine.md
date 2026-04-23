# Design doctrine — The Vow Between / POV engine

This document is **normative** for design decisions. When code or copy conflicts with it, either fix the implementation or **explicitly revise this doctrine** (with a short note in `change_log.md` or a PR description).

---

## Core vision

This project is **not** “a branching story app.” It is a **shared-consequence universe**: small **modules** (stories, games, beats) that stand alone but **remember** each other through **lightweight memory** (echoes, world flags, role), not through shipping whole save blobs between authors.

- **Modular anthology:** many entries, different tones and interaction shapes.
- **Interconnection:** outcomes change what can appear later—routes, bosses, whole module variants, or **silence** where another branch would have been.
- **Engine serves the anthology:** data-driven definitions, one runtime, many templates.

---

## Internal vs player-facing language

### Internal only (developers, docs, types, debug)

- **Story classes:** `stable`, `pressured`, `distorted`, `possessed`, `witness`.
- These describe **agency contracts** and **hook behavior** in code. They are **not** product categories for players.

### Player-facing (UI, marketing, in-fiction framing)

Players learn what a module **is** through:

- **Title** and **short summary** (tone, role, hook).
- **Unlock hints** (“After the Highstone oath,” “Requires: regional calm”)—diegetic or minimalist, not database dumps.
- **Presentation tags** that describe **experience** or **genre**: e.g. “A knight’s judgment,” “Underground bout,” “Trial transcript”—**never** “Pressured class” or “Possessed story.”

**Rule:** If a label would only make sense to someone reading `StoryDefinition.storyClass`, it does **not** belong on the primary player path. Dev panels and Cursor may use internal terms.

---

## Laws of scope

1. **Small modules first** — Ship short, shippable pieces. Expand only when the engine earns it.
2. **Shared memory, not shared bloat** — Prefer **echoes** and a few **world flags** over serializing full story state into other stories.
3. **Connect through echoes, not giant handoffs** — Another module reads **ids** and **flags**, not opaque savegame graphs.
4. **Every module stands alone** — A player who only plays one entry still gets a complete experience; cross-story ties **enhance**, they are not homework.
5. **Genre variety = templates, not one-offs** — New interaction shapes should map to a **module template** (see below) so patterns stay maintainable.
6. **Branch scope is budgeted** — Not every ending earns a follow-up module. See **[`branch_scope_doctrine.md`](branch_scope_doctrine.md)** for sequel eligibility, aftershock vs continuation, and default **echo/variant-first** outcomes.
7. **Worlds inherit, they need not merge** — New eras and settings connect through **memory, consequence, myth, witness, artifacts, and institutions**—not by collapsing everything into one geography. See **[`world_connection_doctrine.md`](world_connection_doctrine.md)** for connection **modes**, **levels**, and approval checks.
8. **Personality and anchors are disciplined** — Player **personality types** are **continuity lanes**; **fixed anchor characters** stay authored at the core; **relational variants** are **small, biased expressions**—not infinite NPC personality swaps. See **[`personality_continuity_doctrine.md`](personality_continuity_doctrine.md)**.
9. **People judge, then act** — Important characters carry **private relational verdicts** (what facts *mean* to them), separate from raw events and from rumor. Those verdicts bias **behavior and later access**—usually via **marks, variants, echoes**—not via simulating every NPC’s inner life. See **[`relational_verdicts_doctrine.md`](relational_verdicts_doctrine.md)**.

---

## Story unlock doctrine

Unlock categories (see also `unlock_matrix.md`):

| Category | Intent |
|----------|--------|
| **Open** | On the shelf for anyone in the anthology shell. |
| **Outcome-gated** | Earned by **endings** and/or **echoes** from prior play. |
| **World-state-gated** | Requires **combinations** of echoes and/or **world flags** (coarse “what kind of world is this”). |
| **Role-gated** | Requires **role / path / prior module choice** (e.g. personality, save template). |
| **Secret / mythic** | **Discovered**, not advertised—cryptic gates, optional “???” until unlocked. |
| **Mutually exclusive** | Some content exists **because** other content was **prevented**—mutex echoes or flags close branches. |

**Principles:**

- **Core stories accessible** — The anthology always offers a credible **on-ramp** (e.g. Paladin Promise–scale entry points).
- **Deeper stories earned** — Follow-ups and fallout require **outcomes**, not grind.
- **Special stories discovered** — Mythic entries reward curiosity and pattern completion.
- **Some stories only exist if others were blocked** — Design **closing** paths, not only **opening** ones; document mutex in registry + matrix.

---

## Permanence doctrine

Some outcomes should **permanently reshape the world** for that profile. Not every echo is equal:

| Level | Meaning | Typical effect |
|-------|---------|----------------|
| **Soft permanence** | Flavor, dialogue bias, small stat or tone shifts in later modules | Echo read in conditions; optional variant text |
| **Hard permanence** | **Unlocks / locks** concrete modules, routes, or bosses | Echo + flag gates; mutex removes menu entries |
| **Mythic permanence** | Rare, campaign-scale shifts (who rules, what genre of module **exists**) | Combines multiple echoes/flags; may **retire** whole template variants |

**Principle:** Permanent outcomes should **open and close** paths. If everything only adds, the world feels weightless. Prefer **documented** `excludesEchoes` / mutex rules for hard and mythic tiers.

---

## Module template doctrine

**Templates** are **reusable interaction + presentation formats**—the player-facing “kind of thing this is.” They are implemented as **conventions + data** on the same engine (`StoryDefinition`, hooks, hidden truth), **not** separate engines per genre.

Likely templates:

| Template | Player-facing idea | Engine notes (internal) |
|----------|---------------------|-------------------------|
| **Narrative module** | Character drama, moral pressure | Often `stable` / `pressured` internally |
| **Duel / tournament module** | Structured conflict, stakes, rounds | Phases as scenes; echoes alter **which** duel variant loads |
| **Survival / instinct module** | Scarcity, flight/fight, feral POV | Often `possessed` + hidden truth |
| **Witness / interpretation module** | Trials, records, “what happened” | Often `witness`; belief vs `hidden.*` |
| **Distorted / perception module** | Unreliable narration, doubt | Often `distorted`; eval vs visible state |

Echoes **influence** templates by: unlock rules, mutex, in-story conditions, and **which variant** of a template is selected—not by forking the whole codebase.

---

## Possessed class clarification (internal)

**`possessed`** (internal) is **not** “ghost possession only.” It means the player is inside a **will, body, or state that rational choice does not fully govern**: berserker rage, animal instinct, compulsion, frenzy, feral behavior, curse, panic / bodily override, dissociation—**any** impulse-dominant POV where the engine may **partially override** intent.

Frame for **design**: *the player is present, but the vessel is not entirely theirs to steer.*

---

## Examples (concrete)

1. **Dark paladin fallout → later tournament**  
   Profile has `oathbound_soul_snapped` or `paladin_became_dark` (when implemented). A **duel / tournament** module loads a **variant**: seed boss is a former ally, commentary is hostile, **soft** law bonuses from `duty_over_compassion` **do not** apply. Same template, different **data + gates**.

2. **Righteous order outcome → fighting banned**  
   Ending stack + echo `holy_order_kept_control` (or a **hard** flag `underground_fighting_banned`) **removes** the “pit fight” route and **surfaces** a **witness** module about the raid that closed the pits—**mutually exclusive** with a “underground champion” storyline that required pits open.

3. **Berserker / curse module**  
   Internal `possessed` + survival template. Ending A emits `beast_marked_territory` (hard); later **healing** or **monster POV** modules check that echo and offer **different** openings; a **witness** module references rumors the player never saw in-fiction if `hidden.flags` say the attack was unprovoked.

---

## Related docs

- **`personality_continuity_doctrine.md`** — player personality as continuity lane; fixed anchors vs relational variants; relational affinity / casting pressure.
- **`relational_verdicts_doctrine.md`** — private judgments about others; four layers (event, access, verdict, tendency); flow and memory without full NPC simulation.
- **`branch_scope_doctrine.md`** — anti-sprawl rules: which endings get direct continuations, aftershocks, or memory-only outcomes.
- **`roadmap.md`** — phased work aligned to this doctrine.
- **`backlog.md`** — tasks; must not contradict presentation rules here.
- **`story_registry.md`** — per-module gates and **internal** `storyClass` for devs only.
- **`unlock_matrix.md`** — gate + permanence patterns.
- **`world_echoes.md`** — echo meanings and permanence tier notes.
- **`module_templates.md`** — template detail.
- **`eras_and_scales.md`** — era buckets, connection depth (personal / world / mythic echoes).

---

## Revision

When changing doctrine: update this file first, then align **`roadmap.md`**, **`backlog.md`**, registry, matrix, echoes, and templates so the repo does not fight itself.
