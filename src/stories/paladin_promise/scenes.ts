import type { SceneDefinition } from "../../engine/types";

/**
 * Four scenes, flowing linearly, with branching only in vow/flag state.
 * The decisive branching happens in `breaking_point`, whose choices have no
 * nextSceneId and therefore trigger ending resolution.
 */
export const paladinScenes: SceneDefinition[] = [
  {
    id: "arrival",
    title: "Arrival at Highstone",
    body: [
      "You ride into Highstone at dusk. The stone road is empty where it should not be. Shutters close one by one as your shadow crosses the square.",
      "The order's letter burns behind your breastplate. A name. A village. A mandate. A word too weighty to unfold in the saddle.",
      "The village elder waits on the steps of the chapel. His hands are folded too tightly. Behind him, a child watches you from a doorway and does not look away.",
    ],
    choices: [
      {
        id: "declare_mandate",
        text: "Dismount and declare the order's mandate where all can hear it.",
        nextSceneId: "sanctuary",
        consequences: [
          { type: "incrementVariable", target: "order_loyalty", value: 2 },
          { type: "incrementVariable", target: "village_trust", value: -2 },
          { type: "setFlag", target: "threatened_villagers", value: true },
        ],
        personalityAppendConsequences: {
          stern_devout: [
            { type: "incrementVariable", target: "order_loyalty", value: 1 },
          ],
          compassionate_convert: [
            { type: "incrementVariable", target: "village_trust", value: 1 },
          ],
        },
      },
      {
        id: "reassure_villagers",
        text: "Raise an open hand. Say you are here to listen before you are here to judge.",
        nextSceneId: "sanctuary",
        consequences: [
          { type: "incrementVariable", target: "village_trust", value: 2 },
          { type: "incrementVariable", target: "order_loyalty", value: -1 },
          { type: "setFlag", target: "reassured_villagers", value: true },
        ],
        personalityAppendConsequences: {
          compassionate_convert: [
            { type: "incrementVariable", target: "divine_favor", value: 1 },
          ],
          stern_devout: [
            { type: "incrementVariable", target: "order_loyalty", value: -1 },
          ],
        },
      },
      {
        id: "observe_in_silence",
        text: "Say nothing. Let the silence speak first.",
        nextSceneId: "sanctuary",
        consequences: [
          { type: "incrementVariable", target: "village_trust", value: 1 },
        ],
        personalityAppendConsequences: {
          stern_devout: [
            { type: "incrementVariable", target: "order_loyalty", value: 1 },
          ],
          compassionate_convert: [
            { type: "incrementVariable", target: "village_trust", value: 1 },
          ],
        },
      },
      {
        id: "quote_scripture",
        text: "Quote the First Oath aloud, so the village knows whose steel has arrived.",
        nextSceneId: "sanctuary",
        conditions: [{ target: "personality", operator: "eq", value: "stern_devout" }],
        consequences: [
          { type: "incrementVariable", target: "order_loyalty", value: 3 },
          { type: "incrementVariable", target: "village_trust", value: -3 },
          { type: "setFlag", target: "threatened_villagers", value: true },
        ],
        personalityAppendConsequences: {
          stern_devout: [
            { type: "incrementVariable", target: "divine_favor", value: -1 },
          ],
        },
      },
      {
        id: "kneel_to_child",
        text: "Kneel in the dust, meet the child's eyes, tell her no one will be dragged from her house tonight.",
        nextSceneId: "sanctuary",
        conditions: [
          { target: "personality", operator: "eq", value: "compassionate_convert" },
        ],
        consequences: [
          { type: "incrementVariable", target: "village_trust", value: 3 },
          { type: "setFlag", target: "promised_child", value: true },
        ],
        personalityAppendConsequences: {
          compassionate_convert: [
            { type: "incrementVariable", target: "divine_favor", value: 1 },
          ],
        },
      },
      {
        id: "memory_of_faithful_blade",
        text: "The square remembers how you judged here before—the mandate over the child. The stones expect your steel to fall the same way again.",
        nextSceneId: "sanctuary",
        conditions: [
          {
            target: "profile.completedEndings.paladin_promise",
            operator: "includes",
            value: "faithful_blade",
          },
        ],
        consequences: [
          { type: "incrementVariable", target: "order_loyalty", value: 1 },
          { type: "incrementVariable", target: "village_trust", value: -1 },
        ],
      },
    ],
  },

  {
    id: "sanctuary",
    title: "The Sanctuary",
    body: [
      "Inside the chapel the air is cold. Tallow smoke. Old incense. The elder speaks slowly, as if each word might be the wrong one.",
      "The accused, he says, is a healer. Mira. She sheltered a man the order named a traitor during the border war. The man died anyway. She kept a child of his alive.",
      "He will not tell you where she is. Not yet. But his eyes flick, once, toward the grain cellar beneath the altar.",
    ],
    choices: [
      {
        id: "demand_surrender",
        text: "Command the elder to surrender the accused in the name of the order.",
        nextSceneId: "village_search",
        consequences: [
          { type: "incrementVariable", target: "order_loyalty", value: 2 },
          { type: "incrementVariable", target: "village_trust", value: -2 },
          { type: "setVowState", target: "protect_innocent", value: "strained" },
        ],
        personalityAppendConsequences: {
          stern_devout: [
            { type: "incrementVariable", target: "order_loyalty", value: 1 },
            { type: "incrementVariable", target: "divine_favor", value: -1 },
          ],
          compassionate_convert: [
            { type: "incrementVariable", target: "village_trust", value: 1 },
            { type: "setVowState", target: "protect_innocent", value: "kept" },
          ],
        },
      },
      {
        id: "ask_who_she_is",
        text: "Ask, quietly, who Mira was before the order put a word on her.",
        nextSceneId: "village_search",
        consequences: [
          { type: "incrementVariable", target: "village_trust", value: 2 },
          { type: "incrementVariable", target: "order_loyalty", value: -1 },
        ],
        personalityAppendConsequences: {
          compassionate_convert: [
            { type: "incrementVariable", target: "divine_favor", value: 1 },
          ],
          stern_devout: [
            { type: "incrementVariable", target: "order_loyalty", value: -1 },
          ],
        },
      },
      {
        id: "promise_protection",
        text: "Promise the elder that no one under this roof will be harmed by your hand tonight.",
        nextSceneId: "village_search",
        consequences: [
          { type: "incrementVariable", target: "village_trust", value: 3 },
          { type: "setVowState", target: "obey_order", value: "strained" },
          { type: "setFlag", target: "promised_child", value: true },
        ],
        personalityAppendConsequences: {
          compassionate_convert: [
            { type: "incrementVariable", target: "village_trust", value: 1 },
            { type: "incrementVariable", target: "divine_favor", value: 1 },
          ],
          stern_devout: [
            { type: "incrementVariable", target: "order_loyalty", value: 1 },
          ],
        },
      },
    ],
  },

  {
    id: "village_search",
    title: "The Cellar Door",
    body: [
      "You find Mira in the grain cellar. She is smaller than the letter had suggested. She does not beg. She only asks, very evenly, whether the child she raised will be safe before she dies.",
      "Hoofbeats on the stone above. Ser Calen, your superior, rides in with two knights. The square fills. A priest of the order lifts his voice to prepare the people for a public sentence.",
      "Calen's voice carries down into the cellar. 'Bring her out, brother. The order has spoken. She is to die in the square before nightfall.'",
    ],
    choices: [
      {
        id: "submit_to_calen",
        text: "Lift Mira to her feet. Walk her toward the square.",
        nextSceneId: "breaking_point",
        consequences: [
          { type: "incrementVariable", target: "order_loyalty", value: 3 },
          { type: "setVowState", target: "protect_innocent", value: "strained" },
        ],
        personalityAppendConsequences: {
          stern_devout: [
            { type: "incrementVariable", target: "order_loyalty", value: 1 },
          ],
          compassionate_convert: [
            { type: "incrementVariable", target: "village_trust", value: -1 },
            { type: "incrementVariable", target: "divine_favor", value: -1 },
          ],
        },
      },
      {
        id: "stall_calen",
        text: "Shout up that the cellar is empty. Buy a breath, maybe two.",
        nextSceneId: "breaking_point",
        consequences: [
          { type: "setFlag", target: "stalled_calen", value: true },
          { type: "setVowState", target: "speak_no_lie", value: "strained" },
          { type: "incrementVariable", target: "village_trust", value: 1 },
        ],
        personalityAppendConsequences: {
          stern_devout: [
            { type: "incrementVariable", target: "order_loyalty", value: 1 },
          ],
          compassionate_convert: [
            { type: "incrementVariable", target: "divine_favor", value: -2 },
          ],
        },
      },
      {
        id: "refuse_descent",
        text: "Stand between Mira and the stairs. Draw breath to refuse.",
        nextSceneId: "breaking_point",
        consequences: [
          { type: "setFlag", target: "defied_superior", value: true },
          { type: "setVowState", target: "obey_order", value: "strained" },
          { type: "incrementVariable", target: "village_trust", value: 2 },
        ],
        personalityAppendConsequences: {
          compassionate_convert: [
            { type: "incrementVariable", target: "village_trust", value: 1 },
          ],
          stern_devout: [
            { type: "incrementVariable", target: "divine_favor", value: -1 },
          ],
        },
      },
    ],
  },

  {
    id: "breaking_point",
    title: "The Square",
    body: [
      "Evening has turned the square the color of old copper. Calen's knights have cleared a circle. The child who watched you arrive is in it, pressed against her grandmother's skirts, and she has not looked away from you once.",
      "Calen extends a gauntleted hand. His voice is not unkind. 'End it cleanly, brother. The order remembers its faithful.'",
      "You feel each vow like a thread pulled in a different direction. You cannot hold them all. You will break something here. The only question is what.",
    ],
    choices: [
      {
        id: "strike_for_order",
        text: "Step forward. Draw your sword. Carry out the sentence.",
        consequences: [
          { type: "setVowState", target: "obey_order", value: "kept" },
          { type: "setVowState", target: "protect_innocent", value: "broken" },
          { type: "setVowState", target: "speak_no_lie", value: "kept" },
          { type: "incrementVariable", target: "order_loyalty", value: 5 },
          { type: "incrementVariable", target: "divine_favor", value: -2 },
          { type: "setFlag", target: "executed_accused", value: true },
        ],
        personalityAppendConsequences: {
          stern_devout: [
            { type: "incrementVariable", target: "divine_favor", value: 1 },
          ],
          compassionate_convert: [
            { type: "incrementVariable", target: "village_trust", value: -2 },
          ],
        },
      },
      {
        id: "shield_the_accused",
        text: "Step in front of Mira. Tell Calen the order will have to go through you first.",
        consequences: [
          { type: "setVowState", target: "protect_innocent", value: "kept" },
          { type: "setVowState", target: "obey_order", value: "broken" },
          { type: "setVowState", target: "speak_no_lie", value: "kept" },
          { type: "setFlag", target: "defied_superior", value: true },
          { type: "incrementVariable", target: "divine_favor", value: 2 },
          { type: "incrementVariable", target: "village_trust", value: 5 },
        ],
        personalityAppendConsequences: {
          compassionate_convert: [
            { type: "incrementVariable", target: "village_trust", value: 1 },
            { type: "incrementVariable", target: "divine_favor", value: 1 },
          ],
          stern_devout: [
            { type: "incrementVariable", target: "divine_favor", value: -1 },
          ],
        },
      },
      {
        id: "lie_to_the_crowd",
        text: "Declare, loud enough for the priest to hear, that Mira confessed her crimes to you in private and was granted absolution — that she is bound for a silent exile, not the block.",
        consequences: [
          { type: "setVowState", target: "speak_no_lie", value: "broken" },
          { type: "setVowState", target: "obey_order", value: "strained" },
          { type: "setVowState", target: "protect_innocent", value: "kept" },
          { type: "setFlag", target: "lied_to_preserve_peace", value: true },
          { type: "incrementVariable", target: "divine_favor", value: -1 },
          { type: "incrementVariable", target: "village_trust", value: 3 },
        ],
        personalityAppendConsequences: {
          compassionate_convert: [
            { type: "incrementVariable", target: "village_trust", value: 1 },
          ],
          stern_devout: [
            { type: "incrementVariable", target: "divine_favor", value: -2 },
          ],
        },
      },
      {
        id: "kneel_and_break",
        text: "Kneel in the dust between them. Speak all three vows at once, and feel each one snap in your mouth as you speak it.",
        consequences: [
          { type: "setVowState", target: "obey_order", value: "broken" },
          { type: "setVowState", target: "protect_innocent", value: "strained" },
          { type: "setVowState", target: "speak_no_lie", value: "broken" },
          { type: "incrementVariable", target: "divine_favor", value: -5 },
          { type: "setFlag", target: "prayed_aloud", value: true },
        ],
        personalityAppendConsequences: {
          stern_devout: [
            {
              type: "setFlag",
              target: "paladin_dark_doctrine_ruin",
              value: true,
            },
          ],
          compassionate_convert: [
            { type: "incrementVariable", target: "village_trust", value: 1 },
            {
              type: "setFlag",
              target: "paladin_dark_mercy_ruin",
              value: true,
            },
          ],
        },
      },
    ],
  },
];
