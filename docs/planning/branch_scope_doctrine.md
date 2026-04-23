# Branch scope doctrine — sequel eligibility & anti-sprawl

**Status:** Normative for **content planning** and **approval of new modules**. It does not replace [`design_doctrine.md`](design_doctrine.md) (vision, unlocks, player-facing rules); it **narrows** how many branches become **real shipped modules** vs **memory, variants, and references**.

When a design doc or registry row proposes a new follow-up, use this file to decide **tier of investment**. If you bypass it, record **why** in the registry or PR (exception, prototype, or doctrine revision).

---

## Why branch sprawl is dangerous

A modular anthology **wants** branching: endings emit echoes, set world flags, unlock continuations, and reshape what later modules can be. That power becomes a liability when **every ending is treated as a promise** for another full playable story.

- **Scope explodes:** Each new module has scenes, gates, QA, and maintenance. N endings × “deserves a sequel” → unbounded backlog and stalled shipping.
- **Focus dissolves:** Players and authors lose the thread of what matters; the shelf becomes a graveyard of thin follow-ups that repeat the same beat.
- **Shipability dies:** Engine and presentation stay ready, but **content surface area** outruns the team; half-built sequels block clarity on what “done” means.
- **Memory loses meaning:** If everything is a module, **echoes and flags** stop feeling special—they should carry most of the universe’s texture **without** each one spawning a novella.

**This doctrine exists so branches stay powerful but countable.**

---

## Core rule

1. **Not every ending deserves a sequel.** Most endings should **stop** at echoes, world flags, unlock shifts, rumors, teasers, or **template variants**—not at a new `StoryDefinition` with a full narrative arc.

2. **Some endings should only create:** echoes, rumors, `worldFlags`, boss/encounter **swaps**, altered **module variants**, or **surfacing** changes (listed locked → startable). That is **success**, not a compromise.

3. **Only the strongest outcomes**—those that change **lived situation**, **identity problem**, or **world worth inhabiting** in a **new way**—should drive **direct continuation modules** or **aftershock** modules with their own premise.

4. **Default assumption:** New work after a story ships is **memory-first** (echo + flag design), **module-second** (only after explicit justification).

---

## Sequel eligibility rules

Ask whether an ending **earns** more than memory. Favor **no** until proven.

### Direct continuation module

Approve only if **several** of the following are true:

| Criterion | Question |
|---------|----------|
| **New life situation** | Does the POV (or the world around them) enter a **fundamentally different** situation—not just mood, but **constraints, relationships, or stakes** that need a new arc? |
| **New identity problem** | Is there a **new** question of who they are, who they owe, or what they can still claim—**not** resolvable by one epilogue beat? |
| **World worth inhabiting** | Did the world **change** in a way that is **interesting to play inside**, not only to reference in dialogue elsewhere? |
| **Perspective gap** | Is there a **shift** (role, knowledge, genre of agency) that **cannot** be delivered by a smaller reference, rumor, or variant swap? |
| **Mechanical / tonal delta** | Is the follow-up **meaningfully different** in **interaction template**, **story class**, or **player contract**—so it is not “same module, different paint”? |

If the follow-up is “more of the same POV, same template, same core conflict,” **reject** a full module unless you are explicitly shipping a **short epilogue beat** as a **small** scoped entry (still counts toward **branch budget**).

### Aftershock module (another perspective / fallout beat)

Use when the original ending **does not** require the **same** POV’s next chapter, but the **consequences** deserve **playable** treatment from a **different** lens (witness, institution, rival, survivor):

- **Lower bar than direct continuation** on “same protagonist arc,” **higher bar** than echo-only: you still need a **clear interaction premise** (trial, report, documentary frame, duel under new rules).
- **Cap tightly** (see **Branch budget rules**): aftershocks are easy to over-produce.

### World memory / references only

Use when the ending **matters** to the anthology but **does not** need a new module:

- **Echoes** (personal → mythic tier per [`eras_and_scales.md`](eras_and_scales.md))
- **`worldFlags`** and **`unlocks`** on the profile
- **Rumor / teaser / secret list** surfacing (`preDiscoverySurfacing`, mutex gates)
- **Variant selection** for an **existing** template (different boss, different intro, gated scene set)

**Rule:** If you can state the payoff as “later modules **react** to this” without “the player **plays** this next,” you are here.

