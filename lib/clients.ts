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
 * Logos show in grey and turn to full colour on hover. Entries without a logo
 * show the name as text.
 *
 * Remove any entry you are not comfortable naming.
 */
export interface Client {
  name: string;
  /** Optional logo. Leave out to show the name as text. */
  logo?: string;
  href?: string;
}

export const clients: Client[] = [
  { name: "Coca-Cola" },
  { name: "Isuzu" },
  { name: "Twende Trips" },
  { name: "V&C Works Limited" },
  { name: "Hadiid Fabricators" },
];
