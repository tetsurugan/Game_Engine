import { validateStory } from "../../engine/storyEngine";
import type { StoryDefinition } from "../../engine/types";

/**
 * **First Verge / Mara proof** — modern-near-future social pressure, not myth.
 *
 * **POV:** a younger cousin / corridor lead who **executes** what Mara’s tone is
 * taken to mean. **Hidden:** Mara meant **brake**, not **anoint** (`mara_intended_brake_not_anoint`).
 * **Belief:** whether the POV **hears** succession permission (`heard_anointment`).
 * **Visible:** `room_heat` — how loud the table is running on rumor of her intent.
 *
 * Proves dependency-as-governance: the clan rose on her instinct; questioning her
 * feels stupid; ambiguity from her still lands like law. No Paladin holy frame, no Gyre loop.
 * Planning: `docs/planning/story_concepts/verge_clan_mara_verge.md`.
 */
const definition: StoryDefinition = {
  id: "verge_mara_anchor",
  title: "Verge — The Living Rulebook",
  storyClass: "stable",
  description:
    "The Verge used to be a punchline. Mara dragged you into the light where rivals flinch. Now her smallest shrug redraws who is allowed to want what — and nobody asks for the memo.",
  playerRole:
    "Cousin and corridor lead: you move money, people, and silence. You translate what Mara **does not** put on paper.",
  playerTitle: "The One Who Executes Her Silence",
  playerSummary:
    "Theo wants a title before the family is ready to mean it. Mara answers in the old way — partial, timed, soft. The room will not stay soft. You decide what her words were **for**.",
  playerToneHint: "Near-future · clan gravity · success as cage",
  unlockCategory: "open",
  authoringAvailability: "shipped",
  era: "near_future",
  moduleTemplate: "narrative",
  initialSceneId: "verge_supper_table",
  variables: [{ id: "room_heat", type: "number", initialValue: 4 }],
  hiddenTruth: {
    flags: [
      {
        id: "mara_intended_brake_not_anoint",
        initialValue: true,
      },
    ],
  },
  belief: {
    flags: [
      {
        id: "heard_anointment",
        initialValue: false,
      },
    ],
  },
  scenes: [
    {
      id: "verge_supper_table",
      title: "The head of the table is not a chair",
      body: [
        "Five years ago the Verge were **third-rate** — late on deliveries, loud in the wrong bars, the name people used when they needed a cautionary joke. Mara did not write a constitution. She **picked** fights, exits, and friends until the joke stopped being funny. Now contractors check who backs you before they pick up the phone. That is not mythology. That is **math** everyone agreed to stop questioning.",
        "Tonight the table is **small** on purpose: Theo — her nephew, hungry, brilliant at spreadsheets, **bad** at knowing when hunger makes you loud — wants the corridor to call him **Voice** before the outside world does. It sounds like vanity until you remember outsiders already whisper the title when he walks in with Mara’s nod.",
        "Mara does not look at the deck Theo slid her. She watches **how** the cousins lean — who needs this to be true tonight, who is afraid of being left off the new org chart of her attention.",
        "Theo says, plain as a gun on glass: *I need the name so the Lisbon run doesn’t hesitate.*",
        "Mara’s mouth twitches — almost amusement, almost tired. **“Let appetite stay hungry one more quarter.”** She says it **gently**, like she is saving him from a burn. She does not say *no*. She does not say *yes*. She does not say *you are not ready.*",
        "The table exhales as if scripture just landed. You see it in their shoulders: **Mara was right before**; therefore this sentence must be a **map**, not a brake. Only you were in the room last year when the same softness meant *stand down* — and half the family missed it until bodies paid interest.",
      ],
      choices: [
        {
          id: "table_hold_line",
          text: "Hold your face still. Let her silence finish its work before anyone prints a headline.",
          nextSceneId: "verge_corridor_fork",
          consequences: [
            { type: "incrementVariable", target: "room_heat", value: -1 },
          ],
        },
        {
          id: "table_push_plain",
          text: "Push once for plain words — the run needs a signature, not poetry.",
          nextSceneId: "verge_corridor_fork",
          consequences: [
            { type: "incrementVariable", target: "room_heat", value: 2 },
          ],
        },
      ],
    },
    {
      id: "verge_corridor_fork",
      title: "What Mara meant for you to do",
      body: [
        "The elevator smells like ozone and someone’s expensive fear. Theo catches your sleeve: *She gave me the quarter,* he says, and you hear **permission** dressed as timeline — because **permission** is the only currency that has never bounced when it came from her mouth.",
        "**On the record** there are only her six words at the table; **belief** is what the corridor prints before anyone asks for minutes. **Hidden truth** is what she meant by hunger — brake, not crown — whether or not that ever reaches the wire.",
        "You could **name** what you think she did. You could **execute** what the room already decided she said. The tragic engine is simple: Mara’s greatness is not separate from the collapse nobody wants to rehearse — if she ever steps out **untranslated**, this machine mistakes **loyalty** for **competence** and **survival** for **judgment**. That planning fear — *dies with no true successor* — is not tonight’s verdict. It is the weight under the polish; **modular canon**, not a single locked fate for the whole anthology.",
        "The fork is not Theo’s promotion. It is whether you **repeat** the old pattern: her ambiguity becomes **your** certainty, and the clan learns, again, that they do not have to read the board — only **her throat**.",
      ],
      choices: [
        {
          id: "execute_anointment_read",
          text: "Tell the corridor Mara timed Theo’s voice — we move on Lisbon with his name on the wire.",
          consequences: [
            { type: "setBeliefFlag", target: "heard_anointment", value: true },
          ],
        },
        {
          id: "execute_brake_read",
          text: "Tell them Mara bought a pause — no Voice, no crown, Lisbon runs lean and quiet until she signs different.",
          consequences: [
            { type: "setBeliefFlag", target: "heard_anointment", value: false },
          ],
        },
      ],
    },
  ],
  endings: [
    {
      id: "verge_proof_orbit_misread",
      title: "Doctrine by rumor",
      priority: 10,
      conditions: [
        {
          target: "belief.flags.heard_anointment",
          operator: "eq",
          value: true,
        },
      ],
      echoes: ["verge_proof_orbit_misread"],
      worldConsequenceMarks: ["verge_mara_anchor_touched"],
      body: [
        "You put Theo’s title in the air because **Mara has never been wrong enough** for this family to practice doubt. The wire hums. Lisbon does not hesitate — it **obeys** the story you told about what she meant.",
        "**Hidden truth** does not rescue you from the corridor: she had meant **hunger stays hungry** — brake, not crown. The misread is not malice; it is **gravity**. Success made her the living rulebook; the rulebook never learned footnotes.",
        "Small proof, closed: the Verge lane runs on **interpretation** as power — and Mara’s rise from punchline to predator is exactly what makes challenging her feel **irrational**. The wound you planted tonight is **succession-shaped**: not who inherits her **money**, but who inherits her **role as oracle** — a future fight this stub does not resolve.",
      ],
    },
    {
      id: "verge_proof_line_held",
      title: "The pause you still have to hold",
      priority: 0,
      conditions: [],
      echoes: ["verge_proof_dependency_named"],
      worldConsequenceMarks: ["verge_mara_anchor_touched"],
      body: [
        "You name the pause out loud — thin protection, because it **is** protection. Theo’s jaw sets; the cousins who needed a coronation tonight will call you **coward** for hearing brake where they heard **blessing**.",
        "Mara does not text you thanks. She does not need to. You did the harder thing: you admitted the clan runs on **her** timing, and you refused to **launder** that into a false certainty — for now.",
        "**Belief** aligned closer to **hidden**: she meant slow, not crown. That does not make you free — it makes you the person who **names** dependency instead of worshipping it as instinct. The ascendance she built from third-rate to feared is still the same force that will make **replacement** dangerous later — *if* she leaves no translated fire. Tonight proves only this: the Verge belong in the anthology as **human orbit**, not holy war — one sharp social wound, not the whole clan saga.",
      ],
    },
  ],
};

export const vergeMaraAnchorStory: StoryDefinition = validateStory(definition);
