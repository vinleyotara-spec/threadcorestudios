/**
 * Shared types. Services and portfolio projects are structured data so the
 * same shapes can later be served from Supabase (see supabase/schema.sql).
 */

export type AvailabilityStatus = "active" | "coming_soon" | "inactive";

/** A group of services, e.g. "Printing". Shown as cards on the homepage. */
export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  status: AvailabilityStatus;
  featured: boolean;
  display_order: number;
  /**
   * Show as its own section on the Services page even while `coming_soon`
   * (otherwise coming-soon categories are grouped under "Future services").
   */
  standalone?: boolean;
  /** Replaces the default "What to include in your request" list on service pages. */
  requestChecklist?: string[];
  /** Downloadable helpers shown on this category's service pages. */
  resources?: Array<{ label: string; description: string; href: string }>;
}

/** A single service / product line, e.g. "Business cards". */
export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  /** Slug of a ServiceCategory. */
  category: string;
  image: string;
  status: AvailabilityStatus;
  featured: boolean;
  display_order: number;
}

export interface PortfolioCategory {
  /** "all" is reserved for the unfiltered view. */
  id: string;
  label: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  /** Id of a PortfolioCategory. */
  category: string;
  /** Optional slug of the related Service, used to prefill the quote form. */
  serviceSlug?: string;
  image: string;
  featured: boolean;
  /** Shows a "Sample" tag. Remove (or set false) once a real project replaces it. */
  isSample?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: "instagram" | "facebook" | "tiktok";
  label: string;
  href: string;
}

export type CustomerType = "individual" | "business";

export interface QuoteInput {
  fullName: string;
  phone: string;
  email: string;
  customerType: CustomerType;
  serviceCategory: string;
  product: string;
  quantity: number;
  customisationMethod: string;
  description: string;
  deliveryDate: string; // YYYY-MM-DD
}

export interface ContactInput {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

export type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; errors: FieldErrors<T> };

/** Response shape of the /api/quote and /api/contact endpoints. */
export type ApiResponse =
  | { ok: true; reference: string }
  | {
      ok: false;
      error:
        | "validation"
        | "rate_limited"
        | "not_configured"
        | "upload_failed"
        | "save_failed"
        | "bad_request"
        | "too_large";
      message: string;
      errors?: Record<string, string>;
    };
