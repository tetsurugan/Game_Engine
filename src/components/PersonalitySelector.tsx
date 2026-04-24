import { useState } from "react";
import type { PersonalityDefinition } from "../engine/types";

interface Props {
  personalities: PersonalityDefinition[];
  onConfirm: (personalityId: string) => void;
}

export function PersonalitySelector({ personalities, onConfirm }: Props) {
  const [selected, setSelected] = useState<string | null>(
    personalities[0]?.id ?? null,
  );

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4">
        {personalities.map((p) => {
          const active = p.id === selected;
          return (
            <button
              type="button"
              key={p.id}
              onClick={() => setSelected(p.id)}
              className={`min-h-[5.5rem] sm:min-h-[5.75rem] text-left rounded-sm border p-4 sm:p-5 transition-colors duration-150 touch-manipulation ${
                active
                  ? "border-vow-kept/75 bg-ink-700/70 ring-2 ring-vow-kept/35 ring-offset-2 ring-offset-ink-900"
                  : "border-parchment-200/15 bg-ink-800/50 hover:border-parchment-200/40 active:border-parchment-200/50"
              }`}
            >
              <h3 className="font-serif text-lg sm:text-xl text-parchment-50 mb-2">
                {p.name}
              </h3>
              <p className="text-parchment-100/85 text-sm sm:text-base mb-2 leading-relaxed">
                {p.preview}
              </p>
              {p.description && (
                <p className="text-parchment-200/60 italic text-sm leading-relaxed">
                  {p.description}
                </p>
              )}
            </button>
          );
        })}
      </div>
      <div className="intro-cta-stack max-w-none sm:max-w-md">
        <button
          type="button"
          className="btn btn-primary w-full sm:w-auto touch-manipulation"
          disabled={!selected}
          onClick={() => selected && onConfirm(selected)}
        >
          Begin
        </button>
      </div>
    </div>
  );
}
