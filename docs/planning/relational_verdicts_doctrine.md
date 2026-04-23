# Relational verdicts — design doctrine

**Status:** Normative for **planning** how characters’ **private judgments** about each other interact with **facts**, **knowledge**, and **behavior** across modules. **Planning only**—no required engine implementation in this commit.

**Distinct from:** **[`personality_continuity_doctrine.md`](personality_continuity_doctrine.md)** — which covers **who the player is** (continuity lane), **fixed anchors**, and **relational variants** (how a fixed figure *expresses* in a run). **Relational verdicts** cover what **specific characters privately conclude** about **others** and what they **do** with that conclusion.

**Pairs with:** [`design_doctrine.md`](design_doctrine.md), [`branch_scope_doctrine.md`](branch_scope_doctrine.md), [`world_connection_doctrine.md`](world_connection_doctrine.md), [`personality_continuity_doctrine.md`](personality_continuity_doctrine.md), [`story_registry.md`](story_registry.md).

---

## 1. Core concept

A **relational verdict** is:

- **Not** merely an objective fact (“they slept with someone else”).
- **Not** merely a rumor in the air (unowned gossip).
- **Not** merely a static trait on a sheet (“suspicious”).
- **But:** one character’s **private reading / judgment** of another—what they **decide the facts mean** about that person’s character, standing, desirability, danger, or place in the moral world.

**Examples (illustrative):**

- “He’s a scumbag.”
- “She’s dangerous.”
- “He’s pathetic.”
- “She’s loyal.”
- “He’s attractive *because* he’s bad.”
- “She cannot be trusted.”
- “He came back wrong.”
- “She is all that holds us together.”

Verdicts can be **true, false, partial, biased, weaponized, affectionate, ashamed, attracted, disgusted**, or **strategically withheld** (acted on without ever being spoken).

---

## 2. Four layers (do not collapse)

These are **separate**; conflating them causes brittle writing and broken gates.

### Objective event

What **actually happened** in the fiction (including what [`hidden` vs visible / `belief`](../../src/engine/types.ts) layers establish for the engine). This is **not** the same as public knowledge or private meaning.

### Awareness / access

**Who** knows, suspects, overhears, mishears, is lied to, or only half-knows. Same event → different access graphs → different **possible** verdicts.

### Private verdict

What **this** person **decides** it means about **that** person (or about themselves in relation to them). Two people with the **same** access can still **disagree** in verdict.

### Action tendency

What they are **likely to do** because of the verdict: tell, hide, flirt, flee, testify, sabotage, protect, freeze, bank the truth for later. Tendencies can be **soft** (tone shift only) or **hard** (route lock).

**Rule:** Design docs should name which layer is being authored when—**event**, **access**, **verdict**, or **tendency**—before adding echoes or gates.

---

## 3. Why this matters

Later modules should **sometimes** remember not only **what happened**, but:

- **Who knew** (or thought they knew).
- **How they privately judged** it.
- **What they did or refused to do** with that judgment.

That stack is part of what makes the anthology feel **alive**: people carry **their own truths** and **act** on them—even when the player never sees the inner monologue, the **consequences** show up in who appears, who lies, who opens a door, or whose testimony poisons a room.

---

## 4. Concrete examples

### Grounded: cheating in a friend group (same event, divergent verdicts)

- **Objective event:** Partner A cheated; evidence exists.
- **Access:** Friend 1 saw messages; Friend 2 only heard a distorted version; Friend 3 suspects but has no proof.
- **Verdicts:** Friend 1 → moral disgust + protective loyalty to the hurt party; Friend 2 → “he’s trash” + tells the group; Friend 3 → attraction + “forbidden” appetite + **silence**; Friend 4 → pity + distance without confrontation; Friend 5 → misread → spreads a **false** story.
- **Action tendencies:** tell / conceal / flirt / withdraw / weaponize later at trial / seed rumor.

### Project-relevant sketches

| Lane | Verdict layer in play |
|------|------------------------|
| **Rumor Girl** | Friend / witness / court ecosystem: who **believes** what about the dyad; verdicts drive testimony, concealment, and shock-path seeds—not only “the fact” of cheating. |
| **Gyre survivor aftermath** | “He came back **wrong**” vs “he is **traumatized** still human”—same return, different **verdict** → different witness tone, help offered, or fear. |
| **Verge / Mara** | Anchor **fixed**; orbit characters hold different **verdicts** on her (law, savior, trap, necessary monster)—see [`personality_continuity_doctrine.md`](personality_continuity_doctrine.md). Those verdicts bias **execution**, not Mara’s core identity. |
| **Paladin witnesses** | Same compromise or fracture; clerics / laity **read** sanctity, fear, or fracture differently—verdict shapes **what gets recorded** and **who speaks**. |

---

## 5. Scalability

