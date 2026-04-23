import { validateStory } from "../../engine/storyEngine";
import type { StoryDefinition } from "../../engine/types";

/**
 * **Secret proof slice** — not every Paladin fall earns a shelf sequel.
 * Requires the **dark ascension** stack from Paladin Promise:
 * `unlock_paladin_what_walks_after_oath` + worldline `dark_mirror_walks` +
 * mark `paladin_dark_continuity_earned` (all emitted together by
 * `dark_mirror_doctrine` / `dark_mirror_mercy` endings).
 *
 * Player-facing title avoids “dark route” jargon; mystery line only when
 * `listPresentationStyle: "secret"` and the row is listed/startable.
 */
const definition: StoryDefinition = {
  id: "paladin_what_walks_after_oath",
  title: "What Walks After the Oath",
  storyClass: "stable",
  description:
    "A rumor of black steel and a surcoat that still fits — proof that some fractures echo louder than others.",
  playerRole:
    "Someone the square will not name cleanly — rider, warning, or both.",
  playerTitle: "What Walks After the Oath",
  playerSummary:
    "The chapter files this under cautionary ink. The road files it under hoofprints that do not stop at the chapel step.",
  playerToneHint: "After Paladin · rumor of the mirror",
  playerContinuationHint:
    "After the oath broke into something the order refuses to catalogue.",
  continuationOf: { storyId: "paladin_promise" },
  variantGroup: "paladin_proof_aftermath",
  variantId: "dark_mirror_walks",
  unlockCategory: "secret",
  authoringAvailability: "shipped",
  era: "medieval_holy_arena_curse",
  moduleTemplate: "narrative",
  isHiddenUntilUnlocked: true,
  listPresentationStyle: "secret",
  secretListHint:
    "They say the one who rose from the dust still wears the surcoat — and waits where sermons end.",
  requiresUnlockedModuleIds: ["unlock_paladin_what_walks_after_oath"],
  requiresWorldlineBranch: {
    groupId: "paladin_aftermath",
    branchId: "dark_mirror_walks",
  },
  requiresWorldConsequenceMarks: ["paladin_dark_continuity_earned"],
  initialSceneId: "what_walks_arrival",
  variables: [],
  scenes: [
    {
      id: "what_walks_arrival",
      title: "Cold dawn, wrong silence",
      body: [
        "You do not ride toward Highstone. You ride **from** the shape of it — the bell, the square, the child’s stare burned into the inside of your visor.",
        "The order will call this a fracture, a caution, a footnote. The anthology remembers it as proof: **not every fall opens a road**, but some falls leave a rider who does not need permission to keep moving.",
        "Enough. This is the secret continuation **proof**: narrow gates, personality-flavored ascension in Paladin Promise, scars for everyone else.",
      ],
      isTerminal: true,
      choices: [],
    },
  ],
  endings: [
    {
      id: "what_walks_proof_close",
      title: "Proof closed",
      body: [
        "The engine has what it needs: a continuation-worthy dark seed, surfaced only when the full combination lands — unlock, worldline, and continuity mark together.",
      ],
      conditions: [],
    },
  ],
};

export const paladinWhatWalksAfterOathStory: StoryDefinition =
  validateStory(definition);
