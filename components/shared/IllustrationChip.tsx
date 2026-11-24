import { cn } from "@/lib/utils";

/**
 * Label on an image that is an illustration (for example AI-generated), not a photo of a real
 * job. Shows what the picture is ("Scrubs", "Embroidery"...) plus the word "Illustration".
 * Place inside a `relative` image container.
 */
export function IllustrationChip({ label, className }: { label?: string; className?: string }) {
  return (
    <span
      className={cn(
        "absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1 text-[0.72rem] tracking-wide text-white backdrop-blur-sm",
        className,
      )}
    >
      {label && (
        <>
          <span className="font-semibold">{label}</span>
          <span aria-hidden="true" className="opacity-50">
            ·
          </span>
        </>
      )}
      <span className="opacity-80">Illustration</span>
    </span>
  );
}
