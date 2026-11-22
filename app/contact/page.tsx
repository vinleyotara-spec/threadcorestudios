import Link from "next/link";
import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { ExternalButtonLink } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { emailHref, phoneHref, siteConfig } from "@/lib/config";
import { pageMetadata } from "@/lib/seo";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Get in touch with Threadcore Studios by WhatsApp, phone, email or the contact form.",
  path: "/contact",
});

export default function ContactPage() {
  const { contact, social } = siteConfig;
  const details = [
    { icon: Phone, label: "Telephone", value: contact.phone, href: phoneHref },
    { icon: Mail, label: "Email", value: contact.email, href: emailHref },
    { icon: MapPin, label: "Studio", value: contact.address },
    ...(contact.hours ? [{ icon: Clock, label: "Hours", value: contact.hours }] : []),
  ];

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about your *project*"
        description="The fastest way to reach us is WhatsApp. You can also call, email or use the form."
      />

      <section className="py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="space-y-8">
            <div className="rounded-[22px] bg-ink p-7 text-white sm:p-9">
              <MessageCircle aria-hidden="true" className="size-8 text-[#ff7a5c]" />
              <h2 className="mt-5 font-display text-3xl tracking-tight">Message us on WhatsApp</h2>
              <p className="mt-3 leading-relaxed text-white/70">
                Send a photo, a sketch or a few lines about what you need.
              </p>
              <ExternalButtonLink
                href={whatsappUrl(whatsappMessages.general())}
                size="lg"
                className="mt-6 w-full sm:w-auto"
              >
                <MessageCircle aria-hidden="true" className="size-5" />
                Open WhatsApp
              </ExternalButtonLink>
            </div>

            <ul className="divide-y divide-line border-y border-line">
              {details.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4 py-5">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-sunken text-accent">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm text-muted">{label}</p>
                    {href ? (
                      <a href={href} className="break-words text-lg font-medium text-ink hover:text-accent">
                        {value}
                      </a>
                    ) : (
                      <p className="text-lg font-medium text-ink">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {social.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-ink">Follow us</h2>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {social.map((s) => (
                    <li key={s.platform}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 items-center gap-1.5 rounded-full border border-ink/25 px-5 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                      >
                        {s.label}
                        <ArrowUpRight aria-hidden="true" className="size-4" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <h2 className="font-display text-3xl tracking-tight text-ink">Send us a message</h2>
            <p className="mb-8 mt-2 text-muted">
              Need a price? The <Link href="/quote" className="font-medium text-ink underline underline-offset-4 hover:text-accent">quote form</Link> gets
              you the quickest answer.
            </p>
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
