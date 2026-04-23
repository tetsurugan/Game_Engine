import type { EndingDefinition } from "../../engine/types";

/** Shared terminal state from `kneel_and_break` (breaking_point). */
const kneelFractureConditions = [
  { target: "flags.prayed_aloud", operator: "eq", value: true },
  { target: "vows.obey_order", operator: "eq", value: "broken" },
  { target: "vows.speak_no_lie", operator: "eq", value: "broken" },
  {
    target: "vows.protect_innocent",
    operator: "eq",
    value: "strained",
  },
] as const;

/**
 * Endings are condition-matched in priority order by the engine.
 *
 * **Dark trajectory model (proof, not a morality engine):**
 * - **Continuation-worthy:** `dark_mirror_*` — kneel + personality ruin flag +
 *   threshold (stern: doctrine burned in / high `order_loyalty`; merciful:
 *   village still held enough `village_trust` after the break). Commits
 *   `paladin_aftermath` / `dark_mirror_walks`, unlocks secret aftermath row.
 * - **Ordinary fracture:** `fracture_bleak_*` — same kneel, thresholds not met;
 *   same pain in the square, **no** secret unlock; `oath_fracture` + scar marks.
 * - **Compromised / order paths:** unchanged; `tarnished_oath` adds a mark without
 *   dark continuation.
 * - **`broken_saint`:** catch-all for odd vow states (e.g. future personalities
 *   without ruin flags on kneel).
 *
 * **`worldlineCommit`** (`paladin_aftermath`): see `paladin_proof_aftermath` and
 * secret **`paladin_what_walks_after_oath`** (`dark_mirror_walks` branch).
 */
