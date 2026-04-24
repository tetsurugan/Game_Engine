import { getStoryPlayerPresentation } from "../engine/storyPresentation";
import type { StoryDefinition } from "../engine/types";

interface Props {
  story: StoryDefinition;
}

export function StoryHeader({ story }: Props) {
  const p = getStoryPlayerPresentation(story);
  return (
    <header className="mb-4 sm:mb-5 pb-3 sm:pb-4 border-b border-parchment-200/10">
      {p.toneHint ? (
        <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.26em] sm:tracking-[0.28em] text-parchment-200/50 font-sans leading-snug">
          {p.toneHint}
        </p>
      ) : null}
      <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-parchment-50 mt-1 sm:mt-1.5 break-words text-balance leading-tight sm:leading-snug">
        {p.title}
      </h1>
    </header>
  );
}