**Personality & relational variants:** When different **player personality lanes** or **aftermath families** bias **how** a fixed character *relates* (not who they *are*), express that as **template variants** or **small enumerated relational modes**—see **[`personality_continuity_doctrine.md`](personality_continuity_doctrine.md)**. Do not treat every affinity shift as a **new module** or a **new anchor personality**.

**Relational verdicts:** When **named characters** privately **judge** others (moral disgust, loyalty, fear, opportunism, etc.) and **act** on it, persist the **load-bearing** slice as **echoes / flags / verdict-style marks** and **variants**—see **[`relational_verdicts_doctrine.md`](relational_verdicts_doctrine.md)**. Prefer **tone and access changes** over a **new module** per verdict.

---

## Branch budget rules

These are **planning defaults** for a **small team / anthology scale**. Adjust in writing if a “major” story is formally scoped larger—but **never** by silently adding modules.

| Budget item | Default limit | Note |
|-------------|---------------|------|
| **Endings per major story** | **4–6** | More endings = more combinatorial promises; justify each in registry. |
| **Direct continuation modules** per major story | **0–2** | **0** is valid. **2** only if arcs are **clearly distinct** (e.g. institution vs exile), not palette swaps. |
| **Aftershock modules** per major story | **0–3** | Prefer **1** strong aftershock over **3** thin ones. |
| **Everything else** | **Unbounded in design space, bounded in implementation** | Express as echoes, flags, variants, rumors—**cheap to ship**, expensive only in **authoring clarity**. |

**Hard principle:** If a row in [`story_registry.md`](story_registry.md) does not name **which ending(s)** or **echo/flag stack** justify it, it is not approved for implementation—only **concept**.

---

## Direct continuation vs aftershock vs echo

| Tier | What it is | Player experience | Typical unlock |
|------|------------|-------------------|----------------|
| **Direct continuation** | Same narrative lineage, **same or explicitly continued** POV arc; **new** module | “What happens **next** to **them**?” | `requiresEndings`, echoes, flags |
| **Aftershock module** | **Different** POV or frame; **ripples** of the same event | “What does the world **do** with what happened?” | World-gated, witness, outcome_gated |
| **Witness / report / myth module** | Short-to-medium playable **interpretation** artifact; may be **aftershock**-class | “Read the trial / hear the rumor chain / see the archive entry” | Often **one** strong gate |
| **Echo / reference only** | No new module; **memory** shapes text, gates, variants | “I remember; the shelf **changes**” | `globalEchoes`, `worldFlags`, `unlocks` |
| **Variant / boss / encounter swap** | **Same** module id or template family; **data** differs | “Same ring, different champion / same village, different law” | Conditions on echoes + flags |

**Do not** label a **variant** as a **new module** in planning. If the engine loads the same template with different seeds, registry should say **variant**, not a fake sequel row.

---

## Module justification rule

Every proposed **new** follow-up row must declare **one** primary justification:

| Tag | Meaning |
|-----|---------|
| **`real_new_module`** | New `StoryDefinition`, new arc or POV contract; earns its own maintenance line |
| **`template_variant`** | Same template family; gate-driven **data** path—not a separate “sequel” promise |
| **`witness_fragment`** | Small, playable or semi-playable **lens** artifact; scope-bounded |
| **`rumor_teaser_reference`** | Surfacing only; may never become a full module |
| **`world_state_modifier`** | Echo + flag + unlock only; **no** dedicated play module |

If you cannot pick **one** primary tag, the row is **not ready** for P2 implementation.

---

## Good examples (planning universe)

### Gyre — two aftermath families (planning)

**Authoritative write-up:** [`story_concepts/gyre_aftermath_families.md`](story_concepts/gyre_aftermath_families.md).

Gyre may have **many emotional endings**, but **sequel routing** should collapse into **two main aftermath families**:

1. **Survivor** — the visitor **lives**; cost is **psychic / continuity / guilt** (variants inside the family, not separate sequel trees).  
2. **Replacement** — **wrong-one-returned** territory: displacement, substitution, party suspicion; **future** commits beyond the tiny anchor.

- **Direct continuations:** At most **1–2** **total** across both families (e.g. one strong **Survivor** arc, one **Replacement** / inquest arc) — **not** one module per echo.  
- **Aftershocks:** At most **1–3** — witness, rumor, relationship thriller **variants** keyed to **family + echo**, not to every shade of closure.  
- **All other differentiation:** **Echoes**, **marks**, **flags**, **variant intros**, **teasers** — per doctrine’s default.

