import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <Button
        variant="outline"
        size="icon"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="回到顶部"
        className="bg-[color-mix(in_oklch,var(--bg-deep)_85%,transparent)] backdrop-blur"
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
    </div>
  );
}
