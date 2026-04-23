# World connection doctrine — how new worlds inherit from old worlds

**Status:** Normative for **planning** and **approval of cross-era / cross-setting links**. It does not replace [`design_doctrine.md`](design_doctrine.md) (vision, unlocks) or [`branch_scope_doctrine.md`](branch_scope_doctrine.md) (sequel vs echo vs variant budget). It **narrows** how one **era**, **setting**, or **story world** should meaningfully relate to another **without** collapsing the anthology into a single flat map or shared geography.

**Related:** [`eras_and_scales.md`](eras_and_scales.md) (time taxonomy), [`world_echoes.md`](world_echoes.md) (memory tiers), [`unlock_matrix.md`](unlock_matrix.md) (gates).

---

## Core principle

**New worlds connect to old worlds through inheritance of meaning—not through mandatory physical adjacency or lazy name-drops.**

Strong connections flow through one or more of:

| Channel | What travels |
|--------|----------------|
| **Memory** | What the anthology (or a character) *remembers* as true, disputed, or lost |
| **Consequence** | What changed in institutions, law, trauma, or possibility because of a prior resolution |
| **Inherited structure** | Orders, dynasties, legal fictions, tournament rules, clan logic—things that *persist* as shapes even when people forget the origin |
| **Myth** | Compressed, distorted, or sanctified versions of what happened—usable across millennia |
| **Witness** | Testimony, rumor, clerks’ books, media, survivor stories—partial by nature |
| **Artifact** | Objects, texts, curses, tech fragments whose *interpretation* bridges eras |
| **Institutional residue** | Bureaucracy, propaganda curricula, archives—memory with a budget and a bias |

