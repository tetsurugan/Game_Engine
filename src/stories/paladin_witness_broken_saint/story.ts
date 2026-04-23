import { validateStory } from "../../engine/storyEngine";
import type { StoryDefinition } from "../../engine/types";

/**
 * **Second witness / aftershock proof** (Paladin cluster cap) — not a sequel.
 *
 * Anchored to **`broken_saint`** + **`oath_fracture`** + **`paladin_fracture_catchall`**:
 * the catch-all fracture where something went wrong in the square in a way the
 * order will litigate for years — **public** spiritual wound, not the quiet ink
 * of **`paladin_witness_peace_lies`**.
 *
 * Contrast: peace-lies = institutional compromise & whispered records; this =
 * holiness that **broke visibly**, sigil as warning, belief that no longer fits
 * cleanly in the mouth.
 */
const definition: StoryDefinition = {
  id: "paladin_witness_broken_saint",
  title: "The Light That Left All at Once",
  storyClass: "stable",
  description:
    "After the paladin broke in the open: you were there when the crowd stopped pretending the surcoat still meant what it used to.",
  playerRole:
    "A chapel acolyte who rang the bell that day — and still flinches when steel catches the sun.",
  playerTitle: "The Light That Left All at Once",
  playerSummary:
    "You did not break the vows. You only saw them go — and learned how fast a holy symbol can turn into a story parents shorten for children.",
  playerToneHint: "After Paladin · witness · public fracture",
  playerContinuationHint:
    "After the broken saint: the square’s wound, not the knight’s next chapter.",
  continuationOf: { storyId: "paladin_promise" },
  variantGroup: "paladin_proof_aftermath",
  variantId: "witness_broken_saint",
  unlockCategory: "outcome_gated",
  authoringAvailability: "shipped",
  era: "medieval_holy_arena_curse",
  moduleTemplate: "narrative",
  preDiscoverySurfacing: "rumor",
  rumorText:
    "They say a surcoat still crosses Highstone market — and honest folk look through it, not at it, as if the sigil might answer back wrong.",
  initialSceneId: "witness_broken_square",
  requiresEndings: [
    { storyId: "paladin_promise", endingId: "broken_saint" },
  ],
  requiresWorldlineBranch: {
    groupId: "paladin_aftermath",
    branchId: "oath_fracture",
  },
  requiresWorldConsequenceMarks: ["paladin_fracture_catchall"],
  variables: [],
  scenes: [
    {
      id: "witness_broken_square",
      title: "Bell-mouth, dry",
      body: [
        "You were not the one on your knees. You were the one with rope-burned palms from the bell-rope, throat raw from calling the hour while the square forgot what hour it was.",
        "Before that day you believed the surcoat was a sentence that ended in safety. After, you believe it is a garment — cloth, sweat, someone’s breath inside it who might not be the story anymore.",
        "The order will send questions. The village will send rumors thicker than smoke. You will keep trimming the wick and pretending your hands do not shake when the light catches the wrong edge of a pauldron.",
        "That is the scar out here: not a secret in the ledger — a public unease, a holiness that will not settle back into easy blessing.",
      ],
      isTerminal: true,
      choices: [],
    },
  ],
  endings: [
    {
      id: "witness_broken_saint_close",
      title: "Proof logged",
      body: [
        "You let the bell speak its single note. It does not fix the square. It only proves the world keeps counting time after a saint breaks — and that someone else will always be left holding the rope.",
      ],
      conditions: [],
    },
  ],
};

export const paladinWitnessBrokenSaintStory: StoryDefinition =
  validateStory(definition);
