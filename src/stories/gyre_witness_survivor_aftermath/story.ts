import { validateStory } from "../../engine/storyEngine";
import type { StoryDefinition } from "../../engine/types";

/**
 * **Survivor-family Gyre aftershock** — not a Replacement line, not a sequel arc.
 *
 * POV: road companion who **did not** cross the ash threshold with them — only
 * receives them **after**. Proves damaged survival: same person, **haunted**
 * continuity (planning: `docs/planning/story_concepts/gyre_aftermath_families.md`).
 *
 * **Gate:** `gyre_mythic_anchor_touched` (all shipped anchor endings write it).
 */
const definition: StoryDefinition = {
  id: "gyre_witness_survivor_aftermath",
  title: "Gyre — The Name Still Fits Wrong",
  storyClass: "stable",
  description:
    "They lived. They came back down the path. You share the fire — and learn that survival can arrive like a wound dressed as a body.",
  playerRole:
    "The one who held their pack and waited — companion, not chronicler — watching the returned friend flinch from kindness that used to rest easy.",
  playerTitle: "The Name Still Fits Wrong",
  playerSummary:
    "They speak of themselves in the past tense without noticing. They answer to their name as if it were a loan. You are not mad; you are **sure**.",
  playerToneHint: "After Gyre · witness · haunted survival",
  playerContinuationHint:
    "After the mythic threshold: someone you walked with came back **alive** and not **whole**.",
  continuationOf: { storyId: "gyre_mythic_anchor" },
  variantGroup: "gyre_survivor_aftermath",
  variantId: "companion_witness",
  unlockCategory: "outcome_gated",
  authoringAvailability: "shipped",
  era: "bc_mythic",
  moduleTemplate: "narrative",
  preDiscoverySurfacing: "rumor",
  rumorText:
    "Trail rumor: a traveler came back from the fork with every limb counted — and still sleeps like someone already buried. Their friend does not know what to call it.",
  initialSceneId: "gyre_witness_companion_fire",
  requiresWorldConsequenceMarks: ["gyre_mythic_anchor_touched"],
  variables: [],
  hiddenTruth: {
    flags: [
      {
        id: "companion_read_is_true",
        initialValue: true,
      },
    ],
  },
  scenes: [
    {
      id: "gyre_witness_companion_fire",
      title: "The fire they don't lean into",
      body: [
        "You are not the one the spiral named twice. You only kept the horses calm, the waterskins full, and the small promise: *I will be here when you return from whatever that ash was.*",
        "They returned before dusk. Skin intact. Voice level. They thanked you the way a stranger thanks an inn — correct, distant — then built the fire **facing outward**, as if warmth could come at them from the wrong side.",
        "When you say their name, they answer — but their shoulders **brace** first, the way flesh does before a blow. They have always loved that name. Now it lands like a hand on a bruise they will not show you.",
        "They describe the road in **third person**, once: *he walked it, he thought he understood.* They catch the slip and laugh it off. The laugh is new: thin, practiced, **mourning** something still breathing.",
        "You do not know the mythic bookkeeping. You know **this**: the person who used to steal the last fig and dare you to fight for it now offers you the first ration like **debt**, not like love. Survival, yes — and **wrongness** threaded through the living.",
      ],
      isTerminal: true,
      choices: [],
    },
  ],
  endings: [
    {
      id: "gyre_witness_survivor_logged",
      title: "Witness you don't file",
      conditions: [],
      echoes: ["gyre_survivor_fracture_witnessed"],
      body: [
        "You will not make a sermon of it. You will not accuse a ghost you cannot name. You only know you shared a fire with someone **technically** saved — and the saved self looks at their own hands like borrowed tools.",
        "That is the aftershock the anthology can **witness** without opening the door where someone else wears their face: the survivor **lives**, and the living **is** the damage. You tuck the memory where future nights can find it — when kindness fails, when they flinch again, when you wonder if **you** are safe beside them or only **beside what walked back**.",
        "Small proof, closed here: Gyre’s spiral can **bleed outward** into someone else’s noticing — Survivor-family **only**, grief with a pulse, not substitution. Not yet. Not this beat.",
      ],
    },
  ],
};

export const gyreWitnessSurvivorAftermathStory: StoryDefinition =
  validateStory(definition);
