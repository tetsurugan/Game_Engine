# Module templates

**Doctrine:** [`design_doctrine.md`](design_doctrine.md) — templates are **player-facing genre / interaction shape**; **`storyClass`** is **internal only** (hooks). **Era** buckets live in [`eras_and_scales.md`](eras_and_scales.md).

Templates are **reusable formats** on one **`StoryDefinition` + runtime**—not separate engines. Template id in code: **`StoryModuleTemplateId`** (`src/engine/types.ts`), optional field **`moduleTemplate`** on each story.

---

## Summary matrix

| Template id | Best for | Engine pillars | Echo tendency |
|-------------|----------|----------------|---------------|
| `narrative` | Character drama, vows, moral pressure | conditions, consequences, endings, vows, personalities, `pressuredConfig`, hidden truth | personal → hard |
| `duel_tournament` | Rounds, brackets, ring/court stakes | scenes as phases; same resolver; optional `pressured` for crowd/clock | world variants |
| `survival_instinct` | Scarcity, flight/fight, feral or curse POV | `possessed` (TBD), hidden truth, pressured tiers | hard territory |
| `witness_interpretation` | Trials, transcripts, journalism, rumors | `witness` (TBD); belief vs `hidden.*` | world + personal |
| `distorted_perception` | Unreliable UI, memory gaps | `distorted` (TBD); ending eval vs player text | personal; can mythic |
| `observer_documentary` | Archivist, alien, post-human witness | `witness` + minimal agency patterns | mythic locks |
| `slice_of_life_social` | Low-stakes human beats, social sim lite | stable + light flags | personal / soft |

---

## Narrative module (`narrative`)

- **What it is for:** Default **anthology chapter**: inner life, institutions, slow-burn consequence (e.g. **Paladin Promise**).
- **Engine features:** Full choice graph; `vows`; `variables` / `flags`; endings + `echoes`; **`pressuredConfig`** when stress skews options; **`hiddenTruth`** when the world knows more than the POV.
- **Stories that fit:** Holy orders, family saga, political chamber drama, mythic parables with a **single POV**.
- **Echoes:** Ending-driven; often **personal**, escalating to **world** when institutions break (see [`world_echoes.md`](world_echoes.md)).

---

## Duel / tournament module (`duel_tournament`)

- **What it is for:** Structured conflict with **clear beats**—sports, trial-by-combat, pit fighting, formal duels.
- **Engine features:** Scenes as **rounds** or phases; same `resolveChoice` / endings; **`pressured`** for injury, crowd, clock; optional **mutex** echoes (`underground_fighting_banned`, `dark_champion_exists`).
- **Stories that fit:** `boxer_tournament`, `underground_fight_club`, medieval arena arcs.
- **Echoes:** **World** variants (legality, who is champion); **personal** scars and debts.

---

## Survival / instinct module (`survival_instinct`)

- **What it is for:** Scarcity, territory, curse or **feral** POV—impulse over deliberation.
- **Engine features:** **`possessed` handler (TBD)**; **hidden truth** for real threat vs felt threat; **`pressured`** for panic tiers; vows optional.
- **Stories that fit:** `berserker_curse`, borderlands horror, beast-mark narratives.
- **Echoes:** **Hard** geography or curse marks; predator/prey **world** shifts.

---

## Witness / interpretation module (`witness_interpretation`)

- **What it is for:** “What happened?” without full direct action—trials, depositions, chat logs, rumor triage.
- **Engine features:** **`witness` handler (TBD)**; visible **`variables`** as **inference**; **`hidden.*`** as objective facts; light choice sets, heavy **consequence** on what is **believed** or **published**.
- **Stories that fit:** `court_aftermath`, order inquiries, investigative beats.
- **Echoes:** **World** (verdict climate); **personal** (who was destroyed by testimony).

---

## Distorted / perception module (`distorted_perception`)

- **What it is for:** Unreliable narration, feed glitches, mental health **as mechanics** (respectful framing).
- **Engine features:** **`distorted` handler (TBD)** — forced/mutated **display** text; ending resolution may use **truth** the player never saw; optional hidden truth.
- **Stories that fit:** `ai_psychosis_fragment`, trauma timelines, propaganda POV.
- **Echoes:** Often **personal**; **mythic** if the distortion **redefines** shared reality in-universe.

---

## Observer / documentary module (`observer_documentary`)

- **What it is for:** Non-standard agency—archivist, alien, post-human **recording**; “play” as curation or annotation.
- **Engine features:** **`witness`** + sparse branches; **meta** copy allowed by product; endings as **classification** or **transmission**; often **short** choice surface.
- **Stories that fit:** `alien_observer`, far-future library entities.
- **Echoes:** **Mythic** — which **branch** of the anthology is “canon for this player.”

---

## Slice-of-life / social module (`slice_of_life_social`)

- **What it is for:** Human-scale warmth, comedy, onboarding—**low cosmology**; still can emit **personal** keys for elsewhere.
- **Engine features:** **`stable`** default; light `flags`; minimal hidden truth; optional **personality** flavor.
- **Stories that fit:** `slice_of_life_example`, coffee-shop arc, date-night beat.
- **Echoes:** **Personal** or **soft world**; optional **easter-egg** unlocks only.

---

## How echoes influence templates

| Mechanism | Player-visible outcome |
|-----------|-------------------------|
| Unlock | New module or variant **appears** (hint via `playerUnlockHint`, not raw ids) |
| Mutex | Entry **vanishes** from shelf — world moved on |
| In-story | Different choices **without** exposing engine taxonomy |
| Variant | Same template **family**, different intro / subtitle / cast |

Declare **emitted** and **consumed** echoes per module in **`story_registry.md`** and **`world_echoes.md`**.

---

## Anti-patterns

- One-off minigame with **no template home** → maintenance split.
- Menu labels from **`storyClass`** → violates doctrine.
- Confusing **era** with **template** — era is **when/where** in the anthology world; template is **how it plays**.
