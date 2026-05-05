import { references } from "@/data/references";

export function ReferencesSection() {
  return (
    <section id="references" className="scroll-mt-28">
      <div className="rounded-2xl border border-border card-glass p-6 md:p-8">
        <div className="text-xs tracking-[0.22em] text-foreground/65">REFERENCES</div>
        <h2 className="mt-3 text-2xl md:text-3xl font-semibold">参考文献</h2>

        <ol className="mt-5 space-y-3 text-sm text-foreground/80 list-decimal pl-5">
          {references.map((r) => (
            <li key={r.n}>
              <div className="leading-relaxed">
                <span className="font-semibold">{r.org}</span>
                {r.date ? <span className="text-foreground/60">（{r.date}）</span> : null}
                <span>：{r.title}。</span>
                <div className="mt-1 text-xs text-foreground/60">{r.url}</div>
                {r.note ? <div className="mt-1 text-xs text-foreground/60">备注：{r.note}</div> : null}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 border-t border-border pt-4 text-xs text-foreground/60">
          浙江大学《智能设计》课程案例分享 · 作者：王愉超 · 生成日期：2026-03-18
        </div>
      </div>
    </section>
  );
}
