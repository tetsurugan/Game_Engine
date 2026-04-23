# World echoes — canon, candidates, permanence

**Doctrine:** [`design_doctrine.md`](design_doctrine.md) — echoes are **shared memory**, not full save transfer; tie to **soft / hard / mythic** permanence when designing follow-ups. **How worlds connect across eras:** [`world_connection_doctrine.md`](world_connection_doctrine.md). **Era / scale taxonomy:** [`eras_and_scales.md`](eras_and_scales.md).

Echo ids live in `profile.globalEchoes`. They power **unlock rules**, **in-story conditions** (`echoes` target), and **template variant** selection. **Players** learn meaning through **play and copy**, not echo id strings in primary UI.

---

## Echo levels: personal vs world vs mythic

All echoes are stored the same way in the profile; **level** is **design vocabulary** for **how far** a consequence reaches. Use it in **`story_registry.md`** (“Main echo scale”) and when adding rows below.

| Level | Reach | Typical use | Example ids (illustrative) |
|-------|--------|-------------|----------------------------|
| **Personal** | One life, relationship, or secret—may color dialogue or **soft** gates elsewhere | Paladin guilt paths; grudges; “this NPC remembers you” | `truth_sacrificed_for_peace` (in one knight’s arc); `mentor_betrayed_player` *(concept)* |
| **World** | Regional or institutional fact—many modules read it | Law, economy, who is credible, venue open/closed | `underground_fighting_banned`; `holy_order_discredited`; `village_oathbreaker_known` *(concept)* |
| **Mythic / civilizational** | Rewrites **what kind of universe** this is for the player’s anthology | Branch locks, cosmology, observer canon | `god_war_branch_resolved` *(concept)*; `archive_observer_attested` *(concept)* |

**Paladin note:** Ending echoes like `duty_over_compassion` are **personal** in isolation but are documented as **personal → hard** because follow-ups treat them as **load-bearing** for order and witness stories—see [`eras_and_scales.md`](eras_and_scales.md).

---

## Implemented (Gyre — mythic anchor proof)

| Echo id | Level (design) | Meaning | Suggested permanence | Possible later effects |
|---------|----------------|---------|----------------------|------------------------|
| `gyre_echo_truth_mercy` | personal → mythic-leaning | **Grasped** loop identity (Gyre = prior visitor); chose **healing** closure — stayed through the symmetry | soft→hard | Reunion / witness modules; “two names, one breath” canon |
| `gyre_echo_truth_break` | personal → mythic-leaning | **Grasped** the loop; closure **razor** — clarity without repair | hard | Fractured recurrence routes; hunter-of-self interpretations |
| `gyre_echo_blind_grace` | personal → mythic-leaning | **Did not** force the diagram; **kind** closure anyway — incomplete truth | soft→hard | Bittersweet follow-ups; rumor of mercy without confession |
| `gyre_echo_blind_wound` | personal → mythic-leaning | **Did not** grasp the loop; **bitter** leave — righteous anger, secret kept | hard | Armored Gyre / wronged-heir hooks; “shut gate blind” readings |

**Mark:** `gyre_mythic_anchor_touched` — profile flag that this proof has resolved (all four endings write it).

**Aftermath routing (planning):** Shipped **`gyre_echo_*`** outcomes are **Survivor-family** variants (living visitor, differing psychic closure). Future **Replacement**-committing endings would add distinct echoes/marks per [`story_concepts/gyre_aftermath_families.md`](story_concepts/gyre_aftermath_families.md). Prefer **family-level** flags/marks for sequel gates when implemented.

### Gyre — Survivor witness aftershock (shipped)

| Echo id | Level (design) | Meaning | Suggested permanence | Possible later effects |
|---------|----------------|---------|----------------------|------------------------|
| `gyre_survivor_fracture_witnessed` | personal → mythic-leaning | A **companion POV** logged that the returned traveler is **alive but unwhole** — continuity read accurate in `hidden` | soft→hard | Relationship / healer beats; *not* Replacement — distant fear of wrong-face only as subtext |

**Gate:** play **`gyre_witness_survivor_aftermath`** after mark **`gyre_mythic_anchor_touched`**. **`hidden.flags.companion_read_is_true`** in that module (authoring: witness sense grounded).

---

## Implemented (Verge — Mara anchor proof)

