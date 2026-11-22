import type {
  ContactInput,
  CustomerType,
  FieldErrors,
  QuoteInput,
  ValidationResult,
} from "@/types";
import { serviceCategories } from "@/lib/services";
import { todayISO } from "@/lib/utils";

/**
 * Validation shared by the browser (instant feedback) and the API routes
 * (the real security boundary). Never trust the client-side result alone.
 */

// ---- Options ---------------------------------------------------------------

export const CUSTOMER_TYPES: Array<{ value: CustomerType; label: string }> = [
  { value: "individual", label: "Individual" },
  { value: "business", label: "Business" },
];

export const CUSTOMISATION_METHODS = [
  "Digital print",
  "Screen print",
  "Heat transfer / vinyl",
  "Embroidery",
  "Sublimation",
  "Made to order (cut and sew)",
  "Not sure, please advise",
] as const;

export const OTHER_PRODUCT = "Other / not listed";

// ---- Artwork upload rules --------------------------------------------------

export const ARTWORK_MAX_BYTES = 4 * 1024 * 1024; // Vercel functions accept ~4.5 MB bodies
export const ARTWORK_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "application/pdf": "pdf",
};
export const ARTWORK_ACCEPT = Object.keys(ARTWORK_TYPES).join(",");
export const ARTWORK_HELP = "JPG, PNG, WebP or PDF, up to 4 MB";

export function validateArtworkMeta(file: {
  size: number;
  type: string;
}): string | null {
  if (!(file.type in ARTWORK_TYPES)) {
    return "Please upload a JPG, PNG, WebP or PDF file.";
  }
  if (file.size > ARTWORK_MAX_BYTES) {
    return "That file is too large. Please keep it under 4 MB.";
  }
  if (file.size === 0) {
    return "That file looks empty.";
  }
  return null;
}

/** Detects the real file type from its first bytes (the declared MIME type can be faked). */
export function sniffArtworkType(bytes: Uint8Array): "jpg" | "png" | "webp" | "pdf" | null {
  const startsWith = (sig: number[], offset = 0) =>
    sig.every((b, i) => bytes[offset + i] === b);
  if (startsWith([0xff, 0xd8, 0xff])) return "jpg";
  if (startsWith([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return "png";
  if (startsWith([0x52, 0x49, 0x46, 0x46]) && startsWith([0x57, 0x45, 0x42, 0x50], 8)) {
    return "webp";
  }
  if (startsWith([0x25, 0x50, 0x44, 0x46])) return "pdf"; // %PDF
  return null;
}

// ---- Field helpers ---------------------------------------------------------

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9\s().-]+$/;

function phoneError(phone: string): string | null {
  if (!phone) return "Please enter your phone number.";
  const digits = phone.replace(/\D/g, "");
  if (!PHONE_RE.test(phone) || digits.length < 7 || digits.length > 15) {
    return "Please enter a valid phone number, for example +254 712 345 678.";
  }
  return null;
}

function emailError(email: string, required: boolean): string | null {
  if (!email) return required ? "Please enter your email address." : null;
  if (email.length > 254 || !EMAIL_RE.test(email)) {
    return "Please enter a valid email address.";
  }
  return null;
}

// ---- Quote -----------------------------------------------------------------

export function validateQuote(raw: Record<string, unknown>): ValidationResult<QuoteInput> {
  const errors: FieldErrors<QuoteInput> = {};

  const fullName = str(raw.fullName);
  if (fullName.length < 2) errors.fullName = "Please enter your full name.";
  else if (fullName.length > 100) errors.fullName = "That name is too long.";

  const phone = str(raw.phone);
  const pe = phoneError(phone);
  if (pe) errors.phone = pe;

  const email = str(raw.email);
  const ee = emailError(email, false);
  if (ee) errors.email = ee;

  const customerType = str(raw.customerType) as CustomerType;
  if (!CUSTOMER_TYPES.some((t) => t.value === customerType)) {
    errors.customerType = "Please choose Individual or Business.";
  }

  const serviceCategory = str(raw.serviceCategory);
  if (!serviceCategories.some((c) => c.slug === serviceCategory)) {
    errors.serviceCategory = "Please choose a service category.";
  }

  const product = str(raw.product);
  if (!product) errors.product = "Please choose the product you need.";
  else if (product.length > 120) errors.product = "That product name is too long.";

  const quantityRaw = str(raw.quantity);
  const quantity = Number(quantityRaw);
  if (!quantityRaw) errors.quantity = "Please enter the quantity you need.";
  else if (!Number.isInteger(quantity) || quantity < 1) {
    errors.quantity = "Quantity must be a whole number of 1 or more.";
  } else if (quantity > 1_000_000) {
    errors.quantity = "For quantities this large, please contact us directly.";
  }

  const customisationMethod = str(raw.customisationMethod);
  if (!(CUSTOMISATION_METHODS as readonly string[]).includes(customisationMethod)) {
    errors.customisationMethod = "Please choose a customisation method.";
  }

  const description = str(raw.description);
  if (description.length < 10) {
    errors.description = "Please tell us a little about your project (at least 10 characters).";
  } else if (description.length > 4000) {
    errors.description = "Please keep the description under 4,000 characters.";
  }

  const deliveryDate = str(raw.deliveryDate);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(deliveryDate) || Number.isNaN(Date.parse(deliveryDate))) {
    errors.deliveryDate = "Please choose the date you need your order by.";
  } else if (deliveryDate < todayISO()) {
    errors.deliveryDate = "The delivery date can't be in the past.";
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      fullName,
      phone,
      email,
      customerType,
      serviceCategory,
      product,
      quantity,
      customisationMethod,
      description,
      deliveryDate,
    },
  };
}

// ---- Contact ---------------------------------------------------------------

export function validateContact(raw: Record<string, unknown>): ValidationResult<ContactInput> {
  const errors: FieldErrors<ContactInput> = {};

  const fullName = str(raw.fullName);
  if (fullName.length < 2) errors.fullName = "Please enter your name.";
  else if (fullName.length > 100) errors.fullName = "That name is too long.";

  const email = str(raw.email);
  const ee = emailError(email, true);
  if (ee) errors.email = ee;

  const phone = str(raw.phone);
  if (phone) {
    const pe = phoneError(phone);
    if (pe) errors.phone = pe;
  }

  const message = str(raw.message);
  if (message.length < 10) errors.message = "Please write a short message (at least 10 characters).";
  else if (message.length > 4000) errors.message = "Please keep your message under 4,000 characters.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data: { fullName, email, phone, message } };
}
