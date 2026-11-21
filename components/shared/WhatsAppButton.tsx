import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";

/**
 * Floating WhatsApp button shown on every page (mounted once in app/layout.tsx).
 * The number comes from lib/config.ts / NEXT_PUBLIC_WHATSAPP_NUMBER.
 */
export function WhatsAppButton({ message }: { message?: string }) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 items-center gap-2.5 rounded-full bg-ink px-4 text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-black sm:px-5"
    >
      <MessageCircle aria-hidden="true" className="size-6" />
      <span className="hidden text-sm font-medium sm:inline">WhatsApp us</span>
    </a>
  );
}
