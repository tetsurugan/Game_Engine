import { Link, useNavigate } from "react-router-dom";
import { useStoryStore } from "../store/useStoryStore";

export function HomePage() {
  const navigate = useNavigate();
  const profile = useStoryStore((s) => s.profile);
  const continueStory = useStoryStore((s) => s.continueStory);

  const hasSave = !!profile.lastRuntime;

  const onContinue = () => {
    if (!continueStory()) return;
    const runtime = useStoryStore.getState().runtime;
    if (!runtime) return;
    if (runtime.endingId) navigate(`/play/${runtime.storyId}`);
    else navigate(`/play/${runtime.storyId}`);
  };

  return (
    <main className="min-h-[100dvh] min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:px-6 sm:py-16 [padding-bottom:max(3rem,env(safe-area-inset-bottom,0px))]">
      <div className="max-w-2xl w-full text-center">
        <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.5em] text-parchment-200/50 font-sans mb-3 sm:mb-4 px-2">
          An anthology of interconnected stories
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-parchment-50 mb-4 sm:mb-6 px-2">
          The Vow Between
        </h1>
        <p className="text-parchment-100/80 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-xl mx-auto px-1">
          Small stories about pressure, personality, and consequence. Some you
          control. Some push back. Every ending leaves something behind.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 max-w-md mx-auto sm:max-w-none">
          <Link to="/stories" className="btn btn-primary w-full sm:w-auto touch-manipulation">
            Begin a story
          </Link>
          {hasSave && (
            <button type="button" className="btn w-full sm:w-auto touch-manipulation" onClick={onContinue}>
              Continue
            </button>
          )}
          <Link to="/profile" className="btn w-full sm:w-auto touch-manipulation">
            Profile
          </Link>
        </div>

        {profile.globalEchoes.length > 0 && (
          <p className="mt-8 sm:mt-10 text-xs uppercase tracking-[0.25em] text-parchment-200/40 font-sans">
            {profile.globalEchoes.length} echo
            {profile.globalEchoes.length === 1 ? "" : "es"} remembered
          </p>
        )}
      </div>
    </main>
  );
}
