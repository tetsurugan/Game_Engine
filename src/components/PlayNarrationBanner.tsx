import type {
  PlayNarrationArrivalKind,
  PressuredResolutionKind,
  ResolvedPlayNarration,
} from "../engine/types";

interface Props {
  frame: ResolvedPlayNarration | null;
}

function postChoiceEyebrow(kind?: PressuredResolutionKind): string {
  switch (kind) {
    case "forced":
      return "Carried forward";
    case "mutated":
      return "Something shifts";
    case "strained":
      return "Weight on the line";
    case "normal":
      return "After the beat";
    default:
      return "After the beat";
  }
}

function arrivalEyebrow(kind: PlayNarrationArrivalKind): string {
  switch (kind) {
    case "forced":
      return "Brought here";
    case "mutated":
      return "Arrival, altered";
    case "free":
      return "You arrive";
    default:
      return "You arrive";
  }
}

/**
 * Renders a store-provided narration frame (engine-resolved, not recomputed here).
 */
export function PlayNarrationBanner({ frame }: Props) {
  if (!frame?.postChoice && !frame?.sceneArrival) return null;

  return (
    <aside
      className="mb-4 sm:mb-5 rounded-md border border-amber-900/20 border-l-[3px] border-l-amber-700/30 bg-stone-950/35 px-3 py-2.5 sm:px-4 sm:py-3 text-parchment-200/90 shadow-sm max-w-[36rem] w-full min-w-0"
      aria-label="Narration aside"
    >
      {frame.postChoice && (
        <div className={frame.sceneArrival ? "mb-2.5 sm:mb-3.5" : ""}>
          <p className="mb-1 text-[0.6rem] sm:text-[0.65rem] font-semibold uppercase tracking-wide sm:tracking-wider text-amber-200/40 leading-tight">
            {postChoiceEyebrow(frame.postChoice.resolutionKind)}
          </p>
          {frame.postChoice.lines.map((line, i) => (
            <p
              key={`p-${i}`}
              className="font-serif italic text-[0.8125rem] sm:text-base leading-[1.55] sm:leading-relaxed text-parchment-100/85 text-pretty break-words"
            >
              {line}
            </p>
          ))}
        </div>
      )}
      {frame.sceneArrival && (
        <div>
          <p className="mb-1 text-[0.6rem] sm:text-[0.65rem] font-semibold uppercase tracking-wide sm:tracking-wider text-amber-200/40 leading-tight">
            {arrivalEyebrow(frame.sceneArrival.kind)}
          </p>
          {frame.sceneArrival.lines.map((line, i) => (
            <p
              key={`a-${i}`}
              className="font-serif italic text-[0.8125rem] sm:text-base leading-[1.55] sm:leading-relaxed text-parchment-100/85 text-pretty break-words"
            >
              {line}
            </p>
          ))}
        </div>
      )}
    </aside>
  );
}
