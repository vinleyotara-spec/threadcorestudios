/**
 * CLIENTS
 * -------
 * Businesses you have genuinely worked for, shown as a "Clients we have worked
 * with" strip on the homepage. The strip is hidden while this list is empty.
 *
 * Names are shown as plain text in one consistent style. That states a fact
 * (you did work for them) without using anyone's logo.
 *
 * To show a logo instead, add `logo` (a file in /public/images/clients/), but
 * only with that client's permission: a company logo is a trademark and implies
 * a relationship, and some brands restrict where theirs may appear.
 * Example: { name: "Example Ltd", logo: "/images/clients/example.svg" }
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
