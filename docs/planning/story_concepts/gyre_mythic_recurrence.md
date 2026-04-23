# Story concept — Gyre (mythic recurrence / stayed-behind self)

**Status:** Planning / archive seed — **proof shipped** as **`gyre_mythic_anchor`** (`src/stories/gyre_mythic_anchor/story.ts`): **visitor / current-loop** POV facing **Gyre** (loop identity **hidden**, never spoken by him); four endings (grasp × closure). This document remains the **full** concept — the playable module is still a **slice**, not the saga.  
**Naming:** This concept was previously discussed under the working name **“Loop”** — that label is **retired** here; **Gyre** is the canonical planning name (spiral, return, wound — **not** “time-loop game” branding).  
**Tone:** Mythic first; **echoes across eras** (BC myth → medieval rumor → modern obsession → observer archive).  
**Engine fit:** [`design_doctrine.md`](../design_doctrine.md), [`branch_scope_doctrine.md`](../branch_scope_doctrine.md), **`hiddenTruth`**, **`belief`**, profile gates, surfacing, variants — see **Hidden truth / belief / visible** below.

**Registry (proof shipped):** `gyre_mythic_anchor` — see [`story_registry.md`](../story_registry.md).  
**Aftermath / sequel buckets (two families):** [`gyre_aftermath_families.md`](gyre_aftermath_families.md) — **Survivor** vs **Replacement**; many emotional endings should **not** multiply top-level sequels.

---

## Core emotional direction

**Gyre** is the **self that stayed behind** so **another version** could **move on** — not necessarily by malice, often by **sacrifice**, **failure absorbed**, or **cosmic bookkeeping**.

The **escaping** self (successor, survivor, “the one who walked free”) may **genuinely care** for Gyre — **love**, **gratitude**, **longing for reunion**, **guilt**, **desire for peace**. None of that is performative by default.

**Gyre** may be **too broken** by **repetition**, **abandonment interpreted as pattern**, or **failure stacked on failure** to **believe** that love is **real**, **enough**, or **safe to trust**. This is **trauma-distorted interpretation**, not a clean **betrayal** story. The tragedy is **epistemic** and **relational**: *I cannot receive what you might truly be offering.*

---

## Core premise

- **The version that stayed:** Gyre holds the **cost** — the **attempts that didn’t work**, the **paths that dead-ended**, the **weight** the other self **didn’t carry to the finish line** (or **couldn’t**, or **was spared**).
- **Accumulation of failed paths:** Each “almost” **etches** Gyre; mythically, **recurrence** can be **literal** (cosmic reset, wound in time) or **psychological** (obsessive return to the same wound); **authoring** should pick **one primary** interpretation per module while **leaving** room for **observer** reinterpretation.
- **Mechanism behind another’s success:** The **other** self’s **escape**, **victory**, or **peace** may **depend** on Gyre **absorbing** the **counterweight** — **hidden** from the world, **invisible** in success stories.
- **Mythic wound in identity and recurrence:** Gyre is a **name** the anthology can **reuse** as **myth**, **cult**, **diagnosis**, **archive tag** — **same wound**, **different retellings** per era.

---

## Why Gyre matters

- **One version escapes; one remains.** The world **celebrates** (or **forgets**) the **leaver**; **Gyre** is **left with** the **remainder** — **memory**, **shame**, **duty**, or **void**.
- **The remained version** may **lose the ability** to credit **sincerity** from the **leaver**: *You left. You won. Your love now feels like **charity**, **guilt money**, or **story you tell yourself** so you can sleep.*
- **Tragedy:** Love **may** be real **in hidden truth**; **belief** in Gyre’s head **may** say **impossible** — **visible** scenes show **gestures** that **read** as **cruel** or **too late** through Gyre’s **filter**.

---

## Interpretations

