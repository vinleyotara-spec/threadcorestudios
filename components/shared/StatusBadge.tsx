import type { AvailabilityStatus } from "@/types";
import { cn } from "@/lib/utils";

const labels: Record<AvailabilityStatus, string> = {
  active: "Available",
  coming_soon: "Coming soon",
  inactive: "Unavailable",
};

export function StatusBadge({
  status,
  className,
}: {
  status: AvailabilityStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        status === "active" && "bg-white/90 text-ink",
        status === "coming_soon" && "bg-accent-soft text-accent-strong",
        status === "inactive" && "bg-line text-muted",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-1.5 rounded-full",
          status === "active" && "bg-emerald-600",
          status === "coming_soon" && "bg-accent",
          status === "inactive" && "bg-muted",
        )}
      />
      {labels[status]}
    </span>
  );
}
