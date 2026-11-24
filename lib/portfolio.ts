import type { PortfolioCategory, PortfolioProject } from "@/types";

/**
 * PORTFOLIO DATA
 * --------------
 * ALL PROJECTS BELOW ARE SAMPLES (isSample: true) shown with placeholder
 * artwork. Replace each one with a real completed job:
 *   1. Add the photo to /public/images/portfolio/
 *   2. Update title, description and `image`
 *   3. Remove `isSample: true`
 *
 * To add a filter tab, add an entry to `portfolioCategories` and use its id as
 * the `category` of your projects.
 */

const img = (name: string) => `/images/placeholders/${name}.svg`;

export const portfolioCategories: PortfolioCategory[] = [
  { id: "all", label: "All" },
  { id: "printing", label: "Printing" },
  { id: "embroidery", label: "Embroidery" },
  { id: "apparel-branding", label: "Apparel Branding" },
  { id: "other", label: "Other" },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "prj-stationery",
    title: "Brand stationery set",
    slug: "brand-stationery-set",
    description:
      "Business cards and matching stationery with a consistent identity.",
    category: "printing",
    serviceSlug: "business-cards",
    image: img("portfolio-stationery"),
    featured: true,
    isSample: true,
  },
  {
    id: "prj-caps",
    title: "Embroidered team caps",
    slug: "embroidered-team-caps",
    description: "Caps with a stitched logo on the front panel.",
    category: "embroidery",
    serviceSlug: "embroidered-caps",
    image: img("portfolio-caps"),
    featured: true,
    isSample: true,
  },
  {
    id: "prj-tees",
    title: "Branded event T-shirts",
    slug: "branded-event-t-shirts",
    description: "A printed T-shirt run for an event or team.",
    category: "apparel-branding",
    serviceSlug: "t-shirt-printing",
    image: img("portfolio-tees"),
    featured: true,
    isSample: true,
  },
  {
    id: "prj-polos",
    title: "Staff polo shirts",
    slug: "staff-polo-shirts",
    description: "Polo shirts with a neat embroidered chest logo.",
    category: "embroidery",
    serviceSlug: "embroidered-polo-shirts",
    image: img("portfolio-polos"),
    featured: true,
    isSample: true,
  },
  {
    id: "prj-posters",
    title: "Event poster series",
    slug: "event-poster-series",
    description: "A set of posters designed to work together.",
    category: "printing",
    serviceSlug: "posters",
    image: img("portfolio-posters"),
    featured: false,
    isSample: true,
  },
  {
    id: "prj-stickers",
    title: "Product sticker sheet",
    slug: "product-sticker-sheet",
    description: "Custom-cut stickers for product and packaging use.",
    category: "printing",
    serviceSlug: "stickers",
    image: img("portfolio-stickers"),
    featured: false,
    isSample: true,
  },
  {
    id: "prj-hoodies",
    title: "Team hoodies",
    slug: "team-hoodies",
    description: "Hoodies finished with a branded front and back design.",
    category: "apparel-branding",
    serviceSlug: "hoodie-branding",
    image: img("portfolio-hoodies"),
    featured: false,
    isSample: true,
  },
  {
    id: "prj-jackets",
    title: "Embroidered jackets",
    slug: "embroidered-jackets-project",
    description: "Jackets with an embroidered logo on the chest.",
    category: "embroidery",
    serviceSlug: "embroidered-jackets",
    image: img("portfolio-jackets"),
    featured: false,
    isSample: true,
  },
  {
    id: "prj-merch",
    title: "Branded mug and tote set",
    slug: "branded-mug-and-tote-set",
    description: "Branded mugs and tote bags for promotions and giveaways.",
    category: "other",
    serviceSlug: "promotional-merchandise",
    image: img("portfolio-merch"),
    featured: false,
    isSample: true,
  },
  {
    id: "prj-packaging",
    title: "Packaging sleeve",
    slug: "packaging-sleeve",
    description: "Custom packaging that carries your brand.",
    category: "other",
    serviceSlug: "packaging",
    image: img("portfolio-packaging"),
    featured: false,
    isSample: true,
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
