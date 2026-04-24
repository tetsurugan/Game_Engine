import type { StoryDefinition, VariableValue } from "../engine/types";

interface Props {
  story: StoryDefinition;
  variables: Record<string, VariableValue>;
}

function formatLabel(id: string): string {
  return id.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function StatPanel({ story, variables }: Props) {
  const numericVars = story.variables.filter((v) => v.type === "number");
  if (numericVars.length === 0) return null;

  return (
    <aside className="rounded-sm border border-parchment-200/10 bg-ink-800/40 p-4 sm:p-4">
      <h3 className="text-[0.65rem] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.25em] text-parchment-200/50 font-sans mb-3">
        Bearing
      </h3>
      <ul className="space-y-1.5 font-sans text-sm">
        {numericVars.map((v) => {
          const value = variables[v.id];
          return (
            <li key={v.id} className="flex justify-between text-parchment-100/80">
              <span>{formatLabel(v.id)}</span>
              <span className="tabular-nums text-parchment-50">
                {String(value)}
              </span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
