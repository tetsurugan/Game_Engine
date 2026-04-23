import { validateStory } from "../../engine/storyEngine";
import type { StoryDefinition } from "../../engine/types";

/**
 * Demonstrates **belief** vs **hidden truth**: objective layer says the alibi
 * checks out; the POV still doubts until a choice updates `belief` only.
 */
const definition: StoryDefinition = {
  id: "belief_inference_lab",
  title: "Belief / inference lab",
  storyClass: "stable",
  description:
    "Engine proof: hidden truth and belief can disagree. Objective alibi is solid; belief starts skeptical.",
  playerRole: "An investigator separating fact from conviction.",
  playerTitle: "Belief lab",
  playerSummary:
    "Hidden truth: alibi verified. Belief: you start unconvinced. One choice only nudges belief.",
  playerToneHint: "Dev · belief.* vs hidden.*",
  unlockCategory: "open",
  authoringAvailability: "in_dev",
  era: "side_slice_misc",
  moduleTemplate: "narrative",
  initialSceneId: "lab_intro",
  variables: [{ id: "case_notes", type: "number", initialValue: 0 }],
  hiddenTruth: {
    flags: [{ id: "alibi_objectively_solid", initialValue: true }],
  },
  belief: {
    flags: [{ id: "trusts_alibi", initialValue: false }],
    variables: [{ id: "certainty", type: "number", initialValue: 10 }],
  },
  scenes: [
    {
      id: "lab_intro",
      title: "Case desk",
      body: [
        "In the data: the alibi is objectively solid (`hidden.flags.alibi_objectively_solid`).",
        "Your read of the witness starts colder (`belief.flags.trusts_alibi` is false).",
        "Choose a path that only updates belief — not hidden truth, not visible stats alone.",
      ],
      choices: [
        {
          id: "credit_witness",
          text: "Accept the alibi in your head (belief only)",
          nextSceneId: "lab_outcome",
          consequences: [
            { type: "setBeliefFlag", target: "trusts_alibi", value: true },
            { type: "incrementBeliefVariable", target: "certainty", value: 15 },
            { type: "incrementVariable", target: "case_notes", value: 1 },
          ],
        },
        {
          id: "stay_skeptical",
          text: "Keep doubting (tick visible notes only)",
          nextSceneId: "lab_outcome",
          consequences: [{ type: "incrementVariable", target: "case_notes", value: 1 }],
        },
      ],
    },
    {
      id: "lab_outcome",
      title: "Resolution",
      body: [
        "Ending picks from `belief.flags.trusts_alibi`. Hidden truth stayed true either way.",
      ],
      isTerminal: true,
      choices: [],
    },
  ],
  endings: [
    {
      id: "end_believes_alibi",
      title: "Conviction shifts",
      body: [
        "You now trust the alibi in the POV layer. Objective file was already clean.",
      ],
      conditions: [
        {
          target: "belief.flags.trusts_alibi",
          operator: "eq",
          value: true,
        },
      ],
      priority: 1,
    },
    {
      id: "end_still_skeptical",
      title: "Doubt remains",
      body: [
        "Belief never flipped; hidden truth still says the alibi holds — tension you can write from.",
      ],
      conditions: [
        {
          target: "belief.flags.trusts_alibi",
          operator: "eq",
          value: false,
        },
      ],
      priority: 0,
    },
  ],
};

export const beliefInferenceLabStory: StoryDefinition = validateStory(definition);
