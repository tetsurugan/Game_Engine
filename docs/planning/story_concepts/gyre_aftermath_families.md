# Gyre — aftermath families (sequel buckets)

**Status:** Planning / authoring direction — **normative for Gyre follow-ups** alongside [`branch_scope_doctrine.md`](../branch_scope_doctrine.md), [`world_connection_doctrine.md`](../world_connection_doctrine.md), and [`design_doctrine.md`](../design_doctrine.md).  
**Shipped anchor:** [`gyre_mythic_anchor`](../../../src/stories/gyre_mythic_anchor/story.ts) — proof of visitor vs Gyre, hidden vs belief vs visible, **four emotional quadrants** (see [`gyre_mythic_recurrence.md`](gyre_mythic_recurrence.md) for full myth vocabulary).  
**This file:** defines **two** sequel-worthy **aftermath families** so Gyre does not sprawl into a separate full module per emotional shade.

---

## Why only two families

Gyre **should** keep **many emotional endings** (tone, belief, grasp of the loop, closure quality). Those differences matter for **player experience**, **echo flavor**, and **variant text** in other modules.

They **should not**, by default, each spawn a **distinct sequel tree**. Per **branch scope doctrine**: *not every ending deserves a sequel*; *variants and aftershocks are preferred over infinite branching*.

**Rule of thumb:** Sequel planning, registry rows, and continuation gates for Gyre **collapse** into:

1. **Survivor aftermath family** — the visitor **lives**; the cost is **psychic**, **relational**, or **continuity-shaped**.  
2. **Replacement aftermath family** — the visitor **does not** truly survive the arc as the self the world knew, or is **displaced**; **Gyre** (or the stayed-behind pattern) **takes the public life** — *wrong one returned* territory.

Everything else is **memory** (echoes, flags, marks, rumors, template variants) **inside** one of these two buckets — not a third “main” sequel line unless doctrine is explicitly revised.

---

## Survivor aftermath family

### What it means

The **protagonist of the encounter** (the current-loop visitor who faced Gyre) **survives** physically and remains the **continuing subject** of their own biography. The spiral **does not** swap whose face the party greets at breakfast.

The damage is **interior** and **longitudinal**: recurrence wound, guilt, distrust of one’s own continuity (“am I still the same person who crossed?”), hypervigilance, intrusive patterns, fear that they **should** have died, or that they **killed** an earlier self **metaphorically** — and, in some tones, ambiguity about whether that metaphor is **only** metaphor.

This is **not** “happy ending” as default. Mercy endings can still **hurt**; blind grace can still **unpay** a debt later. **Survivor** means **alive + accountable to the wound**, not **unscathed**.

### Visible endings that may feed this family

*Includes the **shipped** anchor quadrants and **future** Gyre endings that keep the same living visitor.*

| Emotional axis | Example tones | Aftermath flavor (variants inside family) |
|----------------|---------------|-------------------------------------------|
| Grasped loop + softer closure | Integration, shared weight | Continuity guilt, witness hunger, need for ritual acknowledgment |
| Grasped loop + harsh closure | Clarity without repair | Identity fracture, self-alienation, “razor” memory |
| Blind + gentle closure | Kindness without the diagram | Late reckoning risk, impostor-flavored peace |
| Blind + bitter closure | Righteous leave-taking | Armored narrative, paranoia seeds, wrong lessons |

**Shipped mapping (anchor):** all four current endings (**`gyre_loop_*`**) assume the visitor **walks the aftermath as themselves** → **Survivor family** variants only. Echoes **`gyre_echo_*`** differentiate **tone** for gates and copy; they do **not** imply four separate sequel modules.

### Hidden / durable sequel state (ideas — not all implemented)

Authoring may **write** or **derive** profile state such as:

- **`gyre_aftermath_survivor`** (conceptual **continuation family id** — may surface as `worldlineBranches.gyre_aftermath.branchId: survivor` or a dedicated mark when implemented)  
- **`gyre_survivor_line`** (`worldFlag` candidate — “anthology should read survivor routing”)  
- **`gyre_self_murder_trauma`** / **`gyre_protagonist_suspects_continuity_break`** (flag or mark — *psychic* suspicion, not proof of substitution)  
- **`gyre_mythic_anchor_touched`** (already shipped — generic “this proof resolved”)  
- Granular echoes: **`gyre_echo_truth_mercy`**, **`gyre_echo_truth_break`**, **`gyre_echo_blind_grace`**, **`gyre_echo_blind_wound`** — for **variant** dialogue, not for four sequel trees

