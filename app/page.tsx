import { ApparelManufacturing } from "@/components/home/ApparelManufacturing";
import { ClientLogos } from "@/components/home/ClientLogos";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CTASection } from "@/components/shared/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <ServicesOverview />
      <ApparelManufacturing />
      <WhyChooseUs />
      <FeaturedProjects />
      <HowItWorks />
      <CTASection />
    </>
  );
}
