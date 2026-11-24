/**
 * FAQ shown on the homepage and published to search engines as FAQ structured
 * data. Keep answers factual: edit them to match how the business really works.
 */
import { siteConfig } from "@/lib/config";

export const faqs = [
  {
    q: "Where are you and when are you open?",
    a: `We are at ${siteConfig.contact.address}. We are open ${siteConfig.contact.hours}, and closed on Sundays. You are welcome to visit, or message us on WhatsApp any time.`,
  },
  {
    q: "How do I get a price?",
    a: "All pricing is by quotation, based on what you need: the product, quantity, design and finish. Send the details through the quote form or WhatsApp and we will come back with a quotation. No account is needed.",
  },
  {
    q: "What artwork can I send?",
    a: "On the quote form you can attach a JPG, PNG, WebP or PDF up to 4 MB. A logo, sketch or reference photo is ideal. Larger files can be sent on WhatsApp. If you have no artwork yet, describe your idea and we will advise.",
  },
  {
    q: "Do you make uniforms?",
    a: "Yes. We make made-to-order uniforms for corporate, healthcare, security, safari and tour, sports, industrial and religious needs, and we can also embroider or print on uniforms you already have. Send us the details and we will quote.",
  },
  {
    q: "How do I order uniforms for a whole team?",
    a: "Download the uniform size sheet, fill in each person's garment and size, and send it with your quote request. It saves back-and-forth and lets us quote accurately.",
  },
  {
    q: "What is the difference between printing and embroidery?",
    a: "Printing applies your design to the surface of a garment or paper product and suits detailed, colourful artwork. Embroidery stitches your logo or name into the fabric, which looks premium and lasts well on caps, polos, jackets and uniforms. Not sure which suits you? Choose “Not sure, please advise” on the quote form.",
  },
  {
    q: "Can I request something that is not listed?",
    a: "Yes. Choose “Other / not listed” as the product on the quote form, or message us on WhatsApp, and tell us what you have in mind.",
  },
] as const;