export const paladinEndings: EndingDefinition[] = [
  {
    id: "tarnished_oath",
    title: "The Tarnished Oath",
    priority: 30,
    conditions: [
      { target: "flags.lied_to_preserve_peace", operator: "eq", value: true },
      { target: "vows.speak_no_lie", operator: "eq", value: "broken" },
    ],
    echoes: ["truth_sacrificed_for_peace"],
    worldFlags: { highstone_truth_burden: true },
    worldConsequenceMarks: ["paladin_compromised_by_lies"],
    worldlineCommit: {
      groupId: "paladin_aftermath",
      branchId: "peace_by_lies",
    },
    body: [
      "The priest hesitates. Calen hesitates. The crowd — the crowd believes you. Of course they do. You wore the sigil, and you said the words in the voice reserved for judgment.",
      "Mira is led from the square, alive, toward an exile that will not exist. You will make sure it does, with other quiet lies, over other quiet years.",
      "The chapel bell sounds compline. You mouth the responses. Your god does not answer tonight. You already knew.",
    ],
  },
  {
    id: "shield_of_the_weak",
    title: "The Shield of the Weak",
    priority: 20,
    conditions: [
      { target: "flags.defied_superior", operator: "eq", value: true },
      { target: "vows.protect_innocent", operator: "eq", value: "kept" },
      { target: "vows.obey_order", operator: "eq", value: "broken" },
    ],
    echoes: ["broke_rank_for_innocent"],
    worldFlags: { highstone_defiance_public: true },
    worldlineCommit: {
      groupId: "paladin_aftermath",
      branchId: "mercy_remembered",
    },
    body: [
      "Calen does not draw on you. He stares, for a long moment, at the knight he used to know. Then he turns his horse. 'You are already fallen, brother. You simply have not felt the ground yet.'",
      "The villagers do not cheer. They are too frightened for that. But the child at the edge of the circle lets go of her grandmother's skirts. She walks to you, in full view of the order's knights, and puts her hand on the plate of your gauntlet.",
      "Something in you stays standing. Something else, older and more official, does not.",
    ],
  },
  {
    id: "faithful_blade",
    title: "The Faithful Blade",
    priority: 20,
    conditions: [
      { target: "vows.obey_order", operator: "eq", value: "kept" },
      { target: "vows.protect_innocent", operator: "eq", value: "broken" },
    ],
    echoes: ["duty_over_compassion"],
    worldFlags: { highstone_order_victory: true },
    worldConsequenceMarks: ["paladin_order_sentence_borne"],
    worldlineCommit: {
      groupId: "paladin_aftermath",
      branchId: "order_sanctioned",
    },
    body: [
      "It is done cleanly, which is the only mercy the order recognizes. Calen rests a hand briefly on your pauldron and does not speak, which is the highest praise he knows how to give.",
      "The village does not weep openly. They will, later, in the walls, at night, where it does not reach your ears.",
      "You ride out before dawn. Your sword is clean. The Light is with you. It is with you the way a wind is with a blade: it will not leave, and it will not warm you.",
    ],
  },
  {
    id: "dark_mirror_doctrine",
    title: "The Doctrine That Eats Its Singer",
    priority: 18,
    conditions: [
      { target: "personality", operator: "eq", value: "stern_devout" },
      {
        target: "flags.paladin_dark_doctrine_ruin",
        operator: "eq",
        value: true,
      },
      { target: "variables.order_loyalty", operator: "gte", value: 6 },
      ...kneelFractureConditions,
    ],
    echoes: ["oathbound_soul_snapped", "paladin_dark_mirror_doctrine"],
    worldFlags: {
      highstone_oath_collapse: true,
      highstone_dark_mirror_seed: true,
    },
    worldlineCommit: {
      groupId: "paladin_aftermath",
      branchId: "dark_mirror_walks",
    },
    worldConsequenceMarks: [
      "paladin_dark_continuity_earned",
      "paladin_dark_doctrine_ascension",
    ],
    unlocks: ["unlock_paladin_what_walks_after_oath"],
    body: [
      "The crowd does not hear vows anymore — only the timbre of someone who once believed hierarchy was holiness and now believes nothing at all except the weight of steel.",
      "Calen’s voice thins. The priest steps back. What rises from the dust is not the boy who quoted scripture in the square; it is the lesson the order wrote too deep, without meaning to.",
      "You still wear the surcoat. The Light does not answer. Something colder does — a patience that waits for the next mandate, and the next, until mercy is just another word for weakness.",
    ],
  },
  {
    id: "dark_mirror_mercy",
    title: "The Mercy That Broke Open",
    priority: 18,
    conditions: [
      {
        target: "personality",
        operator: "eq",
        value: "compassionate_convert",
      },
      {
        target: "flags.paladin_dark_mercy_ruin",
        operator: "eq",
        value: true,
      },
      { target: "variables.village_trust", operator: "gte", value: 4 },
      ...kneelFractureConditions,
    ],
    echoes: ["oathbound_soul_snapped", "paladin_dark_mirror_mercy"],
    worldFlags: {
      highstone_oath_collapse: true,
      highstone_dark_mirror_seed: true,
    },
    worldlineCommit: {
      groupId: "paladin_aftermath",
      branchId: "dark_mirror_walks",
    },
    worldConsequenceMarks: [
      "paladin_dark_continuity_earned",
      "paladin_dark_mercy_ascension",
    ],
    unlocks: ["unlock_paladin_what_walks_after_oath"],
    body: [
      "You knelt for them once. You broke yourself where they could see it. The child’s eyes are still on you — and what they see now is not a saint but a wound wearing armor.",
      "Calen says your name like a verdict. You do not answer with vows; you answer with the silence of someone who loved the innocent enough to destroy the shape that protected them.",
      "The square will tell this story wrong a hundred ways. The only true line is this: you were the hand that tried, and the hand that failed, and the hand that will not pretend otherwise again.",
    ],
  },
  {
    id: "fracture_bleak_stern",
    title: "The Broken Saint",
    priority: 16,
    conditions: [
      { target: "personality", operator: "eq", value: "stern_devout" },
      {
        target: "flags.paladin_dark_doctrine_ruin",
        operator: "eq",
        value: true,
      },
      { target: "variables.order_loyalty", operator: "lte", value: 5 },
      ...kneelFractureConditions,
    ],
    echoes: ["oathbound_soul_snapped"],
    worldFlags: { highstone_oath_collapse: true },
    worldConsequenceMarks: ["paladin_fracture_without_ascension"],
    worldlineCommit: {
      groupId: "paladin_aftermath",
      branchId: "oath_fracture",
    },
    body: [
      "Something unseams in your chest as the last vow gives. The fall is real — but it is not the myth the chapter house whispers about when it wants a villain.",
      "You are not yet the rider in black steel. You are only someone the order will file under 'broken' and forget until the next crisis needs a cautionary tale.",
      "What stands up from the dust still wears your armor. The scar is no less deep for never earning its sequel.",
    ],
  },
  {
    id: "fracture_bleak_mercy",
    title: "The Broken Saint",
    priority: 16,
    conditions: [
      {
        target: "personality",
        operator: "eq",
        value: "compassionate_convert",
      },
      {
        target: "flags.paladin_dark_mercy_ruin",
        operator: "eq",
        value: true,
      },
      { target: "variables.village_trust", operator: "lte", value: 3 },
      ...kneelFractureConditions,
    ],
    echoes: ["oathbound_soul_snapped"],
    worldFlags: { highstone_oath_collapse: true },
    worldConsequenceMarks: ["paladin_fracture_without_ascension"],
    worldlineCommit: {
      groupId: "paladin_aftermath",
      branchId: "oath_fracture",
    },
    body: [
      "Something unseams in your chest as the last vow gives. You came to shield the vulnerable — and in the wreckage you are only another reason they learn not to trust the sigil.",
      "No dark ascension waits tonight: only exhaustion, rumor, and the long work of witness stories that will misquote your grief.",
      "What stands up from the dust still wears your armor. The anthology will remember the fracture even when it does not open a hidden road for you.",
    ],
  },
  {
    id: "broken_saint",
    title: "The Broken Saint",
    priority: 0,
    conditions: [],
    echoes: ["oathbound_soul_snapped"],
    worldFlags: { highstone_oath_collapse: true },
    worldConsequenceMarks: ["paladin_fracture_catchall"],
    worldlineCommit: {
      groupId: "paladin_aftermath",
      branchId: "oath_fracture",
    },
    body: [
      "Something unseams in your chest as the last vow gives. You feel the Light go out in you the way a lantern goes out when its glass is struck — not slowly, not poetically, but at once.",
      "Calen is shouting. Mira is shouting. The child is crying. You cannot tell whose voice is whose anymore. You can see your own hand in front of you and you do not know whose hand it is.",
      "What stands up from the dust, a long moment later, is still wearing your armor. Whether it is still you is a question the order will spend years trying to answer.",
    ],
  },
];
