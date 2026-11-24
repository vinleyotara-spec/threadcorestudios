/**
 * TESTIMONIALS
 * ------------
 * Real words from real customers. The testimonials section is hidden while this
 * list is empty, so nothing is shown that was not actually said.
 *
 * Only add a quote with the customer's agreement to publish it, and use their real
 * words (light trimming for length is fine, but never invent or improve a quote).
 * Example:
 *   { quote: "…", name: "Jane Doe", role: "Operations Manager", company: "Example Ltd" }
 */
export interface Testimonial {
  quote: string;
  name: string;
  role?: string;
  company: string;
}

export const testimonials: Testimonial[] = [];
