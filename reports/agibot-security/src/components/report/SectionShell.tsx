import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/report/SectionLabel";

export function SectionShell({
  id,
  no,
  label,
  title,
  children,
  className,
}: {
  id: string;
  no: string;
  label: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-28", className)}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.5, ease: [0.2, 0.9, 0.2, 1] }}
        className={cn(
          "relative overflow-hidden rounded-2xl border border-border card-glass",
          "p-6 md:p-8",
        )}
      >
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-[color-mix(in_oklch,var(--accent-cyan)_16%,transparent)] blur-3xl" />
        </div>

        <div className="relative">
          <SectionLabel no={no} label={label} />
          <h2 className="mt-3 text-2xl md:text-3xl font-semibold leading-tight">{title}</h2>
          <div className="mt-6">{children}</div>
        </div>

        <div className="pointer-events-none absolute right-4 top-4 select-none font-mono text-6xl font-bold text-foreground/5">
          {no}
        </div>
      </motion.div>
    </section>
  );
}
