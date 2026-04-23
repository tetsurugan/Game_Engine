# Roadmap — The Vow Between / POV story engine

**Binding design rules:** [`design_doctrine.md`](design_doctrine.md) (shared-consequence universe, internal vs player-facing language, unlocks, permanence, templates).

## Vision

Build a **modular anthology** of short interactive pieces—narrative first, then **module templates** (duels, survival beats, interpretation puzzles)—that share:

- a **data-driven engine** (conditions, consequences, endings, echoes, hidden truth),
- a **persistent profile** (echoes, completion, unlocks, future world flags),
- and **cross-story memory** so outcomes **open and close** what exists later (routes, bosses, template variants, genres).

The product is a **library of small worlds** tied together by **echoes and gates**, not a single novel. **Story classes** (`stable`, `pressured`, …) are **internal architecture only**—see doctrine; players discover tone through **title, summary, and play**, not dev labels.

## Major phases

| Phase | Focus | Outcome |
|-------|--------|--------|
| **1 — Engine foundation** | Types, validation, resolution, persistence, hooks, pressured + pending flush, hidden truth | New entries are **data**; **no engine fork per genre** |
| **2 — Unlock & permanence layer** | Gate resolution, mutex, world flags, `unlocks` enforcement, belief/inference vs truth (where needed) | Anthology **remembers**; paths **close** as well as open |
| **3 — Presentation layer** | Player-facing metadata (summary, hint, tone); **no `storyClass` in primary UI** | Doctrine-compliant shell |
| **4 — Second-wave modules** | 2–3 new entries across **templates** | Proves template + echo design |
| **5 — Polish & tooling** | CI, authoring checklist, optional debug (internal labels OK), packaging | Sustainable production |

## Engine-first roadmap (near term)

1. **Unlock + mutex in app** — filter `storyRegistry` by profile; support **exclusions** (permanence doctrine).
2. **World flags on profile** — coarse **hard/mythic** gates alongside echoes (`design_doctrine.md`).
3. **`witness` handler** — interpretation / indirect agency.
4. **`distorted` handler** — forced/mutated **player-facing** copy vs eval state (`evaluationState`).
5. **`possessed` handler** — partial override; config-driven like pressured where possible.
6. **Echo-driven unlock API** — single `getAvailableStories(profile)` (and variant selection for templates).

## Module-template roadmap

Templates are **reusable interaction formats** (player-facing genre), implemented as **conventions** on the same `StoryDefinition` / runtime—see **`module_templates.md`**, **`eras_and_scales.md`** (which eras favor which templates), and doctrine. Optional **`moduleTemplate`** on `StoryDefinition` keeps code aligned with planning.

| Template | Notes |
|----------|--------|
| Narrative | Default anthology entry |
| Duel / tournament | Phase/scene structure; echo-picked **variants** |
| Survival / instinct | Often pairs with internal `possessed` + hidden truth |
| Witness / interpretation | Belief vs `hidden.*` |
| Distorted / perception | Unreliable presentation vs truth |
| Observer / documentary | Archivist or non-human POV; sparse agency |
| Slice-of-life / social | Low-stakes onboarding and personal keys |

## Core engine vs content vs presentation

| Layer | Owns |
|-------|------|
| **Engine** | Conditions, hooks, persistence, gates resolution |
| **Content** | Scenes, choices, endings, echo ids, `hiddenTruth` authoring |
| **Player presentation** | Titles, summaries, unlock hints, tone—**never** raw `storyClass` on primary UI |

## How this doc stays current

- **Doctrine changes first** → then this file, **`backlog.md`**, registry, matrix, echoes, templates.
- **`backlog.md`** holds granular tasks; this file stays **strategic**.
