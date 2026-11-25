/**
 * EDITABLE PAGE COPY
 * ------------------
 * Text blocks used by the homepage and About page. Everything here is
 * PLACEHOLDER copy written to be generic and honest: it makes no claims about
 * company history, awards, clients or statistics. Edit it freely.
 */

import { siteConfig } from "@/lib/config";

export const hero = {
  eyebrow: "Printing · Branding · Embroidery · Uniforms",
  headline: ["Bring Your", "Ideas", "to Life."],
  /** The word in `headline` to highlight in the accent colour. */
  highlight: "Ideas",
  text: "Creative printing, branding, embroidery and uniform solutions that help individuals and businesses make their mark.",
};

/** "The Value of Our Solutions" feature list on the homepage. Edit to match how the studio really works. */
export const valuePoints = [
  {
    title: "One studio for everything",
    text: "Printing, branding (from branded apparel to roll-up banners and billboards), embroidery and uniforms under one roof, so you deal with one team and get one consistent look.",
  },
  {
    title: "Made to your specification",
    text: "Colours, sizes, fabrics and branding are set around your brief, not limited to a catalogue.",
  },
  {
    title: "Quotation-based pricing",
    text: "Every job is quoted on its quantity, design and finish. You do not need an account to ask.",
  },
  {
    title: "Easy to request",
    text: "Send the quote form or message us on WhatsApp, with a sketch, a logo or just an idea.",
  },
  {
    title: "Team and uniform ordering",
    text: "A size sheet lets you list each person's garment and size, so team orders are quick to quote.",
  },
  {
    title: "Clear communication",
    text: "Updates at each stage, from your first message to the day you receive your order.",
  },
  {
    title: "For individuals and businesses",
    text: "One-off pieces for personal projects, and consistent branding for teams and companies.",
  },
] as const;

/** "Our Solutions": three ways to order. */
export const solutions = [
  {
    title: "Quick Quote",
    text: "Printing, branding and embroidery for individuals and businesses. Tell us what you need and we will send a quotation.",
    href: "/quote",
    image: "/images/work/corporate-notebooks-pens.jpg",
  },
  {
    title: "Team & Uniform Orders",
    text: "Made-to-order uniforms for corporate, healthcare, security, safari and tour, sports, industrial and religious teams, with a size sheet to keep big orders simple.",
    href: "/services#apparel-manufacturing",
    image: "/images/placeholders/category-manufacturing.svg",
  },
  {
    title: "Custom Projects",
    text: "Promotional products, corporate gifts, packaging, labels and signage, made around your idea.",
    href: "/services#custom-products",
    image: "/images/work/corporate-gift-box.jpg",
  },
] as const;

export const howItWorks = [
  {
    title: "Share your idea",
    text: "Tell us what you want to make. A sketch, a logo or a reference photo is plenty.",
  },
  {
    title: "Request a quotation",
    text: "Send the details through the quote form or WhatsApp. We will come back with a quotation.",
  },
  {
    title: "Approve your design",
    text: "Review the artwork and details, and confirm when you are happy.",
  },
  {
    title: "Production begins",
    text: "Once approved, we get to work on your order.",
  },
  {
    title: "Receive your order",
    text: "Your finished order is delivered or ready for collection.",
  },
] as const;

export const about = {
  intro:
    "Threadcore Studios is a creative printing, branding, embroidery and uniforms studio. We help individuals and businesses turn ideas into printed and stitched products they are proud to put their name on.",
  story: [
    `We have been operating since ${siteConfig.established.label}. We started with printing and embroidery and now also make branded and made-to-order uniforms and apparel, and supply marketing branding such as roll-up banners and billboards, promotional products, corporate gifts, packaging, labels and signage.`,
    "Every project starts with a conversation about what you want to achieve. From there we recommend the right materials and methods, and keep you informed until your order is in your hands.",
  ],
  mission:
    "To make professional-quality printing, branding, embroidery and uniforms accessible to individuals and businesses of every size.",
  vision:
    "To be the creative studio people think of first when they want to make their mark.",
  values: [
    {
      title: "Craft",
      text: "We take pride in finishing work properly.",
    },
    {
      title: "Clarity",
      text: "Straightforward quotations and honest advice, with no surprises.",
    },
    {
      title: "Creativity",
      text: "We look for ways to make your idea better, not only to reproduce it.",
    },
    {
      title: "Care",
      text: "Every order matters, whether it is one piece or a thousand.",
    },
  ],
  commitment:
    "We check the details of every order against your approved artwork before it is finished, and we will always tell you if something needs attention before production begins.",
};

/**
 * "How we work" principles on the About page. PLACEHOLDER copy: these read as
 * commitments, so edit each line to match what the business really does.
 */
export const workPrinciples = [
  {
    title: "Made around your brief",
    text: "Sizes, fits, fabrics and designs are tailored to what you need, not limited to a catalogue.",
  },
  {
    title: "Samples before the full run",
    text: "For larger orders we recommend approving a sample or size set first, so the full run fits and looks right.",
  },
  {
    title: "Materials matched to the job",
    text: "We help you choose fabrics and finishes that suit how the garment will be worn and washed.",
  },
  {
    title: "Honest timelines",
    text: "We agree a delivery date with you up front and tell you early if anything threatens it.",
  },
  {
    title: "Clear communication",
    text: "Updates at each stage, so you always know where your order is.",
  },
  {
    title: "Your designs stay yours",
    text: "Your artwork, logos and brand concepts are used only for your order, and not reused or shared without your permission.",
  },
] as const;

/** Brief-to-delivery steps for made-to-order uniforms and apparel (About page). */
export const manufacturingProcess = [
  { title: "Brief", text: "Tell us the garment, fabric, quantities and branding, online or by message." },
  { title: "Quote", text: "We send an itemised quotation with the production time." },
  { title: "Sample", text: "A sample or size set is made and approved before the full run." },
  { title: "Production", text: "Your order is cut, sewn and branded, with updates along the way." },
  { title: "Delivery", text: "Delivered or ready for collection, checked against your approved sample." },
] as const;
