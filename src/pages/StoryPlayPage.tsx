import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChoiceList } from "../components/ChoiceList";
import { EndingScreen } from "../components/EndingScreen";
import { PlayNarrationBanner } from "../components/PlayNarrationBanner";
import { SceneCard } from "../components/SceneCard";
import { StatPanel } from "../components/StatPanel";
import { StoryHeader } from "../components/StoryHeader";
import { VowPanel } from "../components/VowPanel";
import { getVisibleChoices } from "../engine/choiceResolver";
import { getScene } from "../engine/storyEngine";
import { toRuntimeProfileSnapshot } from "../engine/runtimeProfileSnapshot";
import { getStoryById } from "../stories";
import { useStoryStore } from "../store/useStoryStore";

export function StoryPlayPage() {
  const { storyId = "" } = useParams();
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);
  useEffect(() => {
    navigateRef.current = navigate;
  }, [navigate]);

  const hydrateAttemptRef = useRef<string | null>(null);

  /** Pass `getState` directly — avoids Zustand's per-render selector `useCallback` wrapper. */
  const {
    runtime,
    currentStory,
    resolvedEnding,
    profile,
    selectChoice,
    resetStory,
    playNarrationFrame,
  } = useSyncExternalStore(useStoryStore.subscribe, useStoryStore.getState);

  const scene =
    currentStory && runtime && !resolvedEnding
      ? getScene(currentStory, runtime.currentSceneId)
      : null;

  /** Must run before any conditional return — otherwise hook count changes and React throws / loops. */
  const visibleChoices = useMemo(() => {
    if (!currentStory || !runtime || !scene) return [];
    return getVisibleChoices(
      currentStory,
      runtime,
      scene,
      toRuntimeProfileSnapshot(profile),
    );
  }, [currentStory, runtime, scene, profile]);

  useEffect(() => {
    const nav = navigateRef.current;
    const { currentStory: cs } = useStoryStore.getState();
    if (!storyId) return;
    if (cs?.id === storyId) {
      hydrateAttemptRef.current = null;
      return;
    }

    const attemptKey = `${storyId}\0${cs?.id ?? ""}`;
    if (hydrateAttemptRef.current === attemptKey) return;
    hydrateAttemptRef.current = attemptKey;

    const story = getStoryById(storyId);
    if (!story) {
      nav("/stories", { replace: true });
      return;
    }

    if (cs != null && cs.id !== storyId) {
      nav(`/stories/${storyId}`, { replace: true });
      return;
    }

    const hadSave = useStoryStore.getState().continueStory();
    if (!hadSave || useStoryStore.getState().runtime?.storyId !== storyId) {
      nav(`/stories/${storyId}`, { replace: true });
    }
  }, [storyId, currentStory?.id]);

  if (!currentStory || !runtime) {
    return (
      <main className="page-shell max-w-xl min-h-[40vh] flex flex-col justify-center">
        <p className="text-parchment-200/80 text-base">Gathering the thread…</p>
      </main>
    );
  }

  if (resolvedEnding) {
    return (
      <main className="page-shell page-shell--play max-w-4xl">
        <StoryHeader story={currentStory} />
        <EndingScreen
          ending={resolvedEnding}
          onRestart={resetStory}
          onReturn={() => navigate("/stories")}
        />
      </main>
    );
  }

  if (!scene) {
    return (
      <main className="page-shell max-w-xl">
        <p className="text-parchment-200/80 leading-relaxed max-w-prose">
          This moment doesn't line up with your save. Head back to the shelf and
          open the story fresh.
        </p>
        <Link to="/stories" className="btn mt-4 w-full sm:w-auto touch-manipulation">
          Back to the shelf
        </Link>
      </main>
    );
  }

  return (
    <main className="page-shell page-shell--play max-w-5xl min-h-[100dvh] min-h-screen">
      <StoryHeader story={currentStory} />
      <div className="grid grid-cols-1 gap-8 md:gap-8 md:grid-cols-[minmax(0,1fr)_min(280px,32%)]">
        <div className="min-w-0 order-1">
          <PlayNarrationBanner frame={playNarrationFrame} />
          <SceneCard scene={scene} />
          <ChoiceList choices={visibleChoices} onSelect={selectChoice} />
        </div>
        <div className="flex flex-col gap-4 md:gap-5 order-2 md:sticky md:top-6 md:self-start md:max-h-[calc(100dvh-1.5rem)] md:overflow-y-auto md:overscroll-contain md:pr-1">
          <VowPanel story={currentStory} vowStates={runtime.vowStates} />
          <StatPanel story={currentStory} variables={runtime.variables} />
        </div>
      </div>
    </main>
  );
}
