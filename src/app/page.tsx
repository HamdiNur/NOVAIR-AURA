import CinematicScene from "@/components/cinematic/CinematicScene";
import Loader from "@/components/Loader";
import AboutSection from "@/components/sections/AboutSection";
import OrderSection from "@/components/sections/OrderSection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <noscript>
        <style>{`.loader{display:none}`}</style>
      </noscript>
      <Loader />
      <main>
        <CinematicScene />
        <AboutSection />
        <OrderSection />
      </main>
      <Footer />
    </>
  );
}