import type { ResolvedPlayNarration } from "../engine/types";

interface Props {
  frame: ResolvedPlayNarration | null;
}

/**
 * Renders a store-provided narration frame (engine-resolved, not recomputed here).
 */
export function PlayNarrationBanner({ frame }: Props) {
  if (!frame?.postChoice && !frame?.sceneArrival) return null;

  return (
    <aside
      className="mb-5 sm:mb-6 rounded-md border border-amber-900/25 border-l-4 border-l-amber-700/35 bg-stone-950/50 px-3 py-3 sm:px-4 sm:py-3.5 text-sm text-parchment-200/90 shadow-sm max-w-[36rem] w-full"
      aria-label="Story narration"
    >
      {frame.postChoice && (
        <div className={frame.sceneArrival ? "mb-3 sm:mb-4" : ""}>
          <p className="mb-1 text-[0.6rem] sm:text-[0.65rem] font-semibold uppercase tracking-wider sm:tracking-widest text-amber-200/45">
            {frame.postChoice.resolutionKind
              ? `After choice — ${frame.postChoice.resolutionKind}`
              : "After choice"}
          </p>
          {frame.postChoice.lines.map((line, i) => (
            <p
              key={`p-${i}`}
              className="font-serif italic text-sm sm:text-base leading-relaxed text-parchment-100/88 text-pretty"
            >
              {line}
            </p>
          ))}
        </div>
      )}
      {frame.sceneArrival && (
        <div>
          <p className="mb-1 text-[0.6rem] sm:text-[0.65rem] font-semibold uppercase tracking-wider sm:tracking-widest text-amber-200/45">
            Arrival — {frame.sceneArrival.kind}
          </p>
          {frame.sceneArrival.lines.map((line, i) => (
            <p
              key={`a-${i}`}
              className="font-serif italic text-sm sm:text-base leading-relaxed text-parchment-100/88 text-pretty"
            >
              {line}
            </p>
          ))}
        </div>
      )}
    </aside>
  );
}
