/**
 * CLIENT LOGOS
 * ------------
 * Brands you have genuinely produced work for. While this list is empty the
 * "Trusted by" strip on the homepage is NOT rendered, so nothing is shown that
 * isn't real.
 *
 * Only add a brand when BOTH are true:
 *   1. You really did the work for them.
 *   2. You have their permission to show their name and logo (company logos are
 *      trademarks, and showing one implies an endorsement or relationship).
 *
 * To add one: put the logo file in /public/images/clients/ and add an entry:
 *   { name: "Example Ltd", logo: "/images/clients/example.svg" }
 * Prefer a single-colour (or transparent PNG/SVG) logo so the strip looks tidy.
 */
export interface ClientLogo {
  name: string;
  logo: string;
  href?: string;
}

export const clients: ClientLogo[] = [];
