import type { EndingDefinition } from "../engine/types";

interface Props {
  ending: EndingDefinition;
  onRestart: () => void;
  onReturn: () => void;
}

export function EndingScreen({ ending, onRestart, onReturn }: Props) {
  return (
    <article className="max-w-2xl mx-auto min-w-0 pb-6">
      <p className="text-xs uppercase tracking-[0.3em] text-parchment-200/50 font-sans">
        Ending
      </p>
      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-parchment-50 mt-1 mb-4 sm:mb-6 break-words text-balance">
        {ending.title}
      </h2>
      <div className="prose-story mb-6 sm:mb-8 max-w-prose">
        {ending.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {ending.echoes && ending.echoes.length > 0 && (
        <div className="border-t border-parchment-200/10 pt-4 mb-6 sm:mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-parchment-200/50 font-sans mb-2">
            Echoes Left Behind
          </p>
          <ul className="flex flex-wrap gap-2">
            {ending.echoes.map((echo) => (
              <li
                key={echo}
                className="px-3 py-1.5 rounded-sm border border-vow-kept/40 text-vow-kept/90 text-sm font-sans break-words"
              >
                {echo.replace(/_/g, " ")}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap pt-2">
        <button type="button" className="btn w-full sm:w-auto touch-manipulation" onClick={onReturn}>
          Return to stories
        </button>
        <button type="button" className="btn btn-primary w-full sm:w-auto touch-manipulation" onClick={onRestart}>
          Begin again
        </button>
      </div>
    </article>
  );
}