| Echo id | Level (design) | Meaning | Suggested permanence | Possible later effects |
|---------|----------------|---------|----------------------|------------------------|
| `verge_proof_orbit_misread` | personal → world-leaning | Cousin **executed** Mara’s ambiguity as **succession permission**; **hidden** was brake not crown | soft→hard | False heir / corridor doctrine; rival study of Verge gossip |
| `verge_proof_dependency_named` | personal → world-leaning | Cousin **held** the pause — named dependency without crowning Theo | soft→hard | Split lineage prep; anti-Theo faction; Mara still center |

**Mark:** `verge_mara_anchor_touched` — proof module resolved (both endings).

**Module:** [`verge_mara_anchor`](../../src/stories/verge_mara_anchor/story.ts) — open entry; [`story_concepts/verge_clan_mara_verge.md`](story_concepts/verge_clan_mara_verge.md) for full clan design (not shipped as one saga).

---

## Implemented (Rumor Girl — modern obsession proof)

| Echo id | Level (design) | Meaning | Suggested permanence | Possible later effects |
|---------|----------------|---------|----------------------|------------------------|
| `rumor_girl_left_with_truth` | personal | Confirmed cheat; **left**; grounded exit | soft→hard | Court/witness tone comparisons |
| `rumor_girl_stayed_anyway` | personal | **Stayed** in wound / attachment | soft→hard | Therapy / pressured fragments |
| `rumor_girl_denial_haze` | personal | **Denial** fog — belief shields fact | soft→hard | Later reckoning routes |
| `rumor_girl_inward_collapse` | personal | **Collapsed** inward; no violence | soft→hard | Care / institution hooks |
| `rumor_girl_self_first` | personal | **Left early** — self-first boundary | soft | Cleaner modern follow-ups |
| `rumor_girl_suspicion_scarred` | personal | Interrogation / **suspicion poison** | soft→hard | Relationship damage variants |
| `rumor_girl_love_died_mixed` | personal | Named hurt; **mixed** death | soft→hard | `rumor_girl_belief_gap_soft` flag pairing |
| `rumor_girl_shock_her_pov` | personal → hard | **Narrow** shock path — her warped hearing | **hard** | Homicide aftermath / court gate |
| `rumor_girl_court_seed_stack` | personal → world | **Seeds** witness/court contrast (intent vs POV) | hard | `court_aftermath` / statement modules |

**Marks:** `rumor_girl_proof_resolved` (all endings); `rumor_girl_fatal_aftermath_seeded` (shock only).

**World flags (endings):** `rumor_girl_witness_aftermath_invited` (shock); `rumor_girl_belief_gap_soft` (leave / mixed — softer record contrast).

**Module:** [`rumor_girl`](../../src/stories/rumor_girl/story.ts) — open; **not** supernatural by default; shock **non-default**.

### Implemented — `court_aftermath` (Rumor Girl record slice)

| Echo id | Level (design) | Meaning |
|---------|----------------|---------|
| `rumor_girl_court_aftermath_logged` | personal → world-leaning | Friend/witness read **neutral record language** against **private verdict**; aftermath consumer proves intent vs POV after the file exists |

**Mark:** `rumor_girl_court_aftermath_touched` — this proof module resolved.

**Gate:** mark **`rumor_girl_proof_resolved`** + **`requiresAnyFlags`**: `rumor_girl_witness_aftermath_invited` **or** `rumor_girl_belief_gap_soft` (engine OR). Rumor strip before discovery.

**Module:** [`court_aftermath`](../../src/stories/court_aftermath/story.ts) — **`continuationOf`** **`rumor_girl`**; variant group **`rumor_girl_court_aftermath`** / **`friend_record`**.

---

## Implemented (Paladin Promise)

| Echo id | Level (design) | Meaning | Suggested permanence | Possible later effects |
|---------|----------------|---------|----------------------|-------------------------|
| `duty_over_compassion` | personal | Order obedience outweighed shielding innocents (in this slice) | soft→hard | Order-favored routes, lawful duel bonuses, colder witnesses |
| `broke_rank_for_innocent` | personal | Defied superiors for the vulnerable | **hard** | Order suspicion, underground/witness surfacing, discredit chains |
| `truth_sacrificed_for_peace` | personal | Lied to stabilize the moment | soft→hard | Confession/trial bias; distorted foreshadowing |
| `oathbound_soul_snapped` | personal → mythic-leaning | Vows fractured; psychological / spiritual break | **hard / mythic** | Fallen-knight modules; darker tournament intros |
| `paladin_dark_mirror_doctrine` | personal → hard | Stern kneel ascension: doctrine twisted to cruelty | hard | Secret continuation + institutional rumor hooks |
| `paladin_dark_mirror_mercy` | personal → hard | Merciful kneel ascension: grief-scale protector break | hard | Secret continuation + witness hooks |

