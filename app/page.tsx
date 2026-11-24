import { ClientLogos } from "@/components/home/ClientLogos";
import { GetStarted } from "@/components/home/GetStarted";
import { Hero } from "@/components/home/Hero";
import { SolutionsSection } from "@/components/home/SolutionsSection";
import { Testimonials } from "@/components/home/Testimonials";
import { ValueSection } from "@/components/home/ValueSection";
import { YouMightAlsoLike } from "@/components/home/YouMightAlsoLike";

/**
 * Homepage sections, in order:
 * 1 Hero, 2 The value of our solutions, 3 Our solutions, 4 Our customers (logos + testimonials),
 * 5 Get started today!, 6 You might also like, then the footer.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueSection />
      <SolutionsSection />
      <ClientLogos />
      <Testimonials />
      <GetStarted />
      <YouMightAlsoLike />
    </>
  );
}
