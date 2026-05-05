import { SectionShell } from "@/components/report/SectionShell";
import { StatCard } from "@/components/report/StatCard";
import { RefLink } from "@/components/report/RefLink";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const wageData = [
  { year: "2022", wage: 1800 },
  { year: "2023", wage: 1919 },
  { year: "2024", wage: 2045 },
  { year: "2025", wage: 2180 },
  { year: "2026", wage: 2324 },
  { year: "2027", wage: 2477 },
  { year: "2028", wage: 2640 },
];

export function MarketSection() {
  return (
    <SectionShell id="c08" no="08" label="MARKET" title="市场价值：在'人力稀缺'背景下，机器人不是替代，而是提升单位人效">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 rounded-xl border border-border p-4 bg-[color-mix(in_oklch,white_2%,transparent)]">
          <div className="text-sm font-semibold">需求侧：人力短缺 + 成本上升，是安保行业的长期命题</div>
          <p className="mt-3 text-sm text-foreground/75 leading-relaxed">
            CNA 报道指出，新加坡安保行业约有 4 万名本地安保人员，并将人力短缺称为"长期挑战"。
            同时行业工资在政策推动下持续上升，客观上倒逼"技术增效"。<RefLink n={7} />
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <StatCard value="≈40,000" label="安保从业规模（SG）" hint="CNA 引用行业数据" />
            <StatCard value="Perennial" label="人力短缺被描述为" hint="'长期挑战'" />
            <StatCard value="6.6%" label="工资 CAGR（2022-2028）" hint="CNA 披露" />
          </div>

          <div className="mt-5 h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={wageData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="wageGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-cyan)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--accent-cyan)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="year" tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11 }} axisLine={false} />
                <YAxis
                  tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11 }}
                  axisLine={false}
                  tickFormatter={(v: number) => `$${v}`}
                  domain={[1600, 2800]}
                />
                <Tooltip
                  contentStyle={{
                    background: "oklch(0.19 0 0)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 8,
                    fontSize: 12,
                    color: "rgba(255,255,255,0.85)",
                  }}
                  formatter={(value: number) => [`SGD $${value}`, "月薪基线"]}
                />
                <Area
                  type="monotone"
                  dataKey="wage"
                  stroke="var(--accent-cyan)"
                  strokeWidth={2}
                  fill="url(#wageGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="text-xs text-foreground/50 mt-1">新加坡安保行业渐进式工资模型（PWM）基线趋势 · 来源：CNA <RefLink n={7} /></div>

          <div className="mt-4 rounded-lg border border-[color-mix(in_oklch,var(--accent-cyan)_40%,transparent)] bg-[color-mix(in_oklch,var(--accent-cyan)_10%,transparent)] p-3 text-sm text-foreground/80">
            <div className="font-semibold">'效率提升约 25%'如何成立？（透明测算口径）</div>
            <p className="mt-1 leading-relaxed">
              公开资料未给出统一"25%"官方数字，因此这里采用 <span className="text-cyan">AIPM 运营测算</span>：
              若机器人承担重复巡逻、信息咨询、夜间低风险值守的一部分，使人类安保从机械巡检
              转向事件处置/沟通协调，则同一班次下可释放 20–30% 人时用于高价值任务。
              建议 PoC 用"人时分配变化"而非"裁员人数"做 KPI。
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border p-4 bg-[color-mix(in_oklch,white_2%,transparent)]">
          <div className="text-sm font-semibold">价值落点（从采购到运营）</div>
          <ul className="mt-3 space-y-2 text-sm text-foreground/75 list-disc pl-5">
            <li>从 CapEx 到 OpEx：RaaS 降低一次性门槛 <RefLink n={2} /></li>
            <li>从'设备'到'系统'：与 Mozart 集成后才可规模化 <RefLink n={1} /></li>
            <li>从'巡逻'到'体验'：礼宾是最快的价值展示通道 <RefLink n={2} /></li>
          </ul>
        </div>
      </div>
    </SectionShell>
  );
}
