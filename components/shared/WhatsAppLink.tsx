import { MessageCircle } from "lucide-react";
import { ExternalButtonLink } from "@/components/shared/Button";
import { whatsappUrl } from "@/lib/whatsapp";
import type { ComponentProps } from "react";

/** A WhatsApp call-to-action button with an optional prefilled message. */
export function WhatsAppLink({
  message,
  children = "WhatsApp us",
  variant = "outline",
  size,
  className,
}: {
  message?: string;
  children?: React.ReactNode;
  variant?: ComponentProps<typeof ExternalButtonLink>["variant"];
  size?: ComponentProps<typeof ExternalButtonLink>["size"];
  className?: string;
}) {
  return (
    <ExternalButtonLink
      href={whatsappUrl(message)}
      variant={variant}
      size={size}
      className={className}
    >
      <MessageCircle aria-hidden="true" className="size-4" />
      {children}
    </ExternalButtonLink>
  );
}
