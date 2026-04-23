import { validateStory } from "../../engine/storyEngine";
import type { StoryDefinition } from "../../engine/types";

/**
 * **Gyre anchor** — current-loop **protagonist** POV facing **Gyre**, who is hostile
 * until the player chooses how the moment **closes**. The **hidden** layer locks the
 * mythic fact: **Gyre is the prior-loop instance of this visitor** (`spiral_stayed_was_prior_visitor`).
 * Gyre never states it; endings that **grasp** the truth are player-side realization only.
 *
 * **Belief:** `grasps_loop_truth` (player sees the doubled identity) × `closure_heals`
 * (bittersweet “good” vs harsher “bad” outcome). Four endings. **Personalities** are
 * the four **Gyre modes** from planning (`gyre_mythic_recurrence.md`), here framing
 * **your bearing** as you approach him.
 */
const definition: StoryDefinition = {
  id: "gyre_mythic_anchor",
  title: "Gyre — The Spiral Names You Twice",
  storyClass: "stable",
  description:
    "You are the one the path favored — come back to the threshold anyway. Someone blocks the ash-line and hates you on sight. He will not say why. The spiral remembers both of you.",
  playerRole:
    "The current-loop protagonist: you crossed the bright fork, then returned to face what the songs never credit.",
  playerTitle: "The One the Path Took",
  playerSummary:
    "Gyre flinches from your voice like a wound reopening. Nothing you did tonight earns that — unless the world is counting debts from a life you do not remember living.",
  playerToneHint: "Mythic · wrong hatred · loop you are not told",
  unlockCategory: "open",
  authoringAvailability: "shipped",
  era: "bc_mythic",
  moduleTemplate: "narrative",
  initialSceneId: "gyre_threshold",
  variables: [{ id: "weariness", type: "number", initialValue: 5 }],
  personalities: [
    {
      id: "gyre_devoted",
      name: "Devoted",
      preview:
        "You reach as if honest witness could matter — ritual care, no editing him out of the story.",
      modifiers: { tags: ["gyre_stance_devoted"] },
    },
    {
      id: "gyre_yearning",
      name: "Yearning",
      preview:
        "You need the name of the injury or a clean never — ambiguity scrapes like grit under skin.",
      modifiers: { tags: ["gyre_stance_yearning"] },
    },
    {
      id: "gyre_resentful",
      name: "Resentful",
      preview:
        "His rage pulls yours up by the root; you did not come to beg a ghost who won't explain.",
      modifiers: { tags: ["gyre_stance_resentful"] },
    },
    {
      id: "gyre_numb",
      name: "Numb",
      preview:
        "You barely feel your own mouth moving; you showed up because something said you had to.",
      modifiers: { tags: ["gyre_stance_numb"] },
    },
  ],
  hiddenTruth: {
    flags: [
      {
        id: "spiral_stayed_was_prior_visitor",
        initialValue: true,
      },
      {
        id: "under_rage_thread_of_care",
        initialValue: true,
      },
    ],
  },
  belief: {
    flags: [
      {
        id: "grasps_loop_truth",
        initialValue: false,
      },
      {
        id: "closure_heals",
        initialValue: false,
      },
    ],
  },
  scenes: [
    {
      id: "gyre_threshold",
      title: "A glare you did not earn",
      body: [
        "Ash packs the seam where the path once split. You are the one who **took** the bright line — the world said **go**, and you went. That should feel like enough.",
        "The figure between you and the hollow does not agree. His shoulders carry a weight that fits **your** outline wrong. When you speak your name, his jaw works as if the syllable **bites** — not because it is false, but because it is **his** in a register you cannot hear yet.",
        "He does not explain. Accusation lives in his breath anyway: *thief*, *late*, *copy of a mercy that should have died here*. You catalog the unfairness. It does not make him stop looking at you that way.",
      ],
      choices: [
        {
          id: "threshold_soft",
          text: "Step into the light between you; hands open, voice low.",
          nextSceneId: "gyre_parley",
          consequences: [{ type: "incrementVariable", target: "weariness", value: -1 }],
          personalityAppendConsequences: {
            gyre_yearning: [
              { type: "incrementVariable", target: "weariness", value: -1 },
            ],
            gyre_numb: [
              { type: "incrementVariable", target: "weariness", value: 1 },
            ],
            gyre_resentful: [
              { type: "incrementVariable", target: "weariness", value: 1 },
            ],
          },
        },
        {
          id: "threshold_firm",
          text: "Hold your ground. You will not be punished for a crime no one names.",
          nextSceneId: "gyre_parley",
          consequences: [{ type: "incrementVariable", target: "weariness", value: 1 }],
          personalityAppendConsequences: {
            gyre_devoted: [
              { type: "incrementVariable", target: "weariness", value: -1 },
            ],
            gyre_resentful: [
              { type: "incrementVariable", target: "weariness", value: -1 },
            ],
          },
        },
      ],
    },
    {
      id: "gyre_parley",
      title: "He still won't say it",
      body: [
        "You offer steadiness. He hears **performance**. You offer grief. He hears **the victor tasting guilt like spice**.",
        "Once, when the wind drops, he almost slips — a fraction of a sentence about **the first time the spiral turned**, about a mouth that swore the same vow you swear. Then the mask slams. He would rather choke than hand you the diagram.",
        "Somewhere under the fury, care **tugs** — wrong season, wrong direction — and he smothers it before you can pretend you earned it.",
      ],
      choices: [
        {
          id: "parley_listen",
          text: "Stop pushing for a verdict. Wait in the quiet with him.",
          nextSceneId: "gyre_tremor",
          consequences: [{ type: "incrementVariable", target: "weariness", value: -1 }],
          personalityAppendConsequences: {
            gyre_devoted: [
              { type: "incrementVariable", target: "weariness", value: -1 },
            ],
            gyre_yearning: [
              { type: "incrementVariable", target: "weariness", value: 1 },
            ],
          },
        },
        {
          id: "parley_demand",
          text: "Demand a word that fits the wound — any word that is not your name twisted.",
          nextSceneId: "gyre_tremor",
          consequences: [{ type: "incrementVariable", target: "weariness", value: 1 }],
          personalityAppendConsequences: {
            gyre_yearning: [
              { type: "incrementVariable", target: "weariness", value: -1 },
            ],
            gyre_numb: [
              { type: "incrementVariable", target: "weariness", value: -1 },
            ],
          },
        },
      ],
    },
    {
      id: "gyre_tremor",
      title: "The spiral shows a seam",
      body: [
        "The ground remembers in layers. One set of prints climbs out; an older set, same length of stride, stops **here** — where he stands — as if the path once refused that body the exit it grants you now.",
        "When he turns, profile cut by ember-light, your reflection **stutters**: not a mirror, not quite a stranger — the hitch in the glass when the story repeats one beat early.",
        "He watches you **notice**. Fear and triumph war in him. He still says nothing. The silence is the last kindness he thinks he can keep: you are not allowed the easy confession; the spiral prefers you **trip** over the truth yourself.",
      ],
      choices: [
        {
          id: "toward_the_cusp",
          text: "Let the wrongness land. Step to the final choice.",
          nextSceneId: "gyre_cusp",
        },
      ],
    },
    {
      id: "gyre_cusp",
      title: "How the gate closes",
      body: [
        "The ash holds its breath. Whatever he was in the **first** turning — hero, coward, sacrifice, thief of his own future — he will not spell it out. The hinge is **you**: do you let the pattern **name** you twice, and what do you do with your hands once it does?",
      ],
      choices: [
        {
          id: "cusp_truth_kind",
          text: "Speak the symmetry aloud — you wore his road — and stay. No running from the doubled life.",
          consequences: [
            { type: "setBeliefFlag", target: "grasps_loop_truth", value: true },
            { type: "setBeliefFlag", target: "closure_heals", value: true },
          ],
        },
        {
          id: "cusp_truth_razor",
          text: "See it, clearly — and reel from yourself. The knowledge cuts; you cannot unsee the theft of his exit.",
          consequences: [
            { type: "setBeliefFlag", target: "grasps_loop_truth", value: true },
            { type: "setBeliefFlag", target: "closure_heals", value: false },
          ],
        },
        {
          id: "cusp_blind_soft",
          text: "Refuse the thought. Offer gentleness anyway — proof or no proof.",
          consequences: [
            { type: "setBeliefFlag", target: "grasps_loop_truth", value: false },
            { type: "setBeliefFlag", target: "closure_heals", value: true },
          ],
        },
        {
          id: "cusp_blind_bitter",
          text: "Call him unjust; turn from the threshold while the spiral keeps its secret.",
          consequences: [
            { type: "setBeliefFlag", target: "grasps_loop_truth", value: false },
            { type: "setBeliefFlag", target: "closure_heals", value: false },
          ],
        },
      ],
    },
  ],
  endings: [
    {
      id: "gyre_loop_truth_mercy",
      title: "Two names, one breath",
      priority: 40,
      conditions: [
        { target: "belief.flags.grasps_loop_truth", operator: "eq", value: true },
        { target: "belief.flags.closure_heals", operator: "eq", value: true },
      ],
      echoes: ["gyre_echo_truth_mercy"],
      worldConsequenceMarks: ["gyre_mythic_anchor_touched"],
      body: [
        "You say it without demanding he forgive the cosmos. The spiral **did** run twice; he **did** stand where you stand before the path changed its mind. His rage cracks — not into softness, into **weather** that can admit rain.",
        "He does not thank you. He does not have to. Something **eases** that is not victory for either of you: only the ugly mercy of being **seen** without the hymn lying about who paid for the exit.",
        "Good here is not clean. It is **shared weight** — and the spiral, for once, does not get to pretend only one of you was real.",
      ],
    },
    {
      id: "gyre_loop_truth_razor",
      title: "The knowledge that does not save",
      priority: 39,
      conditions: [
        { target: "belief.flags.grasps_loop_truth", operator: "eq", value: true },
        { target: "belief.flags.closure_heals", operator: "eq", value: false },
      ],
      echoes: ["gyre_echo_truth_break"],
      worldConsequenceMarks: ["gyre_mythic_anchor_touched"],
      body: [
        "Understanding lands like a blade: **you** are the life that walked when his was refused. Not by your present malice — by the bookkeeping of the loop — and that does not make the fact **lighter**.",
        "He watches you **break** the way he once broke. There is no speech in either of you now, only the wrong kind of mirror: two survivors of the same name, divided by a hinge in time.",
        "This is the bad side of truth — clarity without repair, intimacy without comfort. The spiral keeps turning; you carry a wound that **knows** its shape too well to numb.",
      ],
    },
    {
      id: "gyre_loop_blind_grace",
      title: "Kindness without the diagram",
      priority: 38,
      conditions: [
        { target: "belief.flags.grasps_loop_truth", operator: "eq", value: false },
        { target: "belief.flags.closure_heals", operator: "eq", value: true },
      ],
      echoes: ["gyre_echo_blind_grace"],
      worldConsequenceMarks: ["gyre_mythic_anchor_touched"],
      body: [
        "You do not **force** the pattern to confess. You leave the cosmic arithmetic unfinished — a deliberate mercy toward your own mind, and maybe toward his.",
        "Something in him softens at the edges anyway: not because you solved the riddle, but because you stopped demanding the riddle **bow**. Heat passes between you that needs no ledger.",
        "Good here is **incomplete truth** — a night's peace that might be a lie by morning. You can live inside that gentleness. The spiral does not promise you won't pay for the omission later.",
      ],
    },
    {
      id: "gyre_loop_blind_bitter",
      title: "The gate shut blind",
      priority: 37,
      conditions: [
        { target: "belief.flags.grasps_loop_truth", operator: "eq", value: false },
        { target: "belief.flags.closure_heals", operator: "eq", value: false },
      ],
      echoes: ["gyre_echo_blind_wound"],
      worldConsequenceMarks: ["gyre_mythic_anchor_touched"],
      body: [
        "You choose the story you can **stomach**: he is cruel, arbitrary, mad. The uncanny parallels become noise. The threshold closes behind your anger because anger is simpler than a loop.",
        "He lets you go without pursuit. His silence might be contempt — or grief too deep to waste on someone who refused the seam. You will wonder, later, what you **refused** to see.",
        "Bad here is **lonely righteousness**: you survive intact, proud, and possibly **wrong** in the way that costs someone else everything. The spiral notes your back turned; it does not forget.",
      ],
    },
  ],
};

export const gyreMythicAnchorStory: StoryDefinition = validateStory(definition);