**Principle:** One **family**, many **echo/flag variants**.

### Follow-up modules this family supports

Without requiring a new “sequel” per ending:

- **Therapy / confession / pressured** fragments — continuity obsession, guilt, dissociation  
- **Witness** modules — clerk, companion, healer notices **something wrong** that is still **psychological**  
- **Cross-era** rumor — myth misreads survivor guilt as **omen** or **curse** (still survivor POV)  
- **Template variants** — same journey, different intro banners or NPC trust rules keyed off **`gyre_echo_*`**

**Shipped proof (one slice):** **`gyre_witness_survivor_aftermath`** — companion POV, rumor → **`gyre_mythic_anchor_touched`**; ending echo **`gyre_survivor_fracture_witnessed`**. Intentionally **not** a second Survivor sequel row; variants stay inside this family.

**Distinct from Replacement:** the **hidden truth** of the anthology still holds that **the named protagonist** is who they say they are; suspicion may be **epistemic**, not **substitution**.

---

## Replacement aftermath family

### What it means

The **visitor’s public life** continues, but the **truth layer** is: they **did not** survive as the sole continuity of that life — **Gyre** (stayed-behind instance) **killed**, **unmade**, or **replaced** them in a way the **world** experiences as **the same person walking back** — *wrong one returned*, **Claimed Inheritance** logic (see [`gyre_mythic_recurrence.md`](gyre_mythic_recurrence.md) — *Claimed Inheritance*).

Sequel hooks emphasize **dramatic irony**, **party doubt**, **emotional mismatch**, and **detective** beats from other POVs. This family is **not** currently proven by the **tiny** anchor (which keeps the visitor alive as themselves); it is the **second bucket** for **future** Gyre content or **explicit** ending commits.

### Visible endings that may feed this family

*Future authoring — examples:*

- Endings where Gyre **wins the threshold fight** for **identity** or **body**  
- Endings where the visitor **accepts merger** that is **functionally** replacement  
- Mythic **bookkeeping** outcomes that **mark** the successor as **void** while the stayed-behind **wears** the name

**Not required:** every Replacement outcome must be **violent** on screen; the engine may record **replacement** via `hiddenTruth` + mark while player-facing text stays **ambiguous** until a later module.

### Clues, warnings, and tells (replacement family)

When the **true** protagonist **anticipates** or **fights** replacement, they may leave **evidence** for companions, lovers, or future investigators. Document this so sequel modules have **design permission** without inventing ad hoc lore each time.

| Kind | Examples | Who might read it |
|------|----------|-------------------|
| **Tells** | Micro-habits reversed (which hand, prayer order, how they break bread) | Party, intimate NPCs |
| **Notes** | Scratched in ash, inked inside a sheath, buried in a pack | Finder on the road |
| **Code phrases** | “If I ever laugh at X, don’t believe me” | Confidant |
| **Emotional warnings** | Sudden coldness toward someone they used to shield; *wrong* apology shape | Relationship drama POVs |
| **Recognizable rituals** | A vow spoken **slightly** wrong — only an old witness catches it | Order, family elder |

**Design intent:** Substitution stories stay **playable** because **clues** are **authored as a kit** — not because every table gets a bespoke sequel row.

### Hidden / durable sequel state (ideas — not all implemented)

- **`gyre_aftermath_replacement`** (continuation family id / worldline branch)  
- **`gyre_replacement_line`** (`worldFlag` candidate — mutex with clean survivor **public** continuity where doctrine requires)  
- **`gyre_substitution_seeded`** (mark — “replacement is load-bearing for this profile”)  
- **`gyre_wrong_one_walks_free`** (echo or flag — aligns with planning language in recurrence doc)  
- **`gyre_party_can_notice_wrongness`** (soft flag — enables suspicion routes without forcing resolution)

