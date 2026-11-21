import { Container } from "@/components/shared/Container";
import { CTASection } from "@/components/shared/CTASection";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { about } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Thread Core Studios is a creative printing, embroidery and branding studio helping individuals and businesses make their mark.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About us" title="A creative studio for *making your mark*" description={about.intro} />

      <section className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="reveal">
            <SectionHeading eyebrow="Our story" title="Where we are *starting*" />
          </div>
          <div className="reveal space-y-6 text-lg leading-relaxed text-body">
            {about.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-sunken py-16 sm:py-24">
        <Container className="grid gap-6 md:grid-cols-2">
          <div className="reveal rounded-[22px] bg-surface p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Mission</p>
            <p className="mt-4 font-display text-3xl leading-snug tracking-tight text-ink">{about.mission}</p>
          </div>
          <div className="reveal rounded-[22px] bg-ink p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff7a5c]">Vision</p>
            <p className="mt-4 font-display text-3xl leading-snug tracking-tight text-white">{about.vision}</p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="reveal">
            <SectionHeading eyebrow="Our values" title="What we *care about*" />
          </div>
          <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((v, i) => (
              <li key={v.title} className="reveal border-t border-ink pt-5">
                <p className="font-display text-sm text-accent">0{i + 1}</p>
                <h3 className="mt-3 font-display text-2xl tracking-tight text-ink">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{v.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-line py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="reveal">
            <SectionHeading eyebrow="Commitment to quality" title="Checked before it's *finished*" />
          </div>
          <p className="reveal text-lg leading-relaxed text-body">{about.commitment}</p>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
