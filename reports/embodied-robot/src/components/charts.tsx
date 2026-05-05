import {
  Bar,
  BarChart,
  Cell,
  CartesianGrid,
  LabelList,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useState } from 'react'
import type { Language } from '../types/report'

function industrialYoYData(language: Language) {
  return [
    {
      name: language === 'zh' ? '人形机器人' : 'Humanoid robots',
      value: 508,
    },
  ]
}

function industrialCagrData(language: Language) {
  return [
    {
      name: language === 'zh' ? '全球服务机器人' : 'Global service robots',
      value: 17.1,
    },
    {
      name: language === 'zh' ? '中国服务机器人' : 'China service robots',
      value: 26.5,
    },
  ]
}
const growthDataCommercial = [
  { year: '2024', global: 16, china: 18, note: 'IFR baseline: recovery with retail demand' },
  { year: '2025', global: 18, china: 20, note: 'Service deployment expands in APAC cities' },
  { year: '2026', global: 20, china: 22, note: 'Scale-up phase with channel consolidation' },
  { year: '2027', global: 21, china: 23, note: 'Maturing growth after early acceleration' },
]

const deploymentData = [
  { segment: 'AMR', value: 45 },
  { segment: 'Quadruped', value: 32 },
  { segment: 'Humanoid', value: 23 },
]

/** 商用服务场景部署结构占比，四项合计严格为 100%（示意锚点，可替换为机构口径）。 */
const deploymentCommercialRows = [
  { value: 33, zh: 'Retail/F&B（零售/餐饮）', en: 'Retail/F&B (retail / dining)' },
  { value: 28, zh: 'PublicSvc（公共服务）', en: 'PublicSvc (public services)' },
  { value: 22, zh: 'Hospitality（酒店/会展）', en: 'Hospitality (hotels / events)' },
  { value: 17, zh: 'Property（物业运维）', en: 'Property (ops / FM)' },
] as const

function commercialDeploymentBars(language: Language) {
  return deploymentCommercialRows.map((r) => ({
    segment: language === 'zh' ? r.zh : r.en,
    value: r.value,
  }))
}

/** 03 竞争格局：三条曲线分别对应 AgiBot、Unitree（均为硬件 OEM）与 Tesla/Figure（AI 软件），数值为示意锚点。 */
function landscapeMaturityData(language: Language) {
  return [
    {
      metric: language === 'zh' ? '技术栈与工程' : 'Tech & engineering',
      agibot: 74,
      unitree: 82,
      aiSw: 90,
    },
    {
      metric: language === 'zh' ? '交付与运维' : 'Delivery & ops',
      agibot: 81,
      unitree: 77,
      aiSw: 52,
    },
    {
      metric: language === 'zh' ? '量产与成本' : 'Mfg & cost',
      agibot: 91,
      unitree: 89,
      aiSw: 44,
    },
    {
      metric: language === 'zh' ? '数据与场景闭环' : 'Data flywheel',
      agibot: 61,
      unitree: 56,
      aiSw: 93,
    },
    {
      metric: language === 'zh' ? '商业回报（ROI）' : 'ROI (commercial)',
      agibot: 73,
      unitree: 69,
      aiSw: 57,
    },
  ]
}
const chartPalette = {
  cyan: '#22d3ee',
  deepBlue: '#1e3a8a',
  violet: '#8b5cf6',
}
const barColors = [chartPalette.cyan, chartPalette.deepBlue, chartPalette.violet, chartPalette.deepBlue]

