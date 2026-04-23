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
    <div className="flex flex-col gap-6">
      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        {personalities.map((p) => {
          const active = p.id === selected;
          return (
            <button
              type="button"
              key={p.id}
              onClick={() => setSelected(p.id)}
              className={`min-h-[5.5rem] text-left rounded-sm border p-4 sm:p-5 transition-colors duration-150 touch-manipulation ${
                active
                  ? "border-vow-kept/70 bg-ink-700/70"
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
      <div>
        <button
          type="button"
          className="btn btn-primary w-full sm:w-auto"
          disabled={!selected}
          onClick={() => selected && onConfirm(selected)}
        >
          Begin
        </button>
      </div>
    </div>
  );
}
