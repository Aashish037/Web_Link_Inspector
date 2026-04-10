import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";

export default function HomePage() {
  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
      <HeroSection />
      <StatsSection />
    </div>
  );
}