### Paladin worldline family (`paladin_aftermath`)

Engine field on profile: **`worldlineBranches.paladin_aftermath`** — set by **`worldlineCommit`** on each Paladin ending (mutex: last Paladin resolution wins). Branches: **`order_sanctioned`** (faithful blade), **`mercy_remembered`** (shield), **`peace_by_lies`** (tarnished), **`oath_fracture`** (ordinary fracture + catch-all broken saint), **`dark_mirror_walks`** (continuation-worthy dark ascension — stern or compassionate threshold met on kneel). Shipped proof modules: **`paladin_proof_order_echo`**, **`paladin_proof_mercy_echo`**; **witness pair** — **`paladin_witness_peace_lies`** (`tarnished_oath` / **`peace_by_lies`** / compromise mark) and **`paladin_witness_broken_saint`** (`broken_saint` / **`oath_fracture`** / **`paladin_fracture_catchall`**, distinct from **`fracture_bleak_*`** marks); **secret** **`paladin_what_walks_after_oath`**. *Paladin proof cluster considered complete for the current scope.*

**Dark trajectory echoes (Paladin):** `paladin_dark_mirror_doctrine`, `paladin_dark_mirror_mercy` — emitted only on the **ascension** endings; ordinary fracture paths keep `oathbound_soul_snapped` only.

**World consequence marks (illustrative, Paladin dark ladder):**

| Mark id | When set | Role |
|---------|----------|------|
| `paladin_dark_continuity_earned` | `dark_mirror_*` endings | Proves “this fall earned the secret continuation gate” (with unlock + worldline) |
| `paladin_dark_doctrine_ascension` / `paladin_dark_mercy_ascension` | Matching ascension ending | Flavor / future witness or variant hooks |
| `paladin_fracture_without_ascension` | `fracture_bleak_*` | Scar without secret sequel |
| `paladin_fracture_catchall` | `broken_saint` | Odd vow fracture |
| `paladin_compromised_by_lies` | `tarnished_oath` | Compromise path still load-bearing |
| `paladin_order_sentence_borne` | `faithful_blade` | Order path consequence tag |

---

## Planned / illustrative

Implement when a module **emits** them; document **tier** + **level** here when live.

| Echo id | Level | Meaning | Typical tier | May affect |
|---------|-------|---------|--------------|------------|
| `paladin_became_dark` | personal / world | Ruthless oath-breaker path | hard / mythic | Duels, antagonist intros |
| `holy_order_kept_control` | world | Institution still credible in region | hard | “Clean” tournament variants, witness bias |
| `holy_order_discredited` | world | Trust in order collapsed | hard | Mutex with order-hero content; underground up |
| `underground_fighting_banned` | world | Pits / illegal combat shut down | **hard** | Duel template **B**; witness raid story |
| `dark_champion_exists` | world | Might-without-mercy figure known | hard | Grim modules; mutex with “clean champion” arc |
| `beast_marked_territory` | world | Feral / curse story marked ground *(example)* | hard | Healing, monster POV, witness rumors |
| `rumor_verdict_public` | world | Court of opinion decided *(concept)* | soft→hard | `court_aftermath`, media modules |
| `ai_awakening_suspected` | personal → mythic | Civilizational hinge *(concept)* | mythic | Observer / far-future branches |

---

## Echo “consumption” (design meaning)

- **Unlock consumption:** profile is read to **include/exclude** modules (and **close** mutex paths)—not deletion of echoes.
- **In-story consumption:** conditions check echoes; **optional** future “spent” flags only if doctrine explicitly adds them (default: echoes **persist** as memory).

---

## World consequence depth (engine)

**Profile fields** (`worldlineBranches`, `worldConsequenceMarks`, `closedHistoryMarks`) complement echoes and **`worldFlags`**: mutex **worldlines**, named **marks**, and **permanent closures** drive **`evaluateStorySurfacing`** without a second evaluator. See **`docs/CHATGPT_CODEBASE_BRIEFING.md`** — World consequence depth.

| Echo / id (illustrative) | Notes |
|--------------------------|--------|
| `wc_lab_terminal_echo` | Emitted by **`world_consequence_lab`** endings; gates the two follow-up stubs (`in_dev`). |

---

## Naming

- `snake_case`, stable once shipped.
- Prefer **fact + stance** over prose.

---

## Adding an echo

1. Emit from ending (or rare consequence) in content.
2. Add here with **meaning**, **level** (personal / world / mythic), and **default permanence tier**.
3. Update **`story_registry.md`** (unlocks/closes) and **`unlock_matrix.md`** if gates or mutex change.
