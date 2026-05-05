import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function MediaFigure({
  src,
  alt,
  caption,
  credit,
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <figure className={cn("rounded-xl border border-border overflow-hidden bg-[color-mix(in_oklch,white_2%,transparent)]", className)}>
      <button
        type="button"
        className="block w-full text-left"
        onClick={() => setOpen(true)}
      >
        <img src={src} alt={alt} className="w-full h-auto" loading="lazy" />
      </button>
      {(caption || credit) && (
        <figcaption className="p-3 text-xs text-foreground/70">
          {caption ? <div>{caption}</div> : null}
          {credit ? <div className="mt-1 text-foreground/55">来源：{credit}</div> : null}
        </figcaption>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl bg-background border border-border p-2">
          <img src={src} alt={alt} className="w-full h-auto" />
        </DialogContent>
      </Dialog>
    </figure>
  );
}
