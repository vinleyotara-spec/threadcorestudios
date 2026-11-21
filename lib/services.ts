import type { AvailabilityStatus, Service, ServiceCategory } from "@/types";

/**
 * SERVICES DATA
 * -------------
 * Everything on the homepage, services pages and quote form is generated from
 * the two arrays below. To add a service, add an object to `services`.
 * To add a whole new line of business, add an object to `serviceCategories`
 * and then services that point at its slug.
 *
 * Images are temporary placeholders in /public/images/placeholders. To use a
 * real photo, drop it in /public/images and change the `image` path.
 *
 * The functions at the bottom are async on purpose: they are the only place
 * the site reads this data, so they can be swapped for Supabase queries
 * (tables in supabase/schema.sql) without touching any page or component.
 */

const img = (name: string) => `/images/placeholders/${name}.svg`;

export const serviceCategories: ServiceCategory[] = [
  {
    id: "printing",
    name: "Printing",
    slug: "printing",
    description:
      "Business cards, flyers, posters, brochures and stickers, printed to represent your brand well.",
    image: img("category-printing"),
    status: "active",
    featured: true,
    display_order: 1,
  },
  {
    id: "embroidery",
    name: "Embroidery",
    slug: "embroidery",
    description:
      "Stitched logos and names on caps, polo shirts, uniforms and jackets.",
    image: img("category-embroidery"),
    status: "active",
    featured: true,
    display_order: 2,
  },
  {
    id: "apparel-branding",
    name: "Apparel Branding",
    slug: "apparel-branding",
    description:
      "T-shirts, hoodies and custom apparel branded for teams, events and businesses.",
    image: img("category-apparel"),
    status: "active",
    featured: true,
    display_order: 3,
  },
  {
    id: "promotional-products",
    name: "Promotional Products",
    slug: "promotional-products",
    description:
      "Branded merchandise that keeps your name in front of customers.",
    image: img("category-promotional"),
    status: "coming_soon",
    featured: true,
    display_order: 4,
  },
  {
    id: "corporate-gifts",
    name: "Corporate Gifts",
    slug: "corporate-gifts",
    description:
      "Thoughtful, branded gifts for clients, staff and special occasions.",
    image: img("category-gifts"),
    status: "coming_soon",
    featured: true,
    display_order: 5,
  },
  {
    id: "custom-products",
    name: "Custom Products",
    slug: "custom-products",
    description:
      "Packaging, labels, signage and personalised products made around your idea.",
    image: img("category-custom"),
    status: "coming_soon",
    featured: true,
    display_order: 6,
  },
];

