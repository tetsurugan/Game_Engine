import type { SceneDefinition } from "../engine/types";

interface Props {
  scene: SceneDefinition;
}

export function SceneCard({ scene }: Props) {
  return (
    <section className="mb-6 sm:mb-8">
      {scene.title && (
        <h2 className="font-serif italic text-lg sm:text-xl text-parchment-200/70 mb-3 sm:mb-4 break-words">
          {scene.title}
        </h2>
      )}
      <div className="prose-story max-w-prose">
        {scene.body.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
