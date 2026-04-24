import type { EndingDefinition } from "../engine/types";

interface Props {
  ending: EndingDefinition;
  onRestart: () => void;
  onReturn: () => void;
}

export function EndingScreen({ ending, onRestart, onReturn }: Props) {
  return (
    <article className="max-w-2xl mx-auto min-w-0 pb-4 sm:pb-6">
      <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.26em] sm:tracking-[0.3em] text-parchment-200/50 font-sans">
        Closing
      </p>
      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-parchment-50 mt-1.5 mb-4 sm:mb-5 break-words text-balance leading-tight">
        {ending.title}
      </h2>
      <div className="prose-story mb-7 sm:mb-8 max-w-prose min-w-0">
        {ending.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {ending.echoes && ending.echoes.length > 0 && (
        <div className="border-t border-parchment-200/10 pt-5 mb-7 sm:mb-8">
          <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.25em] text-parchment-200/50 font-sans mb-3">
            Echoes that remain
          </p>
          <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {ending.echoes.map((echo) => (
              <li
                key={echo}
                className="px-3 py-2 rounded-sm border border-vow-kept/40 text-vow-kept/90 text-sm font-sans break-words max-w-full leading-snug"
              >
                {echo.replace(/_/g, " ")}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center pt-1">
        <button type="button" className="btn w-full sm:w-auto touch-manipulation" onClick={onReturn}>
          Back to the shelf
        </button>
        <button type="button" className="btn btn-primary w-full sm:w-auto touch-manipulation" onClick={onRestart}>
          Read this thread again
        </button>
      </div>
    </article>
  );
}
