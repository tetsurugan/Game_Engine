import { useNavigate, useParams, Link } from "react-router-dom";
import { getStoryBrowseState } from "../engine/storyPresentation";
import { getStoryById, storyRegistry } from "../stories";
import { PersonalitySelector } from "../components/PersonalitySelector";
import { useStoryStore } from "../store/useStoryStore";

export function StoryIntroPage() {
  const { storyId = "" } = useParams();
  const navigate = useNavigate();
  const startStory = useStoryStore((s) => s.startStory);
  const profile = useStoryStore((s) => s.profile);

  const story = getStoryById(storyId);
  if (!story) {
    return (
      <main className="page-shell max-w-xl">
        <p className="text-parchment-200/80 leading-relaxed">Unknown story.</p>
        <Link to="/stories" className="btn mt-6 w-full sm:w-auto touch-manipulation">
          Back
        </Link>
      </main>
    );
  }

  const browse = getStoryBrowseState(story, profile, {
    allStories: storyRegistry,
  });
  const { surfacing } = browse;
  const p = surfacing.playerFacing;

  if (surfacing.state === "hidden") {
    return (
      <main className="page-shell max-w-3xl">
        <Link to="/stories" className="back-nav -ml-1 pl-1">
          ← Stories
        </Link>
        <h1 className="font-serif text-2xl sm:text-3xl text-parchment-50 mt-6 sm:mt-8 mb-3 sm:mb-4 text-balance">
          Not yet
        </h1>
        <p className="text-parchment-200/75 mb-6 text-sm sm:text-base leading-relaxed">
          This tale has not surfaced in your anthology yet.
        </p>
        <Link to="/stories" className="btn w-full sm:w-auto">
          Return to stories
        </Link>
      </main>
    );
  }

  if (surfacing.state === "rumor") {
    return (
      <main className="page-shell max-w-3xl">
        <Link to="/stories" className="back-nav -ml-1 pl-1">
          ← Stories
        </Link>
        <p className="text-xs uppercase tracking-[0.3em] text-parchment-200/45 font-sans mt-6 sm:mt-8 mb-3 sm:mb-4">
          Rumor
        </p>
        <p className="font-serif text-lg sm:text-2xl text-parchment-100/90 leading-[1.65] sm:leading-relaxed italic mb-6 sm:mb-8 max-w-prose text-pretty">
          {p.rumorText ?? "Something travels ahead of the truth."}
        </p>
        <p className="text-parchment-200/70 text-sm sm:text-base mb-8 leading-relaxed max-w-prose">
          The full thread is not yours to pull—yet.
        </p>
        <Link to="/stories" className="btn w-full sm:w-auto">
          Back to stories
        </Link>
      </main>
    );
  }

  if (surfacing.state === "teaser") {
    return (
      <main className="page-shell max-w-3xl">
        <Link to="/stories" className="back-nav -ml-1 pl-1">
          ← Stories
        </Link>
        {p.toneHint ? (
          <p className="text-xs uppercase tracking-[0.3em] text-parchment-200/50 font-sans mt-6 sm:mt-8">
            {p.toneHint}
          </p>
        ) : null}
        <h1 className="font-serif text-3xl sm:text-4xl text-parchment-50 mt-3 sm:mt-4 mb-3 text-balance">
          {p.teaserTitle}
        </h1>
        <p className="text-parchment-100/85 text-base sm:text-lg mb-6 sm:mb-8 leading-[1.65] sm:leading-relaxed max-w-prose text-pretty">
          {p.teaserSummary}
        </p>
        <p className="text-parchment-200/60 text-sm mb-8 leading-relaxed">
          This path is still forming. Return when your anthology opens it.
        </p>
        <Link to="/stories" className="btn w-full sm:w-auto">
          Back to stories
        </Link>
      </main>
    );
  }

  if (!browse.unlocked) {
    const secretEyebrow =
      surfacing.state === "listed_secret" || p.secretHint ? "Secret" : null;
    return (
      <main className="page-shell max-w-3xl">
        <Link to="/stories" className="back-nav -ml-1 pl-1">
          ← Stories
        </Link>
        {secretEyebrow ? (
          <p className="text-xs uppercase tracking-[0.3em] text-parchment-200/45 font-sans mt-4 sm:mt-6">
            {secretEyebrow}
          </p>
        ) : null}
        {p.secretHint ? (
          <p className="text-parchment-200/70 italic text-sm mt-3 mb-1 leading-relaxed">
            {p.secretHint}
          </p>
        ) : null}
        {p.toneHint ? (
          <p className="text-xs uppercase tracking-[0.3em] text-parchment-200/50 font-sans mt-4 sm:mt-6">
            {p.toneHint}
          </p>
        ) : null}
        <h1 className="font-serif text-3xl sm:text-4xl text-parchment-50 mt-2 mb-3 text-balance">
          {p.displayTitle}
        </h1>
        {p.continuationHint ? (
          <p className="text-parchment-200/65 text-sm italic mb-4 leading-relaxed max-w-prose">
            {p.continuationHint}
          </p>
        ) : null}
        <p className="text-parchment-100/85 text-base sm:text-lg mb-6 leading-[1.65] sm:leading-relaxed max-w-prose text-pretty">
          {p.displaySummary}
        </p>
        <div className="rounded-sm border border-vow-strained/40 bg-ink-800/50 p-4 sm:p-5 mb-8 max-w-prose">
          <p className="text-xs uppercase tracking-[0.25em] text-vow-strained font-sans mb-2">
            Locked
          </p>
          <p className="text-parchment-100/85 text-sm sm:text-base leading-relaxed">
            {p.unlockHint ?? "Another path must open before you can begin this one."}
          </p>
        </div>
        <Link to="/stories" className="btn w-full sm:w-auto">
          Back to stories
        </Link>
      </main>
    );
  }

  const handleConfirm = (personalityId: string) => {
    if (startStory(story.id, personalityId)) {
      navigate(`/play/${story.id}`);
    }
  };

  const handleBeginWithoutPersonality = () => {
    if (startStory(story.id)) {
      navigate(`/play/${story.id}`);
    }
  };

  return (
    <main className="page-shell max-w-3xl">
      <Link to="/stories" className="back-nav -ml-1 pl-1">
        ← Stories
      </Link>
      {p.secretHint ? (
        <p className="text-xs uppercase tracking-[0.22em] text-parchment-200/55 font-sans mt-4 sm:mt-6 italic leading-relaxed">
          {p.secretHint}
        </p>
      ) : null}
      {p.toneHint ? (
        <p className="text-xs uppercase tracking-[0.3em] text-parchment-200/50 font-sans mt-4 sm:mt-6">
          {p.toneHint}
        </p>
      ) : null}
      <h1 className="font-serif text-3xl sm:text-4xl text-parchment-50 mt-2 mb-3 text-balance">
        {p.displayTitle}
      </h1>
      {p.continuationHint ? (
        <p className="text-parchment-200/65 text-sm italic mb-3 leading-relaxed max-w-prose">
          {p.continuationHint}
        </p>
      ) : null}
      <p className="text-parchment-100/85 text-base sm:text-lg mb-2 leading-[1.65] sm:leading-relaxed max-w-prose text-pretty">
        {p.displaySummary}
      </p>
      <p className="text-parchment-200/65 italic mb-8 sm:mb-10 text-sm sm:text-base leading-relaxed max-w-prose">
        {p.roleHint}
      </p>

      {story.personalities && story.personalities.length > 0 ? (
        <>
          <h2 className="font-serif text-xl sm:text-2xl text-parchment-50 mb-4">
            Who will you be?
          </h2>
          <PersonalitySelector
            personalities={story.personalities}
            onConfirm={handleConfirm}
          />
        </>
      ) : (
        <button
          type="button"
          className="btn btn-primary w-full sm:w-auto"
          onClick={handleBeginWithoutPersonality}
        >
          Begin
        </button>
      )}
    </main>
  );
}
