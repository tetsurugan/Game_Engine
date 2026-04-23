# Personality continuity & relational affinity — design doctrine

**Status:** Normative for **planning** how player-facing **personality types**, **fixed anchor characters**, and **relational variants** interact across the anthology. It does **not** mandate immediate engine features; it constrains **authoring** so cross-story memory stays **countable** and **coherent**.

**Pairs with:** [`design_doctrine.md`](design_doctrine.md) (vision, permanence), [`branch_scope_doctrine.md`](branch_scope_doctrine.md) (variants vs new modules), [`world_connection_doctrine.md`](world_connection_doctrine.md) (inheritance), [`story_registry.md`](story_registry.md).

---

## 1. Core distinction

| Concept | What it is | Mutability |
|--------|------------|------------|
| **Player personality types** | Lanes the **player** inhabits in a given module (stance, bias, emotional default—not “random mood”). Chosen or confirmed at run start where the story defines `personalities`. | **Per run** within that module; **persistent as a continuity label** when the design chooses to remember it (echo, flag, profile field)—not infinite custom PCs. |
| **Fixed anchor characters** | **Authored** figures whose **core identity** and **social/narrative function** should stay **stable** across the anthology (e.g. Mara Verge as near-cult center of gravity). They are **not** a menu of swappable NPC personalities. | **Rigid at the core**; the **world’s interpretation** of them may still vary. |
| **Relational variants** | **Different expressions** of how a fixed (or semi-fixed) character **shows up in relationship** to the POV and world: reachable vs armored, resentful vs gracious, dependency-intensifying vs skepticism-prone—**without** redefining their essence into a different person. | **Small, named buckets** biased by player personality, aftermath family, echoes, flags—not one bespoke branch per playthrough. |

**Reader’s rule:** If you are about to add “Personality B” for an anchor NPC, **stop** and ask whether you mean a **relational variant** (few, disciplined) or a **new character** (probably wrong).

---

## 2. Core rule (anchors vs chaos)

1. **Not every major character gets fully changeable personalities.** Some figures **must** stay fixed enough that their **power** (fear, love, gravity, myth) reads as **consistent**.

2. **Some characters should remain fixed** because their **social and narrative authority** depends on **recognition**: the player and the world know **who** they are; what changes is **how people orbit**, **misread**, or **break** around them—not a roulette of inner templates.

3. **Later stories may still remember different *versions* of how the world knew a character**—not different souls, but different **witnesses**, **aftermaths**, and **relational pressures** (what dominated: dependency, rumor, mercy, rupture).

This doctrine **reduces chaos**: it separates **who they are** (anchor) from **what relationship mode fired** (relational variant) from **who the player was** (continuity lane).

---

## 3. Personality as continuity lane (player characters)

For **player characters** (including recurring POVs), **personality type** is **not** disposable flavor.

- It is a **continuity lane**: a compact label the anthology can store (implicitly via echo stacks, explicitly via future metadata) meaning *“the world knew **this** version of the person.”*
- **Choices still create variance inside the lane**—the lane is **not** one ending; it is **bias + readable identity** that later modules can query without simulating full psychology.
- **Later modules** can gate copy, variants, or witness tone on **that lane + aftermath family**, not on every granular choice.

**Anti-pattern:** Treating personality as a one-story skin with **no** durable meaning.  
**Preferred:** Personality **colors** resolution and **feeds** a **small** set of stored signals (echoes, flags, optional `personalityId` on profile outcomes) that **later** stories interpret.

---

## 4. Relational affinity / casting pressure

**Relational affinity** (or **casting pressure**) means:

- The player’s personality **does not** fully determine other characters.
- It **can bias** which **relational variant** of another character is **active**, **foregrounded**, or **most likely** in copy and conditions—within **caps** defined in planning.

**Examples (illustrative, not exhaustive):**

- A **forgiving / open** player stance may make a **more wounded or reachable** relational expression of **Gyre** more likely (without rewriting Gyre’s mythic wound).
- A **proud / suspicious** stance may bias toward a **harsher or more resentful** relational read in witness or companion scenes.
- A **dependent / orbiting** stance may strengthen **cultic dependency dynamics** around a figure like **Mara**—not by changing Mara’s core, but by **which followers** and **which misreads** the module emphasizes.

**Engine-facing sketch (planning only):** conditions that combine `personalityId` (or successor lane id) + `globalEchoes` / aftermath family flags → pick **variant group** text or scene set. **Not** a unique NPC per run.

---

## 5. Fixed anchor characters (e.g. Mara Verge)

Characters like **Mara Verge** should **usually**:

