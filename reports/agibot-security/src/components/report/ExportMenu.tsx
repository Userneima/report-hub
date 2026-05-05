import { useState, useCallback } from "react";
import { Download, Image, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type ExportState = "idle" | "png" | "pdf";

async function loadHtml2Canvas() {
  const mod = await import("html2canvas-pro");
  return mod.default;
}

async function loadJsPDF() {
  const mod = await import("jspdf");
  return mod.default;
}

function getReportRoot() {
  return document.getElementById("report-root");
}

function addExportingClass() {
  document.documentElement.classList.add("exporting");
}

function removeExportingClass() {
  document.documentElement.classList.remove("exporting");
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function ExportMenu() {
  const [state, setState] = useState<ExportState>("idle");
  const [open, setOpen] = useState(false);

  const exportPNG = useCallback(async () => {
    const root = getReportRoot();
    if (!root) return;
    setState("png");
    addExportingClass();

    await new Promise((r) => setTimeout(r, 300));

    try {
      const html2canvas = await loadHtml2Canvas();
      const canvas = await html2canvas(root, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#1a1a1a",
        logging: false,
      });
      canvas.toBlob((blob) => {
        if (blob) downloadBlob(blob, "agibot-certis-report.png");
      }, "image/png");
    } finally {
      removeExportingClass();
      setState("idle");
      setOpen(false);
    }
  }, []);

  const exportPDF = useCallback(async () => {
    const root = getReportRoot();
    if (!root) return;
    setState("pdf");
    addExportingClass();

    await new Promise((r) => setTimeout(r, 300));

    try {
      const [html2canvas, jsPDF] = await Promise.all([loadHtml2Canvas(), loadJsPDF()]);

      const canvas = await html2canvas(root, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#1a1a1a",
        logging: false,
      });

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF("p", "mm", "a4");

      let heightLeft = imgHeight;
      let position = 0;
      const imgData = canvas.toDataURL("image/jpeg", 0.92);

      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("agibot-certis-report.pdf");
    } finally {
      removeExportingClass();
      setState("idle");
      setOpen(false);
    }
  }, []);

  const busy = state !== "idle";

  return (
    <div className="fixed bottom-4 right-16 z-40 export-control">
      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setOpen((o) => !o)}
          disabled={busy}
          aria-label="导出报告"
          className="bg-[color-mix(in_oklch,var(--bg-deep)_85%,transparent)] backdrop-blur"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        </Button>

        {open && !busy && (
          <div className="absolute bottom-full right-0 mb-2 rounded-lg border border-border bg-[color-mix(in_oklch,var(--bg-deep)_95%,transparent)] backdrop-blur p-1 shadow-xl min-w-[160px]">
            <button
              onClick={exportPNG}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-[color-mix(in_oklch,white_5%,transparent)] transition-colors"
            >
              <Image className="h-4 w-4 text-cyan" />
              导出长图 (PNG)
            </button>
            <button
              onClick={exportPDF}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-[color-mix(in_oklch,white_5%,transparent)] transition-colors"
            >
              <FileText className="h-4 w-4 text-cyan" />
              导出 PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
