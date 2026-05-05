import { SectionShell } from "@/components/report/SectionShell";
import { RefLink } from "@/components/report/RefLink";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
  Label,
} from "recharts";

const riskData = [
  { name: "续航不足", impact: 7, probability: 8 },
  { name: "湿滑跌倒", impact: 8, probability: 5 },
  { name: "隐私投诉", impact: 9, probability: 6 },
  { name: "误报扰民", impact: 6, probability: 7 },
  { name: "维修停机", impact: 5, probability: 4 },
  { name: "模型偏差", impact: 9, probability: 3 },
  { name: "温差损耗", impact: 4, probability: 5 },
];

const riskColors = [
  "var(--accent-cyan)",
  "#ef4444",
  "#f59e0b",
  "var(--accent-cyan)",
  "var(--accent-violet)",
  "#f59e0b",
  "var(--accent-violet)",
];

export function PainPointsSection() {
  return (
    <SectionShell id="c10" no="10" label="PAIN POINTS" title="痛点与风险：续航、极端环境与伦理——安保场景的三座大山">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border p-4 bg-[color-mix(in_oklch,white_2%,transparent)]">
          <div className="text-sm font-semibold">风险矩阵（影响 × 概率）</div>
          <div className="mt-3 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis
                  type="number"
                  dataKey="probability"
                  domain={[0, 10]}
                  tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11 }}
                  axisLine={false}
                >
                  <Label value="发生概率 →" position="bottom" offset={0} style={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} />
                </XAxis>
                <YAxis
                  type="number"
                  dataKey="impact"
                  domain={[0, 10]}
                  tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11 }}
                  axisLine={false}
                >
                  <Label value="影响程度 →" angle={-90} position="insideLeft" offset={10} style={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} />
                </YAxis>
                <ReferenceLine x={5} stroke="rgba(255,255,255,0.08)" />
                <ReferenceLine y={5} stroke="rgba(255,255,255,0.08)" />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.19 0 0)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 8,
                    fontSize: 12,
                    color: "rgba(255,255,255,0.85)",
                  }}
                  formatter={(_: unknown, name: string, item: any) => {
                    return [item.payload.name, name === "impact" ? "影响" : "概率"];
                  }}
                  labelFormatter={() => ""}
                />
                <Scatter data={riskData} fill="var(--accent-cyan)">
                  {riskData.map((_, i) => (
                    <Cell key={i} fill={riskColors[i]} fillOpacity={0.8} r={7} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex flex-wrap gap-2 text-[10px] text-foreground/60">
            {riskData.map((r, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full" style={{ background: riskColors[i] }} />
                {r.name}
              </span>
            ))}
          </div>
          <div className="text-xs text-foreground/50 mt-2">注：坐标为定性评估，用于可视化风险优先级。</div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-xl border border-border p-4 bg-[color-mix(in_oklch,white_2%,transparent)]">
            <div className="text-sm font-semibold">硬件痛点</div>
            <ul className="mt-3 space-y-2 text-sm text-foreground/75 list-disc pl-5">
              <li>续航/补能：长时值守需要快换电 + 充电工位 + 调度策略</li>
              <li>气候与地面：雨水/湿滑/温差；对传感器与足端材料都是考验</li>
              <li>维护成本：MTTR 决定可用性上限</li>
            </ul>
          </div>
          <div className="rounded-xl border border-border p-4 bg-[color-mix(in_oklch,white_2%,transparent)]">
            <div className="text-sm font-semibold">伦理与合规</div>
            <ul className="mt-3 space-y-2 text-sm text-foreground/75 list-disc pl-5">
              <li>隐私：移动视觉采集比固定 CCTV 更敏感，需要清晰告知与分级权限</li>
              <li>偏差：异常检测模型可能放大误判风险</li>
              <li>人机边界：不得进行强制执法，应以提醒/上报/引导为主</li>
            </ul>
            <div className="mt-4 text-xs text-foreground/60">与澳洲相关的合规与网络安全讨论，可参考 Certis 观点文章。<RefLink n={8} /></div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
