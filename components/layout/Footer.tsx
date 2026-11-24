import Link from "next/link";
import { cacheLife } from "next/cache";
import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";
import { emailHref, mapsHref, phoneHref, siteConfig } from "@/lib/config";
import { getCategories } from "@/lib/services";
import { whatsappMessages, whatsappUrl } from "@/lib/whatsapp";

/** The current year, cached so the footer can be prerendered (Cache Components forbids a bare `new Date()`). */
async function getYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function Footer() {
  const [year, categories] = await Promise.all([getYear(), getCategories()]);
  const { contact } = siteConfig;

  return (
    <footer className="mt-auto bg-ink text-white/75">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-xs leading-relaxed">{siteConfig.description}</p>
          {siteConfig.social.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {siteConfig.social.map((s) => (
                <li key={s.platform}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-white transition-colors hover:text-orange"
                  >
                    {s.label}
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Quick links">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
            Quick links
          </h2>
          <ul className="mt-5 space-y-3">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={siteConfig.quoteCta.href} className="transition-colors hover:text-white">
                {siteConfig.quoteCta.label}
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Services">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
            Services
          </h2>
          <ul className="mt-5 space-y-3">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/services#${c.slug}`} className="transition-colors hover:text-white">
                  {c.name}
                  {c.status === "coming_soon" && (
                    <span className="ml-2 text-xs text-white/40">soon</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
            Contact
          </h2>
          <ul className="mt-5 space-y-3">
            <li>
              <a
                href={whatsappUrl(whatsappMessages.general())}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 transition-colors hover:text-white"
              >
                <MessageCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                WhatsApp
              </a>
            </li>
            <li>
              <a href={phoneHref} className="flex items-start gap-3 transition-colors hover:text-white">
                <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={emailHref} className="flex items-start gap-3 break-all transition-colors hover:text-white">
                <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                {contact.email}
              </a>
            </li>
            <li>
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 transition-colors hover:text-white"
              >
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                {contact.address}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            {contact.hours && (
              <li className="flex items-start gap-3">
                <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                {contact.hours}
              </li>
            )}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>Operating since {siteConfig.established.label} · Printing · Branding · Embroidery · Uniforms</p>
        </Container>
      </div>
    </footer>
  );
}