- Stay **fixed in core identity** (strategic, gravitational, interpreted-as-law).
- Stay **authored in social gravity** (success, dependency, succession fear)—see [`verge_mara_anchor`](../../src/stories/verge_mara_anchor/story.ts), [`verge_clan_mara_verge.md`](story_concepts/verge_clan_mara_verge.md).
- Be **interpreted by others** in-fiction; the **player** often acts as corridor, witness, or misreader—not as Mara's personality picker.

**Later stories** can still remember:

- **How others related** to them (loyal executor, skeptic, resentful beneficiary).
- **What kind of follower/witness/opponent** the prior run produced (marks, echoes).
- **Which interpretation dominated** (doctrine-by-rumor vs brake-named)—without shipping “Mara Template A/B/C.”

---

## 6. Three-layer model (practical)

### Player / recurring POV

| Layer | Meaning |
|-------|---------|
| **Personality type** | Continuity lane: *which version of the player the world knew.* |
| **Aftermath family** | What **kind of fate or situation** that version entered (aligned with [`branch_scope_doctrine.md`](branch_scope_doctrine.md) buckets). |
| **Local choice variance** | Texture **inside** the lane/family—scenes, tone, small flags; **not** a new universe per click. |

### NPC / fixed anchor

| Layer | Meaning |
|-------|---------|
| **Core identity** | Fixed role/essence—the anchor. |
| **Relational expression** | Which **side** of them dominates **this run** (small enumerated set). |
| **Witness memory** | How **later** modules describe or remember them—echoes, rumors, court seeds, witness POV—keyed to family + relational mode, not to infinite bespoke states. |

---

## 7. Examples from current project lanes

### Gyre

- **Fixed:** Mythic wound, loop logic, hostile grace—see [`gyre_mythic_anchor`](../../src/stories/gyre_mythic_anchor/story.ts), [`gyre_mythic_recurrence.md`](story_concepts/gyre_mythic_recurrence.md).
- **Relational variance:** Visitor **personality** (Devoted, Yearning, Resentful, Numb) **biases** tone and closure shape; **aftermath families** (Survivor vs Replacement—[`gyre_aftermath_families.md`](story_concepts/gyre_aftermath_families.md)) collapse sequel pressure.
- **Later stories:** Remember **which echo stack** and **which family**, not every emotional shade as its own sequel.

### Mara Verge

- **Fixed:** Center of gravity, interpretation-as-governance, success-from-punchline—[`verge_mara_anchor`](../../src/stories/verge_mara_anchor/story.ts).
- **Relational variance:** **Corridor POV** choices misread vs hold line; future modules vary **orbit, skepticism, hunger, dependency** around her—**not** Mara's personality menu.
- **Later stories:** Marks like `verge_mara_anchor_touched` + echo ids describe **how the world moved**, not a new Mara.

### Rumor Girl

- **Player personality** as **continuity lane** (four stances in implementation)—shapes suspicion, belief, and endings.
- **Later witness/court/friend** modules (planned) should remember **lane + outcome family** (e.g. closure buckets in [`rumor_girl_future_locked_prequel.md`](story_concepts/rumor_girl_future_locked_prequel.md)), not every micro-path.

---

## 8. Doctrine-safe constraints

This system exists to **reduce** authorial and mechanical chaos:

1. **Personality types must not spawn infinite unique characters.** Keep **enumerated** lanes; merge near-duplicates in planning.
2. **Relational variants** should usually be a **small** number of **meaningful** expressions—**three to five** is a planning smell-test; justify more in writing.
3. **Variants inside known families** (aftermath family, closure family, template variant) are **preferred** over endless bespoke branches—see [`branch_scope_doctrine.md`](branch_scope_doctrine.md).
4. **Fixed anchors** are **default**: relational variance is **additive texture**, not a license to **replace** the anchor’s thesis.

---

## 9. Implementation posture (non-normative)

When implementing:

- Prefer **existing** `personalityId`, echoes, `worldFlags`, and **variant groups** over new subsystems.
- Any **new** stored “lane” id should map to **planning tables** in registry or concept docs—**no** silent proliferation.

---

## Related docs

- [`design_doctrine.md`](design_doctrine.md) — permanence, templates, player-facing vs internal.
- [`branch_scope_doctrine.md`](branch_scope_doctrine.md) — sequel vs variant discipline.
- [`world_connection_doctrine.md`](world_connection_doctrine.md) — cross-era memory.
- [`story_registry.md`](story_registry.md) — per-module notes.
- [`world_echoes.md`](world_echoes.md) — echo semantics.

---

## Revision

Changes here should be reflected in **registry** / **concept** docs when they affect **gates** or **variant counts**; note substantive shifts in `docs/cursor_reports/change_log.md` when the team uses it for doctrine history.
