import { cn } from "@/lib/utils";

export function GlowBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-foreground/90",
        "bg-[color-mix(in_oklch,white_4%,transparent)]",
        className,
      )}
    >
      <span className="glow-dot" />
      <span className="whitespace-nowrap">{children}</span>
    </span>
  );
}