| Lens | Gyre as… | Anthology use |
|------|-----------|---------------|
| **Literal recurrence entity** | A **being** or **fixed point** in a **pattern** that **repeats** across cycles | Mythic **module**; **mythic** echoes; **observer** “specimen” |
| **Psychological obsession / broken trust** | **No** cosmic clock — **one person** (or POV) **cannot** exit the **mental** spiral | `pressured` / `distorted`; **belief** vs **`hidden.*`** |
| **Tragic sacrificial remnant** | **Chose** to **hold** the line so the other could **go** | **Personal→mythic** echo escalation |
| **Cosmic / systemic necessity** | **Universe** “needs” a **remainder** for **balance** | **Mythic** flags; **mutex** branches |
| **Myth retold across eras** | **Same figure** as **tablet**, **ballad**, **forum creepypasta**, **archive entry** | **`variantGroup`**: `gyre_myth`; **teaser** / **secret** surfacing |

*Implementation:* one **anchor** module need not **prove** all lenses; **aftershocks** and **observer** modules **argue** between them.

---

## Personality variants

Internal **`PersonalityDefinition`** hooks (or **data-driven** “Gyre modes”) — **not** player-facing taxonomy strings.

### Devoted

| | |
|--|--|
| **Needs** | **Proof** that staying **mattered**; **ritual** acknowledgment; **not** to be **edited out** of the leaver’s story. |
| **Love / support** | Can **receive** **consistent**, **patient** presence — **if** it **doesn’t** feel like **pity** or **schedule**. **Breaks** on **inconsistency**. |
| **Ending lean** | **Integration**, **Sanctification** (if framed as **witnessed** devotion), **Collapse** if devotion **turns** to **self-erasure**. |

### Yearning

| | |
|--|--|
| **Needs** | **Reunion** **or** **honest** “never” — **ambiguity** is **torture**. |
| **Love / support** | **Can** receive **hope** **if** backed by **action**; **cannot** receive **hope language** without **follow-through** (feels like **cruel tease**). |
| **Ending lean** | **Release** (if reunion **impossible**), **Claimed Inheritance** (if **grabs** what was **denied**), **Corruption** (if **bargains** with wrong powers). |

### Resentful

| | |
|--|--|
| **Needs** | **Justice** **or** **dominance**; **acknowledgment of harm** — not **quick** forgiveness. |
| **Love / support** | **Hard** to receive as **love**; **reads** as **control** or **absolution for the leaver**. **Pity** is **insult**. |
| **Ending lean** | **Claimed Inheritance**, **Corruption**, **Collapse**; **Release** only if **reframed** as **leaver’s** **defeat**, not **gift**. |

### Numb

| | |
|--|--|
| **Needs** | **Sensation** of **realness**; **end** to **noise**; sometimes **only** **violence** or **void** **pierces** the fog. |
| **Love / support** | **Barely** **registers**; **may** **accept** **presence** as **neutral** **before** **misreading** it. **Grand** declarations **bounce**. |
| **Ending lean** | **Collapse**, **Claimed Inheritance** (impulsive), **Release** (dissociative peace); **Integration** **rare**, **needs** **long** **witness** modules. |

---

## Branch outcomes / endings

Six **major outcome families** for design and **echo** planning (several **ending ids** may map onto one family).

### Release

| | |
|--|--|
| **What happens** | Gyre **lets go** — **dies**, **dissolves**, **steps out of the pattern**, or **accepts** **non-reunion** **without** **taking** the leaver’s life. |
| **Emotional logic** | **Mercy** toward **self** **or** **leaver**; **exhaustion**; **gift** **too** **costly** **to** **hold**. |
| **Unlocks** | **Successor** **grief** / **witness** modules; **myth** of **the** **one** **who** **released**; **soft** **variants** **elsewhere**. |
| **Blocks** | **Claimed Inheritance** **mutex** on **same** **profile** **unless** **multiverse** **explicit**; **some** **“wrong one returned”** **hooks** **dampened**. |
| **Mythic aftershocks** | **`gyre_released`**; **cult** **venerating** **release** **as** **virtue**; **observer** **tags** **“closed** **recurrence** **instance**.” |

### Claimed Inheritance

