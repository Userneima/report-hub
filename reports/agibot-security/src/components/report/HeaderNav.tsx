import { chapters } from "@/data/chapters";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function HeaderNav() {
  const [activeId, setActiveId] = useState(chapters[0]?.id ?? "c00");
  const [progress, setProgress] = useState(0);

  const ids = useMemo(() => chapters.map((c) => c.id), []);

  useEffect(() => {
    const handler = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? (window.scrollY / max) * 100 : 0;
      setProgress(Math.max(0, Math.min(100, p)));
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0));
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.1, 0.2] },
    );

    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-transparent">
        <div
          className="h-full"
          style={{
            width: `${progress}%`,
            background: "var(--accent-cyan)",
            boxShadow:
              "0 0 0 1px color-mix(in oklch, var(--accent-cyan) 30%, transparent), 0 0 14px color-mix(in oklch, var(--accent-cyan) 40%, transparent)",
          }}
        />
      </div>

      <header className="sticky top-0 z-40 border-b border-border bg-[color-mix(in_oklch,var(--bg-deep)_92%,transparent)] backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="text-sm font-semibold leading-tight">智元远征 A2 × Certis｜案例研究报告</div>
            </div>

            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="章节目录">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="bg-background border-border">
                  <SheetHeader>
                    <SheetTitle>章节目录</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {chapters.map((c) => (
                      <Link key={c.id} href={`/${c.id}`}>
                        <span
                          className={cn(
                            "cursor-pointer rounded-lg border border-border p-3 text-sm flex items-center gap-2",
                            c.id === activeId &&
                              "border-[color-mix(in_oklch,var(--accent-cyan)_55%,transparent)] bg-[color-mix(in_oklch,var(--accent-cyan)_12%,transparent)]",
                          )}
                        >
                          <span className="font-mono text-xs text-cyan min-w-[2rem]">{c.no}</span>
                          <span className="text-foreground/80 line-clamp-1">{c.label}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-20 hidden md:block w-auto max-w-[180px] max-h-[80vh] rounded-xl border border-border bg-[color-mix(in_oklch,var(--bg-deep)_90%,transparent)] backdrop-blur shadow-xl shadow-black/20">
        <div className="h-full overflow-y-auto p-3">
          <div className="text-xs font-semibold mb-3 text-foreground/60">章节目录</div>
          <nav className="space-y-1">
            {chapters.map((c) => (
              <Link key={c.id} href={`/${c.id}`}>
                <span
                  className={cn(
                    "cursor-pointer rounded-lg border border-transparent px-3 py-2 flex items-center gap-2 whitespace-nowrap",
                    "text-foreground/70 hover:text-foreground hover:border-border",
                    c.id === activeId &&
                      "text-foreground border-[color-mix(in_oklch,var(--accent-cyan)_55%,transparent)] bg-[color-mix(in_oklch,var(--accent-cyan)_12%,transparent)]",
                  )}
                >
                  <span className="font-mono text-xs text-cyan min-w-[2rem]">{c.no}</span>
                  <span className="text-sm text-foreground/80">{c.label}</span>
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
