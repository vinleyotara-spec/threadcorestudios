import type { PortfolioCategory, PortfolioProject } from "@/types";

/**
 * PORTFOLIO DATA
 * --------------
 * Photos of real jobs by the studio (public/images/work). To add one:
 *   1. Add the photo, cropped to about 4:3, to /public/images/work/
 *   2. Add an entry below with a title, description and `image`
 *
 * Use each photo once. To add a filter tab, add an entry to `portfolioCategories`
 * and use its id as the `category` of your projects. Empty tabs are hidden.
 */

const work = (name: string) => `/images/work/${name}.jpg`;

export const portfolioCategories: PortfolioCategory[] = [
  { id: "all", label: "All" },
  { id: "printing", label: "Printing" },
  { id: "apparel-branding", label: "Branding" },
  { id: "embroidery", label: "Embroidery" },
  { id: "healthcare", label: "Scrubs & Healthcare" },
  { id: "workwear", label: "Workwear" },
  { id: "drinkware", label: "Bottles & Tumblers" },
  { id: "notebooks", label: "Notebooks" },
  { id: "blankets", label: "Blankets & Shukas" },
  { id: "other", label: "Other" },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "work-elephant-hoodie-green",
    title: "Elephant embroidery hoodie",
    slug: "elephant-hoodie-green",
    description: "A detailed elephant and lettering stitched on a green hoodie.",
    category: "embroidery",
    serviceSlug: "custom-embroidered-apparel",
    image: work("elephant-hoodie-green"),
    featured: true,
  },
  {
    id: "work-named-corporate-bottles",
    title: "Staff bottles with names",
    slug: "named-corporate-bottles",
    description: "Matching bottles carrying a company logo and each person's name.",
    category: "drinkware",
    serviceSlug: "corporate-gifts",
    image: work("named-corporate-bottles"),
    featured: true,
  },
  {
    id: "work-cap",
    title: "Embroidered trucker cap",
    slug: "embroidered-trucker-cap",
    description: "A red trucker cap with a raised white-thread name, fresh off the embroidery machine.",
    category: "embroidery",
    serviceSlug: "embroidered-caps",
    image: work("embroidered-trucker-cap"),
    featured: true,
  },
  {
    id: "work-sunflower-tumbler",
    title: "Sunflower wrap tumbler",
    slug: "sunflower-tumbler",
    description: "A large tumbler with a full-colour sunflower design and message.",
    category: "drinkware",
    serviceSlug: "personalised-gifts",
    image: work("sunflower-tumbler"),
    featured: false,
  },
  {
    id: "work-africa-print-hoodies",
    title: "Africa print hoodies",
    slug: "africa-print-hoodies",
    description: "Hoodies in blue, black and red, each printed with a striped map of Africa.",
    category: "apparel-branding",
    serviceSlug: "hoodie-branding",
    image: work("africa-print-hoodies"),
    featured: true,
  },
  {
    id: "work-branded-bamboo-tumbler",
    title: "Logo tumbler with bamboo base",
    slug: "branded-bamboo-tumbler",
    description: "A red tumbler with a bamboo base and a metallic logo.",
    category: "drinkware",
    serviceSlug: "corporate-gifts",
    image: work("branded-bamboo-tumbler"),
    featured: false,
  },
  {
    id: "work-surgeon-notebook",
    title: "Personalised doctor's notebook",
    slug: "surgeon-notebook",
    description: "A wood-effect notebook with a name, quote and stethoscope design.",
    category: "notebooks",
    serviceSlug: "personalised-gifts",
    image: work("surgeon-notebook"),
    featured: false,
  },
  {
    id: "work-logo-embroidery-hoop",
    title: "Logo embroidery in the hoop",
    slug: "logo-embroidery-hoop",
    description: "A multi-colour title logo stitched on a white hoodie, still in the embroidery hoop.",
    category: "embroidery",
    serviceSlug: "custom-embroidered-apparel",
    image: work("logo-embroidery-hoop"),
    featured: false,
  },
  {
    id: "work-branded-travel-mug",
    title: "Branded travel mug",
    slug: "branded-travel-mug",
    description: "A black travel mug with a clean one-colour logo.",
    category: "drinkware",
    serviceSlug: "corporate-gifts",
    image: work("branded-travel-mug"),
    featured: false,
  },
  {
    id: "work-flag-shuka-blanket",
    title: "Embroidered flag shuka",
    slug: "flag-shuka-blanket",
    description: "A gift-wrapped shuka blanket with a stitched name and Kenyan flag.",
    category: "blankets",
    serviceSlug: "custom-embroidered-apparel",
    image: work("flag-shuka-blanket"),
    featured: false,
  },
  {
    id: "work-printed-hoodie-boxed",
    title: "Printed logo hoodie",
    slug: "printed-hoodie-boxed",
    description: "A black hoodie with a two-colour logo print, boxed and ready to go.",
    category: "apparel-branding",
    serviceSlug: "hoodie-branding",
    image: work("printed-hoodie-boxed"),
    featured: false,
  },
  {
    id: "work-bamboo-flask",
    title: "Bamboo flask with a message",
    slug: "bamboo-flask",
    description: "A bamboo-finish flask decorated with a verse and floral detail.",
    category: "drinkware",
    serviceSlug: "personalised-gifts",
    image: work("bamboo-flask"),
    featured: false,
  },
  {
    id: "work-mandala-notebook",
    title: "Mandala notebook",
    slug: "mandala-notebook",
    description: "A black notebook with a white mandala design.",
    category: "notebooks",
    serviceSlug: "personalised-gifts",
    image: work("mandala-notebook"),
    featured: false,
  },
  {
    id: "work-organisation-diary",
    title: "Organisation diary with name",
    slug: "organisation-diary",
    description: "A navy diary carrying an organisation logo, a name and a verse.",
    category: "notebooks",
    serviceSlug: "corporate-gifts",
    image: work("organisation-diary"),
    featured: false,
  },
  {
    id: "work-towels",
    title: "Embroidered towels",
    slug: "embroidered-towels",
    description: "A set of white towels embroidered with a customer's logo.",
    category: "embroidery",
    serviceSlug: "custom-embroidered-apparel",
    image: work("embroidered-towels"),
    featured: true,
  },
  {
    id: "work-logo-bottles-white",
    title: "Full-colour logo bottles",
    slug: "logo-bottles-white",
    description: "White bottles with bamboo-topped lids and a full-colour logo.",
    category: "drinkware",
    serviceSlug: "promotional-merchandise",
    image: work("logo-bottles-white"),
    featured: false,
  },
  {
    id: "work-welcome-shuka-blankets",
    title: "Welcome gift shukas",
    slug: "welcome-shuka-blankets",
    description: "Shuka blankets embroidered with individual welcome messages.",
    category: "blankets",
    serviceSlug: "custom-embroidered-apparel",
    image: work("welcome-shuka-blankets"),
    featured: false,
  },
  {
    id: "work-tumbler",
    title: "Engraved Stanley cup",
    slug: "engraved-stanley-cup",
    description: "A Stanley cup personalised with an engraved name.",
    category: "drinkware",
    serviceSlug: "personalised-gifts",
    image: work("engraved-tumbler"),
    featured: false,
  },
];

// ---- Async data access (swap for Supabase queries when ready) ---------------

export async function getPortfolioCategories(): Promise<PortfolioCategory[]> {
  return portfolioCategories;
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  return portfolioProjects;
}

export async function getFeaturedProjects(
  limit = 4,
): Promise<PortfolioProject[]> {
  return portfolioProjects.filter((p) => p.featured).slice(0, limit);
}