| | |
|--|--|
| **What happens** | Gyre **kills** **the** **successor** **/ protagonist** **(the** **face** **the** **world** **knew)** **and** **takes** **their** **place** — **identity**, **role**, **party**, **public** **life**. |
| **Emotional logic** | *You **lived** **my** **exit**; **I** **will** **wear** **your** **freedom**.* **Trauma** **plus** **hunger**; **not** **mustache-twirl** **by** **default**. |
| **Unlocks** | **Dedicated** **follow-up**: **wrong** **one** **returned** (see **below**); **myth** **of** **the** **thief** **saint**; **hunter** **of** **recurrence** **beings** **if** **cosmic** **layer** **true**. |
| **Blocks** | **Clean** **successor** **continuity** **without** **variant** **swap**; **some** **“pure** **hero** **arc”** **modules** **mutex**. |
| **Mythic aftershocks** | **`gyre_claimed_inheritance`**, **`gyre_killed_successor`**, **`wrong_one_walks_free`**; **worldFlags** **for** **doppel** **/** **wrong** **heir** **routes**. |

### Collapse

| | |
|--|--|
| **What happens** | Gyre **breaks** **irreparably** — **death** **without** **meaning**, **catatonia**, **cosmic** **snap**, **or** **total** **withdrawal** **from** **relation**. |
| **Emotional logic** | **No** **trust** **left**; **no** **energy** **for** **inheritance**; **void** **wins**. |
| **Unlocks** | **Witness** **/** **mourning** **modules**; **leaver** **guilt** **arcs**; **observer** **“failure** **case”** **documentary**. |
| **Blocks** | **Integration** **without** **retcon** **or** **prequel** **intervention**; **happy** **reunion** **as** **default** **canon**. |
| **Mythic aftershocks** | **Personal** **stain** **echoes**; **optional** **`gyre_collapsed`** **flag**; **myth** **shrinks** **to** **cautionary** **tale**. |

### Integration

| | |
|--|--|
| **What happens** | **Two** **selves** **or** **their** **meanings** **merge** **without** **murder** — **shared** **life**, **shared** **myth**, **or** **explicit** **co-presence** **(rare)**. |
| **Emotional logic** | **Love** **/ truth** **finally** **readable** **to** **Gyre**; **or** **costly** **synthesis** **accepted**. |
| **Unlocks** | **Rare** **continuation**; **variant** **intros** **elsewhere** **(“two** **tones** **in** **one** **voice”)**; **soft** **mythic** **if** **cosmic**. |
| **Blocks** | **Claimed** **Inheritance** **as** **primary** **threat** **on** **same** **timeline**; **some** **split-self** **horror** **routes**. |
| **Mythic aftershocks** | **`gyre_integrated`** **(rare)**; **observer** **interest** **as** **anomaly**. |

### Sanctification

| | |
|--|--|
| **What happens** | Gyre **becomes** **saint**, **seal**, **taboo** **name**, **or** **fixed** **moral** **object** — **frozen** **in** **myth**. |
| **Emotional logic** | **Community** **needs** **Gyre** **as** **symbol** **more** **than** **person**; **Gyre** **accepts** **or** **is** **trapped** **by** **worship**. |
| **Unlocks** | **`myth_of_the_stayed_one_spreads`**; **cult** **/** **order** **modules**; **medieval** **/** **modern** **retellings**. |
| **Blocks** | **Mundane** **therapy** **arc** **tone** **unless** **ironic**; **anonymous** **Gyre** **routes**. |
| **Mythic aftershocks** | **`gyre_sanctified`**; **hard** **flags** **for** **holy** **/** **unholy** **interpretations**. |

### Corruption

| | |
|--|--|
| **What happens** | Gyre **bargains** **with** **wrong** **powers**, **becomes** **predator**, **or** **spreads** **recurrence** **as** **curse**. |
| **Emotional logic** | *If love is a lie, I take what answers — even if it eats me.* |
| **Unlocks** | **`corrupted_recurrence_order`** **stories**; **hunter** **modules**; **enemy** **faction** **using** **Gyre** **myth**. |
| **Blocks** | **Sanctification** **without** **schism** **variant**; **some** **“clean** **myth”** **modules**. |
| **Mythic aftershocks** | **`gyre_corrupted`**; **world** **/ mythic** **flags** **locking** **“pure”** **branches**. |

---

## Claimed Inheritance follow-up (“wrong one returned”)

**Premise:** After **Claimed Inheritance**, **Gyre** **occupies** **the** **successor’s** **slot** — **party**, **family**, **public** **identity**, **mission**.

**Fit:** **Direct** **continuation** **candidate** (see [`branch_scope_doctrine.md`](../branch_scope_doctrine.md)) — **budget** **carefully**; **one** **strong** **module** **may** **suffice** **before** **variants** **only**.