**Mutex note:** Survivor and Replacement **families** are **contradictory** as **primary** world facts for the **same** narrative subject in the **same** timeline. Authoring should **commit** to one **aftermath family** per resolution path (with rare **observer** “unreliable multiverse” exceptions called out in registry).

### Follow-up modules this family supports

- **Party suspicion** / **relationship thriller** beats  
- **Investigator / witness** modules — evidence table, trial of identity  
- **Wrong-one-returned** dedicated follow-up ( **one** arc, many **variants** from clue combinations )  
- **Cross-era** myth: the **thief saint**, **doppel** rumor — *memory*, not fifteen separate module ids

---

## Emotional richness without sequel sprawl

- **Many endings** → **few sequel families**. Emotional quadrants **differentiate echoes, flags, and variants**; they **do not** by default **multiply** top-level continuation modules.  
- **Prefer:** `template_variant`, `witness_fragment`, `rumor_teaser_reference`, and **aftershock** scoped to **Survivor** or **Replacement** *theme*, not a unique sequel per echo.  
- **Prefer:** one **strong** “wrong one returned” module with **gated intros** over **three** thin modules that repeat the same twist.  
- **Explicit:** *not every emotional ending deserves a separate sequel* — aligns with [`branch_scope_doctrine.md`](../branch_scope_doctrine.md) **Core rule** and **Branch budget rules**.

---

## Engine-facing proposals (future implementation)

These names are **candidates** for echoes, `worldFlags`, `worldConsequenceMarks`, unlock ids, or worldline branch ids when follow-ups ship. **No obligation** to adopt every id; **do** keep **family-level** routing countable.

| Kind | Example ids | Role |
|------|-------------|------|
| **Continuation family** | `gyre_aftermath_survivor`, `gyre_aftermath_replacement` | Planning + optional `worldlineBranches.gyre_aftermath` |
| **Routing flags** | `gyre_survivor_line`, `gyre_replacement_line` | Coarse “which bucket is canon for this profile” |
| **Survivor-leaning marks** | `gyre_self_murder_trauma`, `gyre_protagonist_suspects_continuity_break` | PTSD / continuity obsession routes |
| **Replacement-leaning marks** | `gyre_substitution_seeded`, `gyre_wrong_one_walks_free` | Substitution load-bearing; party suspicion |
| **Party / social** | `gyre_party_can_notice_wrongness` | Enables clue-hunt variants without a new module |
| **Variant group** (planning) | `gyre_myth` | Teaser / secret surfacing across eras without new sequel rows |
| **Unlock ids** (future) | e.g. `unlock_gyre_survivor_witness_pack`, `unlock_gyre_replacement_inquest` | **Packaged** unlocks per **family**, not per echo |

**Anchor today:** endings write **`gyre_echo_*`** + **`gyre_mythic_anchor_touched`**. A future **tightening pass** may add **`gyre_survivor_line`** (or equivalent) on all current endings so gates do not need four echo OR-chains — **optional**, documented here as the preferred direction.

---

## Doctrine citations

- **[`branch_scope_doctrine.md`](../branch_scope_doctrine.md):** default **memory-first**; **two** direct continuation modules per major story only with **written** justification; aftershocks **capped**.  
- **[`world_connection_doctrine.md`](../world_connection_doctrine.md):** cross-era Gyre material should **inherit** via myth, witness, artifact — **not** mandatory play of every ending variant.  
- **[`design_doctrine.md`](../design_doctrine.md):** player-facing copy stays clean; **echo ids** are internal keys.

---

## Related docs

- [`gyre_mythic_recurrence.md`](gyre_mythic_recurrence.md) — full emotional vocabulary, **Claimed Inheritance**, outcome families  
- [`../story_registry.md`](../story_registry.md) — module promises  
- [`../world_echoes.md`](../world_echoes.md) — echo tiers  
- [`../../cursor_reports/agent_handoff.md`](../../cursor_reports/agent_handoff.md) — operational next steps  

---

## Revision

When the first **Replacement**-committing ending ships, update **this file** and [`../world_echoes.md`](../world_echoes.md) with the **exact** writes — and add a **registry** note naming the **aftermath family** for that row.