**Lesson:** Gyre’s power is **combinatorial memory** inside **two buckets**, not **combinatorial sequel list**.

### Verge clan (fictional planning example)

**Verge clan** futures: exile, crown, civil war, absorption by empire, secret survival.

- **Not every clan fate** gets a **full** playable sequel. Many fates are **echo + flag**: “clan scattered,” “clan kingmaker,” “clan extinct on map.”
- **At most one** direct continuation might follow **the** POV who **embodies** the clan’s choice; others might appear as **aftershock** (rival clan POV) or **never** as modules—only as **encounter swaps** in a shared **duel** or **political** template.

**Lesson:** Branching **lore** is cheap; branching **ship list** is expensive—separate them in documentation.

---

## Practical questions (checklist before approving a new branch module)

Answer in the registry row, design note, or PR:

1. **What new lived condition does this create** for the player or POV—not a summary of the old ending, but **what is true on day one** of this module?
2. **What is the new gameplay / interaction premise** (template, beats, pressure model)—not just “more story”?
3. **Why can this not be** echoes + flags + **variant** of an existing module?
4. **Why can this not be** a **witness fragment** or **aftershock** half the length?
5. **What does it cost to build** (scenes, endings, gates, QA) **vs** narrative value **unique** to this module?
6. **Which endings** specifically **unlock** this—so we do not imply false promises for other endings?

**If questions 3–4 have strong answers and 5 is acceptable,** consider approval. **If 1–2 are vague,** reject or downgrade to echo/variant.

---

## Recommended limits (current project scale)

| Parameter | Recommendation |
|-----------|----------------|
| Endings per major story | **4–6** typical; **document** each in endings table |
| Direct continuation modules | **Usually 1**; **2** only with written justification |
| Aftershock modules | **1–3** total per major story; prefer **quality over coverage** |
| Default for most endings | **Echo + world flag + optional unlock id**; **variant** before **new module** |

These align with [`design_doctrine.md`](design_doctrine.md) **Laws of scope** and [`story_registry.md`](story_registry.md) maintenance—**not** every concept row becomes shipped content.

---

## Worked example (shipped): Paladin — one sharp dark continuation

**Paladin Promise** lets **both** core personalities produce a **kneel fracture** with different ruin flags. Only **threshold-qualified** kneels resolve to **`dark_mirror_*`** and commit **`dark_mirror_walks`**, which unlocks a **single** secret proof row (**`paladin_what_walks_after_oath`**). **Fracture-without-ascension** endings keep **`oath_fracture`**, emit **`paladin_fracture_without_ascension`**, and **do not** open that sequel or the catch-all witness row. **Tarnished** surfaces **`paladin_witness_peace_lies`** (quiet compromise, clerk POV). **`broken_saint`** surfaces **`paladin_witness_broken_saint`** (public fracture, acolyte POV) — two **witness flavors**, neither a paladin sequel. **Order/shield** proofs stay order/mercy-shaped. **Current scope:** this **Paladin proof cluster** is treated as **complete**; further anthology work should pivot to other anchors (Verge/Gyre-scale, labs, new eras) rather than expanding Paladin stubs in the short term.

---

## Related docs

- [`design_doctrine.md`](design_doctrine.md) — vision, unlock categories, permanence, templates  
- [`world_connection_doctrine.md`](world_connection_doctrine.md) — how new worlds **inherit** from old ones (modes, levels, approval questions)  
- [`story_registry.md`](story_registry.md) — per-module promises and gates  
- [`unlock_matrix.md`](unlock_matrix.md) — gate patterns  
- [`world_echoes.md`](world_echoes.md) — echo tiers and meaning  
- [`module_templates.md`](module_templates.md) — when a follow-up is a **variant**  
- [`eras_and_scales.md`](eras_and_scales.md) — reach of memory  
- [`story_concepts/gyre_aftermath_families.md`](story_concepts/gyre_aftermath_families.md) — Gyre **Survivor** vs **Replacement** sequel buckets  

---

## Revision

Changes here should trigger a pass on **registry** and **unlock matrix** so “concept” rows do not read like **shipping promises**. Major scope changes: note in [`../cursor_reports/change_log.md`](../cursor_reports/change_log.md).
