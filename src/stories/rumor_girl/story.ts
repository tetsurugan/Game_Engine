import { validateStory } from "../../engine/storyEngine";
import type { StoryDefinition } from "../../engine/types";

/**
 * **Rumor Girl** — grounded modern obsession / rumor / interpretation proof.
 *
 * **Hidden:** he cheated; he is attempting an accountable in-person break; his
 * words are **not** mockery (`his_words_objectively_not_mockery`) — her POV can
 * still **warp** that on the narrow shock path.
 *
 * **Belief:** `refused_healthier_exit` (ignored friends who said step back);
 * `she_hears_cruel_theater` set only when the shock interpretation locks in.
 *
 * **Visible:** `suspicion`, `humiliation` — rumor load and shame spiral.
 *
 * **Shock path:** buried — requires **obsessive** or **fearful** personality,
 * `refused_healthier_exit`, `suspicion` ≥ 6, and the terminal choice that
 * sets `resolution` to `shock`. Seeds court/witness via echo + mark + flag.
 */
const definition: StoryDefinition = {
  id: "rumor_girl",
  title: "Rumor Girl",
  storyClass: "stable",
  description:
    "Everyone has a story about your boyfriend. None of them match. You still know which one you cannot unhear — and what you will do when he finally says it to your face.",
  playerRole:
    "You — in love, in public, in trouble — deciding what rumors are allowed to become.",
  playerTitle: "Rumor Girl",
  playerSummary:
    "Unconnected voices agree only that you look stupid for not knowing. You map his texts like evidence. Tonight he asked you over to talk — careful, adult, the way people do when they still think they are good.",
  playerToneHint: "Modern · obsession · rumor · intimacy",
  unlockCategory: "open",
  authoringAvailability: "shipped",
  era: "modern_fractured_court_media_ai",
  moduleTemplate: "narrative",
  initialSceneId: "rumor_crossfire",
  variables: [
    { id: "suspicion", type: "number", initialValue: 3 },
    { id: "humiliation", type: "number", initialValue: 2 },
    {
      id: "resolution",
      type: "enum",
      initialValue: "",
    },
  ],
  personalities: [
    {
      id: "rumor_lovefirst",
      name: "Trusting romantic",
      preview:
        "You still reach for the version where love means misunderstanding, not malice.",
      modifiers: { tags: ["rumor_stance_lovefirst"] },
    },
    {
      id: "rumor_orbit",
      name: "Obsessive idealist",
      preview:
        "If the story doesn’t fit, you adjust reality until the arc feels complete.",
      modifiers: { tags: ["rumor_stance_orbit"] },
    },
    {
      id: "rumor_proof",
      name: "Proud investigator",
      preview:
        "Humiliation is a tax; you pay it in receipts, screenshots, and a steady voice.",
      modifiers: { tags: ["rumor_stance_proof"] },
    },
    {
      id: "rumor_anchor",
      name: "Fearful dependent",
      preview:
        "Without him the room tilts; you grip the narrative because the floor won’t stay.",
      modifiers: { tags: ["rumor_stance_anchor"] },
    },
  ],
  hiddenTruth: {
    flags: [
      { id: "partner_cheated_objective", initialValue: true },
      { id: "partner_seeks_accountable_break", initialValue: true },
      { id: "his_words_objectively_not_mockery", initialValue: true },
    ],
  },
  belief: {
    flags: [
      { id: "refused_healthier_exit", initialValue: false },
      { id: "she_hears_cruel_theater", initialValue: false },
    ],
  },
  scenes: [
    {
      id: "rumor_crossfire",
      title: "Everyone whispers like they are doing you a favor",
      body: [
        "The first rumor arrives from a barista who **doesn’t** know your name — only his, and the girl’s hand on his jacket. The second is a screenshot forwarded with **I shouldn’t send this** like perfume. The third is your cousin, too loud at brunch: *Everyone knows, babe. I thought you were playing it cool.*",
        "None of the stories share the same timeline. All of them agree on one thing: **you are the last to perform dignity.**",
        "Your boyfriend texts *Can we talk tonight? In person. I owe you that.* The tone is careful — the way people write when they still believe they are not monsters. It reads like an appointment for your own humiliation. It might also be the closest he knows how to come to honest.",
      ],
      choices: [
        {
          id: "crossfire_investigate",
          text: "Dig until the map makes sense — feeds, locations, who saw what.",
          nextSceneId: "rumor_before_talk",
          consequences: [
            { type: "incrementVariable", target: "suspicion", value: 2 },
            { type: "incrementVariable", target: "humiliation", value: 1 },
          ],
        },
        {
          id: "crossfire_mute",
          text: "Mute the threads. Let the noise sit unread until your hands stop shaking.",
          nextSceneId: "rumor_before_talk",
          consequences: [{ type: "incrementVariable", target: "suspicion", value: 1 }],
        },
        {
          id: "crossfire_demand",
          text: "Text him now — one line — *Say it or stop acting like you respect me.*",
          nextSceneId: "rumor_before_talk",
          consequences: [
            { type: "incrementVariable", target: "humiliation", value: 2 },
            { type: "incrementVariable", target: "suspicion", value: 1 },
          ],
        },
      ],
    },
    {
      id: "rumor_before_talk",
      title: "Your friend tries to give you an exit",
      body: [
        "She sits you on her fire escape with tea you won’t drink. **You can not go,** she says. **Let him sit in what he did. Make him wait until you have a lawyer or a cousin who breaks kneecaps or at least a night’s sleep.**",
        "She is offering a **healthier** shape — distance, proof, air. It is also a version where you do not have to hear his voice arrange your pain into sentences.",
        "You know how you respond to exits. Some personalities call it pride. Some call it love. Some call it the only way the body stops guessing.",
      ],
      choices: [
        {
          id: "before_take_space",
          text: "Listen. Stay tonight on her couch. Let him sweat without an audience.",
          nextSceneId: "rumor_the_talk",
          consequences: [
            { type: "setBeliefFlag", target: "refused_healthier_exit", value: false },
            { type: "incrementVariable", target: "suspicion", value: -1 },
          ],
          personalityAppendConsequences: {
            rumor_lovefirst: [
              { type: "incrementVariable", target: "humiliation", value: -1 },
            ],
            rumor_anchor: [
              { type: "incrementVariable", target: "suspicion", value: -1 },
            ],
          },
        },
        {
          id: "before_need_face",
          text: "Go anyway. If he ends this, he ends it where you can see his mouth move.",
          nextSceneId: "rumor_the_talk",
          consequences: [
            { type: "setBeliefFlag", target: "refused_healthier_exit", value: true },
            { type: "incrementVariable", target: "suspicion", value: 2 },
          ],
        },
        {
          id: "before_evidence_mode",
          text: "Go — but treat it like a deposition. Dignity is the only weapon you have left.",
          nextSceneId: "rumor_the_talk",
          consequences: [
            { type: "setBeliefFlag", target: "refused_healthier_exit", value: true },
            { type: "incrementVariable", target: "suspicion", value: 1 },
            { type: "incrementVariable", target: "humiliation", value: 2 },
          ],
          personalityAppendConsequences: {
            rumor_proof: [
              { type: "incrementVariable", target: "suspicion", value: 1 },
            ],
            rumor_orbit: [
              { type: "incrementVariable", target: "humiliation", value: 1 },
            ],
          },
        },
      ],
    },
    {
      id: "rumor_the_talk",
      title: "He thinks careful is the same as kind",
      body: [
        "His apartment smells like the candles you used to pick out together — petty detail; your brain files it anyway. He does not touch you. He says your name once, full, like a person who practiced.",
        "**I cheated,** he says. **Not once — not a drunk mistake I can make small. I made it real. I’m not going to lie to make this easier on me.**",
        "He says he did not bring you here to perform goodness — only to **not** hide behind a screen like a coward. The **hidden** layer of the night (the part a record might later show) is uglier and simpler: he is guilty, he is ending it, and his sentences are **not** designed as mockery — even when your skin hears **performance**.",
        "He says **I don’t expect you to forgive me. I expect you to leave me if that’s what you need.** His voice cracks on **need** — care mixed with fear. Depending on what you are carrying tonight, that crack is grief — or the sound of someone enjoying your pain.",
        "The fork is not whether the cheating happened. You already **know** the objective fact in the world’s ledger. The fork is what you let his **careful** breakup become inside your body — and whether you take a door your friend tried to leave open.",
      ],
      choices: [
        {
          id: "end_leave_confirmed",
          text: "Tell him you hear him. Walk out. Let the night end without a second act.",
          consequences: [
            { type: "setVariable", target: "resolution", value: "leave_confirmed" },
          ],
        },
        {
          id: "end_stay_anyway",
          text: "Say you might stay — not because it is wise — because leaving feels like dying louder.",
          consequences: [
            { type: "setVariable", target: "resolution", value: "stay_anyway" },
          ],
        },
        {
          id: "end_denial_haze",
          text: "Refuse the shape of it — not a lie out loud, just a fog where the truth can’t land.",
          consequences: [
            { type: "setVariable", target: "resolution", value: "denial_haze" },
          ],
        },
        {
          id: "end_inward_collapse",
          text: "Crumble where you stand — no screaming, no verdict — only the body giving up before you do.",
          consequences: [
            { type: "setVariable", target: "resolution", value: "inward_collapse" },
          ],
        },
        {
          id: "end_self_first",
          text: "Cut him off mid-sentence. Leave before he finishes being decent — spare yourself the rest.",
          consequences: [
            { type: "setVariable", target: "resolution", value: "self_first" },
          ],
        },
        {
          id: "end_suspicion_poison",
          text: "Turn the talk into an interrogation — if he slips once, you will make the room pay for every rumor.",
          consequences: [
            { type: "setVariable", target: "resolution", value: "suspicion_poison" },
          ],
        },
        {
          id: "end_mixed_death",
          text: "Name what hurts without forgiving. Let the relationship die in the open — not clean, not violent.",
          consequences: [
            { type: "setVariable", target: "resolution", value: "mixed_death" },
          ],
        },
        {
          id: "end_shock_orbit",
          text: "The careful speech sounds like theater — like he is enjoying how well he plays **remorse**. You stop seeing the exit.",
          conditions: [
            { target: "personality", operator: "eq", value: "rumor_orbit" },
            { target: "belief.flags.refused_healthier_exit", operator: "eq", value: true },
            { target: "variables.suspicion", operator: "gte", value: 6 },
          ],
          consequences: [
            { type: "setVariable", target: "resolution", value: "shock" },
            { type: "setBeliefFlag", target: "she_hears_cruel_theater", value: true },
          ],
        },
        {
          id: "end_shock_anchor",
          text: "His kindness reads like dismissal — like you were always a chapter he is closing **cleanly** while you dissolve. You cannot let the story end on his terms.",
          conditions: [
            { target: "personality", operator: "eq", value: "rumor_anchor" },
            { target: "belief.flags.refused_healthier_exit", operator: "eq", value: true },
            { target: "variables.suspicion", operator: "gte", value: 6 },
          ],
          consequences: [
            { type: "setVariable", target: "resolution", value: "shock" },
            { type: "setBeliefFlag", target: "she_hears_cruel_theater", value: true },
          ],
        },
      ],
    },
  ],
  endings: [
    {
      id: "rumor_ending_shock_orbit",
      title: "The version only you heard",
      priority: 95,
      conditions: [
        { target: "variables.resolution", operator: "eq", value: "shock" },
        { target: "personality", operator: "eq", value: "rumor_orbit" },
      ],
      echoes: ["rumor_girl_shock_her_pov", "rumor_girl_court_seed_stack"],
      worldConsequenceMarks: [
        "rumor_girl_proof_resolved",
        "rumor_girl_fatal_aftermath_seeded",
      ],
      worldFlags: { rumor_girl_witness_aftermath_invited: true },
      body: [
        "**Her POV:** the apology has rhythm — too clean, too practiced. He is not sorry; he is **finishing** you with language. The breakup is a scene; you are the audience he wants grateful. You move before the thought finishes — kitchen, weight, heat, silence that arrives wrong.",
        "**Hidden truth** (what a later record might show): he was guilty, scared, trying not to be a ghost. His words were not written as mockery — belief could not receive that.",
        "This path is **narrow**, **specific**, **not** the module’s main identity — only proof the engine can hold modern obsession until it **warps** hearing. A witness or court frame later may unpack what the room actually contained — seeded, not built here.",
      ],
    },
    {
      id: "rumor_ending_shock_anchor",
      title: "The version only you heard",
      priority: 95,
      conditions: [
        { target: "variables.resolution", operator: "eq", value: "shock" },
        { target: "personality", operator: "eq", value: "rumor_anchor" },
      ],
      echoes: ["rumor_girl_shock_her_pov", "rumor_girl_court_seed_stack"],
      worldConsequenceMarks: [
        "rumor_girl_proof_resolved",
        "rumor_girl_fatal_aftermath_seeded",
      ],
      worldFlags: { rumor_girl_witness_aftermath_invited: true },
      body: [
        "**Her POV:** if he can end this **calmly**, then everything you were — sleepless, scanning, begging the rumors to be wrong — was **excess**. He gets to walk away **stable** while you come apart. The fairness breaks wrong in your ears. You move — not because you planned it — because abandonment arrives as a shape that won’t let you breathe.",
        "**Hidden truth** still says his care was mixed with cowardice, not a jeer. **Belief** could not hold that distinction.",
        "Seeded for a future aftermath: testimony may later separate **tone** from **intent** — this stub only opens the wound.",
      ],
    },
    {
      id: "rumor_ending_leave",
      title: "You leave with the truth",
      priority: 50,
      conditions: [
        { target: "variables.resolution", operator: "eq", value: "leave_confirmed" },
      ],
      echoes: ["rumor_girl_left_with_truth"],
      worldConsequenceMarks: ["rumor_girl_proof_resolved"],
      worldFlags: { rumor_girl_belief_gap_soft: true },
      body: [
        "You say something small and final. You take your coat. The hallway light is ugly in the way real things are. Outside, the city continues its indifferent work — no myth, no clan, only **ordinary** grief with a precise address.",
        "Grounded proof: rumor, cheating, interpretation — resolved without spectacle. A court module later could still ask **what he said verbatim** — you carry your honest hearing; the record might still disagree on **tone**.",
      ],
    },
    {
      id: "rumor_ending_stay",
      title: "You stay in the wound",
      priority: 50,
      conditions: [
        { target: "variables.resolution", operator: "eq", value: "stay_anyway" },
      ],
      echoes: ["rumor_girl_stayed_anyway"],
      worldConsequenceMarks: ["rumor_girl_proof_resolved"],
      body: [
        "You stay — not as victory — as **habit** stronger than dignity. He looks relieved in a way that costs you. The story continues **human-scale**: attachment, shame, maybe repair, maybe rot. No cosmic frame — only the dangerous ordinary.",
      ],
    },
    {
      id: "rumor_ending_denial",
      title: "The fog you chose",
      priority: 50,
      conditions: [
        { target: "variables.resolution", operator: "eq", value: "denial_haze" },
      ],
      echoes: ["rumor_girl_denial_haze"],
      worldConsequenceMarks: ["rumor_girl_proof_resolved"],
      body: [
        "You do not let the night become a verdict. Words slide; you cling to **maybe** because maybe still has his face in it. Grounded and ugly — belief protecting you from a fact the hidden layer already holds.",
      ],
    },
    {
      id: "rumor_ending_collapse",
      title: "Inward, not outward",
      priority: 50,
      conditions: [
        { target: "variables.resolution", operator: "eq", value: "inward_collapse" },
      ],
      echoes: ["rumor_girl_inward_collapse"],
      worldConsequenceMarks: ["rumor_girl_proof_resolved"],
      body: [
        "You break without breaking **him** — floor, breath, the small sound he makes when he realizes violence is not arriving from your hands, only from your chest. Modern proof: collapse as outcome, not spectacle.",
      ],
    },
    {
      id: "rumor_ending_self_first",
      title: "You go before the script ends",
      priority: 50,
      conditions: [
        { target: "variables.resolution", operator: "eq", value: "self_first" },
      ],
      echoes: ["rumor_girl_self_first"],
      worldConsequenceMarks: ["rumor_girl_proof_resolved"],
      body: [
        "You leave while he is still trying to be good — not because you forgive — because listening to the rest would carve you smaller. Self-first is still **human** drama: boundaries as survival, not myth.",
      ],
    },
    {
      id: "rumor_ending_poison",
      title: "The talk becomes a weapon you aimed wrong",
      priority: 50,
      conditions: [
        { target: "variables.resolution", operator: "eq", value: "suspicion_poison" },
      ],
      echoes: ["rumor_girl_suspicion_scarred"],
      worldConsequenceMarks: ["rumor_girl_proof_resolved"],
      body: [
        "You press until the room is only **accusation music**. Maybe he deserves the noise; maybe you are punishing him for the rumors, not the acts. The relationship dies **messy** — grounded harm without the buried shock route.",
      ],
    },
    {
      id: "rumor_ending_mixed",
      title: "Love dies in the open",
      priority: 50,
      conditions: [
        { target: "variables.resolution", operator: "eq", value: "mixed_death" },
      ],
      echoes: ["rumor_girl_love_died_mixed"],
      worldConsequenceMarks: ["rumor_girl_proof_resolved"],
      worldFlags: { rumor_girl_belief_gap_soft: true },
      body: [
        "You name the cheating without pardoning him. You do not stay; you do not pretend the fog is mercy. A **mixed** human ending — truth and grief without murder, without clean Hollywood exit.",
      ],
    },
  ],
};

export const rumorGirlStory: StoryDefinition = validateStory(definition);
