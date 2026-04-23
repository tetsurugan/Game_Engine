import { Link } from "react-router-dom";
import { storyRegistry } from "../stories";
import { useStoryStore } from "../store/useStoryStore";

export function ProfilePage() {
  const profile = useStoryStore((s) => s.profile);
  const clearAll = useStoryStore((s) => s.clearAll);

  const worldFlagsOn = Object.entries(profile.worldFlags ?? {}).filter(
    ([, v]) => v,
  );
  const marks = profile.worldConsequenceMarks ?? [];

  return (
    <main className="page-shell max-w-2xl">
      <Link to="/" className="back-nav -ml-1 pl-1">
        ← Home
      </Link>
      <h1 className="font-serif text-3xl sm:text-4xl text-parchment-50 mt-3 mb-8 sm:mt-4 sm:mb-10 text-balance">
        Profile
      </h1>

      <section className="mb-9 sm:mb-10">
        <h2 className="text-xs uppercase tracking-[0.28em] text-parchment-200/50 font-sans mb-3 pb-2 border-b border-parchment-200/10">
          Echoes
        </h2>
        {profile.globalEchoes.length === 0 ? (
          <p className="text-parchment-200/60 italic text-sm sm:text-base">
            Nothing remembers you yet.
          </p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {profile.globalEchoes.map((e) => (
              <li
                key={e}
                className="px-3 py-1.5 rounded-sm border border-vow-kept/40 text-vow-kept/90 text-sm font-sans break-words max-w-full"
              >
                {e.replace(/_/g, " ")}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mb-9 sm:mb-10">
        <h2 className="text-xs uppercase tracking-[0.28em] text-parchment-200/50 font-sans mb-3 pb-2 border-b border-parchment-200/10">
          Completed Stories
        </h2>
        {Object.keys(profile.completedEndings).length === 0 ? (
          <p className="text-parchment-200/60 italic text-sm sm:text-base">
            No endings reached yet.
          </p>
        ) : (
          <ul className="space-y-3 sm:space-y-4">
            {Object.entries(profile.completedEndings).map(([storyId, endings]) => {
              const story = storyRegistry.find((s) => s.id === storyId);
              return (
                <li
                  key={storyId}
                  className="rounded-sm border border-parchment-200/12 p-4 sm:p-4 bg-ink-800/40"
                >
                  <p className="font-serif text-base sm:text-lg text-parchment-50 break-words">
                    {story?.title ?? storyId}
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-parchment-100/80 leading-relaxed">
                    {endings.map((endingId) => {
                      const ending = story?.endings.find((e) => e.id === endingId);
                      return (
                        <li key={endingId} className="break-words">
                          — {ending?.title ?? endingId}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {worldFlagsOn.length > 0 ? (
        <section className="mb-9 sm:mb-10">
          <h2 className="text-xs uppercase tracking-[0.28em] text-parchment-200/50 font-sans mb-3 pb-2 border-b border-parchment-200/10">
            World flags
          </h2>
          <p className="text-parchment-200/55 text-sm mb-2 leading-relaxed">
            Persistent facts the anthology uses for gates and conditions.
          </p>
          <ul className="flex flex-wrap gap-2">
            {worldFlagsOn.map(([id]) => (
              <li
                key={id}
                className="px-3 py-1.5 rounded-sm border border-parchment-200/20 text-parchment-100/85 text-sm font-sans break-all"
              >
                {id.replace(/_/g, " ")}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {marks.length > 0 ? (
        <section className="mb-9 sm:mb-10">
          <h2 className="text-xs uppercase tracking-[0.28em] text-parchment-200/50 font-sans mb-3 pb-2 border-b border-parchment-200/10">
            Consequence marks
          </h2>
          <p className="text-parchment-200/55 text-sm mb-2 leading-relaxed">
            Tags left on your profile by resolved endings.
          </p>
          <ul className="flex flex-wrap gap-2">
            {marks.map((m) => (
              <li
                key={m}
                className="px-3 py-1.5 rounded-sm border border-parchment-200/15 text-parchment-200/85 text-sm font-sans break-words max-w-full"
              >
                {m.replace(/_/g, " ")}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <button
        type="button"
        className="btn w-full sm:w-auto touch-manipulation mt-4 border-vow-broken/40 text-parchment-200/90 hover:border-vow-broken/60"
        onClick={() => {
          if (
            confirm(
              "Erase all echoes, endings, and in-progress stories? This cannot be undone.",
            )
          ) {
            clearAll();
          }
        }}
      >
        Erase profile
      </button>
    </main>
  );
}
