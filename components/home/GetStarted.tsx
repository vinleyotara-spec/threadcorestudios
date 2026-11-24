import { Clock, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { phoneHref, siteConfig } from "@/lib/config";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

const interests = ["Printing", "Branding", "Embroidery", "Uniforms", "Something else"];

/** Homepage section 5: "Get started today!" (form, phone and WhatsApp). The header button jumps here. */
export function GetStarted() {
  const { contact } = siteConfig;
  return (
    <section id="get-started" aria-labelledby="get-started-heading" className="bg-sunken py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="reveal">
          <SectionHeading
            eyebrow="Get in touch"
            title="Get started *today!*"
            description="Fill out the form, call us, or message us on WhatsApp. Tell us what you would like made and we will come back to you."
            headingId="get-started-heading"
          />
          <ul className="mt-8 space-y-4">
            <li>
              <a href={phoneHref} className="flex items-center gap-4 text-lg font-medium text-ink hover:text-accent">
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-surface text-accent ring-1 ring-line">
                  <Phone aria-hidden="true" className="size-5" />
                </span>
                {contact.phone}
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl(whatsappMessages.general())}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-lg font-medium text-ink hover:text-accent"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-surface text-accent ring-1 ring-line">
                  <MessageCircle aria-hidden="true" className="size-5" />
                </span>
                Message us on WhatsApp
              </a>
            </li>
            {contact.hours && (
              <li className="flex items-center gap-4 text-lg text-body">
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-surface text-accent ring-1 ring-line">
                  <Clock aria-hidden="true" className="size-5" />
                </span>
                {contact.hours}
              </li>
            )}
          </ul>
        </div>
        <div className="reveal rounded-[24px] border border-line bg-surface p-6 sm:p-9">
          <ContactForm interests={interests} />
        </div>
      </Container>
    </section>
  );
}
