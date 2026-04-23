# Eras & scales — world taxonomy

**Doctrine:** [`design_doctrine.md`](design_doctrine.md). **Cross-era links:** [`world_connection_doctrine.md`](world_connection_doctrine.md). **Story class** (`stable`, `pressured`, …) is **engine-only**; **era** and **module template** are **planning / product organization**—use player-facing copy in the shell, not raw ids.

This document organizes the anthology **across time**, **interaction shape** (see [`module_templates.md`](module_templates.md)), and **how deeply** one module rewrites the shared world (echo **scale** — see [`world_echoes.md`](world_echoes.md)).

---

## Scales of consequence

Echoes and flags are the main **shared memory** between modules. Three scales are useful for design and registry columns—not separate storage tiers in code today, but **severity / reach** labels.

| Scale | Meaning | Typical persistence | Examples |
|-------|---------|---------------------|----------|
| **Personal** | About one life, relationship, or local secret—other stories may **reference** it without rewriting institutions | Often **soft**; can harden if repeated | `truth_sacrificed_for_peace` (this paladin’s lie); grudge vs mentor |
| **World** | Regional fact: law, market, rumor climate, who holds territory | **Hard** common | `underground_fighting_banned`; village trusts order |
| **Mythic / civilizational** | Cosmology, species-level truth, empire legitimacy, “the gods noticed” | **Mythic**; closes or opens **families** of modules | `god_war_branch`; `alien_observer` canon lock-in |

**Implementation note:** All scales still map to `profile.globalEchoes` (and future `worldFlags`). The scale is **authoring discipline**, not a separate field on every echo—document each echo’s tier in [`world_echoes.md`](world_echoes.md).

---

## Era: BC / Mythic

**What belongs:** Creation myths, Titan/Olympian beats, flood tablets, first cities, pre-history as **story** (not textbook).

**Typical themes:** Fate vs defiance; taboo; sacred geography; oral-law morality.

**Likely module templates:** `narrative`; `witness_interpretation` (myth as testimony); `observer_documentary` (in-fiction “chronicle” framing).

**Echoes:** Often **mythic**—founding violations, broken seals, “the line of X ends here.”

**Influences later eras:** Reframes **legitimacy** in medieval/holy content; Easter eggs in modern “occult” or AI-mystic modules; far-future **archaeology** of myth.

**Cross-era myth seeds (planning):** Some concepts are **anchored** in mythic tone but **echo** as rumor, obsession, cult, or archive tags in later eras — e.g. **Gyre** (stayed-behind self / recurrence wound), documented in [`story_concepts/gyre_mythic_recurrence.md`](story_concepts/gyre_mythic_recurrence.md). Registry may list **BC mythic + cross-era echoes** as the **era** column for such anchors.

---

## Era: Ancient / Early Historical

**What belongs:** Bronze/Iron age polities, early law codes, conquest and diaspora, **document-adjacent** drama (scrolls, stele, early bureaucracy).

**Typical themes:** Empire edge; slave/free; temple economy; first written secrets.

**Likely templates:** `narrative`; `witness_interpretation`; `duel_tournament` (ritual combat, arena law).

**Echoes:** Mix of **world** (province loyalty) and **personal** (blood debt); some **mythic** if theology is objective in-world.

**Influences later eras:** Legal **precedent** echoes for court/modern modules; holy orders claiming ancient mandate; rumor chains that “remember” an ancient breach.

---

## Era: Medieval / Holy Order / Arena / Curse

**What belongs:** Knights, vows, plague margins, trial by combat, **curses** and **feral** borders, tournament circuits, ecclesiastical politics.

**Typical themes:** Oath friction; contagion (moral or literal); spectacle violence; the church and the sword.

**Likely templates:** `narrative` (Paladin-style); `duel_tournament`; `survival_instinct` (curse/feral); `distorted_perception` (holy visions unreliable).

**Echoes:** **Paladin Promise** lives here—ending echoes are mostly **personal→hard** depending on follow-ups; regional order credibility is **world**.

**Influences later eras:** Romantic nationalism in modern court/media; “dark champion” DNA in underground fight modules; mythic fallout if **god_war_branch**-style events are emitted.

---

## Era: Modern / Fractured / Court / Media / AI

**What belongs:** Trials, news cycles, parasocial rumor, corporate or state surveillance, **early AI** as character (not necessarily far-future).

**Typical themes:** Narrative control; evidence vs spin; mental health and technology; class and access to truth.

**Likely templates:** `witness_interpretation`; `slice_of_life_social`; `observer_documentary`; `distorted_perception` (timeline glitches, unreliable feeds); `narrative`.

**Echoes:** **World**—bans, scandals, platform norms; **personal**—who was ruined publicly; **mythic** rare unless “AI awakens” is treated as civilization-scale.

**Influences later eras:** Near-future modules inherit **institutional trust** flags; alien/observer modules may treat Earth media as **data fossil**.

---

## Era: Near Future

**What belongs:** Climate migration, orbital labor, augmented justice, bio-law, **post-national** enclaves.

**Typical themes:** Survival with receipts; engineered empathy; which histories get archived.

**Likely templates:** `narrative`; `survival_instinct`; `witness_interpretation`; `observer_documentary`.

**Echoes:** **World** and **hard** common (policy locks); **mythic** if humanity’s “fork” is chosen.

**Influences later eras:** Far-future **continuity** (what survived the collapse); alien modules reading **humanity’s last honest signal**.

---

## Era: Far Future / Observer / Alien

**What belongs:** Post-human witnesses, archive entities, first contact, **non-human POV**, cosmic horror as **documentation**.

**Typical themes:** Scale vertigo; ethics across time; whether any story is “small” when observed from orbit.

**Likely templates:** `observer_documentary`; `witness_interpretation`; `distorted_perception` (sensor failure as narrative); `narrative` sparingly.

**Echoes:** Predominantly **mythic**—locks **branches** of the whole anthology or declares **observer canon**.

**Influences earlier-era play:** Usually **retroactive framing** (New Game+ hints, library UI) rather than mid-medieval characters citing aliens—unless doctrine allows explicit time weirdness.

---

## Side examples / slice of life / miscellaneous

**What belongs:** Ahistorical or lightly pinned modules—coffee-shop confession, dating sim beat, sports draft, **tutorial tone** pieces—still valid anthology entries.

**Typical themes:** Human-scale warmth; comedy; experimental UI; low-stakes **personal** echoes that **only** matter to one other module.

**Likely templates:** `slice_of_life_social`; short `narrative`; micro-`duel_tournament` (sparring, not death sport).

**Echoes:** Almost always **personal** or **soft world** (neighborhood remembers you).

**Influences:** Optional **keys** for secret or role-gated content elsewhere; good **onboarding** without cosmology homework.

---

## Code alignment (optional metadata)

`StoryDefinition` may declare **`era`**, **`moduleTemplate`**, and **`authoringAvailability`** (see `src/engine/types.ts`) for **tooling, validation, and docs parity**. They do **not** replace runtime unlock rules (`getStoryBrowseState`, echoes, future flags).

## Related docs

- [`story_registry.md`](story_registry.md) — per-module era, template, dependencies, echo scale  
- [`story_concepts/gyre_mythic_recurrence.md`](story_concepts/gyre_mythic_recurrence.md) — Gyre (mythic recurrence; cross-era planning)  
- [`module_templates.md`](module_templates.md) — template definitions  
- [`world_echoes.md`](world_echoes.md) — echo ids and permanence tiers  
