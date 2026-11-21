import { Focus, Gem, MessagesSquare, Palette, Users, type LucideIcon } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { whyChooseUs } from "@/lib/content";

const icons: Record<(typeof whyChooseUs)[number]["icon"], LucideIcon> = {
  gem: Gem,
  focus: Focus,
  palette: Palette,
  messages: MessagesSquare,
  users: Users,
};

export function WhyChooseUs() {
  return (
    <section className="bg-sunken py-20 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="reveal lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Why choose us"
            title="Details you can *feel*"
            description="A good result comes from care at every step, from the first conversation to the finished piece."
          />
        </div>
        <ul className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
          {whyChooseUs.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <li key={item.title} className={`reveal ${i === whyChooseUs.length - 1 ? "sm:col-span-2" : ""}`}>
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-surface text-accent ring-1 ring-line">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-2xl tracking-tight text-ink">{item.title}</h3>
                <p className="mt-2 max-w-sm leading-relaxed text-muted">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
