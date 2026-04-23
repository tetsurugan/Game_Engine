import { validateStory } from "../../engine/storyEngine";
import type { StoryDefinition } from "../../engine/types";

/**
 * Minimal pressured module to verify `pressuredNarration` + forced follow-up
 * banners. Safe to ship in dev / concept; not part of the fiction canon.
 */
const definition: StoryDefinition = {
  id: "pressured_narration_lab",
  title: "Pressured narration lab",
  storyClass: "pressured",
  description:
    "A one-beat calibration story: spike tension, trigger a forced scene jump, and read the narration banner.",
  playerRole: "A reader checking engine affordances.",
  playerTitle: "Narration lab",
  playerSummary:
    "Spike lab tension once; pending pressure forces a scene you did not pick. Watch the banner.",
  playerToneHint: "Dev · pressured copy · forced follow-up",
  unlockCategory: "open",
  authoringAvailability: "in_dev",
  era: "side_slice_misc",
  moduleTemplate: "narrative",
  initialSceneId: "lab_entry",
  variables: [{ id: "lab_tension", type: "number", initialValue: 0 }],
  pressuredConfig: {
    inspect: [
      {
        variableId: "lab_tension",
        tiers: [
          {
            whenGte: 4,
            resolutionKind: "forced",
            pendingSignals: [
              {
                type: "forced_followup_scene",
                payload: { sceneId: "lab_pushed" },
              },
            ],
          },
        ],
      },
    ],
  },
  pressuredNarration: {
    postChoiceByKind: {
      forced: [
        "You meant to stay in the entry chamber. The pressure tier disagrees.",
      ],
    },
    sceneArrivalByKind: {
      forced: [
        "The threshold gives way; the story deposits you deeper than your choice implied.",
      ],
    },
  },
  scenes: [
    {
      id: "lab_entry",
      title: "Calibration chamber",
      body: [
        "This module exists to prove the narration layer: one choice spikes internal tension enough that a forced follow-up fires after resolve.",
        "Use the choice below, then read the banner above the scene.",
      ],
      choices: [
        {
          id: "snap",
          text: "Let tension spike (dev)",
          consequences: [
            { type: "incrementVariable", target: "lab_tension", value: 4 },
          ],
          nextSceneId: "lab_entry",
        },
      ],
    },
    {
      id: "lab_pushed",
      title: "Deeper room",
      body: [
        "You are somewhere the calm re-entry would not have placed you. If the lab is wired correctly, you already saw forced post-choice copy and a forced arrival line.",
      ],
      isTerminal: true,
      choices: [],
    },
  ],
  endings: [
    {
      id: "lab_complete",
      title: "Loop closed",
      body: [
        "The narration lab run completes. Remove or gate this module when you no longer need the proof path.",
      ],
      conditions: [],
    },
  ],
};

export const pressuredNarrationLabStory: StoryDefinition =
  validateStory(definition);
