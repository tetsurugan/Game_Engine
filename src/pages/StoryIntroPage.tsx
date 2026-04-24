import { useNavigate, useParams, Link } from "react-router-dom";
import { getStoryBrowseState } from "../engine/storyPresentation";
import { getStoryById, storyRegistry } from "../stories";
import { PersonalitySelector } from "../components/PersonalitySelector";
import {
  selectProfile,
  selectStartStory,
} from "../store/storyStoreSelectors";
import { useStoryStore } from "../store/useStoryStore";

export function StoryIntroPage() {
  const { storyId = "" } = useParams();
  const navigate = useNavigate();
  const startStory = useStoryStore(selectStartStory);
  const profile = useStoryStore(selectProfile);

  const story = getStoryById(storyId);
  if (!story) {
    return (
      <main className="page-shell max-w-xl">
        <p className="text-parchment-200/80 leading-relaxed">
          That title isn't in this anthology.
        </p>
        <Link to="/stories" className="btn mt-6 w-full sm:w-auto touch-manipulation">
          Back to stories
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
        <p className="intro-state-eyebrow intro-state-eyebrow--hidden">Not on your shelf</p>
        <h1 className="font-serif text-2xl sm:text-3xl text-parchment-50 mt-2 sm:mt-3 mb-3 sm:mb-4 text-balance">
          Not yet
        </h1>
        <p className="text-parchment-200/75 mb-6 text-sm sm:text-base leading-relaxed max-w-prose">
          Nothing is wrong—it hasn't reached you yet. Another choice or another
          ending may call it forward; the shelf will tell you when.
        </p>
        <div className="intro-cta-stack">
          <Link to="/stories" className="btn w-full sm:w-auto touch-manipulation">
            Return to stories
          </Link>
        </div>
      </main>
    );
  }

  if (surfacing.state === "rumor") {
    return (
      <main className="page-shell max-w-3xl">
        <Link to="/stories" className="back-nav -ml-1 pl-1">
          ← Stories
        </Link>
        <p className="intro-state-eyebrow intro-state-eyebrow--whisper">Rumor</p>
        <p className="font-serif text-lg sm:text-2xl text-parchment-100/90 leading-[1.65] sm:leading-relaxed italic mb-5 sm:mb-6 max-w-prose text-pretty">
          {p.rumorText ?? "Something moves ahead of the truth—too thin to grasp."}
        </p>
        <p className="text-parchment-200/70 text-sm sm:text-base mb-8 leading-relaxed max-w-prose">
          Carry it back to the shelf or leave it here. You can't enter the thread
          yet—that's the shape of things, not a slight.
        </p>
        <div className="intro-cta-stack">
          <Link to="/stories" className="btn w-full sm:w-auto touch-manipulation">
            Back to stories
          </Link>
        </div>
      </main>
    );
  }

  if (surfacing.state === "teaser") {
    return (
      <main className="page-shell max-w-3xl">
        <Link to="/stories" className="back-nav -ml-1 pl-1">
          ← Stories
        </Link>
        <p className="intro-state-eyebrow intro-state-eyebrow--horizon">On the horizon</p>
        {p.toneHint ? (
          <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.26em] text-parchment-200/50 font-sans mt-2 mb-1">
            {p.toneHint}
          </p>
        ) : null}
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-parchment-50 mt-2 mb-3 text-balance">
          {p.teaserTitle}
        </h1>
        <p className="text-parchment-100/85 text-base sm:text-lg mb-6 sm:mb-7 leading-[1.65] sm:leading-relaxed max-w-prose text-pretty">
          {p.teaserSummary}
        </p>
        <p className="text-parchment-200/60 text-sm mb-8 leading-relaxed max-w-prose">
          It's real enough to name, not yet real enough to step into. When the
          shelf grants it, it leaves the horizon—until then, let it stay a shape.
        </p>
        <div className="intro-cta-stack">
          <Link to="/stories" className="btn w-full sm:w-auto touch-manipulation">
            Back to stories
          </Link>
        </div>
      </main>
    );
  }

  if (!browse.unlocked) {
    const isSecret = surfacing.state === "listed_secret";
    return (
      <main className="page-shell max-w-3xl">
        <Link to="/stories" className="back-nav -ml-1 pl-1">
          ← Stories
        </Link>
        <p
          className={`intro-state-eyebrow ${isSecret ? "intro-state-eyebrow--secret" : "intro-state-eyebrow--held"}`}
        >
          {isSecret ? "Secret · waiting" : "Waiting"}
        </p>
        {p.secretHint ? (
          <p className="text-parchment-200/70 italic text-sm mt-3 mb-1 leading-relaxed max-w-prose">
            {p.secretHint}
          </p>
        ) : null}
        {p.toneHint ? (
          <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.26em] text-parchment-200/50 font-sans mt-4 sm:mt-5">
            {p.toneHint}
          </p>
        ) : null}
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-parchment-50 mt-2 mb-3 text-balance">
          {p.displayTitle}
        </h1>
        {p.continuationHint ? (
          <p className="intro-continuation-hint mb-4">{p.continuationHint}</p>
        ) : null}
        <p className="text-parchment-100/85 text-base sm:text-lg mb-6 leading-[1.65] sm:leading-relaxed max-w-prose text-pretty">
          {p.displaySummary}
        </p>
        <div className="rounded-sm border border-vow-strained/40 bg-ink-800/50 p-4 sm:p-5 mb-8 max-w-prose">
          <p className="text-[0.65rem] uppercase tracking-[0.22em] text-vow-strained font-sans mb-2">
            What it's waiting on
          </p>
          <p className="text-parchment-100/85 text-sm sm:text-base leading-relaxed">
            {p.unlockHint ??
              "Another story's choice has to land before this threshold clears."}
          </p>
        </div>
        <div className="intro-cta-stack">
          <Link to="/stories" className="btn w-full sm:w-auto touch-manipulation">
            Back to stories
          </Link>
        </div>
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
      <p className="intro-state-eyebrow intro-state-eyebrow--open">Ready when you are</p>
      {p.secretHint ? (
        <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.2em] text-parchment-200/55 font-sans mt-2 sm:mt-3 italic leading-relaxed max-w-prose">
          {p.secretHint}
        </p>
      ) : null}
      {p.toneHint ? (
        <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.26em] text-parchment-200/50 font-sans mt-4 sm:mt-5">
          {p.toneHint}
        </p>
      ) : null}
      <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-parchment-50 mt-2 mb-3 text-balance">
        {p.displayTitle}
      </h1>
      {p.continuationHint ? (
        <p className="intro-continuation-hint mb-3">{p.continuationHint}</p>
      ) : null}
      <p className="text-parchment-100/85 text-base sm:text-lg mb-2 leading-[1.65] sm:leading-relaxed max-w-prose text-pretty">
        {p.displaySummary}
      </p>
      <p className="text-parchment-200/60 italic mb-8 sm:mb-9 text-sm sm:text-base leading-relaxed max-w-prose">
        {p.roleHint}
      </p>

      {story.personalities && story.personalities.length > 0 ? (
        <>
          <h2 className="font-serif text-lg sm:text-2xl text-parchment-50 mb-4">
            Who are you in this thread?
          </h2>
          <PersonalitySelector
            personalities={story.personalities}
            onConfirm={handleConfirm}
          />
        </>
      ) : (
        <div className="intro-cta-stack">
          <button
            type="button"
            className="btn btn-primary w-full sm:w-auto touch-manipulation"
            onClick={handleBeginWithoutPersonality}
          >
            Begin
          </button>
        </div>
      )}
    </main>
  );
}
