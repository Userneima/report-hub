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

const compareData = [
  { dim: "人机交互", humanoid: 90, quadruped: 30, wheeled: 50 },
  { dim: "越障能力", humanoid: 65, quadruped: 95, wheeled: 25 },
  { dim: "续航时长", humanoid: 40, quadruped: 55, wheeled: 90 },
  { dim: "成熟稳定", humanoid: 35, quadruped: 50, wheeled: 90 },
  { dim: "设施兼容", humanoid: 85, quadruped: 20, wheeled: 60 },
  { dim: "取证能力", humanoid: 80, quadruped: 50, wheeled: 45 },
];

export function CompetitiveSection() {
  return (
    <SectionShell id="c11" no="11" label="COMPETITIVE" title="竞品对比：人形 vs 四足 vs 轮式——安保场景不是'谁更像人'">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 rounded-xl border border-border p-4 bg-[color-mix(in_oklch,white_2%,transparent)]">
          <div className="text-sm font-semibold">三条路线的核心取舍</div>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <div className="rounded-lg border border-border p-3">
              <div className="font-semibold">人形（A2）</div>
              <div className="mt-2 text-sm text-foreground/75">
                强在：人机交互、对现有设施（门/电梯/柜台）兼容；弱在：成本与可靠性门槛更高。
              </div>
            </div>
            <div className="rounded-lg border border-border p-3">
              <div className="font-semibold">四足</div>
              <div className="mt-2 text-sm text-foreground/75">
                强在：越障与户外适应；弱在：交互社会可接受度与操作能力有限。
              </div>
            </div>
            <div className="rounded-lg border border-border p-3">
              <div className="font-semibold">轮式安保机器人</div>
              <div className="mt-2 text-sm text-foreground/75">
                强在：成熟稳定、续航长；弱在：台阶/复杂地面受限，且"取证/交互"能力较窄。
              </div>
            </div>
          </div>

          <div className="mt-4 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={compareData} cx="50%" cy="50%" outerRadius="68%">
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="dim" tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="人形（A2）"
                  dataKey="humanoid"
                  stroke="var(--accent-cyan)"
                  fill="var(--accent-cyan)"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Radar
                  name="四足"
                  dataKey="quadruped"
                  stroke="var(--accent-violet)"
                  fill="var(--accent-violet)"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
                <Radar
                  name="轮式"
                  dataKey="wheeled"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <Legend wrapperStyle={{ fontSize: 11, color: "rgba(255,255,255,0.65)" }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-xs text-foreground/50 mt-1">注：评分为定性判断，用于辅助形态路线选择讨论。</div>

          <div className="mt-4 rounded-lg border border-[color-mix(in_oklch,var(--accent-cyan)_40%,transparent)] bg-[color-mix(in_oklch,var(--accent-cyan)_10%,transparent)] p-3 text-sm text-foreground/80">
            <div className="font-semibold">AIPM 结论</div>
            <p className="mt-1 leading-relaxed">
              人形路线的商业化拐点来自"系统集成能力"，而不是"更拟人"。
              当机器人能被 Mozart 这类编排系统当作可调度资源，人形的交互优势才会变成可规模化的服务优势。
              <RefLink n={1} />
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border p-4 bg-[color-mix(in_oklch,white_2%,transparent)]">
          <div className="text-sm font-semibold">课堂可讲的对比维度</div>
          <ul className="mt-3 space-y-2 text-sm text-foreground/75 list-disc pl-5">
            <li>任务：交互 / 取证 / 处置</li>
            <li>场景：室内 / 室外 / 混合</li>
            <li>集成：门禁 / CCTV / 工单</li>
            <li>风险：误报成本 / 事故成本</li>
          </ul>
        </div>
      </div>
    </SectionShell>
  );
}
