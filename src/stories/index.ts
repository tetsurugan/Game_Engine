import type { StoryDefinition } from "../engine/types";
import { beliefInferenceLabStory } from "./belief_inference_lab/story";
import { gyreMythicAnchorStory } from "./gyre_mythic_anchor/story";
import { gyreWitnessSurvivorAftermathStory } from "./gyre_witness_survivor_aftermath/story";
import { vergeMaraAnchorStory } from "./verge_mara_anchor/story";
import { courtAftermathStory } from "./court_aftermath/story";
import { rumorGirlStory } from "./rumor_girl/story";
import {
  paladinProofMercyEchoStory,
  paladinProofOrderEchoStory,
} from "./paladin_proof_aftermath/story";
import { paladinPromiseStory } from "./paladin_promise/story";
import { paladinWhatWalksAfterOathStory } from "./paladin_what_walks_after_oath/story";
import { paladinWitnessBrokenSaintStory } from "./paladin_witness_broken_saint/story";
import { paladinWitnessPeaceLiesStory } from "./paladin_witness_peace_lies/story";
import { pressuredNarrationLabStory } from "./pressured_narration_lab/story";
import {
  worldConsequenceFollowHardStory,
  worldConsequenceFollowSoftStory,
  worldConsequenceLabStory,
} from "./world_consequence_lab/story";

/**
 * Registry of all playable stories. Add new entries here. The engine itself
 * has no knowledge of individual stories; they are looked up through this
 * registry.
 */
export const storyRegistry: StoryDefinition[] = [
  paladinPromiseStory,
  paladinProofOrderEchoStory,
  paladinProofMercyEchoStory,
  paladinWhatWalksAfterOathStory,
  paladinWitnessPeaceLiesStory,
  paladinWitnessBrokenSaintStory,
  gyreMythicAnchorStory,
  gyreWitnessSurvivorAftermathStory,
  vergeMaraAnchorStory,
  rumorGirlStory,
  courtAftermathStory,
  pressuredNarrationLabStory,
  beliefInferenceLabStory,
  worldConsequenceLabStory,
  worldConsequenceFollowSoftStory,
  worldConsequenceFollowHardStory,
];

export function getStoryById(id: string): StoryDefinition | undefined {
  return storyRegistry.find((s) => s.id === id);
}
