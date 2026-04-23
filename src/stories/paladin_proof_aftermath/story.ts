import { validateStory } from "../../engine/storyEngine";
import type { StoryDefinition } from "../../engine/types";

/**
 * Small **world-consequence proof** after Paladin Promise: two mutually
 * exclusive aftermath slices keyed on `paladin_aftermath` worldline commits
 * from Paladin endings. Only one branch can hold on the profile at a time.
 */

const orderSanctioned: StoryDefinition = {
  id: "paladin_proof_order_echo",
  title: "The Sanctioned Road",
  storyClass: "stable",
  description:
    "After the faithful blade: the order still speaks with one voice in Highstone’s shadow.",
  playerRole: "A rider under orders that no longer ask what the village remembers.",
  playerTitle: "The Sanctioned Road",
  playerSummary:
    "The mandate held. What follows is inspection, ledger, and the cold weight of being right.",
  playerToneHint: "After Paladin · order held",
  playerContinuationHint: "After the order’s victory at Highstone.",
  continuationOf: { storyId: "paladin_promise" },
  variantGroup: "paladin_proof_aftermath",
  variantId: "order_sanctioned",
  unlockCategory: "outcome_gated",
  authoringAvailability: "shipped",
  era: "medieval_holy_arena_curse",
  moduleTemplate: "narrative",
  initialSceneId: "proof_order_arrival",
  requiresEndings: [
    { storyId: "paladin_promise", endingId: "faithful_blade" },
  ],
  requiresWorldlineBranch: {
    groupId: "paladin_aftermath",
    branchId: "order_sanctioned",
  },
  variables: [],
  scenes: [
    {
      id: "proof_order_arrival",
      title: "Rider from chapter house",
      body: [
        "Dawn on the sanction road: wax seal, fresh ink, the order’s name spelled the same in every margin.",
        "Highstone is behind you, but its file travels ahead. You are not asked what the child felt when the sentence was read — only that the sentence was lawful.",
        "This is the future **order_sanctioned** leaves: clean lines, countable souls, and no public hand on your gauntlet except in ceremony.",
      ],
      isTerminal: true,
      choices: [],
    },
  ],
  endings: [
    {
      id: "proof_order_close",
      title: "Proof logged",
      body: [
        "Enough. The world-consequence proof is satisfied: a Paladin ending committed the worldline, and this aftermath exists **only** while that branch holds — not after mercy’s public defiance, not after lies preserved peace, not after the oath snapped.",
      ],
      conditions: [],
    },
  ],
};

const mercyRemembered: StoryDefinition = {
  id: "paladin_proof_mercy_echo",
  title: "The Hand They Remember",
  storyClass: "stable",
  description:
    "After the shield: the village does not forget who stepped between steel and a child.",
  playerRole: "Someone who returns to a road the order did not sanction.",
  playerTitle: "The Hand They Remember",
  playerSummary:
    "Rank broke; compassion did not. What follows is rumor, bread, and a different kind of danger.",
  playerToneHint: "After Paladin · rank broken",
  playerContinuationHint: "After the shield, not the sentence, at Highstone.",
  continuationOf: { storyId: "paladin_promise" },
  variantGroup: "paladin_proof_aftermath",
  variantId: "mercy_remembered",
  unlockCategory: "outcome_gated",
  authoringAvailability: "shipped",
  era: "medieval_holy_arena_curse",
  moduleTemplate: "narrative",
  initialSceneId: "proof_mercy_arrival",
  requiresEndings: [
    { storyId: "paladin_promise", endingId: "shield_of_the_weak" },
  ],
  requiresWorldlineBranch: {
    groupId: "paladin_aftermath",
    branchId: "mercy_remembered",
  },
  variables: [],
  scenes: [
    {
      id: "proof_mercy_arrival",
      title: "Edge of Highstone",
      body: [
        "You come back without the chapter’s blessing — or with it only as a rumor, depending on who is telling the story.",
        "The square remembers something the ledger does not: a gauntlet lowered for a child, not a verdict.",
        "This is the future **mercy_remembered** leaves: fractured sanction, warm bread from hands that should fear you, and a kind of law the order will call damage.",
      ],
      isTerminal: true,
      choices: [],
    },
  ],
  endings: [
    {
      id: "proof_mercy_close",
      title: "Proof logged",
      body: [
        "Enough. The world-consequence proof is satisfied: only the shield ending opens this branch; the sanctioned road and the other Paladin worldlines cannot surface this slice while their commits hold instead.",
      ],
      conditions: [],
    },
  ],
};

export const paladinProofOrderEchoStory: StoryDefinition =
  validateStory(orderSanctioned);
export const paladinProofMercyEchoStory: StoryDefinition =
  validateStory(mercyRemembered);
