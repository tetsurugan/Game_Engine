import { validateStory } from "../../engine/storyEngine";
import type { StoryDefinition } from "../../engine/types";

/**
 * **Rumor Girl — court / record aftermath proof** (small witness slice).
 *
 * **Consumes:** `rumor_girl_proof_resolved` + (**`rumor_girl_witness_aftermath_invited`**
 * OR **`rumor_girl_belief_gap_soft`**) from shipped `rumor_girl` endings.
 *
 * **POV:** the friend from the fire escape — she is not in the hidden layer of
 * the breakup; she holds **relational verdicts** (what the record *means* to her)
 * while the clerk’s language flattens the night. See
 * `docs/planning/relational_verdicts_doctrine.md`.
 *
 * Not a trial sim — one hallway, one closure beat, two tonal endings keyed on
 * which rumor_girl seed fired (shock-invited vs soft belief-gap).
 */
const definition: StoryDefinition = {
  id: "court_aftermath",
  title: "The Morning After Verdict",
  storyClass: "witness",
  description:
    "You told her to stay on your couch. Now a neutral paragraph tries to swallow the night whole — and you still know what kindness sounded like in his mouth.",
  playerRole:
    "Her friend: you held the exit door open once. Now you hold the paper that pretends the fight had no acoustics.",
  playerTitle: "The One the Record Could Not Hold",
  playerSummary:
    "Family court hallway, mediation intake, cheap chairs — the same story told in font that cannot sweat. You read the line about **no mockery** and your stomach disagrees before your politics do.",
  playerToneHint: "After Rumor Girl · record · private judgment",
  playerContinuationHint:
    "After her breakup left a mark the shelf can name — witness invited, or truth with a soft belief gap.",
  continuationOf: { storyId: "rumor_girl" },
  variantGroup: "rumor_girl_court_aftermath",
  variantId: "friend_record",
  unlockCategory: "outcome_gated",
  authoringAvailability: "shipped",
  era: "modern_fractured_court_media_ai",
  moduleTemplate: "witness_interpretation",
  preDiscoverySurfacing: "rumor",
  rumorText:
    "Someone saw a friend leave the clerk’s office with papers that said **no intent to harm** — and still looked like she wanted to burn the building without touching a match.",
  initialSceneId: "court_aftermath_hallway",
  requiresWorldConsequenceMarks: ["rumor_girl_proof_resolved"],
  requiresAnyFlags: [
    "rumor_girl_witness_aftermath_invited",
    "rumor_girl_belief_gap_soft",
  ],
  variables: [],
  hiddenTruth: {
    flags: [
      { id: "cheating_was_objective", initialValue: true },
      { id: "his_words_were_not_authored_as_mockery", initialValue: true },
    ],
  },
  belief: {
    flags: [
      {
        id: "record_reads_like_absolution_for_him",
        initialValue: false,
      },
    ],
  },
  scenes: [
    {
      id: "court_aftermath_hallway",
      title: "Font that cannot sweat",
      body: [
        "You are not the girlfriend. You are the one who sat her on your fire escape and said **you can not go** — and watched her go anyway because love is not a democracy and neither is grief.",
        "**Objective event** (what you never doubt): he cheated. He ended it in person. That is the spine every version shares.",
        "**Awareness:** you did not hear his throat crack. You have her texts after — shards, timestamps, the shape of someone trying to name a wound while it is still opening. The **institution** has a different hunger: one paragraph, one timeline, words scrubbed until they can pass a mediator.",
        "The draft says **no raised voices** and **no intent to mock or demean.** Your **private verdict** arrives anyway: those syllables are how decent men get to walk out **clean** while she carries the noise they swear they did not make. **Hidden truth** (what the engine already proved in her story) is crueler and simpler: his sentences were not written as cruelty — and the record is *still* a knife because **verdict** is not **fact**.",
        "Another voice in you — softer, ashamed — says maybe he really was trying not to be a ghost. That does not erase your verdict about **what the paper does to her** if she signs it.",
        "**Action tendency:** you can swallow it, amend it, or carry what you know back to her without letting the page be the only scripture. The choice here is small. The proof is not.",
      ],
      choices: [
        {
          id: "court_sign_alignment",
          text: "Tell her later: sign if it gets you free — but the neutral line about his tone is a lie by omission.",
          consequences: [
            {
              type: "setBeliefFlag",
              target: "record_reads_like_absolution_for_him",
              value: true,
            },
          ],
        },
        {
          id: "court_withhold_kinder",
          text: "Say nothing sharp today. Keep the kinder contradiction in your pocket — she will need a witness who does not need the record to be righteous.",
          consequences: [
            {
              type: "setBeliefFlag",
              target: "record_reads_like_absolution_for_him",
              value: false,
            },
          ],
        },
      ],
    },
  ],
  endings: [
    {
      id: "court_aftermath_close_shock_invited",
      title: "The invited witness",
      priority: 20,
      conditions: [
        {
          target: "profile.worldFlags.rumor_girl_witness_aftermath_invited",
          operator: "eq",
          value: true,
        },
      ],
      echoes: ["rumor_girl_court_aftermath_logged"],
      worldConsequenceMarks: ["rumor_girl_court_aftermath_touched"],
      body: [
        "**Aftershock path** (her hearing warped; **fatal** residue seeded on the profile): you know the night was not only words. The record will travel without blood — and still **steal** the part where she could not breathe.",
        "Your **verdict** on him hardens where hers already shattered: not always *monster*, sometimes *man who gets to be reasonable while she pays the interest*. You will sit with that. You will not let the hallway pretend **simple**.",
        "Small proof, closed: `rumor_girl` **echoes** into a **witness/record** frame — intent vs POV stays **uncomfortable** after the file exists.",
      ],
    },
    {
      id: "court_aftermath_close_belief_gap",
      title: "The soft gap",
      priority: 10,
      conditions: [
        {
          target: "profile.worldFlags.rumor_girl_belief_gap_soft",
          operator: "eq",
          value: true,
        },
      ],
      echoes: ["rumor_girl_court_aftermath_logged"],
      worldConsequenceMarks: ["rumor_girl_court_aftermath_touched"],
      body: [
        "**Grounded path** (she left with truth; **belief** and record may still misalign): the paragraph is almost polite. That politeness feels like **insult** anyway — because pain does not owe diction its cooperation.",
        "Your **verdict** skews protective: she was not broken by drama; she was betrayed by facts. If you tell her the neutral line is **kind to him**, you are not starting a war — you are refusing to let **tone** become **verdict** without a fight.",
        "Small proof, closed: the same module can eat **soft** seeds — the anthology remembers **which aftermath** invited this room.",
      ],
    },
  ],
};

export const courtAftermathStory: StoryDefinition = validateStory(definition);
