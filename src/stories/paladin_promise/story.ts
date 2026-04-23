import { validateStory } from "../../engine/storyEngine";
import type { StoryDefinition } from "../../engine/types";
import { paladinEndings } from "./endings";
import { paladinPersonalities } from "./personalities";
import { paladinScenes } from "./scenes";

const definition: StoryDefinition = {
  id: "paladin_promise",
  title: "Paladin Promise",
  storyClass: "stable",
  description:
    "A vow-bound paladin is sent to a fearful village where duty, truth, and innocence cannot all survive untouched.",
  playerRole: "A paladin whose divine strength is tied to sacred vows.",
  playerTitle: "Paladin Promise",
  playerSummary:
    "You ride into Highstone at dusk with the order’s mandate in your coat and three vows burning behind your breastplate. The village already knows what steel sounds like.",
  playerRoleHint:
    "You are the law’s edge and its conscience — vows bind your power.",
  playerToneHint: "Highstone · vows · no clean way out",
  unlockCategory: "open",
  era: "medieval_holy_arena_curse",
  moduleTemplate: "narrative",
  authoringAvailability: "shipped",
  initialSceneId: "arrival",
  personalities: paladinPersonalities,
  variables: [
    { id: "divine_favor", type: "number", initialValue: 5 },
    { id: "village_trust", type: "number", initialValue: 0 },
    { id: "order_loyalty", type: "number", initialValue: 0 },
  ],
  vows: [
    {
      id: "protect_innocent",
      title: "Protect the Innocent",
      description: "No bystander's blood on my blade.",
    },
    {
      id: "obey_order",
      title: "Obey the Order",
      description: "Its word is the Light's word until proved otherwise.",
    },
    {
      id: "speak_no_lie",
      title: "Speak No Lie",
      description: "Truth is the last thing a paladin owes the world.",
    },
  ],
  scenes: paladinScenes,
  endings: paladinEndings,
};

// Validate at module load so authoring mistakes surface during development.
export const paladinPromiseStory: StoryDefinition = validateStory(definition);