export function MarketCharts({ language, view }: { language: Language; view: 'industrial' | 'commercial' }) {
  const bars = view === 'industrial' ? deploymentData : commercialDeploymentBars(language)
  const yoYIndustrial = industrialYoYData(language)
  const cagrIndustrial = industrialCagrData(language)
  const commercialGrowth = growthDataCommercial
  const pctLabel = (v: number | string) => `${v}%`
  /** Recharts LabelFormatter: (label: RenderableText) => RenderableText */
  const labelPct = (label: unknown) => (label == null || label === '' ? '' : `${label}%`)

  return (
    <div className="grid min-w-0 gap-4 lg:grid-cols-2">
      <div className="min-w-0 rounded-xl border border-[var(--border-subtle)] bg-black/20 p-3">
        <div className="mb-2 text-sm text-[var(--text-secondary)]">
          {view === 'industrial'
            ? language === 'zh'
              ? '增速指标（YoY 与 CAGR 分开展示）'
              : 'Growth metrics (YoY and CAGR shown separately)'
            : language === 'zh'
              ? '年度同比增速（区间锚点）'
              : 'Annual YoY growth (anchor range)'}
        </div>
        {view === 'industrial' ? (
          <div className="flex flex-col gap-4">
            <div className="h-40">
              <div className="mb-1 text-[11px] text-[var(--text-muted)]">
                {language === 'zh' ? '2025 单年同比增速（YoY）' : 'Single-year YoY (2025)'}
              </div>
              <ResponsiveContainer width="100%" height="88%">
                <BarChart data={yoYIndustrial} margin={{ top: 22, right: 12, left: 4, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="1 8" stroke="rgba(255,255,255,0.07)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.65)" tick={{ fontSize: 11 }} interval={0} />
                  <YAxis stroke="rgba(255,255,255,0.65)" tickFormatter={pctLabel} domain={[0, 560]} />
                  <Tooltip
                    formatter={(value) => pctLabel(value as number)}
                    contentStyle={{ background: '#0b0b0d', border: '1px solid rgba(255,255,255,0.18)' }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} fill={barColors[0]}>
                    <LabelList
                      dataKey="value"
                      position="top"
                      formatter={labelPct}
                      fill="rgba(255,255,255,0.78)"
                      fontSize={11}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="h-40">
              <div className="mb-1 text-[11px] text-[var(--text-muted)]">
                {language === 'zh' ? '2023–2028E 复合年增长率（CAGR）' : 'CAGR (2023–2028E)'}
              </div>
              <ResponsiveContainer width="100%" height="88%">
                <BarChart data={cagrIndustrial} margin={{ top: 22, right: 12, left: 4, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="1 8" stroke="rgba(255,255,255,0.07)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.65)" tick={{ fontSize: 10 }} interval={0} />
                  <YAxis stroke="rgba(255,255,255,0.65)" tickFormatter={pctLabel} domain={[0, 36]} />
                  <Tooltip
                    formatter={(value) => pctLabel(value as number)}
                    contentStyle={{ background: '#0b0b0d', border: '1px solid rgba(255,255,255,0.18)' }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {cagrIndustrial.map((_, idx) => (
                      <Cell key={`cagr-${idx}`} fill={barColors[(idx + 1) % barColors.length]} />
                    ))}
                    <LabelList
                      dataKey="value"
                      position="top"
                      formatter={labelPct}
                      fill="rgba(255,255,255,0.78)"
                      fontSize={11}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={commercialGrowth} margin={{ top: 8, right: 18, left: 12, bottom: 8 }}>
                <CartesianGrid strokeDasharray="1 8" stroke="rgba(255,255,255,0.07)" />
                <Line
                  type="monotone"
                  dataKey="global"
                  name={language === 'zh' ? '全球 · 年度同比增速' : 'Global · annual YoY'}
                  stroke={chartPalette.cyan}
                  strokeWidth={2.5}
                  dot={{ r: 2 }}
                  activeDot={{ r: 5, fill: chartPalette.violet }}
                />
                <Line
                  type="monotone"
                  dataKey="china"
                  name={language === 'zh' ? '中国 · 年度同比增速' : 'China · annual YoY'}
                  stroke={chartPalette.deepBlue}
                  strokeWidth={2.5}
                  dot={{ r: 2 }}
                  activeDot={{ r: 5, fill: chartPalette.violet }}
                />
                <XAxis dataKey="year" stroke="rgba(255,255,255,0.65)" />
                <YAxis stroke="rgba(255,255,255,0.65)" tickFormatter={pctLabel} />
                <Tooltip
                  formatter={(value) => pctLabel(value as number)}
                  labelFormatter={(label) => `${label}`}
                  contentStyle={{ background: '#0b0b0d', border: '1px solid rgba(255,255,255,0.18)' }}
                />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
        <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
          {view === 'commercial'
            ? language === 'zh'
              ? '注：本图为各年度同比增速（YoY，区间锚点），非多年复合曲线。顶部统计卡片中的「商用服务机器人全球 CAGR（2024–2028E）」为多年复合增长率，与图中年度同比口径不同，请勿混读。数据来源采用 IFR / Frost & Sullivan 等区间锚点，避免主观跳变。'
              : 'Note: This chart shows annual YoY growth (anchor ranges), not a multi-year compound curve. The top stat card “Global commercial service robot CAGR (2024–2028E)” is a multi-year compound rate—do not conflate it with the yearly YoY series. IFR / Frost & Sullivan-style anchor ranges; avoids subjective jumps.'
            : language === 'zh'
              ? '注：YoY 反映单年变化（人形基数低时波动大）；CAGR 反映多年复合趋势，二者不可直接对比柱高。机构锚点为主观预测曲线；2026 标准体系已发布，规模化降本窗口更接近 2028–2030。'
              : 'Note: YoY is one-year change (volatile when the base is small); CAGR is a multi-year compound trend—do not compare bar heights across the two panels. Anchors are source-based; standards land around 2026 and cost-down scale is closer to 2028–2030.'}
        </p>
      </div>
      <div className="flex min-w-0 flex-col rounded-xl border border-[var(--border-subtle)] bg-black/20 p-3">
        <div className="mb-2 shrink-0 text-sm text-[var(--text-secondary)]">
          {language === 'zh' ? '场景部署分布' : 'Scenario Deployment Distribution'}
        </div>
        <div className="h-[220px] w-full min-w-0 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={bars}
              margin={{
                top: 24,
                right: 18,
                left: 8,
                bottom: view === 'commercial' && language === 'zh' ? 36 : 10,
              }}
            >
              <CartesianGrid strokeDasharray="1 8" stroke="rgba(255,255,255,0.07)" />
              <XAxis
                dataKey="segment"
                stroke="rgba(255,255,255,0.65)"
                tick={{
                  fontSize: view === 'commercial' && language === 'zh' ? 9 : 12,
                }}
                interval={0}
                angle={view === 'commercial' && language === 'zh' ? -18 : 0}
                textAnchor={view === 'commercial' && language === 'zh' ? 'end' : 'middle'}
                height={view === 'commercial' && language === 'zh' ? 72 : undefined}
              />
              <YAxis stroke="rgba(255,255,255,0.65)" tickFormatter={pctLabel} domain={[0, 64]} />
              <Tooltip
                formatter={(value) => pctLabel(value as number)}
                contentStyle={{ background: '#0b0b0d', border: '1px solid rgba(255,255,255,0.18)' }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {bars.map((_, idx) => (
                  <Cell key={`bar-${idx}`} fill={barColors[idx % barColors.length]} />
                ))}
                <LabelList
                  dataKey="value"
                  position="top"
                  formatter={labelPct}
                  fill="rgba(255,255,255,0.78)"
                  fontSize={11}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 min-w-0 shrink-0 text-xs leading-relaxed break-words text-pretty text-[var(--text-muted)]">
          {view === 'commercial'
            ? language === 'zh'
              ? '口径：按部署结构占比（非营收），四项合计 100%；排序为零售/餐饮 > 公共服务 > 酒店/会展 > 物业运维。柱顶数值为占比。'
              : 'Method: deployment structure share (not revenue); four segments sum to 100%. Ordered Retail/F&B > Public service > Hospitality > Property. Labels show share.'
            : language === 'zh'
              ? '口径：按硬件部署结构占比（AMR > 四足 > 人形），不含具身平台软件层；柱顶数值为占比。'
              : 'Method: hardware deployment-share (AMR > Quadruped > Humanoid), excluding platform software. Labels show share.'}
        </p>
      </div>
    </div>
  )
}

export function MaturityRadar({ language }: { language: Language }) {
  const [activeSeries, setActiveSeries] = useState<'agibot' | 'unitree' | 'aiSw' | null>(null)
  const radarRows = landscapeMaturityData(language)
  const series = [
    {
      key: 'agibot' as const,
      label: language === 'zh' ? 'AgiBot（人形 OEM）' : 'AgiBot (humanoid OEM)',
      legend: language === 'zh' ? 'AgiBot' : 'AgiBot',
      color: '#22d3ee',
      dataKey: 'agibot' as const,
    },
    {
      key: 'unitree' as const,
      label: language === 'zh' ? 'Unitree（硬件 OEM）' : 'Unitree (hardware OEM)',
      legend: 'Unitree',
      color: '#3b82f6',
      dataKey: 'unitree' as const,
    },
    {
      key: 'aiSw' as const,
      label: language === 'zh' ? 'Tesla / Figure（AI SW）' : 'Tesla / Figure (AI SW)',
      legend: language === 'zh' ? 'Tesla / Figure' : 'Tesla / Figure',
      color: '#a855f7',
      dataKey: 'aiSw' as const,
    },
  ]

  const isDimmed = (key: 'agibot' | 'unitree' | 'aiSw') => activeSeries !== null && activeSeries !== key

  const dimNotes =
    language === 'zh'
      ? [
          '技术栈与工程：本体/控制器/软硬协同与可量产设计，不等同于仅论文指标。',
          '交付与运维：项目交付、售后与现场可用性。',
          '量产与成本：良率、供应链与单价竞争力（与「规模」叙事区分于制造端）。',
          '数据与场景闭环：真实场景数据回流与迭代速度。',
          '商业回报（ROI）：可验证的单位经济性与回款路径。',
        ]
      : [
          'Tech & engineering: integrated stack and manufacturable design—not papers-only.',
          'Delivery & ops: deployment, service, and field availability.',
          'Mfg & cost: yield, supply chain, and unit economics (distinct from generic “scale” storytelling).',
          'Data flywheel: real-scenario data loop velocity.',
          'ROI: demonstrable unit economics and revenue paths.',
        ]

  return (
    <div className="mt-2 rounded-xl border border-[var(--border-subtle)] bg-black/20 p-3">
      <div className="mb-2 mt-1 text-sm text-[var(--text-secondary)]">
        {language === 'zh' ? '能力成熟度雷达（厂商示意锚点）' : 'Capability radar (illustrative company anchors)'}
      </div>
      <p className="mb-3 text-[11px] leading-5 text-[var(--text-muted)]">
        {language === 'zh'
          ? '三色曲线分别对应下方三张竞品卡：AgiBot、Unitree 均为硬件 OEM；Tesla/Figure 为 AI 软件侧标杆。分值 0–100 为结构化示意，非第三方精算评分。'
          : 'Each color matches a competitor card below: AgiBot and Unitree are hardware OEMs; Tesla/Figure anchor the AI software camp. Scores are illustrative (0–100), not third-party ratings.'}
      </p>
      <div className="mb-2 flex flex-wrap gap-2">
        {series.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setActiveSeries((prev) => (prev === item.key ? null : item.key))}
            className={`rounded border px-2 py-1 text-xs transition ${
              activeSeries === item.key
                ? 'border-white/60 bg-white/10 text-white'
                : 'border-white/20 text-white/80 hover:border-white/40'
            }`}
          >
            <span className="mr-1 inline-block h-2 w-2 rounded-full align-middle" style={{ backgroundColor: item.color }} />
            {item.label}
          </button>
        ))}
      </div>
      <div className="h-[280px] w-full min-w-0 sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarRows} margin={{ top: 10, right: 28, left: 28, bottom: 8 }}>
            <PolarGrid radialLines={true} stroke="rgba(255,255,255,0.2)" strokeDasharray="2 5" />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tickCount={6}
              stroke="rgba(255,255,255,0.2)"
              tick={{ fill: 'rgba(255,255,255,0.58)', fontSize: 10 }}
            />
            <PolarAngleAxis
              dataKey="metric"
              stroke="rgba(255,255,255,0.9)"
              tick={{ fontSize: language === 'zh' ? 11 : 12, fontWeight: 600, fill: 'rgba(255,255,255,0.92)' }}
            />
            {series.map((item) => (
              <Radar
                key={item.key}
                name={item.legend}
                dataKey={item.dataKey}
                stroke={item.color}
                fill={item.color}
                fillOpacity={isDimmed(item.key) ? 0.05 : 0.12}
                strokeWidth={activeSeries === item.key ? 3.6 : 2.5}
                strokeOpacity={isDimmed(item.key) ? 0.35 : 1}
                dot={{ r: activeSeries === item.key ? 3.5 : 2.2, strokeWidth: 1, fill: item.color }}
              />
            ))}
            <Tooltip
              formatter={(value) => [`${value}`, language === 'zh' ? '得分（示意）' : 'Score (illustrative)']}
              contentStyle={{ background: '#0b0b0d', border: '1px solid rgba(255,255,255,0.18)' }}
            />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-1 text-center text-[10px] text-[var(--text-muted)]">
        {language === 'zh'
          ? '径向轴为 0–100 分制；同心圆为等距刻度（0、20、40、60、80、100），便于读取各顶点得分。'
          : 'Radial axis is 0–100; concentric rings are even ticks (0, 20, 40, 60, 80, 100) for reading each vertex.'}
      </p>
      <div className="mt-3 space-y-1.5 border-t border-white/10 pt-3 text-[10px] leading-relaxed text-[var(--text-muted)]">
        <div className="font-medium text-white/70">{language === 'zh' ? '维度定义' : 'Dimension definitions'}</div>
        <ul className="list-inside list-disc space-y-1">
          {dimNotes.map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
