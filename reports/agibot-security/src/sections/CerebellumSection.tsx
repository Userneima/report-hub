import { SectionShell } from "@/components/report/SectionShell";
import { RefLink } from "@/components/report/RefLink";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
} from "recharts";

const terrainData = [
  { terrain: "平整地面", e2e: 95, traditional: 90 },
  { terrain: "草坪", e2e: 85, traditional: 50 },
  { terrain: "鹅卵石", e2e: 80, traditional: 40 },
  { terrain: "坡道", e2e: 82, traditional: 55 },
  { terrain: "湿滑地面", e2e: 70, traditional: 35 },
  { terrain: "盲道", e2e: 78, traditional: 45 },
];

export function CerebellumSection() {
  return (
    <SectionShell id="c06" no="06" label="THE MIND" title="小脑：端到端 E2E 如何提升'非平整路面动态平衡'鲁棒性">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 rounded-xl border border-border p-4 bg-[color-mix(in_oklch,white_2%,transparent)]">
          <div className="text-sm font-semibold">安保巡逻的地面复杂度，决定了控制策略要'抗长尾'</div>
          <p className="mt-3 text-sm text-foreground/75 leading-relaxed">
            坡道/盲道/石材拼花/湿滑地面/人群干扰，会让传统控制管线调参成本飙升。
            E2E 神经控制更像把经验固化，提高跨路况鲁棒性。
          </p>

          <div className="mt-4 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={terrainData} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="terrain" tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="E2E 神经控制"
                  dataKey="e2e"
                  stroke="var(--accent-cyan)"
                  fill="var(--accent-cyan)"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Radar
                  name="传统控制管线"
                  dataKey="traditional"
                  stroke="var(--accent-violet)"
                  fill="var(--accent-violet)"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
                <Legend
                  wrapperStyle={{ fontSize: 11, color: "rgba(255,255,255,0.65)" }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-xs text-foreground/50 mt-1">注：数据为基于公开描述的概念性对比，非实测值。</div>

          <div className="mt-4 rounded-lg border border-[color-mix(in_oklch,var(--accent-cyan)_40%,transparent)] bg-[color-mix(in_oklch,var(--accent-cyan)_10%,transparent)] p-3 text-sm text-foreground/80">
            <div className="font-semibold">公开证据锚点</div>
            <p className="mt-1 leading-relaxed">
              官方升级文章提到：行走提速 33% 且在草坪、鹅卵石等多路况稳定行走。
              这类描述通常意味着控制策略在鲁棒性上做了显著强化。<RefLink n={4} />
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border p-4 bg-[color-mix(in_oklch,white_2%,transparent)]">
          <div className="text-sm font-semibold">AIPM 风险提示</div>
          <ul className="mt-3 space-y-2 text-sm text-foreground/75 list-disc pl-5">
            <li>黑箱性：需要更强的可解释/可回滚机制</li>
            <li>安全边界：公共空间必须有"安全限幅"</li>
            <li>数据：要覆盖极端路况与人群干扰的长尾</li>
          </ul>
        </div>
      </div>
    </SectionShell>
  );
}
