import CinematicScene from "@/components/cinematic/CinematicScene";
import Loader from "@/components/Loader";

export default function Home() {
  return (
    <>
      {/* Without JavaScript the loader would never leave, so hide it */}
      <noscript>
        <style>{`.loader{display:none}`}</style>
      </noscript>
      <Loader />
      <main>
        <CinematicScene />
        <section style={{ padding: "6rem var(--gutter)" }}>
          <p>The page continues normally after the scene (unpin check).</p>
        </section>
      </main>
    </>
  );
}