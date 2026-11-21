import { siteConfig } from "@/lib/config";

/**
 * Builds a WhatsApp click-to-chat link with an optional prefilled message.
 * Uses the number from lib/config.ts (NEXT_PUBLIC_WHATSAPP_NUMBER).
 */
export function whatsappUrl(message?: string): string {
  const number = siteConfig.contact.whatsappNumber;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${text}`;
}

const brand = siteConfig.name;

export const whatsappMessages = {
  general: () => `Hi ${brand}, I'd like to ask about your services.`,
  quote: () => `Hi ${brand}, I'd like to request a quote.`,
  service: (serviceName: string) =>
    `Hi ${brand}, I'd like a quote for: ${serviceName}.`,
  project: (projectTitle: string) =>
    `Hi ${brand}, I saw "${projectTitle}" in your work and I'd like something similar.`,
  /** Full details of a quote request, used as a fallback when the form can't be submitted. */
  quoteDetails: (q: {
    fullName?: string;
    phone?: string;
    customerType?: string;
    product?: string;
    quantity?: string;
    customisationMethod?: string;
    deliveryDate?: string;
    description?: string;
  }) =>
    [
      `Hi ${brand}, I'd like a quote.`,
      q.product ? `Product: ${q.product}` : "",
      q.quantity ? `Quantity: ${q.quantity}` : "",
      q.customisationMethod ? `Method: ${q.customisationMethod}` : "",
      q.deliveryDate ? `Needed by: ${q.deliveryDate}` : "",
      q.customerType ? `I am: ${q.customerType}` : "",
      q.description ? `Details: ${q.description}` : "",
      q.fullName ? `Name: ${q.fullName}` : "",
      q.phone ? `Phone: ${q.phone}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  enquiry: (summary: {
    reference?: string;
    fullName?: string;
    product?: string;
    quantity?: number | string;
    deliveryDate?: string;
  }) => {
    const lines = [
      `Hi ${brand}, I just sent a quote request${
        summary.reference ? ` (ref ${summary.reference})` : ""
      }.`,
      summary.product ? `Product: ${summary.product}` : "",
      summary.quantity ? `Quantity: ${summary.quantity}` : "",
      summary.deliveryDate ? `Needed by: ${summary.deliveryDate}` : "",
      summary.fullName ? `Name: ${summary.fullName}` : "",
    ].filter(Boolean);
    return lines.join("\n");
  },
};
