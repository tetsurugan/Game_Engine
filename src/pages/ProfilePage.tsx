import { Link } from "react-router-dom";
import { storyRegistry } from "../stories";
import {
  selectClearAll,
  selectProfile,
} from "../store/storyStoreSelectors";
import { useStoryStore } from "../store/useStoryStore";

export function ProfilePage() {
  const profile = useStoryStore(selectProfile);
  const clearAll = useStoryStore(selectClearAll);

  const worldFlagsOn = Object.entries(profile.worldFlags ?? {}).filter(
    ([, v]) => v,
  );
  const marks = profile.worldConsequenceMarks ?? [];

  return (
    <main className="page-shell max-w-2xl">
      <Link to="/" className="back-nav -ml-1 pl-1">
        ← Home
      </Link>
      <h1 className="font-serif text-3xl sm:text-4xl text-parchment-50 mt-3 mb-2 sm:mt-4 sm:mb-3 text-balance">
        Profile
      </h1>
      <p className="text-parchment-200/60 text-sm sm:text-base mb-6 sm:mb-8 max-w-prose leading-relaxed">
        What the anthology remembers on this device.
      </p>

      <section className="mb-10 sm:mb-11">
        <h2 className="profile-section-heading">Echoes</h2>
        {profile.globalEchoes.length === 0 ? (
          <p className="text-parchment-200/60 italic text-sm sm:text-base leading-relaxed">
            Quiet so far—no echoes yet.
          </p>
        ) : (
          <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {profile.globalEchoes.map((e) => (
              <li
                key={e}
                className="px-3 py-2 rounded-sm border border-vow-kept/40 text-vow-kept/90 text-sm font-sans break-words max-w-full sm:max-w-[calc(100%-0.5rem)] leading-snug"
              >
                {e.replace(/_/g, " ")}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mb-10 sm:mb-11">
        <h2 className="profile-section-heading">Stories you've closed</h2>
        {Object.keys(profile.completedEndings).length === 0 ? (
          <p className="text-parchment-200/60 italic text-sm sm:text-base leading-relaxed">
            No closings recorded yet.
          </p>
        ) : (
          <ul className="flex flex-col gap-4 sm:gap-5">
            {Object.entries(profile.completedEndings).map(([storyId, endings]) => {
              const story = storyRegistry.find((s) => s.id === storyId);
              return (
                <li
                  key={storyId}
                  className="rounded-sm border border-parchment-200/12 p-4 sm:p-5 bg-ink-800/40"
                >
                  <p className="font-serif text-base sm:text-lg text-parchment-50 break-words leading-snug">
                    {story?.title ?? storyId}
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-parchment-100/80 leading-relaxed">
                    {endings.map((endingId) => {
                      const ending = story?.endings.find((e) => e.id === endingId);
                      return (
                        <li key={endingId} className="break-words pl-0 border-l-0">
                          <span className="text-parchment-200/40 mr-1.5 select-none">—</span>
                          {ending?.title ?? endingId}
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
        <section className="mb-10 sm:mb-11">
          <h2 className="profile-section-heading">World flags</h2>
          <p className="text-parchment-200/55 text-sm mb-3 leading-relaxed max-w-prose">
            Facts that stick across stories—what later gates may ask about.
          </p>
          <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {worldFlagsOn.map(([id]) => (
              <li
                key={id}
                className="px-3 py-2 rounded-sm border border-parchment-200/20 text-parchment-100/85 text-sm font-sans break-all max-w-full leading-snug"
              >
                {id.replace(/_/g, " ")}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {marks.length > 0 ? (
        <section className="mb-10 sm:mb-11">
          <h2 className="profile-section-heading">Consequence marks</h2>
          <p className="text-parchment-200/55 text-sm mb-3 leading-relaxed max-w-prose">
            Marks from how certain endings landed—small tags, long memory.
          </p>
          <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {marks.map((m) => (
              <li
                key={m}
                className="px-3 py-2 rounded-sm border border-parchment-200/15 text-parchment-200/85 text-sm font-sans break-words max-w-full leading-snug"
              >
                {m.replace(/_/g, " ")}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="border-t border-parchment-200/10 pt-8 mt-2" aria-label="Danger zone">
        <p className="text-parchment-200/50 text-xs sm:text-sm mb-3 leading-relaxed max-w-prose">
          Clears echoes, closings, flags, marks, and half-finished runs—on this
          device only.
        </p>
        <button
          type="button"
          className="btn w-full sm:w-auto touch-manipulation border-vow-broken/35 text-parchment-200/85 hover:border-vow-broken/55 text-sm"
          onClick={() => {
            if (
              confirm(
                "Erase this device's anthology memory—echoes, closings, flags, marks, and in-progress runs? This cannot be undone.",
              )
            ) {
              clearAll();
            }
          }}
        >
          Erase profile
        </button>
      </section>
    </main>
  );
}
