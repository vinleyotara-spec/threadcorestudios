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
/** Illustration pictures (AI-generated, not photos of real jobs). Tagged isIllustration + isSample. */
const illo = (name: string) => `/images/illustrations/${name}.jpg`;
/** Photos of real jobs by the studio (public/images/work). No "Sample" or "Illustration" tag. */
const work = (name: string) => `/images/work/${name}.jpg`;

export const portfolioCategories: PortfolioCategory[] = [
  { id: "all", label: "All" },
  { id: "printing", label: "Printing" },
  { id: "apparel-branding", label: "Branding" },
  { id: "embroidery", label: "Embroidery" },
  { id: "healthcare", label: "Scrubs & Healthcare" },
  { id: "workwear", label: "Workwear" },
  { id: "other", label: "Other" },
];

export const portfolioProjects: PortfolioProject[] = [
  // ---- Real work (photos of actual jobs) ----------------------------------
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
    id: "work-cap-production",
    title: "Cap embroidery in production",
    slug: "cap-embroidery-in-production",
    description: "Multi-head embroidery machines stitching a logo onto a run of caps.",
    category: "embroidery",
    serviceSlug: "embroidered-caps",
    image: work("cap-embroidery-production"),
    featured: true,
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
    id: "work-towel-detail",
    title: "Towel logo embroidery",
    slug: "towel-logo-embroidery",
    description: "Close-up of a logo embroidered in orange thread on a white towel.",
    category: "embroidery",
    serviceSlug: "custom-embroidered-apparel",
    image: work("towel-logo-embroidery"),
    featured: false,
  },
  {
    id: "work-tumbler",
    title: "Engraved tumbler",
    slug: "engraved-tumbler",
    description: "An insulated tumbler personalised with an engraved name.",
    category: "other",
    serviceSlug: "personalised-gifts",
    image: work("engraved-tumbler"),
    featured: false,
  },
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
    title: "Embroidered hoodie",
    slug: "embroidered-hoodie",
    description: "A fleece hoodie with an embroidered chest design and a small detail on the sleeve.",
    category: "apparel-branding",
    serviceSlug: "hoodie-branding",
    image: illo("hoodie-flat"),
    imageLabel: "Hoodie",
    featured: false,
    isSample: true,
    isIllustration: true,
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
  {
    id: "prj-scrubs-navy",
    title: "Navy scrub set",
    slug: "navy-scrub-set",
    description: "A V-neck scrub top with matching trousers for clinics and hospitals.",
    category: "healthcare",
    serviceSlug: "healthcare-uniforms",
    image: illo("scrubs-navy"),
    imageLabel: "Scrubs",
    featured: false,
    isSample: true,
    isIllustration: true,
  },
  {
    id: "prj-scrubs-teal",
    title: "Teal scrub set",
    slug: "teal-scrub-set",
    description: "A scrub set in a calm teal, with roomy chest and hip pockets.",
    category: "healthcare",
    serviceSlug: "healthcare-uniforms",
    image: illo("scrubs-teal"),
    imageLabel: "Scrubs",
    featured: false,
    isSample: true,
    isIllustration: true,
  },
  {
    id: "prj-labcoat",
    title: "Lab coat",
    slug: "lab-coat",
    description: "A tailored white lab coat with chest and hip pockets.",
    category: "healthcare",
    serviceSlug: "healthcare-uniforms",
    image: illo("lab-coat"),
    imageLabel: "Lab coat",
    featured: false,
    isSample: true,
    isIllustration: true,
  },
  {
    id: "prj-coverall-grey",
    title: "Reflective coverall",
    slug: "reflective-coverall",
    description: "A long-sleeve coverall with reflective strips and contrast trim for site and workshop teams.",
    category: "workwear",
    serviceSlug: "industrial-workwear",
    image: illo("coverall-grey"),
    imageLabel: "Workwear",
    featured: false,
    isSample: true,
    isIllustration: true,
  },
  {
    id: "prj-coverall-navy",
    title: "Navy workwear coverall",
    slug: "navy-workwear-coverall",
    description: "A hard-wearing navy coverall with reflective bands and orange detailing.",
    category: "workwear",
    serviceSlug: "industrial-workwear",
    image: illo("coverall-navy"),
    imageLabel: "Workwear",
    featured: false,
    isSample: true,
    isIllustration: true,
  },
  {
    id: "prj-emb-machine",
    title: "Detailed logo embroidery",
    slug: "detailed-logo-embroidery",
    description: "A multi-thread design being stitched on a hooped garment.",
    category: "embroidery",
    serviceSlug: "custom-embroidered-apparel",
    image: illo("embroidery-machine"),
    imageLabel: "Embroidery",
    featured: false,
    isSample: true,
    isIllustration: true,
  },
  {
    id: "prj-emb-hoodie",
    title: "Embroidered hoodie detail",
    slug: "embroidered-hoodie-detail",
    description: "A fine-line embroidered motif on a fleece hoodie.",
    category: "embroidery",
    serviceSlug: "custom-embroidered-apparel",
    image: illo("hoodie-embroidery-detail"),
    imageLabel: "Embroidery",
    featured: false,
    isSample: true,
    isIllustration: true,
  },
  {
    id: "prj-rollup",
    title: "Roll-up banner",
    slug: "roll-up-banner",
    description: "A portable roll-up banner for an event or shop display.",
    category: "apparel-branding",
    serviceSlug: "roll-up-banners",
    image: img("portfolio-rollup"),
    featured: false,
    isSample: true,
  },
  {
    id: "prj-billboard",
    title: "Billboard branding",
    slug: "billboard-branding",
    description: "A large-format billboard carrying a brand message.",
    category: "apparel-branding",
    serviceSlug: "billboards",
    image: img("portfolio-billboard"),
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
