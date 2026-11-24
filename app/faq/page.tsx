import { FAQ } from "@/components/home/FAQ";
import { CTASection } from "@/components/shared/CTASection";
import { PageHeader } from "@/components/shared/PageHeader";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "FAQ",
  description: "Answers to common questions about getting a quote, artwork files, uniforms and team orders at Threadcore Studios.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Frequently asked *questions*"
        description="Quick answers to what people ask most. Can't find yours? Message us on WhatsApp."
      />
      <FAQ />
      <CTASection />
    </>
  );
}
