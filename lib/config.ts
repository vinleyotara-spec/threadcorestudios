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
  name: "Thread Core Studios",
  tagline: "Creative printing, embroidery & branding",
  description:
    "Creative printing, embroidery and custom branding solutions that help individuals and businesses make their mark.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://threadcorestudios.com",
  locale: "en",

  contact: {
    /**
     * WhatsApp number in international format, digits only (no "+", spaces or
     * leading zeros), e.g. 15551234567.
     * Set NEXT_PUBLIC_WHATSAPP_NUMBER in your environment. While it is empty,
     * WhatsApp buttons open WhatsApp with the message ready to send to any
     * contact, so nothing breaks, but you should set it before launch.
     */
    whatsappNumber: digitsOnly(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""),

    /** PLACEHOLDER: replace with the real telephone number. */
    phone: "+00 000 000 0000",
    /** PLACEHOLDER: replace with the real enquiries inbox. */
    email: "hello@threadcorestudios.com",
    /** PLACEHOLDER: replace with the real studio address. */
    address: "Studio address, City, Country",
    /** Optional. Leave empty to hide. */
    hours: "",
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
