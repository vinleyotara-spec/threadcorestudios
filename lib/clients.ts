/**
 * CLIENTS
 * -------
 * Businesses you have genuinely worked for, shown as a "Clients we have worked
 * with" strip on the homepage. The strip is hidden while this list is empty.
 *
 * Names are shown as plain text in one consistent style. That states a fact
 * (you did work for them) without using anyone's logo.
 *
 * To show a logo instead, add `logo` (a file in /public/images/clients/).
 * The owner has confirmed they hold permission from these clients to display
 * their logos; keep that permission on file (an email is enough).
 * Prefer the client's official SVG or a transparent PNG. Example:
 *   { name: "Example Ltd", logo: "/images/clients/example.svg" }
 * Logos are shown in their own colours and are never recoloured (brands usually
 * forbid it). Entries without a logo show the name as text.
 *
 * Remove any entry you are not comfortable naming.
 */
export interface Client {
  name: string;
  /** Text description of the logo for screen readers, when it differs from `name`. */
  alt?: string;
  /** Optional logo. Leave out to show the name as text. */
  logo?: string;
  href?: string;
}

export const clients: Client[] = [
  // Logos below were extracted from a screenshot supplied by the owner, so they are
  // small. For print or large use, replace them with each client's official files.
  { name: "Coca-Cola", logo: "/images/clients/coca-cola.png" },
  // This is the older emblem version of the Isuzu logo; swap in their current one if preferred.
  { name: "Isuzu", logo: "/images/clients/isuzu.png" },
  { name: "Twende Trips" },
  { name: "V&C Works Limited" },
  // Confirmed by the owner: "Hadiid Industries Ltd." (the artwork) and "Hadiid Fabricators" are the same company.
  { name: "Hadiid Fabricators", alt: "Hadiid Industries Ltd (Hadiid Fabricators)", logo: "/images/clients/hadiid.png" },
];