A connection that does not use at least one of these channels in a **decision-relevant** way is probably decorative (see [What actually changed?](#what-actually-changed)).

---

## The main connection modes

Use these labels in registry notes, pitch docs, and approval threads. A single link can combine modes (e.g. **artifact** + **witness**).

### Myth connection

**Meaning:** A later world treats an earlier event as **story**, scripture, curse, or founding lie—accuracy is optional; **power of the tale** is not.

**Useful when:** BC/mythic seeds echo in medieval holy content, modern occult framing, or far-future “archaeology of belief.”

**Anthology effect:** Unlocks **tone**, **taboo**, **legitimacy** arguments, and **variant** theologies without requiring the player to have played the myth module first (though rewards if they did). Often pairs with **mythic**-scale echoes.

### Historical connection

**Meaning:** A later world positions an earlier one as **documented or disputed history**—dates, bloodlines, legal precedent, “the stele says.”

**Useful when:** Ancient → medieval mandate; empire → modern court; any beat where **precedent** matters.

**Anthology effect:** **World flags**, **echoes**, and **witness/document** modules; conditions on `profile.completedEndings` or institutional flags.

### Artifact connection

**Meaning:** A **thing** (relic, contract, weapon, curse-mark, AI shard) persists; the new story is about **custody, interpretation, or activation**.

**Useful when:** You need a concrete MacGuffin that is also **continuity-bearing**—not just set dressing.

**Anthology effect:** Flags (“artifact X in vault Y”), echo ids, **variant** intros, optional **unlock** ids from an ending that *bestows* custody.

### Witness / document connection

**Meaning:** The bridge is **who saw what** and **what got written down**—records, rumors, trials, news, archives.

**Useful when:** Aftershock modules, **witness**-class stories, modern media, observer-era documentary framing.

**Anthology effect:** **Witness** stubs (adjacent POV), `belief` vs `hiddenTruth` splits, **surfacing** (rumor/teaser) that foreshadows without spoiling gates.

### Consequence connection

**Meaning:** A prior resolution **changed the rules**—who rules, what is banned, which branch of a mutex worldline holds.

**Useful when:** You need “this anthology profile is **not** the same world state as another” in a **testable** way.

**Anthology effect:** **`worldlineCommit`**, **`worldConsequenceMarks`**, **`closeHistoryMarks`**, **mutex** gates (`excludes*`); strongest alignment with **branch** and **sequel eligibility** debates in [`branch_scope_doctrine.md`](branch_scope_doctrine.md).

### Pattern connection

**Meaning:** No shared proper noun is required; the new world **rhymes** with the old—same moral geometry, same vow structure, same arena logic.

**Useful when:** Slice-of-life or far-future modules should **feel** related without diegetic continuity.

**Anthology effect:** Mostly **echo-only** or **variant** swaps; optional **designer-facing** pattern ids in docs (not necessarily player-facing).

---

## Four levels of connection

Use this ladder to **size** work and avoid over-building. Higher levels are **not** “better”—they are **more expensive** and should pass [`branch_scope_doctrine.md`](branch_scope_doctrine.md).

### Level 1 — Echo only

**Scale:** Memory on the profile; **soft** bias in copy, gates, or small branches elsewhere.

**Engine support:** `EndingDefinition.echoes` → `profile.globalEchoes`; conditions on `echoes` / `requiresEchoes` / `excludesEchoes`; optional **variant** text keyed by echo.

**Enables:** Rumor climate, dialogue, **listed_locked** → **startable** transitions, **mutex** at echo granularity.

### Level 2 — Branch consequence

**Scale:** **One committed fork** per family (or named marks) changes what is **allowed** on the shelf.

**Engine support:** `worldlineCommit`, `worldConsequenceMarks`, `closeHistoryMarks`; story gates `requiresWorldlineBranch`, `requiresWorldConsequenceMarks`, `blockedWhenHistoryClosed`, `excludes*`.

**Enables:** “Only one aftermath wins,” **secret** rows keyed to a **narrow** branch, **lab**-style proofs (e.g. Paladin `paladin_aftermath`).

### Level 3 — Perspective inheritance

**Scale:** A **new playable POV** (witness, clerk, rival institution) lives inside the **aftermath** of an old resolution—not the same protagonist’s mandatory sequel.

**Engine support:** `continuationOf` for **framing**; **witness**-shaped modules with adjacent roles; `preDiscoverySurfacing` rumor/teaser; `belief` / `hiddenTruth` for interpretation drift.

**Enables:** **Aftershock** modules that prove “non-sequel fallout still matters” (see Paladin witness proofs).

### Level 4 — Civilizational inheritance

**Scale:** **Genre of the anthology** shifts for this profile—what *kinds* of modules exist, cosmology, observer canon, empire legitimacy.

**Engine support:** Combinations of **mythic** echoes, hard flags, **mutually_exclusive** unlocks, **secret** mythic gates; often **multiple** fields.

**Enables:** Gyre-scale recurrence, Verge-scale clan reconstruction, **alien_observer**-style archive locks—**use sparingly** and document in registry.

---

## What survived?

When an old world feeds a new one, answer explicitly:

| Survivor | Typical connection mode | Risk if ignored |
|----------|-------------------------|-----------------|
| **Truth** (objective in-fiction) | `hiddenTruth`, flags, marks | Player POV and author notes disagree—use layers intentionally |
| **Myth** | Echo + copy + belief | Sounds deep but changes nothing—pair with **gates** or **tone** shifts |
| **Law** | Flags, worldlines, precedent echoes | “Lore mention” with no rule effect |
| **Trauma** | Personal/world echoes, witness POVs | Cheap pain with no structural echo |
| **Object** | Artifact connection + flags | **Easter egg** object (see [What actually changed?](#what-actually-changed)) |
| **Institution** | World flags, marks, continuations | Same name, different org—clarify continuity or **pattern** link |
| **Bloodline** | Endings, echoes, registry dependency | Genealogy spam without **stakes** |
| **Propaganda** | Belief vs hiddenTruth, witness docs | Flat villainy—tie to **surfacing** or **variant** |
| **Witness memory** | Witness modules, rumor | Omniscient recap—prefer **partial** voices |
| **Observer archive** | Far-future framing, mythic gates | Meta without **play** consequence |

The **answer** should dictate **level** (echo-only vs civilizational) and **which profile fields** you write and read.

---

## Who is doing the remembering?

The **rememberer** shapes whether the link is trustworthy, useful, and playable.

| Rememberer | Typical bias | Design lever |
|------------|--------------|--------------|
| Believer | Sanctified, compressed | `belief` flags; unreliable glory |
| Witness | Partial, sensory | Witness modules; rumor surfacing |
| Child / heir | Mythologized | Time skip; distorted echo names |
| Clerk / institution | Archival, omitting | `hiddenTruth` vs visible flags |
| Cult | Weaponized | Mutex; antagonist surfacing |
| Conqueror | Propaganda layer | Competing flags or echoes |
| Alien observer | Cold taxonomy | Observer template; archive gates |
| Liar | Corrupted trace | Belief vs truth split |
| School / curriculum | Official story | World flags; soft variant copy |
| Survivor | Trauma-forward | Personal echo scale; aftershocks |

**Implication:** The same **old world** event can produce **accurate**, **partial**, **corrupted**, **weaponized**, **sanctified**, or **misunderstood** links depending on POV—encode that in **who** the new module stars and which **layers** (`belief`, `hiddenTruth`) you use.

---

## What actually changed?

A **strong** connection changes at least one of:

- **What stories are possible** (surfacing, mutex, closures)
- **What variants appear** (template B vs A, boss pool, intro swap)
- **What people believe** (`belief` layer, rumor copy)
- **What institutions exist** (flags, worldlines)
- **What power structures survive** (marks, excludes)
- **What emotional tone** the new world carries (pressured narration, witness framing)

**Weak connections (discourage):**

- **Cameo names** with no gate or tone shift
- **Lazy easter eggs** that flatter returning players but **do not** change outcomes
- **Object references** that never touch `echoes`, `flags`, `marks`, `surfacing`, or `variants`

If the only payoff is “I noticed the reference,” prefer **echo-only Level 1** with one honest line in registry—or **cut**.

---

## Practical system mapping

### Old world **writes** (typical)

| Mechanism | What it stores | Good for |
|-----------|----------------|----------|
| `echoes` | Shared memory ids | Level 1+, pattern + myth |
| `worldFlags` | Coarse booleans | Law, institution, artifact custody |
| `worldlineCommit` | Mutex branch per group | Level 2 consequence |
| `worldConsequenceMarks` | Named tags | Fine-grained scars, proofs |
| `closeHistoryMarks` | Permanent “this invitation died” | Hard closures |
| `unlocks` | Module ids | Secret rows, optional tools |
| `belief` / `hiddenTruth` (story runtime) | POV vs objective | Witness / interpretation |

### New world **reads** (typical)

| Mechanism | Role |
|-----------|------|
| `evaluateStorySurfacing` | hidden / rumor / teaser / listed / startable |
| `continuationOf` + `continuationRouting` | Shelf framing, follow-up index—not a second gate |
| `requiresEchoes`, `requiresFlags`, `requiresEndings`, `requiresWorldlineBranch`, `requiresWorldConsequenceMarks` | Composed discovery |
| `excludes*` | Mutex and “this world because that one wasn’t” |
| Profile conditions in play | `profile.*` in `evaluateConditions` |
| Variant groups | Same template, different branch |

**Rule of thumb:** **Writes** should be **few and stable**; **reads** can combine many fields for **surfacing**. If a new module needs six obscure gates, consider **lowering** the connection level or splitting into **variant** first.

---

## Worked examples (planning — do not overclaim implementation)

### Paladin (medieval holy) → later anthology

| Link type | Example | Level |
|-----------|---------|-------|
| Witness aftershock | `paladin_witness_peace_lies`, `paladin_witness_broken_saint` | 3 |
| Narrow continuation | `paladin_what_walks_after_oath` (secret, gated) | 2–3 |
| Order/mercy proof | Worldline mutex proofs | 2 |
| Future court / media | `truth_sacrificed_for_peace`, institutional flags | 1–2 (concept) |

### Gyre (mythic recurrence — concept)

| Link type | Example | Level |
|-----------|---------|-------|
| Myth + pattern | Recurrence wound echoes in unrelated eras | 1 + pattern |
| Cult / stayed-behind | Interpretation fights; `belief` vs `hiddenTruth` | 3–4 |
| Observer archive | Far-future reading of “what recurrence meant” | 4 |

*See [`story_concepts/gyre_mythic_recurrence.md`](story_concepts/gyre_mythic_recurrence.md). **Sequel inheritance:** keep cross-era consumers keyed to **two aftermath families** ([`gyre_aftermath_families.md`](story_concepts/gyre_aftermath_families.md) — Survivor vs Replacement), not one parallel module per emotional ending.*

### Verge (clan / modern — concept)

| Link type | Example | Level |
|-----------|---------|-------|
| Descendants / fake heirs | Bloodline + document connection | 2–3 |
| Rival study | Witness / institution reading the clan wrong | 3 |
| Reconstructed clan logic | Flags + marks for “who owns the name” | 2 |

*See [`story_concepts/verge_clan_mara_verge.md`](story_concepts/verge_clan_mara_verge.md).*

---

## World types (taxonomy)

Useful shorthand for registry **Depends on** / design notes:

| Type | Meaning | When to use |
|------|---------|-------------|
| **Child world** | Clearly **downstream** in time or causality from a parent anchor | Direct continuations, hard sequels—**budget** per [`branch_scope_doctrine.md`](branch_scope_doctrine.md) |
| **Witness world** | Same **event horizon**, different **POV** | Aftershocks, trials, clerk modules |
| **Parallel echo world** | **Pattern** or **myth** link; not same geography | Slice-of-life, far-future rhyme with medieval vow logic |
| **Observer world** | **Meta-archive**, documentary, or alien taxonomy | Mythic reframing; **civilizational** reads of many prior echoes |

---

## Approval questions (checklist)

Before approving a cross-world link or a new module that “ties in” an old one:

1. **What survived** from the old world—and in what form (truth, myth, law, object, trauma)?
2. **Who remembers it**—and with what bias (accurate, partial, corrupted, weaponized)?
3. **What actually changed** in the new world’s possibilities (surfacing, variants, belief, institutions)?
4. Is the link **causal** (branch/mark), **interpretive** (witness/belief), **inherited** (structure/artifact), or **merely decorative**?
5. Could this be **echo-only** or **variant** instead of a **new module**? (Default **yes** until proven otherwise per [`branch_scope_doctrine.md`](branch_scope_doctrine.md).)
6. Does it **over-promise** future modules in the registry? If yes, trim the row or downgrade to concept.

---

## Revision

Changes here should be reflected in **`story_registry.md`** dependency language and, when connection **strength** shifts, in **`world_echoes.md`** / **`unlock_matrix.md`**. Major shifts: note in [`../cursor_reports/change_log.md`](../cursor_reports/change_log.md).