export const services: Service[] = [
  // ---- Printing -----------------------------------------------------------
  {
    id: "svc-business-cards",
    name: "Business Cards",
    slug: "business-cards",
    description:
      "Professional business cards that make a strong first impression, in the stock and finish that suit your brand.",
    category: "printing",
    image: img("business-cards"),
    status: "active",
    featured: true,
    display_order: 1,
  },
  {
    id: "svc-flyers",
    name: "Flyers",
    slug: "flyers",
    description:
      "Flyers for promotions, events and announcements, printed in the size and quantity you need.",
    category: "printing",
    image: img("flyers"),
    status: "active",
    featured: false,
    display_order: 2,
  },
  {
    id: "svc-posters",
    name: "Posters",
    slug: "posters",
    description:
      "Eye-catching posters for events, retail and displays, from small formats to large.",
    category: "printing",
    image: img("posters"),
    status: "active",
    featured: false,
    display_order: 3,
  },
  {
    id: "svc-brochures",
    name: "Brochures",
    slug: "brochures",
    description:
      "Folded and multi-page brochures that present your products and services clearly.",
    category: "printing",
    image: img("brochures"),
    status: "active",
    featured: false,
    display_order: 4,
  },
  {
    id: "svc-stickers",
    name: "Stickers",
    slug: "stickers",
    description:
      "Custom stickers for products, packaging and promotion, cut to the shape of your design.",
    category: "printing",
    image: img("stickers"),
    status: "active",
    featured: false,
    display_order: 5,
  },

  // ---- Embroidery ---------------------------------------------------------
  {
    id: "svc-embroidered-caps",
    name: "Embroidered Caps",
    slug: "embroidered-caps",
    description:
      "Caps with your logo or name stitched in, for teams, businesses and events.",
    category: "embroidery",
    image: img("embroidered-caps"),
    status: "active",
    featured: true,
    display_order: 1,
  },
  {
    id: "svc-embroidered-polo-shirts",
    name: "Embroidered Polo Shirts",
    slug: "embroidered-polo-shirts",
    description:
      "Polo shirts with a neat embroidered chest logo, a smart choice for staff and corporate wear.",
    category: "embroidery",
    image: img("embroidered-polo-shirts"),
    status: "active",
    featured: false,
    display_order: 2,
  },
  {
    id: "svc-uniforms",
    name: "Uniforms",
    slug: "uniforms",
    description:
      "Embroidered uniforms for businesses, schools and teams, so everyone looks consistent.",
    category: "embroidery",
    image: img("uniforms"),
    status: "active",
    featured: false,
    display_order: 3,
  },
  {
    id: "svc-embroidered-jackets",
    name: "Embroidered Jackets",
    slug: "embroidered-jackets",
    description:
      "Jackets finished with embroidered branding for a durable, professional look.",
    category: "embroidery",
    image: img("embroidered-jackets"),
    status: "active",
    featured: false,
    display_order: 4,
  },
  {
    id: "svc-custom-embroidered-apparel",
    name: "Custom Embroidered Apparel",
    slug: "custom-embroidered-apparel",
    description:
      "Have something else in mind? Tell us the garment and the design and we will advise on the best approach.",
    category: "embroidery",
    image: img("custom-embroidered-apparel"),
    status: "active",
    featured: false,
    display_order: 5,
  },

  // ---- Apparel branding ---------------------------------------------------
  {
    id: "svc-t-shirt-printing",
    name: "T-Shirt Printing",
    slug: "t-shirt-printing",
    description:
      "Custom printed T-shirts for brands, events, teams and gifts, from a single piece to larger runs.",
    category: "apparel-branding",
    image: img("t-shirt-printing"),
    status: "active",
    featured: true,
    display_order: 1,
  },
  {
    id: "svc-hoodie-branding",
    name: "Hoodie Branding",
    slug: "hoodie-branding",
    description:
      "Branded hoodies for teams, clubs and businesses, finished with your design.",
    category: "apparel-branding",
    image: img("hoodie-branding"),
    status: "active",
    featured: false,
    display_order: 2,
  },
  {
    id: "svc-custom-apparel-printing",
    name: "Custom Apparel Printing",
    slug: "custom-apparel-printing",
    description:
      "Printed branding on other garments. Tell us what you need and we will recommend how to do it.",
    category: "apparel-branding",
    image: img("custom-apparel-printing"),
    status: "active",
    featured: false,
    display_order: 3,
  },

  // ---- Future services ----------------------------------------------------
  {
    id: "svc-promotional-merchandise",
    name: "Promotional Merchandise",
    slug: "promotional-merchandise",
    description:
      "Branded merchandise for promotions and giveaways. Coming soon. Tell us what you are looking for.",
    category: "promotional-products",
    image: img("promotional-merchandise"),
    status: "coming_soon",
    featured: false,
    display_order: 1,
  },
  {
    id: "svc-corporate-gifts",
    name: "Corporate Gifts",
    slug: "corporate-gifts",
    description:
      "Branded gifts for clients and staff. Coming soon. Tell us what you are looking for.",
    category: "corporate-gifts",
    image: img("corporate-gifts"),
    status: "coming_soon",
    featured: false,
    display_order: 1,
  },
  {
    id: "svc-packaging",
    name: "Packaging",
    slug: "packaging",
    description:
      "Custom packaging that carries your brand. Coming soon. Tell us what you are looking for.",
    category: "custom-products",
    image: img("packaging"),
    status: "coming_soon",
    featured: false,
    display_order: 1,
  },
  {
    id: "svc-labels",
    name: "Labels",
    slug: "labels",
    description:
      "Product and packaging labels. Coming soon. Tell us what you are looking for.",
    category: "custom-products",
    image: img("labels"),
    status: "coming_soon",
    featured: false,
    display_order: 2,
  },
  {
    id: "svc-signage",
    name: "Signage",
    slug: "signage",
    description:
      "Signs for shopfronts, offices and events. Coming soon. Tell us what you are looking for.",
    category: "custom-products",
    image: img("signage"),
    status: "coming_soon",
    featured: false,
    display_order: 3,
  },
  {
    id: "svc-personalised-gifts",
    name: "Personalised Gifts",
    slug: "personalised-gifts",
    description:
      "Gifts made personal with names, designs and messages. Coming soon. Tell us what you are looking for.",
    category: "custom-products",
    image: img("personalised-gifts"),
    status: "coming_soon",
    featured: false,
    display_order: 4,
  },
];

// ---- Synchronous helpers (safe to use in client code and validation) --------

const visible = (s: { status: AvailabilityStatus }) => s.status !== "inactive";
const byOrder = <T extends { display_order: number }>(a: T, b: T) =>
  a.display_order - b.display_order;

export function listCategories(): ServiceCategory[] {
  return serviceCategories.filter(visible).sort(byOrder);
}

export function listServices(): Service[] {
  const categoryOrder = new Map(
    serviceCategories.map((c) => [c.slug, c.display_order]),
  );
  return services
    .filter(visible)
    .sort(
      (a, b) =>
        (categoryOrder.get(a.category) ?? 99) -
          (categoryOrder.get(b.category) ?? 99) || byOrder(a, b),
    );
}

export function listServicesForCategory(categorySlug: string): Service[] {
  return listServices().filter((s) => s.category === categorySlug);
}

// ---- Async data access (swap these for Supabase queries when ready) ---------

export async function getCategories(): Promise<ServiceCategory[]> {
  return listCategories();
}

export async function getFeaturedCategories(): Promise<ServiceCategory[]> {
  return listCategories().filter((c) => c.featured);
}

export async function getServices(): Promise<Service[]> {
  return listServices();
}

export async function getFeaturedServices(): Promise<Service[]> {
  return listServices().filter((s) => s.featured);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return listServices().find((s) => s.slug === slug) ?? null;
}

export async function getCategoryBySlug(
  slug: string,
): Promise<ServiceCategory | null> {
  return listCategories().find((c) => c.slug === slug) ?? null;
}

export async function getRelatedServices(
  service: Service,
  limit = 3,
): Promise<Service[]> {
  return listServices()
    .filter((s) => s.category === service.category && s.slug !== service.slug)
    .slice(0, limit);
}
