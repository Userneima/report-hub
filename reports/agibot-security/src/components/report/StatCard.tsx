import { cn } from "@/lib/utils";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

function parseNumeric(value: string): { prefix: string; number: number; suffix: string; isNumeric: boolean } {
  const match = value.match(/^([^\d]*?)([\d,.]+)(.*)$/);
  if (!match) return { prefix: "", number: 0, suffix: value, isNumeric: false };
  const num = parseFloat(match[2].replace(/,/g, ""));
  if (isNaN(num)) return { prefix: "", number: 0, suffix: value, isNumeric: false };
  return { prefix: match[1], number: num, suffix: match[3], isNumeric: true };
}

function formatNumber(n: number, template: string): string {
  const hasComma = template.replace(/[^\d,]/g, "").includes(",");
  const decimals = template.includes(".") ? (template.split(".")[1]?.match(/\d+/)?.[0]?.length ?? 0) : 0;
  let formatted = decimals > 0 ? n.toFixed(decimals) : Math.round(n).toString();
  if (hasComma) {
    const parts = formatted.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    formatted = parts.join(".");
  }
  return formatted;
}

function AnimatedValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [displayed, setDisplayed] = useState(value);
  const parsed = parseNumeric(value);

  useEffect(() => {
    if (!isInView || !parsed.isNumeric) return;
    const duration = 800;
    const start = performance.now();
    const target = parsed.number;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      setDisplayed(`${parsed.prefix}${formatNumber(current, value)}${parsed.suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [isInView, parsed.isNumeric, parsed.number, parsed.prefix, parsed.suffix, value]);

  if (!parsed.isNumeric) {
    return (
      <motion.span
        ref={ref}
        initial={{ opacity: 0, y: 6 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {value}
      </motion.span>
    );
  }

  return <span ref={ref}>{isInView ? displayed : "\u00A0"}</span>;
}

export function StatCard({
  value,
  label,
  hint,
  className,
}: {
  value: string;
  label: string;
  hint?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-[color-mix(in_oklch,white_3%,transparent)] p-4",
        className,
      )}
    >
      <div className="text-2xl font-semibold tracking-tight">
        <AnimatedValue value={value} />
      </div>
      <div className="mt-1 text-xs tracking-[0.18em] text-foreground/65">{label}</div>
      {hint ? <div className="mt-2 text-sm text-foreground/75">{hint}</div> : null}
    </div>
  );
}
