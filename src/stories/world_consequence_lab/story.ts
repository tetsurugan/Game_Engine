import { validateStory } from "../../engine/storyEngine";
import type { StoryDefinition } from "../../engine/types";

/**
 * Proof: mutex **worldline** commits + **closeHistoryMarks** reshape surfacing.
 * `wc_demo_mutex`: righteous vs fallen. Fallen permanently closes
 * `wc_soft_followup_invitable`, mutex-blocking the soft follow-up.
 */
const lab: StoryDefinition = {
  id: "world_consequence_lab",
  title: "World consequence lab",
  storyClass: "stable",
  description:
    "Demonstrates durable worldlines and history closures from endings.",
  playerRole: "A tester of the anthology’s long memory.",
  playerTitle: "Worldline lab",
  playerSummary:
    "Pick mercy or ruthlessness; the shelf will remember only one branch.",
  playerToneHint: "Dev · world consequences",
  unlockCategory: "open",
  authoringAvailability: "in_dev",
  era: "side_slice_misc",
  moduleTemplate: "narrative",
  initialSceneId: "wc_lab_start",
  variables: [
    { id: "lab_pivot", type: "enum", initialValue: "unset" },
  ],
  scenes: [
    {
      id: "wc_lab_start",
      body: [
        "This module only exists to show **world consequence depth**: one ending commits a mutex worldline; another slams a door that the soft follow-up listens for.",
        "Choose a closing stance.",
      ],
      choices: [
        {
          id: "choose_righteous",
          text: "Hold the line with mercy",
          nextSceneId: "wc_lab_terminal",
          consequences: [
            { type: "setVariable", target: "lab_pivot", value: "righteous" },
          ],
        },
        {
          id: "choose_fallen",
          text: "Pay in blood",
          nextSceneId: "wc_lab_terminal",
          consequences: [
            { type: "setVariable", target: "lab_pivot", value: "fallen" },
          ],
        },
      ],
    },
    {
      id: "wc_lab_terminal",
      body: ["The arena records your stance."],
      isTerminal: true,
      choices: [],
    },
  ],
  endings: [
    {
      id: "wc_end_righteous",
      title: "Mercy recorded",
      body: ["The gentle branch of the demo worldline is now canon."],
      conditions: [
        {
          target: "variables.lab_pivot",
          operator: "eq",
          value: "righteous",
        },
      ],
      echoes: ["wc_lab_terminal_echo"],
      worldlineCommit: { groupId: "wc_demo_mutex", branchId: "righteous" },
      worldConsequenceMarks: ["wc_lab_mercy_committed"],
    },
    {
      id: "wc_end_fallen",
      title: "Blood recorded",
      body: ["The ruthless branch wins; a softer invitation is rescinded."],
      conditions: [
        {
          target: "variables.lab_pivot",
          operator: "eq",
          value: "fallen",
        },
      ],
      priority: -1,
      echoes: ["wc_lab_terminal_echo"],
      worldlineCommit: { groupId: "wc_demo_mutex", branchId: "fallen" },
      closeHistoryMarks: ["wc_soft_followup_invitable"],
    },
  ],
};

const followSoft: StoryDefinition = {
  id: "wc_follow_soft",
  title: "After the merciful line",
  storyClass: "stable",
  description: "Only available on the righteous worldline; sealed if mercy was forfeit.",
  playerRole: "Witness to the gentle commitment.",
  playerTitle: "Soft follow-up",
  playerSummary: "Requires the lab’s mercy worldline; hidden if ruthlessness closed this path.",
  unlockCategory: "outcome_gated",
  authoringAvailability: "in_dev",
  era: "side_slice_misc",
  moduleTemplate: "narrative",
  initialSceneId: "wc_soft_only",
  requiresEchoes: ["wc_lab_terminal_echo"],
  requiresWorldlineBranch: { groupId: "wc_demo_mutex", branchId: "righteous" },
  blockedWhenHistoryClosed: ["wc_soft_followup_invitable"],
  variables: [],
  scenes: [
    {
      id: "wc_soft_only",
      body: [
        "You only see this because the lab ended in **mercy** and the ruthless ending did not seal the soft invitation.",
      ],
      isTerminal: true,
      choices: [],
    },
  ],
  endings: [
    {
      id: "wc_soft_end",
      title: "Echo",
      body: ["The worldline remembers mercy."],
      conditions: [],
    },
  ],
};

const followHard: StoryDefinition = {
  id: "wc_follow_hard",
  title: "After the ruthless line",
  storyClass: "stable",
  description: "Only when the lab committed the fallen branch.",
  playerRole: "Witness to the hard commitment.",
  playerTitle: "Hard follow-up",
  playerSummary: "Opens when the mutex worldline is fallen, not righteous.",
  unlockCategory: "outcome_gated",
  authoringAvailability: "in_dev",
  era: "side_slice_misc",
  moduleTemplate: "narrative",
  initialSceneId: "wc_hard_only",
  requiresEchoes: ["wc_lab_terminal_echo"],
  requiresWorldlineBranch: { groupId: "wc_demo_mutex", branchId: "fallen" },
  variables: [],
  scenes: [
    {
      id: "wc_hard_only",
      body: [
        "You only see this because the lab ended in **blood** — the other shelf thread stays dark.",
      ],
      isTerminal: true,
      choices: [],
    },
  ],
  endings: [
    {
      id: "wc_hard_end",
      title: "Echo",
      body: ["The worldline remembers steel."],
      conditions: [],
    },
  ],
};

export const worldConsequenceLabStory: StoryDefinition = validateStory(lab);
export const worldConsequenceFollowSoftStory: StoryDefinition =
  validateStory(followSoft);
export const worldConsequenceFollowHardStory: StoryDefinition =
  validateStory(followHard);
