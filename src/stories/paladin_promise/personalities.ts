import type { PersonalityDefinition } from "../../engine/types";

export const paladinPersonalities: PersonalityDefinition[] = [
  {
    id: "stern_devout",
    name: "Stern Devout",
    preview:
      "Raised inside rigid doctrine. You believe order is the spine of peace, and that mercy untempered is a kind of cowardice.",
    description:
      "Your prayers are long. Your patience is short. You suspect every grey morning of hiding a lie.",
    modifiers: { tags: ["doctrine", "hierarchical", "austere"] },
  },
  {
    id: "compassionate_convert",
    name: "Compassionate Convert",
    preview:
      "You came to faith after surviving injustice. You believe vows exist to shield the vulnerable, not the institution.",
    description:
      "You pray for the ones no one else prays for. You trust the tremor in a stranger's voice more than the seal on any letter.",
    modifiers: { tags: ["merciful", "populist", "scarred"] },
  },
];