### Beat structure (suggested)

1. **Early:** Gyre **performs** **competence** — **knows** **facts**, **misses** **emotional** **texture** — **laughter** **wrong** **timing**, **comfort** **too** **sharp** **or** **flat**.
2. **Middle:** **Some** **notice** **first** — **pity** **(“something** **happened** **to** **you”)**; **some** **reject** **(“you’re** **not** **them”)**; **some** **deny** **(“stress,** **grief”)**.
3. **Late:** **Suspicion** **consolidates** **or** **fractures** **the** **group** — **not** **always** **horror**; **sometimes** **tragedy** **of** **“we** **needed** **him** **and** **got** **this.”**

### Emotional texture

- Gyre **may** **want** **to** **belong** **and** **may** **loathe** **the** **role** **simultaneously**.
- **Love** **offered** **to** **the** **mask** **may** **deepen** **Gyre’s** **rage** **or** **shame** — *you** **love** **a** **ghost** **I** **killed**.*

### Engine-facing notes

- **`variantGroup`:** `successor_shell` **vs** `gyre_inherited_life`.
- **`hiddenTruth`:** **what** **really** **happened** **to** **the** **predecessor** (may **differ** **from** **what** **Gyre** **says**).
- **`belief`:** **allies’** **belief** **that** **“they’re** **back”** **vs** **Gyre’s** **belief** **that** **they** **see** **through** **him**.

### Unlocks / blocks

- **Unlocks:** **`wrong_one_returned`** **module** **id**; **witness** **modules** **from** **peripheral** **characters**; **observer** **“identity** **fraud** **at** **mythic** **scale.”**
- **Blocks:** **Sequel** **that** **assumes** **unchanged** **successor** **without** **flag** **check**.

---

## Hidden truth / belief / visible state

Gyre is a **reference** **use** **case** **for** **layered** **runtime**:

| Layer | Role in Gyre stories | Example |
|-------|----------------------|---------|
| **`hiddenTruth`** | **Objective** **(in-fiction)** **facts**: **Did** **the** **successor** **truly** **love** **Gyre?** **Did** **they** **intend** **to** **return?** **Was** **sacrifice** **coerced** **by** **fate?** | `hidden.flags.successor_love_sincere` **true** **while** **Gyre** **never** **sees** **proof** **in** **time**. |
| **Visible** **`variables` / `flags`** | **What** **the** **scene** **shows** — **dialogue**, **letters**, **public** **acts** **others** **see**. | **Visible** **trust** **high** **because** **the** **party** **believes** **the** **mask**. |
| **`belief`** | **What** **Gyre** **(or** **POV)** **believes** **is** **true** **about** **the** **leaver’s** **heart**. | **`belief.flags.leaver_love_is_lie`** **true** **even** **when** **`hidden`** **says** **otherwise** — **tragedy** **of** **unbridgeable** **interpretation**. |

**Authoring pattern:** **Conditions** **on** **endings** **can** **mix** **layers** — e.g. **Integration** **might** **require** **`hidden.flags.successor_love_sincere`** **and** **a** **choice** **that** **lowers** **`belief.flags.leaver_love_is_lie`**. **Claimed** **Inheritance** **might** **fire** **when** **`belief`** **hits** **maximum** **distrust** **regardless** **of** **`hidden`**.

---

## Future story hooks

| Module idea | Notes |
|-------------|-------|
| **Wrong one returned** | **Continuation** **after** **Claimed** **Inheritance** — **social** **/ witness** **horror** **or** **tragedy**. |
| **Myth / cult of Gyre** | **Order** **retelling** **Sanctification** **or** **Corruption** **branch**. |
| **Witness: the successor really cared** | **Documentary** **/ trial** **of** **letters**, **logs** — **addresses** **belief** **vs** **hidden**. |
| **Observer / archive reinterpretation** | **Far-future** **lens** — **“specimen** **Gyre-7”** **vs** **“folk** **tale.”** |
| **Corrupted recurrence order** | **Faction** **weaponizing** **stayed-behind** **logic**. |
| **Multiple Gyres** | **Not** **every** **recurrence** **is** **the** **same** **soul** — **schism**, **hunters**, **civil** **war** **of** **remnants**. |
| **Hunter of recurrence beings** | **Antagonist** **or** **player** **role** — **mythic** **/ near-future** **procedural** **horror**. |

