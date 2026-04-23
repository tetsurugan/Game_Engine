import { validateStory } from "../../engine/storyEngine";
import type { StoryDefinition } from "../../engine/types";

/**
 * **Witness / aftershock proof** — not a Paladin sequel.
 *
 * Anchored to **`tarnished_oath`** + worldline **`peace_by_lies`**: the lie that
 * saved the square left a different poison — public peace, private doubt, and
 * the work of living beside a story everyone pretends to believe.
 *
 * Same engine gates as other Paladin proofs: `requiresEndings` +
 * `requiresWorldlineBranch` (+ mark so the compromise stack stays explicit).
 *
 * **`preDiscoverySurfacing: "rumor"`** — browse whispers before gates clear; does not
 * grant play or spoil exact unlock steps (see `storyGateEvaluation.ts`).
 */
const definition: StoryDefinition = {
  id: "paladin_witness_peace_lies",
  title: "The Peace We Did Not Believe",
  storyClass: "stable",
  description:
    "After the paladin spoke mercy into a lie: you live in the hush that follows, where the chronicle and the kitchen disagree.",
  playerRole:
    "A chapel clerk who copies what the parish is allowed to remember — and goes home to what it cannot forget.",
  playerTitle: "The Peace We Did Not Believe",
  playerSummary:
    "The absolution is written fair. The well-water still tastes like fear. Someone has to file the lie where it becomes official.",
  playerToneHint: "After Paladin · witness · false peace",
  playerContinuationHint:
    "After the tarnished oath: peace by lies at Highstone, not the paladin’s next ride.",
  continuationOf: { storyId: "paladin_promise" },
  variantGroup: "paladin_proof_aftermath",
  variantId: "peace_by_lies",
  unlockCategory: "outcome_gated",
  authoringAvailability: "shipped",
  era: "medieval_holy_arena_curse",
  moduleTemplate: "narrative",
  preDiscoverySurfacing: "rumor",
  rumorText:
    "Chapel whisper: somewhere the year’s peace was copied fair and square — hand too steady, well-water too quiet afterward. The book says mercy; the kitchen does not.",
  initialSceneId: "witness_peace_ledger",
  requiresEndings: [
    { storyId: "paladin_promise", endingId: "tarnished_oath" },
  ],
  requiresWorldlineBranch: {
    groupId: "paladin_aftermath",
    branchId: "peace_by_lies",
  },
  requiresWorldConsequenceMarks: ["paladin_compromised_by_lies"],
  variables: [],
  scenes: [
    {
      id: "witness_peace_ledger",
      title: "Ink that dries too fast",
      body: [
        "You are not the knight. You are the one who writes the day’s text in the parish copy — names, judgments, the neat line that says *exile by private absolution* where there should have been a scaffold shadow.",
        "Your mother will not read this book. She was in the square. She heard the paladin’s voice make mercy sound like law. She has not spoken ill of it. She has stopped speaking of it at all.",
        "You did not swear the oath that broke. You only make the lie look like scripture when the ink is still wet — and learn which neighbors will meet your eyes over the bucket and which will study the ground.",
        "You sand the quill. Tomorrow the chapter may send a rider who only checks the page, not the well. That is what this peace costs: a clean file and a village that learns to drink quietly.",
      ],
      isTerminal: true,
      choices: [],
    },
  ],
  endings: [
    {
      id: "witness_peace_lies_close",
      title: "Proof logged",
      body: [
        "You close the ledger. The paladin is gone; the lie is official; your hands are clean in every way that counts to the chapter — and dirty in every way that counts to the well. That is the aftershock: not a second ride, but a life beside what was said aloud.",
      ],
      conditions: [],
    },
  ],
};

export const paladinWitnessPeaceLiesStory: StoryDefinition =
  validateStory(definition);
