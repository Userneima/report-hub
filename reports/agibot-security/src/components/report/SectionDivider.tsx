export function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-1">
      <div
        className="h-px w-full max-w-md"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in oklch, var(--accent-cyan) 35%, transparent) 50%, transparent)",
        }}
      />
    </div>
  );
}