---

## Echo / world consequence ideas

**Implementation-friendly** **ids** **(align** **with** **`EndingDefinition.echoes`**, **`worldFlags`**, **`unlocks`** **when** **built)**.

### Personal / hard

| Echo id | Typical branch |
|---------|----------------|
| `gyre_released` | Release |
| `gyre_claimed_inheritance` | Claimed Inheritance |
| `gyre_killed_successor` | Claimed Inheritance (explicit) |
| `wrong_one_walks_free` | Post-inheritance **surface** **route** |
| `gyre_sanctified` | Sanctification |
| `gyre_corrupted` | Corruption |
| `successor_echo_lingers` | **Successor** **still** **“present”** **in** **memory** **/ myth** |
| `myth_of_the_stayed_one_spreads` | Sanctification / **oral** **law** |

### Mythic / civilizational

| Echo id | Notes |
|---------|-------|
| `recurrence_wound_open` | **Cosmic** **layer** **on** |
| `recurrence_wound_sealed` | **Release** **/ Integration** **mythic** **cap** |

### World flags

| Flag id | Meaning |
|---------|---------|
| `gyre_active_in_world` | **Someone** **wearing** **inherited** **life** **/ myth** **walking** |
| `wrong_one_suspected` | **Group** **/ institution** **has** **clue** |
| `cult_of_the_stayed_one` | **Order** **exists** |

### Unlocked module ids (examples)

| Id | Gated by (concept) |
|----|---------------------|
| `wrong_one_returned` | `gyre_claimed_inheritance` |
| `witness_successor_love` | `successor_echo_lingers` + **witness** **priming** |
| `observer_gyre_dossier` | **Mythic** **stack** |
| `recurrence_hunter_prologue` | `gyre_corrupted` **or** `recurrence_wound_open` |

---

## Continuation / variant / surfacing

- **`variantGroup`:** `gyre_myth` **(era-retellings)**; `successor_shell` **(wrong-one** **continuity)**.
- **`continuationOf`:** **Anchor** **`gyre_mythic_anchor`** **→** **`wrong_one_returned`** **etc.**
- **Surfacing:** **Secret** **/ teaser** **default** — **“The** **one** **who** **stayed”** **as** **teaser** **title**; **rumor** **line** **in** **modern** **era** **modules** **before** **mythic** **anchor** **is** **startable**.
- **Profile:** **`requiresEchoes`** **from** **any** **era** **to** **represent** **myth** **bleed**; **`excludesEchoes`** **for** **mutex** **(e.g.** **Integration** **vs** **Claimed** **Inheritance)**.

---

## Titles

1. **Gyre** *(required)*  
2. **The One Who Stayed** *(required)*  
3. **Claimed Inheritance** *(required)*  
4. **Version That Didn’t Leave** *(required)*  
5. **The Wrong One Returned** *(follow-up)*  
6. **Stayed So You Could Go**  
7. **The Myth of the Second Self**  
8. **Recurrence Wound**  
9. **Heir of My Own Absence**  
10. **The Price of Leaving**  
11. **Twin Scar**  
12. **The Leaver’s Ghost** *(successor POV companion piece — optional separate module)*  

---

## Related planning

- [`branch_scope_doctrine.md`](../branch_scope_doctrine.md) — **few** **direct** **continuations**; **Claimed** **Inheritance** **+** **wrong** **one** **returned** **is** **expensive** **—** **justify**.  
- [`story_registry.md`](../story_registry.md) — **placeholder** **`gyre_mythic_anchor`**.  
- [`eras_and_scales.md`](../eras_and_scales.md) — **cross-era** **mythic** **echo** **placement**.  
- [`world_echoes.md`](../world_echoes.md) — **register** **tiers** **on** **implement**.  

---

## Revision

**“Loop”** **is** **not** **used** **in** **registry** **or** **player** **copy** **for** **this** **concept** — **Gyre** **only**. When **implementing**, **add** **`src/stories/`**, **echo** **rows**, **unlock** **matrix** **mutex** **rules**.
