import { Link } from "react-router-dom";
import {
  getStoryBrowseState,
  isReleaseBrowseStory,
} from "../engine/storyPresentation";
import { storyRegistry } from "../stories";
import { selectProfile } from "../store/storyStoreSelectors";
import { useStoryStore } from "../store/useStoryStore";

function shelfOrderIndex(storyId: string): number {
  const i = storyRegistry.findIndex((s) => s.id === storyId);
  return i === -1 ? 9999 : i;
}

export function StorySelectPage() {
  const profile = useStoryStore(selectProfile);

  const browseRegistry = storyRegistry.filter(isReleaseBrowseStory);
  const all = browseRegistry.map((story) => ({
    story,
    browse: getStoryBrowseState(story, profile, { allStories: storyRegistry }),
  }));

  const rumors = all.filter((e) => e.browse.surfacing.state === "rumor");
  const teasers = all.filter((e) => e.browse.surfacing.state === "teaser");
  const mainListed = all.filter((e) => e.browse.surfacing.isListed);
  /** Open rows first (release curation), then held rows; registry order within each band. */
  const mainList = [...mainListed].sort((a, b) => {
    const ak = a.browse.unlocked ? 0 : 1;
    const bk = b.browse.unlocked ? 0 : 1;
    if (ak !== bk) return ak - bk;
    return shelfOrderIndex(a.story.id) - shelfOrderIndex(b.story.id);
  });

  const showShelfHeading = mainList.length > 0 && (rumors.length > 0 || teasers.length > 0);

  return (
    <main className="page-shell max-w-3xl">
      <Link to="/" className="back-nav -ml-1 pl-1">
        ← Home
      </Link>
      <h1 className="font-serif text-3xl sm:text-4xl text-parchment-50 mt-3 mb-2 sm:mt-4 sm:mb-3 text-balance">
        Stories
      </h1>
      <p className="text-parchment-200/70 text-sm sm:text-base mb-8 sm:mb-10 max-w-xl leading-relaxed">
        Rumors first, then distant shapes, then the shelf—only what your path has
        made room for. The order is on purpose.
      </p>

      {rumors.length > 0 ? (
        <section className="mb-0" aria-labelledby="browse-rumors">
          <div className="browse-section-intro">
            <h2 id="browse-rumors" className="browse-section-label">
              Rumors
            </h2>
            <p className="browse-section-kicker">
              Half-heard truths. Tap to sit with the whisper—the full thread still
              waits elsewhere.
            </p>
          </div>
          <ul className="flex flex-col gap-4 sm:gap-5">
            {rumors.map(({ story, browse }) => {
              const p = browse.surfacing.playerFacing;
              const line = p.rumorText ?? "";
              return (
                <li key={story.id}>
                  <Link
                    to={`/stories/${story.id}`}
                    className="block min-h-[52px] rounded-sm border border-parchment-200/12 bg-ink-900/35 px-4 py-4 sm:py-3.5 hover:border-parchment-200/28 active:border-parchment-200/40 active:bg-ink-900/50 transition-colors touch-manipulation"
                  >
                    <p className="text-parchment-100/88 text-[0.9375rem] sm:text-sm leading-[1.65] italic text-pretty">
                      {line}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {rumors.length > 0 && teasers.length > 0 ? (
        <div className="browse-region-divider" aria-hidden="true" />
      ) : null}

      {teasers.length > 0 ? (
        <section className="mb-0" aria-labelledby="browse-teasers">
          <div className="browse-section-intro">
            <h2 id="browse-teasers" className="browse-section-label">
              On the horizon
            </h2>
            <p className="browse-section-kicker">
              You can see it listed, but the threshold stays shut until something
              you've done asks it to open.
            </p>
          </div>
          <ul className="flex flex-col gap-5 sm:gap-6">
            {teasers.map(({ story, browse }) => {
              const p = browse.surfacing.playerFacing;
              return (
                <li key={story.id}>
                  <Link
                    to={`/stories/${story.id}`}
                    className="block min-h-[52px] rounded-sm border border-parchment-200/14 bg-ink-800/45 p-4 sm:p-5 hover:border-parchment-200/32 active:border-parchment-200/45 transition-colors touch-manipulation"
                  >
                    <h3 className="font-serif text-lg sm:text-xl text-parchment-50 mb-2 text-balance">
                      {p.teaserTitle}
                    </h3>
                    <p className="text-parchment-200/80 text-sm sm:text-base leading-relaxed max-w-prose line-clamp-5 sm:line-clamp-none text-pretty">
                      {p.teaserSummary}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {(rumors.length > 0 || teasers.length > 0) && mainList.length > 0 ? (
        <div className="browse-region-divider" aria-hidden="true" />
      ) : null}

      {showShelfHeading ? (
        <div className="browse-section-intro pt-1">
          <h2 id="browse-shelf" className="browse-section-label">
            On the shelf
          </h2>
          <p className="browse-section-kicker">
            Open rows are yours to enter; the rest say plainly what they're
            waiting on.
          </p>
        </div>
      ) : null}

      <ul
        className="flex flex-col gap-6 sm:gap-7"
        aria-labelledby={showShelfHeading ? "browse-shelf" : undefined}
      >
        {mainList.map(({ story, browse }) => {
          const locked = !browse.unlocked;
          const state = browse.surfacing.state;
          const p = browse.surfacing.playerFacing;
          const heldEyebrow =
            state === "listed_secret" ? "Secret · waiting" : "Waiting";

          const inner = (
            <>
              {!locked ? (
                <p className="browse-row-eyebrow browse-row-eyebrow--open">Ready</p>
              ) : (
                <p className="browse-row-eyebrow browse-row-eyebrow--held">{heldEyebrow}</p>
              )}
              {p.secretHint ? (
                <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.22em] text-parchment-200/55 font-sans mb-2 italic">
                  {p.secretHint}
                </p>
              ) : null}
              {p.toneHint ? (
                <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.24em] sm:tracking-[0.28em] text-parchment-200/45 font-sans mb-2">
                  {p.toneHint}
                </p>
              ) : null}
              <h2 className="font-serif text-xl sm:text-2xl text-parchment-50 mb-2 text-balance">
                {p.displayTitle}
              </h2>
              {p.continuationHint ? (
                <p className="shelf-continuation-hint mb-3">{p.continuationHint}</p>
              ) : null}
              <p className="text-parchment-100/85 text-sm sm:text-base leading-[1.65] sm:leading-relaxed mb-3 max-w-prose line-clamp-6 sm:line-clamp-none text-pretty">
                {p.displaySummary}
              </p>
              {!locked ? (
                <p className="text-parchment-200/60 italic text-[0.8125rem] sm:text-sm mb-1">
                  {p.roleHint}
                </p>
              ) : null}
              {locked && p.unlockHint ? (
                <p className="text-parchment-200/50 text-sm mt-2 border-l-2 border-vow-strained/50 pl-3 leading-relaxed">
                  {p.unlockHint}
                </p>
              ) : null}
            </>
          );

          const cardClass =
            "rounded-sm border p-4 sm:p-6 transition-colors min-h-[52px] " +
            (locked
              ? "border-parchment-200/10 bg-ink-900/40 opacity-85 cursor-not-allowed"
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