- **Not every NPC** needs a full verdict simulation—only **load-bearing** relationships and **named** consequential actors.
- Keep **verdict sets small** and **meaningful** per lane (a handful, not a spreadsheet per extra).
- Prefer **a few strong verdict categories** (see §9) over combinatorial sprawl.
- When in doubt: **one** sharp verdict + **one** tendency beats five fuzzy ones.

---

## 6. How verdicts affect story flow

Private verdicts should **influence** (when load-bearing):

- Who tells whom; who hides what.
- Who flirts or distances; who testifies or clams up.
- Who becomes **available / unavailable** as ally, witness, rival, or love interest.
- **Route** open/close, **surfacing**, **variant** selection, **mutex** with another witness.

**Quiet effects are valid:** a verdict may **only** close intimacy, remove a future optional scene, or shift **module tone**—no melodrama required.

**Default:** express outcomes through **echoes, flags, marks, variant ids**—see [`branch_scope_doctrine.md`](branch_scope_doctrine.md)—more often than new playable modules.

---

## 7. Alignment with existing doctrine

| Doc | How relational verdicts fit |
|-----|------------------------------|
| [`design_doctrine.md`](design_doctrine.md) | Permanence and memory-first design; verdicts are **content** carried by lightweight **memory**, not savegame dumps. |
| [`branch_scope_doctrine.md`](branch_scope_doctrine.md) | Verdict stacks → **variants / aftershocks / echo-only** before new modules. |
| [`world_connection_doctrine.md`](world_connection_doctrine.md) | Witnesses and institutions **inherit** verdict-shaped memory across eras/settings. |
| [`personality_continuity_doctrine.md`](personality_continuity_doctrine.md) | Player **lane** affects how **others may read the player**; **anchors** stay fixed while **verdicts about them** differ by character. |

---

## 8. Implementation sketch (optional future; doctrine-safe)

**Not a spec.** Possible future-facing patterns:

| Piece | Role |
|-------|------|
| **Objective event writes** | Endings / consequences already emit **echoes**, **marks**, **`worldFlags`**—treat as “event ledger” ids authors can reference. |
| **Awareness flags / marks** | Coarse “Actor X knew class of fact Y” or “suspects only”—**small** boolean or enum, not full knowledge graphs. |
| **Verdict marks** | Named, durable tags: e.g. `witness_verdict_moral_disgust_partner` — **few per story**, documented in registry/concept. |
| **Action-tendency gates** | Conditions on profile: “if verdict mark V + echo E → variant intro Z” or “block intimacy route.” |
| **Later modules** | Read **echoes + flags + marks + variantGroup**; optional **continuationOf**—same as today, with **naming discipline** for verdict-shaped tags. |

**Optional future fields** (explicitly **not** required now): `profile.verdictMarks[]`, or nested maps—only if authoring pain justifies it; start with **marks + echoes** naming convention.

---

## 9. Compact taxonomy of verdict types

Use a **subset** per story—never all at once.

| Category | Short gloss |
|----------|-------------|
| **Moral disgust** | Contempt, write-off, “they’re trash.” |
| **Attraction / appetite** | Desire, including taboo or self-destructive pull. |
| **Pity** | Softens or paralyzes action; can enable condescension. |
| **Fear** | Avoidance, pre-emptive strike, or frozen compliance. |
| **Reverence** | Elevation, excuse-making, orbit. |
| **Distrust** | Hypothesis of bad intent without full proof. |
| **Dependency** | “I need them / we need them”—survival fused to person. |
| **Protective loyalty** | Shielding someone despite cost or ambiguity. |
| **Opportunistic interest** | “Useful,” timing, leverage—not always villainous. |
| **Wrongness / uncanniness** | “Came back wrong,” uncanny valley of the familiar. |

Authors may **merge** nearby categories in planning to keep the set tiny.

---

## 10. Approval checklist

Before shipping a design that leans on verdicts:

1. **What objective event** is being judged (and what is **hidden vs known** to the engine)?
2. **Who knows** it, and **how directly** (proof vs rumor vs intuition)?
3. **Which private verdicts** are **load-bearing** (named characters only)?
4. **What action tendencies** must **later modules** respect (tell, hide, testify, block route)?
5. Could this be **marks + variants** instead of a **new** module or branch tree?
6. Does this **deepen** the world, or add **noise**?

---

## Related docs

- [`personality_continuity_doctrine.md`](personality_continuity_doctrine.md) — player lane, anchors, relational **expression**.
- [`branch_scope_doctrine.md`](branch_scope_doctrine.md) — variant-first discipline.
- [`world_connection_doctrine.md`](world_connection_doctrine.md) — cross-setting witness memory.
- [`world_echoes.md`](world_echoes.md) — echo semantics.

---

## Revision

Substantive changes: note in `docs/cursor_reports/change_log.md` when used as doctrine history; align registry/concept rows if **mark names** or **gate patterns** become normative.
