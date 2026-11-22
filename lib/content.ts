/**
 * EDITABLE PAGE COPY
 * ------------------
 * Text blocks used by the homepage and About page. Everything here is
 * PLACEHOLDER copy written to be generic and honest: it makes no claims about
 * company history, awards, clients or statistics. Edit it freely.
 */

export const hero = {
  eyebrow: "Printing · Embroidery · Uniforms · Branding",
  headline: ["Bring Your", "Ideas", "to Life."],
  /** The word in `headline` to highlight in the accent colour. */
  highlight: "Ideas",
  text: "Creative printing, embroidery and custom branding solutions that help individuals and businesses make their mark.",
};

export const whyChooseUs = [
  {
    icon: "gem",
    title: "Quality workmanship",
    text: "Careful production and finishing on everything we make.",
  },
  {
    icon: "focus",
    title: "Attention to detail",
    text: "From colour and placement to stitching and trim, the small things matter.",
  },
  {
    icon: "palette",
    title: "Custom solutions",
    text: "Tell us what you have in mind and we will recommend the best way to produce it.",
  },
  {
    icon: "messages",
    title: "Reliable communication",
    text: "Clear updates from your first message to the day you receive your order.",
  },
  {
    icon: "users",
    title: "For individuals and businesses",
    text: "One-off pieces for personal projects, and consistent branding for teams and companies.",
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
    "Threadcore Studios is a creative printing, embroidery and branding studio. We help individuals and businesses turn ideas into printed and stitched products they are proud to put their name on.",
  story: [
    "We are starting with printing and embroidery, and building towards a wider range of ways to bring a brand to life, including made-to-order uniforms and apparel, promotional merchandise, packaging and signage.",
    "Every project starts with a conversation about what you want to achieve. From there we recommend the right materials and methods, and keep you informed until your order is in your hands.",
  ],
  mission:
    "To make professional-quality printing, embroidery and branding accessible to individuals and businesses of every size.",
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
