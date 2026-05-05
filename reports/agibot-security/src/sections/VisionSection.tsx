import { SectionShell } from "@/components/report/SectionShell";

const comparisonRows = [
  { dimension: "核心闭环", security: "发现→取证→上报→处置", education: "开口→纠错→回放→改进" },
  { dimension: "数据粒度", security: "事件工单 / 告警日志", education: "对话记录 / 错误标签" },
  { dimension: "KPI", security: "响应时延 / 误报率", education: "坚持率 / 错误迁移率" },
  { dimension: "编排系统", security: "Mozart（工单调度）", education: "学习计划引擎" },
  { dimension: "具身价值", security: "移动取证 + 现场交互", education: "在场陪伴 + 情境模拟" },
];

export function VisionSection() {
  return (
    <SectionShell id="c12" no="12" label="VISION" title="个人愿景：具身口语对练——把'可运营闭环'迁移到英语学习">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 rounded-xl border border-border p-4 bg-[color-mix(in_oklch,white_2%,transparent)]">
          <div className="text-sm font-semibold">为什么是英语口语对练（而不是再做一个 App）</div>
          <p className="mt-3 text-sm text-foreground/75 leading-relaxed">
            工设学生做具身产品时，很容易陷入"硬件炫技"。但真正能长期使用的场景往往是
            <span className="text-cyan">高频、低门槛、反馈即时</span>。
            口语对练具备这三个特征：每天 5–15 分钟即可形成习惯，且反馈可实时可视化。
          </p>
          <ul className="mt-3 space-y-2 text-sm text-foreground/75 list-disc pl-5">
            <li>陪练在场 → 降低开口门槛（比纯语音 App 更"有陪伴感"）</li>
            <li>可回放对话 → 形成个人语料与错误库</li>
            <li>任务化训练 → 像'工单'一样追踪目标与闭环</li>
          </ul>

          <div className="mt-5 rounded-lg border border-border overflow-hidden">
            <div className="text-xs tracking-[0.18em] text-foreground/65 px-3 py-2 bg-[color-mix(in_oklch,white_3%,transparent)]">
              安保闭环 → 教育闭环：迁移对照
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-3 py-2 text-xs text-foreground/65 font-medium">维度</th>
                    <th className="text-left px-3 py-2 text-xs text-cyan font-medium">安保场景</th>
                    <th className="text-left px-3 py-2 text-xs font-medium" style={{ color: "var(--accent-violet)" }}>教育场景</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.dimension} className="border-b border-border/50">
                      <td className="px-3 py-2 text-foreground/80 font-medium">{row.dimension}</td>
                      <td className="px-3 py-2 text-foreground/65">{row.security}</td>
                      <td className="px-3 py-2 text-foreground/65">{row.education}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-border p-3">
            <div className="font-semibold">把安保的'运营闭环'迁移到教育（概念）</div>
            <div className="mt-2 text-sm text-foreground/75 leading-relaxed">
              安保强调可审计/可回放/可编排。若把口语训练也做成"可回放的对话工单"：
              机器人记录高频错误 → 生成每日训练卡 → 线下再对练 → 周维度形成能力曲线。
              具身形态带来的不是"更像真人"，而是更像'陪练搭子'：它在场，你就更容易坚持。
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border p-4 bg-[color-mix(in_oklch,white_2%,transparent)]">
          <div className="text-sm font-semibold">未来方向（两张趋势卡）</div>
          <div className="mt-3 grid gap-3">
            <div className="rounded-lg border border-border p-3">
              <div className="font-semibold">方向 A：具身'对话动作化'</div>
              <div className="mt-1 text-sm text-foreground/75">把口语练习从聊天变成任务：角色扮演、情境协商、即时纠错。</div>
            </div>
            <div className="rounded-lg border border-border p-3">
              <div className="font-semibold">方向 B：学习数据的'可运营'</div>
              <div className="mt-1 text-sm text-foreground/75">把学习过程做成可追踪的运营指标：坚持率、错误类型迁移、情境覆盖度。</div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
