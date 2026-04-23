import type { StoryDefinition, VowState } from "../engine/types";

interface Props {
  story: StoryDefinition;
  vowStates: Record<string, VowState>;
}

const stateStyles: Record<VowState, string> = {
  kept: "text-vow-kept border-vow-kept/40",
  strained: "text-vow-strained border-vow-strained/50",
  broken: "text-vow-broken border-vow-broken/60 line-through",
};

const stateLabel: Record<VowState, string> = {
  kept: "kept",
  strained: "strained",
  broken: "broken",
};

export function VowPanel({ story, vowStates }: Props) {
  if (!story.vows || story.vows.length === 0) return null;
  return (
    <aside className="rounded-sm border border-parchment-200/10 bg-ink-800/40 p-3 sm:p-4">
      <h3 className="text-xs uppercase tracking-[0.25em] text-parchment-200/50 font-sans mb-3">
        Vows
      </h3>
      <ul className="space-y-2">
        {story.vows.map((vow) => {
          const state = vowStates[vow.id] ?? "kept";
          return (
            <li
              key={vow.id}
              className={`flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between border-l-2 pl-3 ${stateStyles[state]}`}
            >
              <span className="font-serif text-sm sm:text-base break-words pr-2">
                {vow.title}
              </span>
              <span className="shrink-0 text-[10px] uppercase tracking-[0.2em] font-sans opacity-80">
                {stateLabel[state]}
              </span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
