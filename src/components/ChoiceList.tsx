import type { VisibleChoice } from "../engine/choiceResolver";

interface Props {
  choices: VisibleChoice[];
  onSelect: (choiceId: string) => void;
}

export function ChoiceList({ choices, onSelect }: Props) {
  if (choices.length === 0) {
    return (
      <p className="text-parchment-200/50 italic">
        The story offers no further paths.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3.5 sm:gap-4 mt-4 sm:mt-2">
      {choices.map(({ choice, available, displayText, displayAnnotation }) => (
        <button
          key={choice.id}
          className="choice-btn"
          disabled={!available}
          onClick={() => available && onSelect(choice.id)}
        >
          <span className="block">{displayText ?? choice.text}</span>
          {displayAnnotation ? (
            <span className="block mt-2 text-sm sm:text-base text-parchment-200/65 italic font-normal leading-relaxed">
              {displayAnnotation}
            </span>
          ) : null}
        </button>
      ))}
    </div>
  );
}
