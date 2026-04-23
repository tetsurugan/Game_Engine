import { Link } from "react-router-dom";
import { getStoryBrowseState } from "../engine/storyPresentation";
import { storyRegistry } from "../stories";
import { useStoryStore } from "../store/useStoryStore";

export function StorySelectPage() {
  const profile = useStoryStore((s) => s.profile);

  const all = storyRegistry.map((story) => ({
    story,
    browse: getStoryBrowseState(story, profile, { allStories: storyRegistry }),
  }));

  const rumors = all.filter((e) => e.browse.surfacing.state === "rumor");
  const teasers = all.filter((e) => e.browse.surfacing.state === "teaser");
  const mainList = all.filter((e) => e.browse.surfacing.isListed);

  return (
    <main className="page-shell max-w-3xl">
      <Link to="/" className="back-nav">
        ← Home
      </Link>
      <h1 className="font-serif text-3xl sm:text-4xl text-parchment-50 mt-3 mb-2 sm:mt-4 sm:mb-3">
        Stories
      </h1>
      <p className="text-parchment-200/70 text-sm sm:text-base mb-8 sm:mb-10 max-w-xl leading-relaxed">
        Choose where to begin. What you finish here may be remembered later.
      </p>

      {rumors.length > 0 ? (
        <section className="mb-8 sm:mb-10" aria-labelledby="browse-rumors">
          <h2
            id="browse-rumors"
            className="text-xs uppercase tracking-[0.28em] text-parchment-200/40 font-sans mb-3 sm:mb-4"
          >
            Rumors
          </h2>
          <ul className="flex flex-col gap-3">
            {rumors.map(({ story, browse }) => {
              const p = browse.surfacing.playerFacing;
              const line = p.rumorText ?? "";
              return (
                <li key={story.id}>
                  <Link
                    to={`/stories/${story.id}`}
                    className="block min-h-[48px] rounded-sm border border-parchment-200/10 bg-ink-900/30 px-4 py-3.5 hover:border-parchment-200/25 active:border-parchment-200/35 transition-colors touch-manipulation"
                  >
                    <p className="text-parchment-100/85 text-sm leading-relaxed italic">
                      {line}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {teasers.length > 0 ? (
        <section className="mb-8 sm:mb-10" aria-labelledby="browse-teasers">
          <h2
            id="browse-teasers"
            className="text-xs uppercase tracking-[0.28em] text-parchment-200/40 font-sans mb-3 sm:mb-4"
          >
            On the horizon
          </h2>
          <ul className="flex flex-col gap-3 sm:gap-4">
            {teasers.map(({ story, browse }) => {
              const p = browse.surfacing.playerFacing;
              return (
                <li key={story.id}>
                  <Link
                    to={`/stories/${story.id}`}
                    className="block rounded-sm border border-parchment-200/12 bg-ink-800/40 p-4 sm:p-5 hover:border-parchment-200/30 active:border-parchment-200/40 transition-colors touch-manipulation"
                  >
                    <h3 className="font-serif text-lg sm:text-xl text-parchment-50 mb-2">
                      {p.teaserTitle}
                    </h3>
                    <p className="text-parchment-200/75 text-sm leading-relaxed">
                      {p.teaserSummary}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {mainList.length > 0 && (rumors.length > 0 || teasers.length > 0) ? (
        <h2
          id="browse-shelf"
          className="text-xs uppercase tracking-[0.28em] text-parchment-200/40 font-sans mb-3 sm:mb-4 pt-2 border-t border-parchment-200/10"
        >
          On the shelf
        </h2>
      ) : null}

      <ul className="flex flex-col gap-4 sm:gap-5" aria-labelledby={mainList.length > 0 && (rumors.length > 0 || teasers.length > 0) ? "browse-shelf" : undefined}>
        {mainList.map(({ story, browse }) => {
          const locked = !browse.unlocked;
          const p = browse.surfacing.playerFacing;
          const inner = (
            <>
              {p.secretHint ? (
                <p className="text-xs uppercase tracking-[0.22em] text-parchment-200/55 font-sans mb-2 italic">
                  {p.secretHint}
                </p>
              ) : null}
              {p.toneHint ? (
                <p className="text-xs uppercase tracking-[0.28em] text-parchment-200/45 font-sans mb-2">
                  {p.toneHint}
                </p>
              ) : null}
              {p.continuationHint ? (
                <p className="text-parchment-200/55 text-sm italic mb-2 leading-relaxed">
                  {p.continuationHint}
                </p>
              ) : null}
              <h2 className="font-serif text-xl sm:text-2xl text-parchment-50 mb-2">
                {p.displayTitle}
              </h2>
              <p className="text-parchment-100/80 text-sm sm:text-base leading-relaxed mb-3">
                {p.displaySummary}
              </p>
              <p className="text-parchment-200/65 italic text-sm mb-1">
                {p.roleHint}
              </p>
              {locked && p.unlockHint ? (
                <p className="text-parchment-200/50 text-sm mt-2 border-l-2 border-vow-strained/50 pl-3">
                  {p.unlockHint}
                </p>
              ) : null}
              {locked ? (
                <p className="text-xs uppercase tracking-[0.2em] text-vow-strained/90 font-sans mt-3">
                  Locked
                </p>
              ) : null}
            </>
          );

          const cardClass =
            "rounded-sm border p-4 sm:p-6 transition-colors " +
            (locked
              ? "border-parchment-200/10 bg-ink-900/40 opacity-75 cursor-not-allowed"
              : "border-parchment-200/15 bg-ink-800/50 hover:border-parchment-200/40 active:border-parchment-200/50 touch-manipulation");

          return (
            <li key={story.id}>
              {locked ? (
                <div className={cardClass} aria-disabled="true">
                  {inner}
                </div>
              ) : (
                <Link to={`/stories/${story.id}`} className={`block ${cardClass}`}>
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
