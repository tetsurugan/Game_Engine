import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChoiceList } from "../components/ChoiceList";
import { EndingScreen } from "../components/EndingScreen";
import { PlayNarrationBanner } from "../components/PlayNarrationBanner";
import { SceneCard } from "../components/SceneCard";
import { StatPanel } from "../components/StatPanel";
import { StoryHeader } from "../components/StoryHeader";
import { VowPanel } from "../components/VowPanel";
import { getScene } from "../engine/storyEngine";
import { getStoryById } from "../stories";
import { useStoryStore } from "../store/useStoryStore";

export function StoryPlayPage() {
  const { storyId = "" } = useParams();
  const navigate = useNavigate();

  const runtime = useStoryStore((s) => s.runtime);
  const currentStory = useStoryStore((s) => s.currentStory);
  const resolvedEnding = useStoryStore((s) => s.resolvedEnding);
  const selectChoice = useStoryStore((s) => s.selectChoice);
  const resetStory = useStoryStore((s) => s.resetStory);
  const continueStory = useStoryStore((s) => s.continueStory);
  const visibleChoices = useStoryStore((s) =>
    s.getVisibleChoicesForCurrentScene(),
  );
  const playNarrationFrame = useStoryStore((s) => s.playNarrationFrame);

  // Rehydrate state if this page was loaded directly (e.g. refresh).
  useEffect(() => {
    if (!currentStory || currentStory.id !== storyId) {
      const story = getStoryById(storyId);
      if (!story) {
        navigate("/stories", { replace: true });
        return;
      }
      const hadSave = continueStory();
      if (!hadSave || useStoryStore.getState().runtime?.storyId !== storyId) {
        navigate(`/stories/${storyId}`, { replace: true });
      }
    }
  }, [storyId, currentStory, continueStory, navigate]);

  if (!currentStory || !runtime) {
    return (
      <main className="page-shell max-w-xl min-h-[40vh]">
        <p className="text-parchment-200/80">Loading…</p>
      </main>
    );
  }

  if (resolvedEnding) {
    return (
      <main className="page-shell max-w-4xl">
        <StoryHeader story={currentStory} />
        <EndingScreen
          ending={resolvedEnding}
          onRestart={resetStory}
          onReturn={() => navigate("/stories")}
        />
      </main>
    );
  }

  const scene = getScene(currentStory, runtime.currentSceneId);
  if (!scene) {
    return (
      <main className="page-shell max-w-xl">
        <p className="text-parchment-200/80 leading-relaxed">
          The thread of this story has been lost.
        </p>
        <Link to="/stories" className="btn mt-4 w-full sm:w-auto">
          Back to stories
        </Link>
      </main>
    );
  }

  return (
    <main className="page-shell max-w-5xl min-h-[100dvh] min-h-screen">
      <StoryHeader story={currentStory} />
      <div className="grid gap-6 md:gap-8 md:grid-cols-[minmax(0,1fr)_min(280px,32%)]">
        <div className="min-w-0 order-1">
          <PlayNarrationBanner frame={playNarrationFrame} />
          <SceneCard scene={scene} />
          <ChoiceList choices={visibleChoices} onSelect={selectChoice} />
        </div>
        <div className="flex flex-col gap-4 order-2 md:sticky md:top-6 md:self-start">
          <VowPanel story={currentStory} vowStates={runtime.vowStates} />
          <StatPanel story={currentStory} variables={runtime.variables} />
        </div>
      </div>
    </main>
  );
}
