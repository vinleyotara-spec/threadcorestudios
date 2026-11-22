import type { NavItem, SocialLink } from "@/types";

/**
 * CENTRAL SITE CONFIGURATION
 * --------------------------
 * Change the business name, contact details, social links and navigation here.
 * Colours live in app/globals.css (see the ":root" brand tokens).
 *
 * Anything marked PLACEHOLDER must be replaced before launch.
 */

const digitsOnly = (value: string) => value.replace(/\D/g, "");

export const siteConfig = {
  /** Brand name used in the navbar, footer, page titles and emails. */
  name: "Threadcore Studios",
  tagline: "We Print Your Identity",
  description:
    "Creative printing, embroidery and custom branding solutions that help individuals and businesses make their mark.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://threadcorestudios.com",
  locale: "en",

  /** When the business started operating. Shown on the About page and footer. */
  established: { label: "August 2025", iso: "2025-08" },

  contact: {
    /**
     * WhatsApp number in international format, digits only (no "+", spaces or
     * leading zeros). Kenya: 254 followed by the number without its leading 0.
     * To change it without editing code, set NEXT_PUBLIC_WHATSAPP_NUMBER in Vercel.
     */
    whatsappNumber: digitsOnly(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "254714282240"),

    /** Telephone number shown on the site (and used for tap-to-call). */
    phone: "+254 714 282 240",
    /** PLACEHOLDER: replace with the real enquiries inbox. */
    email: "hello@threadcorestudios.com",
    /** PLACEHOLDER: replace with the real studio address. */
    address: "Greencourt Plaza, Latema Road, 4th Floor, Room FF14 (near Odeon), Nairobi, Kenya",
    /** Shown on the contact page and footer. Leave empty to hide. */
    hours: "Monday to Saturday, 8:00 AM to 5:00 PM",
    /** Same hours in a machine-readable form (used for Google business information). */
    openingHours: {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "17:00",
    },
    /** Parts of the address for Google business information. */
    addressParts: {
      street: "Greencourt Plaza, Latema Road, 4th Floor, Room FF14",
      locality: "Nairobi",
      country: "KE",
    },
  },

  /**
   * PLACEHOLDER social links. They currently point at the platform home pages;
   * replace each href with the real profile URL, or delete an entry to hide it.
   */
  social: [
    { platform: "instagram", label: "Instagram", href: "https://www.instagram.com/" },
    { platform: "facebook", label: "Facebook", href: "https://www.facebook.com/" },
    { platform: "tiktok", label: "TikTok", href: "https://www.tiktok.com/" },
  ] satisfies SocialLink[],

  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Our Work", href: "/portfolio" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],

  quoteCta: { label: "Request a Quote", href: "/quote" },
} as const;

export type SiteConfig = typeof siteConfig;

/** `tel:` link built from the configured phone number. */
export const phoneHref = `tel:${siteConfig.contact.phone.replace(/[^\d+]/g, "")}`;
export const emailHref = `mailto:${siteConfig.contact.email}`;
/** Opens Google Maps (or the Maps app on phones) at the studio. */
export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Greencourt Plaza, Latema Road, Nairobi",
)}`;
