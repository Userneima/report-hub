import { cn } from "@/lib/utils";

export function SectionLabel({
  no,
  label,
  className,
}: {
  no: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="h-[1px] w-10 bg-[color-mix(in_oklch,var(--accent-cyan)_60%,transparent)]" />
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-xs tracking-[0.24em] text-cyan">{no}</span>
        <span className="text-xs tracking-[0.22em] text-foreground/70">{label}</span>
      </div>
    </div>
  );
}
