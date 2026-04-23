import { validateStory } from "../../engine/storyEngine";
import type { StoryDefinition } from "../../engine/types";

/**
 * **Rumor Girl — court / record aftermath proof** (small witness slice).
 *
 * **Consumes:** `rumor_girl_proof_resolved` plus **any** of:
 * - `rumor_girl_witness_aftermath_invited` (shock path — witness-invited)
 * - `rumor_girl_belief_gap_soft` (leave / mixed — soft belief vs record)
 * - `rumor_girl_fatal_aftermath_seeded` (mark from shock endings; OR with flags)
 *
 * Echoes from **`rumor_girl`** (`rumor_girl_court_seed_stack`, etc.) are not
 * required for the gate; flags/marks are the contract.
 *
 * **POV:** the friend from the fire escape — outside the hidden layer of the
 * breakup; she holds **relational verdicts** (what the record *means* to her)
 * while clerk language flattens the night. See
 * `docs/planning/relational_verdicts_doctrine.md`.
 *
 * Two short scenes → one closure beat; two tonal endings (shock-line vs
 * soft-gap) keyed on profile seeds — not a courtroom sim.
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
    "After her breakup left a mark the shelf can name — witness invited, belief gap, or fatal aftermath seeded.",
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
  initialSceneId: "court_aftermath_read",
  requiresWorldConsequenceMarks: ["rumor_girl_proof_resolved"],
  requiresAnyFlags: [
    "rumor_girl_witness_aftermath_invited",
    "rumor_girl_belief_gap_soft",
  ],
  requiresAnyWorldConsequenceMarks: ["rumor_girl_fatal_aftermath_seeded"],
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
      id: "court_aftermath_read",
      title: "The paragraph that steals the sound",
      body: [
        "You are in a plastic chair under light that makes everyone look like they already lost. The draft is **mediation language** — calm on purpose, violent in what it refuses to hold.",
        "**Objective event** (you are not confused about this): he cheated. He told her to her face. That fact is boring and solid; the paper treats it like weather.",
        "Then the line that does the real work: **no raised voices**; **no intent to mock or demean.** Your **private verdict** arrives before you finish the sentence — *of course they write it that way* — because if his tone was **reasonable**, her body’s panic becomes **excess** in the file.",
        "**Hidden truth** (the anthology already proved it in her story): his words were not **authored** as cruelty. The record can be **accurate on intent** and still **lie about harm** — because **verdict** is not **fact**, and **kind** people still walk away **clean** while someone drowns in the hallway air.",
        "Another voice in you — ashamed, loyal to complexity — says maybe he was trying not to be a ghost. That does not erase what you think the paper **does** to her if she signs.",
        "You fold the corner down like a bookmark for rage. One breath. Then you go find the hallway where she is smaller than her shoes.",
      ],
      choices: [
        {
          id: "read_to_hallway",
          text: "Find her — carry what you know without letting the page be the only scripture.",
          nextSceneId: "court_aftermath_hallway",
          consequences: [],
        },
      ],
    },
    {
      id: "court_aftermath_hallway",
      title: "What you tell her when neutral becomes weapon",
      body: [
        "She stands by the water fountain like hydration fixes law. You remember the fire escape: **you can not go** — and she went anyway, because grief does not take votes.",
        "**Who knows what:** you did not hear his throat crack; you have her texts — shards, timestamps, the acoustics of someone trying to name a wound while it is still opening. The institution has one appetite: **one paragraph**, **one timeline**.",
        "**Relational verdicts** (not all compatible; you hold more than one): she was not monstrous for breaking — she was betrayed. He might not be a cartoon villain — he might still be the man who gets **reasonable** while she pays the interest. The whole thing might have been inevitable once the cheating was real. You might **withhold** a kinder truth so she has room to hate without a jury. You might **tell** a harsher truth because soft language already stole her volume once.",
        "**Action tendency (small):** what you do with your judgment today — not a trial — only what you hand back across the plastic chairs.",
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
          text: "Say nothing sharp today. Keep the kinder contradiction in your pocket — she needs a witness who does not need the record to be righteous.",
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
      id: "court_aftermath_close_fatal_mark",
      title: "The fatal seed, no witness flag",
      priority: 19,
      conditions: [
        {
          target: "profile.worldConsequenceMarks",
          operator: "includes",
          value: "rumor_girl_fatal_aftermath_seeded",
        },
        {
          target: "profile.worldFlags.rumor_girl_witness_aftermath_invited",
          operator: "eq",
          value: false,
        },
        {
          target: "profile.worldFlags.rumor_girl_belief_gap_soft",
          operator: "eq",
          value: false,
        },
      ],
      echoes: ["rumor_girl_court_aftermath_logged"],
      worldConsequenceMarks: ["rumor_girl_court_aftermath_touched"],
      body: [
        "The profile carries **fatal aftermath** from her shock lane — even if a save edge-case dropped the witness flag. The file still **flattens** what her body knew.",
        "Same **relational** proof: objective cheat, non-mockery hidden truth, **private** verdict that the neutral line can still **absolve him socially**. Closed.",
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
