import { AboutStrip } from "@/components/home/about-strip";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { Hero } from "@/components/home/hero";
import { NowSection } from "@/components/home/now-section";
import { QuotePanel } from "@/components/home/quote-panel";

/**
 * Home answers one question: who are you?
 *
 * Claim, proof, person, currency, belief — in that order.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <AboutStrip />
      <NowSection />
      <QuotePanel />
    </>
  );
}
