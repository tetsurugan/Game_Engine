# Unlock matrix — categories, permanence, chains

**Doctrine:** [`design_doctrine.md`](design_doctrine.md) — especially **Story unlock doctrine** and **Permanence doctrine**. **Cross-world gate intent:** when combining echoes, flags, and worldlines across eras, see [`world_connection_doctrine.md`](world_connection_doctrine.md).

## Player-facing vs internal

- **Unlock categories** below are **design concepts**; the player sees **hints** and **discoverability**, not “outcome-gated” as a label.
- **Story class** (`stable`, `pressured`, …) is **internal**—it must **not** appear as a storefront category for players.

## Unlock categories

| Category | Meaning | Typical implementation |
|----------|---------|------------------------|
| **Open** | On the shelf in the anthology shell | No gate |
| **Outcome-gated** | Earned via **ending** and/or **echo** from prior play | `requiresEchoes` / completed endings |
| **World-state-gated** | **Combinations** of echoes + optional **world flags** | Profile merge; variant picker for templates |
| **Role-gated** | Prior **role / personality / template** | `personalityId` or future `roleId` |
| **Secret / mythic** | **Discovered**; may be hidden from list until true | `secret` + cryptic condition |
| **Mutually exclusive** | Some content **exists because other paths were prevented** | `excludesEchoes`, mutex sets; **closes** menu entries |

### Principles (normative)

- **Core accessible** — Always a credible entry (e.g. Paladin-scale on-ramp).
- **Deeper earned** — Follow-ups need outcomes, not grind.
- **Special discovered** — Mythic entries reward pattern completion.
- **Some stories only because others were blocked** — Design **closing**; document mutex.

## Permanence levels

Aligned with **`design_doctrine.md`**:

| Level | Effect examples |
|-------|-----------------|
| **Soft** | Dialogue bias, small conditional branches |
| **Hard** | Module / route / boss **locked or unlocked**; template **variant** swap |
| **Mythic** | Rare world shape; may **retire** whole variant families |

**Rule:** Hard and mythic outcomes should **open and close** paths, not only append.

### World consequence depth (engine)

For forks that need a **single winning branch** per family (e.g. underground open vs banned), use **`worldlineCommit`** on endings and **`requiresWorldlineBranch`** / **`excludesWorldlineBranches`** on stories. Use **`closeHistoryMarks`** + **`blockedWhenHistoryClosed`** when an outcome should **permanently rescind** a shelf invitation without encoding it as a boolean flag. Still prefer echoes + flags for most content; see **`branch_scope_doctrine.md`**.

## Paladin — aftermath proofs + secret dark proof (shipped)

| Module | Gates | Mutex note |
|--------|--------|------------|
| `paladin_proof_order_echo` | `requiresEndings` faithful_blade + `requiresWorldlineBranch` `paladin_aftermath` / `order_sanctioned` | Incompatible with mercy proof while that worldline holds |
| `paladin_proof_mercy_echo` | `requiresEndings` shield_of_the_weak + `requiresWorldlineBranch` / `mercy_remembered` | Incompatible with order proof while that worldline holds |
| `paladin_witness_peace_lies` | `requiresEndings` **tarnished_oath** + `requiresWorldlineBranch` **`peace_by_lies`** + `requiresWorldConsequenceMarks` **`paladin_compromised_by_lies`**; **`preDiscoverySurfacing` `rumor`** + **`rumorText`** | **Witness** — quiet institutional poison; rumor until gates pass |
| `paladin_witness_broken_saint` | `requiresEndings` **`broken_saint`** + `requiresWorldlineBranch` **`oath_fracture`** + `requiresWorldConsequenceMarks` **`paladin_fracture_catchall`**; rumor pre-discovery | **Witness** — public spiritual wound; **`fracture_bleak_*`** shares **`oath_fracture`** but uses **`paladin_fracture_without_ascension`**, so this row does **not** open for bleak fractures |
| `paladin_what_walks_after_oath` | `requiresUnlockedModuleIds` **`unlock_paladin_what_walks_after_oath`** + `requiresWorldlineBranch` **`dark_mirror_walks`** + `requiresWorldConsequenceMarks` **`paladin_dark_continuity_earned`**; `listPresentationStyle` **secret** | Only after **`dark_mirror_doctrine`** or **`dark_mirror_mercy`**; not after tarnished, ordinary **`fracture_bleak_*`**, order, or shield endings |

**tarnished** → **`peace_by_lies`** + peace witness; **`broken_saint`** (catch-all) → **`oath_fracture`** + catchall mark + broken-saint witness; **`fracture_bleak_*`** → **`oath_fracture`** + **`without_ascension`** mark, no second witness row (scars remain via marks/echoes). Order/mercy proofs and the **secret** row use their own gates. Last Paladin resolution wins on the worldline mutex.

**Dark ladder (design intent):** Multiple personalities can **fall** with different ruin flags; only **threshold-qualified** kneel outcomes become **`dark_mirror_walks`** and grant the internal unlock. Other dark-adjacent outcomes still emit **echoes / marks / worldlines** for the anthology without opening this sequel row.

## Paladin Promise — implemented echoes

| Ending (id) | Echo id | Suggested default tier |
|-------------|---------|------------------------|
| tarnished_oath | `truth_sacrificed_for_peace` | soft→hard when tied to trust collapse |
| shield_of_the_weak | `broke_rank_for_innocent` | hard (order relationship) |
| faithful_blade | `duty_over_compassion` | soft→hard |
| dark_mirror_doctrine | `oathbound_soul_snapped`, `paladin_dark_mirror_doctrine` | hard; continuation-worthy proof |
| dark_mirror_mercy | `oathbound_soul_snapped`, `paladin_dark_mirror_mercy` | hard; continuation-worthy proof |
| fracture_bleak_stern / fracture_bleak_mercy / broken_saint | `oathbound_soul_snapped` | hard; scar / variant hooks without secret sequel |

## Example chains (design)

- **`paladin_fallen_knight`:** requires `oathbound_soul_snapped` (or future `paladin_became_dark`); **mutex** with a “hero of the order” campaign flag if desired.
- **`paladin_order_aftermath`:** requires `duty_over_compassion` and **not** `broke_rank_for_innocent` (world still buys the order).
- **`underground_trial`:** requires `underground_fighting_banned` **or** complementary flags—**variant B** if pits are closed (witness-led), **variant A** if underground echo stack says pits thrive.

## Cross-template effects

- **Duel module** reads echoes: `dark_champion_exists` → grittier presentation and boss pool (**player-facing** copy, not “possessed class”).
- **Righteous path** (`holy_order_kept_control` when implemented) + ban echo → **removes** illegal pit module, **surfaces** tribunal witness module.

## Maintenance

- New gate → classify **category** + **permanence tier**.
- Mutex → document **what closes** as clearly as **what opens**.
- See **`story_registry.md`** for per-module rows.
