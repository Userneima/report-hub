import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Globe2, Handshake, TrendingUp } from 'lucide-react'
import {
  BarChart3,
  BookOpenText,
  Compass,
  Dog,
  Grid2x2,
  Home as HomeIcon,
  LayoutPanelTop,
  Layers,
  Map,
  Route,
  Truck,
  User,
  Users,
} from 'lucide-react'
import { MaturityRadar, MarketCharts } from '../components/charts'
import {
  CompetitorCard,
  DataTable,
  ScenarioCard,
  SectionLabel,
  SectionShell,
  StatCard,
} from '../components/ui'
import { chapters } from '../data/chapters'
import {
  competitors,
  decisionMatrix,
  executiveInsights,
  marketDataByTab,
  marketFootnotesByTab,
  partnershipMatrix,
  references,
  scenarios,
  sectionContent,
} from '../data/content'
import { ReportSection } from '../sections/ReportSection'
import type { Language } from '../types/report'
import { pickText } from '../utils/i18n'

function useScrollSpy(ids: string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? '')

  useEffect(() => {
    /** Activation line from viewport top; aligns with scroll-mt / sticky nav (~6rem). */
    const offsetPx = () => Math.min(140, Math.max(96, Math.round(window.innerHeight * 0.18)))

    const computeActive = () => {
      const line = window.scrollY + offsetPx()
      let current = ids[0] ?? ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top + window.scrollY
        if (top <= line) current = id
      }
      setActiveId((prev) => (prev === current ? prev : current))
    }

    computeActive()
    window.addEventListener('scroll', computeActive, { passive: true })
    window.addEventListener('resize', computeActive)
    return () => {
      window.removeEventListener('scroll', computeActive)
      window.removeEventListener('resize', computeActive)
    }
  }, [ids])

  return activeId
}

export default function Home() {
  const [language, setLanguage] = useState<Language>('zh')
  const [activeTab, setActiveTab] = useState<'industrial' | 'commercial'>('industrial')
  const [progress, setProgress] = useState(0)
  const [showTop, setShowTop] = useState(false)
  const [tocOpen, setTocOpen] = useState(false)

  const chapterIds = useMemo(() => chapters.map((c) => c.id), [])
  const activeId = useScrollSpy(chapterIds)
  const navGroups = [
    { title: { zh: '研究与市场', en: 'Research & Market' }, ids: ['cover', 'framework', 'market', 'landscape', 'ecosystem'] },
    { title: { zh: '合作与战略', en: 'Partnership & Strategy' }, ids: ['partnership', 'models'] },
    { title: { zh: '商业与执行', en: 'Commercial & Execution' }, ids: ['commercial', 'poc', 'roadmap', 'decision-matrix', 'references'] },
  ]
  const sectionIcons: Record<string, LucideIcon> = {
    cover: HomeIcon,
    framework: LayoutPanelTop,
    market: BarChart3,
    landscape: Map,
    ecosystem: Globe2,
    partnership: Users,
    models: Handshake,
    commercial: TrendingUp,
    poc: Compass,
    roadmap: Route,
    'decision-matrix': Grid2x2,
    references: BookOpenText,
  }
  const summaryMeta = [
    {
      icon: TrendingUp,
      tag: language === 'zh' ? '结论 1' : 'Finding 1',
      tagClass: 'border-cyan-300/40 bg-cyan-400/15 text-cyan-100',
    },
    {
      icon: Map,
      tag: language === 'zh' ? '结论 2' : 'Finding 2',
      tagClass: 'border-violet-300/40 bg-violet-400/15 text-violet-100',
    },
    {
      icon: Users,
      tag: language === 'zh' ? '结论 3' : 'Finding 3',
      tagClass: 'border-emerald-300/40 bg-emerald-400/15 text-emerald-100',
    },
  ] as const
  const coverValuePoints =
    language === 'zh'
      ? [
          {
            icon: 'SR',
            title: '结构化调研框架（SR, Structured Research）',
            description: '定义：采用统一研究路径组织报告。示例：现状诊断-竞争映射-区域趋势-战略工具-执行蓝图五段闭环。',
          },
          {
            icon: 'QA',
            title: '定量与定性结合（QA, Quant + Qual Analysis）',
            description: '定义：以数据指标与案例证据交叉验证。示例：将出货/营收/TRL/BOM与政策标准同步比对。',
          },
          {
            icon: 'PS',
            title: '伙伴与策略可执行（PS, Partner Strategy）',
            description: '定义：将伙伴筛选与合作条款前置量化。示例：基于SPEM评分、模式矩阵与MOU清单形成谈判输入。',
          },
          {
            icon: 'BC',
            title: '商业闭环导向（BC, Business Closure）',
            description: '定义：从试点到签约形成闭环管理。示例：用POC门槛（ROI阈值/可复制性/周期）衔接90天执行路线。',
          },
        ]
      : [
          {
            icon: 'SR',
            title: 'Structured Research (SR)',
            description: 'Definition: use one unified research path. Example: diagnosis, landscape mapping, regional trend, strategy tool, and execution blueprint.',
          },
          {
            icon: 'QA',
            title: 'Quant + Qual Analysis (QA)',
            description: 'Definition: triangulate metrics with evidence. Example: shipment, revenue, TRL, and BOM cross-checked with policy and cases.',
          },
          {
            icon: 'PS',
            title: 'Partner Strategy (PS)',
            description: 'Definition: turn partner selection into an evaluable process. Example: SPEM scoring, model matrix, and MOU checklist.',
          },
          {
            icon: 'BC',
            title: 'Business Closure (BC)',
            description: 'Definition: manage pilot-to-contract conversion. Example: POC gates (ROI/replicability/timeline) linked with a 90-day roadmap.',
          },
        ]
  const glossaryItems =
    language === 'zh'
      ? [
          'TRL: Technology Readiness Level（技术成熟度等级）',
          'BOM: Bill of Materials（物料成本清单）',
          'MOU: Memorandum of Understanding（合作备忘录）',
          'SPEM: Strategic Partner Evaluation Model（战略伙伴评估模型）',
          'POC: Proof of Concept（概念验证）',
          'ROI: Return on Investment（投资回报率）',
        ]
      : [
          'TRL: Technology Readiness Level',
          'BOM: Bill of Materials',
          'MOU: Memorandum of Understanding',
          'SPEM: Strategic Partner Evaluation Model',
          'POC: Proof of Concept',
          'ROI: Return on Investment',
        ]

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const total = h.scrollHeight - h.clientHeight
      const p = total > 0 ? (h.scrollTop / total) * 100 : 0
      setProgress(p)
      setShowTop(h.scrollTop > h.clientHeight * 2)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-20 pt-3 md:px-8">
      <div className="fixed left-0 top-0 z-50 h-1 bg-[var(--accent-cyan)] transition-all" style={{ width: `${progress}%` }} />

      <header className="sticky top-3 z-40 mb-3 rounded-xl border border-[var(--border-subtle)] bg-black/50 p-3 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-[var(--text-secondary)]">
            {language === 'zh' ? '机器人与具身AI调研报告' : 'Robotics & Embodied AI Research Brief'}
          </div>
          <div className="flex items-center gap-2">
            <button
              className="rounded border border-[var(--border-subtle)] px-2 py-1 text-xs"
              onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
            >
              {language === 'zh' ? 'EN' : '中'}
            </button>
            <button className="rounded border border-[var(--border-subtle)] px-2 py-1 text-xs md:hidden" onClick={() => setTocOpen((v) => !v)}>
              TOC
            </button>
          </div>
        </div>
      </header>

      {tocOpen ? (
        <div className="fixed inset-x-3 bottom-3 z-50 rounded-xl border border-[var(--border-subtle)] bg-black/90 p-3 md:hidden">
          <div className="mb-2 text-xs text-[var(--text-muted)]">Table of Contents</div>
          <div className="grid grid-cols-2 gap-2">
            {chapters.map((chapter) => (
              <a
                key={chapter.id}
                href={`#${chapter.id}`}
                className="rounded border border-[var(--border-subtle)] px-2 py-1 text-xs"
                onClick={() => setTocOpen(false)}
              >
                {chapter.no} {pickText(chapter.label, language)}
              </a>
            ))}
            <a
              href="#decision-matrix"
              className="rounded border border-[var(--border-subtle)] px-2 py-1 text-xs"
              onClick={() => setTocOpen(false)}
            >
              {language === 'zh' ? '09A 投资/入局矩阵' : '09A Investment Matrix'}
            </a>
          </div>
        </div>
      ) : null}

      <div className="flex justify-start gap-4">
        <aside className="sticky top-24 hidden h-[calc(100vh-7rem)] w-[260px] flex-shrink-0 flex-col overflow-auto border-r border-white/10 bg-white/[0.02] pl-4 pr-3 py-3 lg:flex">
          <div className="mb-4 text-[10px] uppercase tracking-[0.18em] text-white/45">
            {language === 'zh' ? '章节导航' : 'Navigation'}
          </div>
          <div className="space-y-1">
            {navGroups.map((group) => (
              <div key={group.title.en} className="mb-3">
                <div className="mb-2 px-2 text-[9px] uppercase tracking-[0.2em] text-white/35">
                  {pickText(group.title, language)}
                </div>
                {group.ids.map((id) => {
                  const chapter = chapters.find((item) => item.id === id)
                  const label = chapter
                    ? `${chapter.no} ${pickText(chapter.label, language)}`
                    : language === 'zh'
                      ? '09A 投资/入局建议矩阵'
                      : '09A Investment Entry Matrix'
                  const Icon = sectionIcons[id]
                  return (
                    <a
                      key={id}
                      href={`#${id}`}
                      className={`relative mb-1 flex items-center gap-2 rounded-md px-2 py-2 text-xs transition ${
                        activeId === id
                          ? 'bg-gradient-to-r from-cyan-300/12 to-transparent pl-3 font-semibold text-cyan-200 before:absolute before:bottom-1 before:left-0 before:top-1 before:w-1 before:rounded-r before:bg-cyan-300'
                          : 'text-[var(--text-secondary)] hover:bg-white/5'
                      }`}
                    >
                      {Icon ? <Icon size={14} className={activeId === id ? 'text-cyan-200' : 'text-white/55'} /> : null}
                      {label}
                    </a>
                  )
                })}
              </div>
            ))}
          </div>
          <div className="mt-auto pt-4">
            <div className="mb-2 flex items-center justify-between text-[11px] text-[var(--text-muted)]">
              <span>{language === 'zh' ? '阅读进度' : 'Reading'}</span>
              <span className="font-medium text-cyan-200">{Math.round(progress)}%</span>
            </div>
            <div className="h-1 w-full rounded-full bg-cyan-300/15">
              <div
                className="h-1 rounded-full bg-cyan-300 transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 basis-0 space-y-6 lg:max-w-[1020px]">
        <SectionShell id="cover">
          <SectionLabel no="00" label={chapters[0].label} language={language} />
          <h1 className="text-4xl font-semibold md:text-5xl lg:text-[3.1rem]">{pickText(chapters[0].title, language)}</h1>
          <p className="mt-4 max-w-4xl leading-7 text-[rgba(255,255,255,0.72)] lg:text-[1.05rem]">
            {language === 'zh'
              ? '这是一份面向管理层决策场景的机器人与具身AI研究报告，目标是为管理层提供高效决策支撑，并输出可落地的战略与商业行动方案。'
              : 'This report is designed for executive decision-making with a concise path from market insight to executable strategy.'}
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {coverValuePoints.map((point) => (
              <div key={point.title} className="rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border border-cyan-300/40 bg-cyan-300/10 text-[10px] font-semibold tracking-wide text-cyan-100">
                    {point.icon}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">{point.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-[rgba(255,255,255,0.7)]">{point.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
            <div className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">
              {language === 'zh' ? 'Executive Summary' : 'Executive Summary'}
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {executiveInsights.map((item, idx) => {
                const Icon = summaryMeta[idx].icon
                return (
                <div
                  key={item.en}
                  className="rounded-lg border border-white/10 bg-white/[0.035] p-3 backdrop-blur-sm transition duration-200 hover:-translate-y-1 hover:border-cyan-300/55 hover:shadow-[0_0_0_1px_rgba(34,211,238,0.35),0_0_18px_rgba(34,211,238,0.15)]"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[var(--border-subtle)] bg-white/5 text-[var(--text-secondary)]">
                      <Icon size={15} />
                    </span>
                    <span
                      className={`inline-flex rounded-md border px-2 py-1 text-[13px] font-bold leading-none ${summaryMeta[idx].tagClass}`}
                    >
                      {summaryMeta[idx].tag}
                    </span>
                  </div>
                  <p className="text-sm leading-6 text-[var(--text-primary)]">{pickText(item, language)}</p>
                </div>
              )})}
            </div>
            <div className="mt-3 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-[11px] text-[var(--text-muted)]">
              <span className="mr-2 font-semibold text-white/80">{language === 'zh' ? '术语说明：' : 'Glossary:'}</span>
              {glossaryItems.join('  |  ')}
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <a
              href="#market"
              className={`rounded-xl border p-2.5 text-xs font-medium transition ${
                activeId === 'market'
                  ? 'border-cyan-300/45 bg-cyan-300/12 text-cyan-100'
                  : 'border-cyan-300/25 bg-cyan-400/5 text-cyan-100/80 hover:bg-cyan-300/10'
              }`}
            >
              {language === 'zh' ? '市场与行业研究' : 'Market Research'}
            </a>
            <a
              href="#partnership"
              className={`rounded-xl border p-2.5 text-xs font-medium transition ${
                activeId === 'partnership'
                  ? 'border-violet-300/45 bg-violet-300/12 text-violet-100'
                  : 'border-violet-300/25 bg-violet-400/5 text-violet-100/80 hover:bg-violet-300/10'
              }`}
            >
              {language === 'zh' ? '战略合作支持' : 'Partnership Strategy'}
            </a>
            <a
              href="#commercial"
              className={`rounded-xl border p-2.5 text-xs font-medium transition ${
                activeId === 'commercial'
                  ? 'border-emerald-300/45 bg-emerald-300/12 text-emerald-100'
                  : 'border-emerald-300/25 bg-emerald-400/5 text-emerald-100/80 hover:bg-emerald-300/10'
              }`}
            >
              {language === 'zh' ? '商业化推进支持' : 'Commercial Engagement'}
            </a>
          </div>
        </SectionShell>

        <SectionShell id={chapters[1].id}>
          <SectionLabel no={chapters[1].no} label={chapters[1].label} language={language} />
          <h2 className="text-2xl font-semibold md:text-3xl lg:text-[2.05rem]">{pickText(chapters[1].title, language)}</h2>
          <p className="mt-3 leading-7 text-[var(--text-secondary)] lg:text-[1.02rem]">{pickText(sectionContent[0].intro, language)}</p>

          <div className="mt-4 rounded-xl border border-cyan-300/35 border-l-4 border-l-cyan-200 bg-[rgba(0,255,255,0.05)] p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-cyan-200">
              <Compass size={14} />
              <span>{language === 'zh' ? '关键洞察' : 'Key Insight'}</span>
            </div>
            <p className="mt-2 text-sm leading-7 tracking-[0.03em] text-[var(--text-primary)] lg:text-[0.98rem]">
              {language === 'zh'
                ? '核心观察：具身智能生态正呈现“底层通用化、中层模块化、顶层场景化”的演进趋势。2025 年将进入供应链成本下探与多模态模型深度融合的量产启动与小规模交付元年。'
                : 'Core observation: the embodied AI ecosystem is evolving toward standardized foundations, modular middle layers, and scenario-specific top-layer delivery. 2025 enters a year of scaled production kickoff and small-batch delivery, supported by supply-chain cost-down and deeper multimodal integration.'}
            </p>
          </div>

          <div className="mt-4 grid items-stretch gap-4 lg:grid-cols-2">
            <div className="h-full rounded-xl border border-white/10 bg-[rgba(255,255,255,0.02)] p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-sm">
              <div className="text-sm font-semibold text-cyan-200">{language === 'zh' ? '四类形态定义' : 'Four Form Factors'}</div>
              <div className="mt-2.5 grid items-start gap-2.5 md:grid-cols-2">
                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/45 hover:shadow-[inset_0_0_0_1px_rgba(34,211,238,0.32)]">
                  <div className="flex items-start gap-3">
                    <User size={16} className="mt-0.5 shrink-0 text-cyan-200" />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white/95">{language === 'zh' ? '人形' : 'Humanoid'}</div>
                      <div className="mt-1 flex flex-nowrap gap-1.5 overflow-x-auto text-[11px]">
                        <span className="shrink-0 rounded-full bg-cyan-300/15 px-2 py-0.5 text-cyan-100">
                          {language === 'zh' ? '场景泛化' : 'Scenario fit'}
                        </span>
                        <span className="shrink-0 rounded-full bg-blue-300/15 px-2 py-0.5 text-blue-100">
                          {language === 'zh' ? '人环兼容' : 'Human-centric'}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-6 text-[var(--text-secondary)]">
                        {language === 'zh'
                          ? '通用作业与人类环境适配'
                          : 'General-purpose operations adapted to human-centric environments'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/45 hover:shadow-[inset_0_0_0_1px_rgba(34,211,238,0.32)]">
                  <div className="flex items-start gap-3">
                    <Dog size={16} className="mt-0.5 shrink-0 text-cyan-200" />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white/95">{language === 'zh' ? '四足' : 'Quadruped'}</div>
                      <div className="mt-1 flex flex-nowrap gap-1.5 text-[11px]">
                        <span className="shrink-0 rounded-full bg-cyan-300/15 px-2 py-0.5 text-cyan-100">
                          {language === 'zh' ? '复杂地形' : 'Rough Terrain'}
                        </span>
                        <span className="shrink-0 rounded-full bg-blue-300/15 px-2 py-0.5 text-blue-100">
                          {language === 'zh' ? '高机动性' : 'High Mobility'}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-6 text-[var(--text-secondary)]">
                        {language === 'zh'
                          ? '面向巡检、安防和救援任务'
                          : 'Designed for inspection, safety patrol, and rescue tasks'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/45 hover:shadow-[inset_0_0_0_1px_rgba(34,211,238,0.32)]">
                  <div className="flex items-start gap-3">
                    <Truck size={16} className="mt-0.5 shrink-0 text-cyan-200" />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white/95">AMR</div>
                      <div className="mt-1 flex flex-nowrap gap-1.5 text-[11px]">
                        <span className="shrink-0 rounded-full bg-cyan-300/15 px-2 py-0.5 text-cyan-100">
                          {language === 'zh' ? '物流效率' : 'Logistics Efficiency'}
                        </span>
                        <span className="shrink-0 rounded-full bg-blue-300/15 px-2 py-0.5 text-blue-100">
                          {language === 'zh' ? '路径优化' : 'Route Optimization'}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-6 text-[var(--text-secondary)]">
                        {language === 'zh'
                          ? '用于仓储搬运与多机协同调度'
                          : 'Used for warehouse movement and multi-robot orchestration'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/45 hover:shadow-[inset_0_0_0_1px_rgba(34,211,238,0.32)]">
                  <div className="flex items-start gap-3">
                    <Layers size={16} className="mt-0.5 shrink-0 text-cyan-200" strokeWidth={2} />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white/95">{language === 'zh' ? '平台层' : 'Platform Layer'}</div>
                      <div className="mt-1 flex flex-nowrap gap-1.5 text-[11px]">
                        <span className="shrink-0 rounded-full bg-cyan-300/15 px-2 py-0.5 text-cyan-100">VLA</span>
                        <span className="shrink-0 rounded-full bg-blue-300/15 px-2 py-0.5 text-blue-100">
                          {language === 'zh' ? '多形态调度' : 'Multi-form ops'}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                        {language === 'zh'
                          ? '推理与多形态调度编排；同形态落地为主，跨形态探索中'
                          : 'Reasoning and multi-form orchestration; same-form first, cross-form exploratory.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-2.5 border-t border-white/10 pt-2 text-[11px] leading-5 text-[var(--text-muted)]">
                {language === 'zh'
                  ? 'VLA：Vision-Language-Action，视觉-语言-动作模型'
                  : 'VLA: Vision-Language-Action model'}
              </p>
            </div>
            <div className="relative h-full rounded-xl border border-white/10 bg-[rgba(255,255,255,0.02)] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-sm">
              <div className="text-sm font-semibold text-cyan-200">{language === 'zh' ? '全球双循环图景' : 'Global Dual-cycle View'}</div>
              <div className="relative mt-3 flex flex-col gap-3">
                <div className="rounded-lg border border-cyan-300/30 bg-cyan-300/8 p-3 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/50 hover:shadow-[inset_0_0_0_1px_rgba(34,211,238,0.35)]">
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-xs uppercase tracking-[0.08em] text-cyan-200">
                      {language === 'zh' ? '供给侧：产能中心' : 'Supply Side: Capacity Hub'}
                    </div>
                    <div className="text-2xl font-bold leading-none text-cyan-200">84.7%</div>
                  </div>
                  <p className="mt-0.5 text-xs leading-6 text-[var(--text-secondary)]">
                    {language === 'zh'
                      ? '中国人形机器人出货占全球（2025，IDC 等口径）'
                      : 'China share of global humanoid shipments (2025, IDC-style basis)'}
                  </p>
                  <p className="mt-0.5 text-xs leading-6 text-[var(--text-secondary)]">
                    {language === 'zh'
                      ? '供应链优势驱动的规模化量产'
                      : 'Supply chain advantage drives scaled manufacturing'}
                  </p>
                  <p className="mt-0.5 text-[10px] leading-5 text-[var(--text-muted)]">
                    {language === 'zh'
                      ? '口径说明：为人形品类出货占比；机构间约 84.7%–87%，不含四足等非人形；是否含科研样机依各机构定义而异'
                      : 'Scope: humanoid shipment share; sources range ~84.7%–87%; excludes quadrupeds; R&D prototypes depend on each publisher’s definition.'}
                  </p>
                </div>

                <div className="rounded-md border border-violet-300/30 bg-violet-300/22 px-3 py-2 text-center text-xs font-semibold text-violet-100 transition duration-200 hover:border-violet-200/45 hover:shadow-[inset_0_0_0_1px_rgba(196,181,253,0.35)]">
                  {language === 'zh'
                    ? '新加坡：亚太场景验证与跨境落地节点'
                    : 'Singapore: APAC scenario validation & cross-border deployment node'}
                </div>

                <div className="rounded-lg border border-blue-300/30 bg-blue-300/8 p-3 transition duration-200 hover:-translate-y-0.5 hover:border-blue-300/50 hover:shadow-[inset_0_0_0_1px_rgba(96,165,250,0.35)]">
                  <div className="text-xs uppercase tracking-[0.08em] text-blue-200">
                    {language === 'zh'
                      ? '需求与底座：以美国/欧美为核心的创新中心'
                      : 'Demand & foundation: US / Euro-led innovation hub'}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-blue-100">
                    {language === 'zh' ? '基础模型与仿真平台领先' : 'Leading foundation models and simulation stacks'}
                  </div>
                  <p className="mt-1 text-xs leading-6 text-[var(--text-secondary)]">
                    {language === 'zh'
                      ? '算法与仿真迭代活跃；全球互操作等标准以 ISO/IEEE 等国际组织为主导'
                      : 'Strong algorithm and simulation iteration; interoperability standards led by bodies such as ISO/IEEE'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            <div className="w-full rounded-xl border border-cyan-300/35 bg-cyan-300/10 p-5 backdrop-blur-sm">
              <div className="text-base font-bold text-cyan-200">L1 {language === 'zh' ? '基础设施层' : 'Infrastructure Layer'}</div>
              <div className="mt-4 border-t border-white/10 pt-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/10">
                  <div className="md:pr-4">
                    <div className="mb-2 text-xs font-medium text-cyan-100/90">{language === 'zh' ? '核心角色' : 'Key roles'}</div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full bg-cyan-300/15 px-2.5 py-1 text-cyan-100">{language === 'zh' ? '研发负责人' : 'R&D Lead'}</span>
                      <span className="rounded-full bg-blue-300/15 px-2.5 py-1 text-blue-100">{language === 'zh' ? '供应链总监' : 'Supply Chain Director'}</span>
                    </div>
                  </div>
                  <div className="md:px-4">
                    <div className="mb-2 text-xs font-medium text-cyan-100/90">{language === 'zh' ? '核心诉求' : 'Core needs'}</div>
                    <p className="text-xs leading-6 text-[var(--text-secondary)]">
                      {language === 'zh' ? '可靠性、接口标准化' : 'Reliability, interface standardization'}
                    </p>
                  </div>
                  <div className="md:pl-4">
                    <p className="text-xs leading-5 text-[var(--text-secondary)]">
                      {language === 'zh' ? '技术：伺服关节、传感器、电池、通信协议' : 'Tech: servo joints, sensors, batteries, comm stacks'}
                    </p>
                    <p className="mt-0.5 text-xs leading-5 text-[var(--text-muted)]">
                      {language === 'zh' ? '价值：降本增效、标准化适配' : 'Value: cost efficiency, standardized integration'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full rounded-xl border border-violet-300/35 bg-violet-300/10 p-5 backdrop-blur-sm">
              <div className="text-base font-bold text-violet-200">L2 {language === 'zh' ? '整机与大脑层' : 'Robot & AI Brain Layer'}</div>
              <div className="mt-4 border-t border-white/10 pt-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/10">
                  <div className="md:pr-4">
                    <div className="mb-2 text-xs font-medium text-violet-100/90">{language === 'zh' ? '核心角色' : 'Key roles'}</div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full bg-violet-300/15 px-2.5 py-1 text-violet-100">CEO / CTO</span>
                      <span className="rounded-full bg-fuchsia-300/15 px-2.5 py-1 text-fuchsia-100">{language === 'zh' ? '产品经理' : 'Product Manager'}</span>
                    </div>
                  </div>
                  <div className="md:px-4">
                    <div className="mb-2 text-xs font-medium text-violet-100/90">{language === 'zh' ? '核心诉求' : 'Core needs'}</div>
                    <p className="text-xs leading-6 text-[var(--text-secondary)]">
                      {language === 'zh' ? '泛化能力、低人工干预' : 'Generalization, low human intervention'}
                    </p>
                  </div>
                  <div className="md:pl-4">
                    <p className="text-xs leading-5 text-[var(--text-secondary)]">
                      {language === 'zh' ? '技术：运动控制、具身大模型、感知与决策' : 'Tech: motion control, embodied models, perception & decision'}
                    </p>
                    <p className="mt-0.5 text-xs leading-5 text-[var(--text-muted)]">
                      {language === 'zh' ? '价值：场景适配、自主能力提升' : 'Value: scenario fit, autonomy gains'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full rounded-xl border border-emerald-300/35 bg-emerald-300/10 p-5 backdrop-blur-sm">
              <div className="text-base font-bold text-emerald-200">L3 {language === 'zh' ? '应用与集成层' : 'Application & Integration Layer'}</div>
              <div className="mt-4 border-t border-white/10 pt-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/10">
                  <div className="md:pr-4">
                    <div className="mb-2 text-xs font-medium text-emerald-100/90">{language === 'zh' ? '核心角色' : 'Key roles'}</div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full bg-emerald-300/15 px-2.5 py-1 text-emerald-100">{language === 'zh' ? '工厂厂长' : 'Plant Director'}</span>
                      <span className="rounded-full bg-teal-300/15 px-2.5 py-1 text-teal-100">{language === 'zh' ? '运营负责人' : 'Ops Leader'}</span>
                    </div>
                  </div>
                  <div className="md:px-4">
                    <div className="mb-2 text-xs font-medium text-emerald-100/90">{language === 'zh' ? '核心诉求' : 'Core needs'}</div>
                    <p className="text-xs leading-6 text-[var(--text-secondary)]">
                      {language === 'zh' ? 'ROI、部署阵痛、合规' : 'ROI, deployment pain, compliance'}
                    </p>
                  </div>
                  <div className="md:pl-4">
                    <p className="text-xs leading-5 text-[var(--text-secondary)]">
                      {language === 'zh' ? '技术：物流搬运、餐饮服务、工业巡检等场景落地' : 'Tech: logistics, food service, industrial inspection, and similar deployments'}
                    </p>
                    <p className="mt-0.5 text-xs leading-5 text-[var(--text-muted)]">
                      {language === 'zh' ? '价值：商业落地、规模化复制' : 'Value: commercial rollout, scaled replication'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionShell>

        <SectionShell id={chapters[2].id}>
          <SectionLabel no={chapters[2].no} label={chapters[2].label} language={language} />
          <h2 className="text-2xl font-semibold md:text-3xl lg:text-[2.05rem]">{pickText(chapters[2].title, language)}</h2>
          <p className="mt-4 leading-7 text-[var(--text-secondary)] lg:text-[1.02rem]">{pickText(sectionContent[1].intro, language)}</p>

          <div className="mt-5 rounded-xl border border-cyan-300/35 border-l-4 border-l-cyan-200 bg-[rgba(0,255,255,0.05)] p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-cyan-200">
              <BarChart3 size={14} />
              <span>{language === 'zh' ? '关键洞察' : 'Key Insight'}</span>
            </div>
            <p className="mt-2 text-sm leading-7 text-[var(--text-primary)] lg:text-[0.98rem]">{pickText(sectionContent[1].bullets[0], language)}</p>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            <div className="rounded-xl border border-cyan-300/30 bg-[rgba(255,255,255,0.03)] p-5 backdrop-blur-sm">
              <div className="text-sm font-semibold text-cyan-200">{language === 'zh' ? '1. TRL 分化' : '1. TRL Divergence'}</div>
              <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                {language === 'zh'
                  ? 'TRL仅衡量技术成熟度，不直接代表场景渗透率。商用服务场景常见于TRL 6-8区间，但商业化节奏由ROI、运维体系与渠道能力决定。'
                  : 'TRL only measures technical readiness and does not equal scenario penetration. Commercial service scenarios often run at TRL 6-8, while adoption pace is driven by ROI, operations, and channel readiness.'}
              </p>
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-xs text-[var(--text-muted)]">
                  <span>{language === 'zh' ? '商用服务主流成熟度' : 'Commercial service maturity range'}</span>
                  <span className="font-semibold text-cyan-200">TRL 6-8</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/10">
                  <div className="h-2 rounded-full bg-cyan-300" style={{ width: '73%' }} />
                </div>
                <div className="mt-1 flex justify-between text-[11px] text-[var(--text-muted)]">
                  <span>TRL 1</span>
                  <span>TRL 9</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-cyan-300/30 bg-[rgba(255,255,255,0.03)] p-5 backdrop-blur-sm">
              <div className="text-sm font-semibold text-cyan-200">{language === 'zh' ? '2. 场景渗透与商业阶段' : '2. Penetration & Commercial Stage'}</div>
              <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                {language === 'zh'
                  ? '渗透度由场景标准化、运维复杂度和付费意愿共同决定。当前零售/餐饮与公共服务渗透更高，酒店与物业仍在复制与ROI验证期。'
                  : 'Penetration is driven by scenario standardization, operational complexity, and willingness-to-pay. Retail/F&B and public service are further penetrated, while hospitality and property remain in replication and ROI validation stages.'}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg border border-emerald-300/35 bg-emerald-300/10 px-2.5 py-2 text-emerald-100">
                  {language === 'zh' ? '高：零售/餐饮' : 'High: Retail/F&B'}
                </div>
                <div className="rounded-lg border border-cyan-300/35 bg-cyan-300/10 px-2.5 py-2 text-cyan-100">
                  {language === 'zh' ? '中高：公共服务' : 'Med-high: Public Service'}
                </div>
                <div className="rounded-lg border border-violet-300/35 bg-violet-300/10 px-2.5 py-2 text-violet-100">
                  {language === 'zh' ? '中：酒店/会展' : 'Medium: Hospitality'}
                </div>
                <div className="rounded-lg border border-blue-300/35 bg-blue-300/10 px-2.5 py-2 text-blue-100">
                  {language === 'zh' ? '低中：物业运维' : 'Low-med: Property Ops'}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-cyan-300/30 bg-[rgba(255,255,255,0.03)] p-5 backdrop-blur-sm">
              <div className="text-sm font-semibold text-cyan-200">{language === 'zh' ? '3. 价格带' : '3. Pricing Tiers'}</div>
              <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                {language === 'zh'
                  ? '商用服务价格带需按品类绑定展示；人形价格单独参考，避免跨品类误读。'
                  : 'Commercial service pricing should be category-bound; humanoid pricing is shown separately to avoid cross-category confusion.'}
              </p>
              <div className="mt-3 space-y-1.5 text-[12px] leading-5 text-[var(--text-secondary)]">
                <div>
                  <span className="text-cyan-100">{language === 'zh' ? '零售/配送' : 'Retail/Delivery'}：</span>
                  <span className="font-semibold text-cyan-200">{language === 'zh' ? '主流 $5k-$18k' : 'Mainstream $5k-$18k'}</span>
                  <span className="text-[var(--text-muted)]">{language === 'zh' ? ' ｜极值 $3k-$25k' : ' | Extreme $3k-$25k'}</span>
                </div>
                <div>
                  <span className="text-cyan-100">{language === 'zh' ? '酒店/接待' : 'Hospitality/Reception'}：</span>
                  <span className="font-semibold text-cyan-200">{language === 'zh' ? '主流 $8k-$25k' : 'Mainstream $8k-$25k'}</span>
                  <span className="text-[var(--text-muted)]">{language === 'zh' ? ' ｜极值 $6k-$35k' : ' | Extreme $6k-$35k'}</span>
                </div>
                <div>
                  <span className="text-cyan-100">{language === 'zh' ? '公共巡检/物业' : 'Public Patrol/Property'}：</span>
                  <span className="font-semibold text-cyan-200">{language === 'zh' ? '主流 $10k-$40k' : 'Mainstream $10k-$40k'}</span>
                  <span className="text-[var(--text-muted)]">{language === 'zh' ? ' ｜极值可达 $75k' : ' | Extreme up to $75k'}</span>
                </div>
              </div>
              <div className="mt-2 rounded-md border border-white/12 bg-white/[0.02] px-2.5 py-1.5 text-[11px] leading-5 text-[var(--text-muted)]">
                {language === 'zh'
                  ? '人形参考：主流 $20k-$150k｜高端定制可达 $500k+'
                  : 'Humanoid reference: mainstream $20k-$150k | high-end custom can reach $500k+'}
              </div>
            </div>
          </div>

          <div className="mt-4 mb-4 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-[var(--text-muted)]">{language === 'zh' ? '场景视图' : 'View'}</span>
              <button
                className={`rounded border px-2 py-1 text-xs ${activeTab === 'industrial' ? 'border-cyan-300/60 bg-cyan-300/15 text-cyan-100' : 'border-[var(--border-subtle)]'}`}
                onClick={() => setActiveTab('industrial')}
                type="button"
              >
                {language === 'zh' ? '全品类 · 工业/物流视角' : 'All segments · Industrial/logistics'}
              </button>
              <button
                className={`rounded border px-2 py-1 text-xs ${activeTab === 'commercial' ? 'border-cyan-300/60 bg-cyan-300/15 text-cyan-100' : 'border-[var(--border-subtle)]'}`}
                onClick={() => setActiveTab('commercial')}
                type="button"
              >
                {language === 'zh' ? '全品类 · 商用服务视角' : 'All segments · Commercial service'}
              </button>
            </div>
            <p className="text-[11px] leading-5 text-[var(--text-muted)]">
              {language === 'zh'
                ? '数据覆盖 AMR、四足、人形等全品类，按工业/物流与商用服务两条线索分流展示，避免与单一赛道混读。'
                : 'Coverage spans AMRs, quadrupeds, humanoids, and related segments, split into industrial/logistics vs. commercial service storylines to avoid single-track misreadings.'}
            </p>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <div className="grid gap-3 md:grid-cols-3">
                {marketDataByTab[activeTab].stats.map((s) => (
                  <StatCard key={s.label.en} stat={s} language={language} />
                ))}
              </div>
              <div className="mt-4">
                <MarketCharts language={language} view={activeTab} />
              </div>
              <div className="mt-4">
                <DataTable table={marketDataByTab[activeTab].table} language={language} />
              </div>
              <details className="mt-4 rounded-xl border border-white/10 bg-white/[0.025] p-4">
                <summary className="cursor-pointer text-sm font-semibold text-cyan-200">
                  {language === 'zh' ? '数据来源与口径（板块02）' : 'Data Sources & Methods (Section 02)'}
                </summary>
                <ul className="mt-3 space-y-2 text-xs leading-6 text-[var(--text-secondary)]">
                  {marketFootnotesByTab[activeTab].map((note, idx) => (
                    <li key={idx}>• {pickText(note, language)}</li>
                  ))}
                </ul>
              </details>
            </motion.div>
          </AnimatePresence>
        </SectionShell>

        <SectionShell id={chapters[3].id}>
          <SectionLabel no={chapters[3].no} label={chapters[3].label} language={language} />
          <h2 className="text-2xl font-semibold md:text-3xl lg:text-[2.05rem]">{pickText(chapters[3].title, language)}</h2>
          <p className="mt-4 leading-7 text-[var(--text-secondary)] lg:text-[1.02rem]">{pickText(sectionContent[2].intro, language)}</p>

          <div className="mt-5 rounded-xl border border-cyan-200/65 border-l-4 border-l-cyan-100 bg-[rgba(0,255,255,0.05)] p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-cyan-200">
              <Map size={14} />
              <span>{language === 'zh' ? '关键洞察' : 'Key Insight'}</span>
            </div>
            <p className="mt-2 text-sm leading-7 text-[var(--text-primary)] lg:text-[0.98rem]">{pickText(sectionContent[2].bullets[0], language)}</p>
          </div>

          <div className="mt-5 space-y-3">
            <div className="rounded-xl border border-white/10 bg-gradient-to-r from-violet-400/10 via-violet-300/5 to-transparent p-4 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 h-12 w-1.5 flex-shrink-0 rounded-full bg-violet-300" />
                <div>
                  <h3 className="font-mono text-sm font-bold text-violet-100">
                    {language === 'zh' ? '1. AI 软件层（Software Brain Layer）' : '1. AI Software Layer (Software Brain Layer)'}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[rgba(255,255,255,0.72)]">
                    {pickText(sectionContent[2].bullets[1], language)}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-gradient-to-r from-blue-400/10 via-blue-300/5 to-transparent p-4 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 h-12 w-1.5 flex-shrink-0 rounded-full bg-blue-300" />
                <div>
                  <h3 className="font-mono text-sm font-bold text-blue-100">
                    {language === 'zh' ? '2. 系统集成层（System Integration Layer）' : '2. System Integration Layer'}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[rgba(255,255,255,0.72)]">
                    {pickText(sectionContent[2].bullets[2], language)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <MaturityRadar language={language} />
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {competitors.map((c) => (
              <CompetitorCard key={c.name} item={c} language={language} />
            ))}
          </div>
        </SectionShell>

        <ReportSection chapter={chapters[4]} content={sectionContent[3]} language={language} />
        <ReportSection chapter={chapters[5]} content={sectionContent[4]} language={language} />
        <ReportSection chapter={chapters[6]} content={sectionContent[5]} language={language}>
          <DataTable table={partnershipMatrix} language={language} />
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {partnershipMatrix.rows.map((row) => (
              <div key={row[0].en} className="rounded-xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-sm">
                <div className="text-sm font-semibold text-[var(--accent-cyan)]">{pickText(row[0], language)}</div>
                <div className="mt-2 text-xs text-[var(--text-secondary)]">
                  <strong>{language === 'zh' ? '价值：' : 'Value: '}</strong>
                  {pickText(row[1], language)}
                </div>
                <div className="mt-2 text-xs text-[var(--text-secondary)]">
                  <strong>{language === 'zh' ? '风险：' : 'Risk: '}</strong>
                  {pickText(row[2], language)}
                </div>
                <div className="mt-2 text-xs text-[var(--text-muted)]">
                  <strong>{language === 'zh' ? '适配场景：' : 'Best fit: '}</strong>
                  {pickText(row[3], language)}
                </div>
              </div>
            ))}
          </div>
        </ReportSection>
        <ReportSection chapter={chapters[7]} content={sectionContent[6]} language={language}>
          <div className="grid gap-3 md:grid-cols-3">
            {scenarios.map((s) => (
              <ScenarioCard key={s.title.en} item={s} language={language} />
            ))}
          </div>
        </ReportSection>
        <ReportSection chapter={chapters[8]} content={sectionContent[7]} language={language} />
        <ReportSection chapter={chapters[9]} content={sectionContent[8]} language={language} />

        <SectionShell id="decision-matrix">
          <SectionLabel
            no="09A"
            label={{ zh: '投资/入局建议矩阵', en: 'Investment Entry Matrix' }}
            language={language}
          />
          <h2 className="text-2xl font-semibold md:text-3xl">
            {language === 'zh' ? '商业价值 x 实现难度 2x2 决策矩阵' : '2x2 Matrix: Business Value x Implementation Difficulty'}
          </h2>
          <p className="mt-3 text-[var(--text-secondary)]">
            {language === 'zh'
              ? '将11个章节中的结论收敛为执行优先级，帮助管理层快速决策“先做什么、后做什么”。'
              : 'This matrix consolidates chapter findings into execution priorities for faster leadership decisions.'}
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {decisionMatrix.map((cell) => (
              <div key={cell.title.en} className="rounded-xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-sm">
                <h3 className="text-sm font-semibold text-[var(--accent-cyan)]">{pickText(cell.title, language)}</h3>
                <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
                  {cell.items.map((item) => (
                    <li key={item.en}>• {pickText(item, language)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl border border-violet-300/30 bg-violet-300/10 p-4">
            <div className="text-sm font-semibold text-violet-100">
              {language === 'zh' ? '收敛建议（管理层一页）' : 'Converged Recommendation (Executive One-pager)'}
            </div>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              {language === 'zh'
                ? '先以“高价值/低难度”场景建立可复制ROI，再以联合开发推进高壁垒方向；所有伙伴合作以SPEM评分和POC Gate指标作为进入与扩展条件。'
                : 'Start with high-value low-difficulty deployments for repeatable ROI, then move into high-defensibility joint development using SPEM and POC gates as expansion criteria.'}
            </p>
          </div>
        </SectionShell>

        <SectionShell id="references">
          <SectionLabel no="10" label={chapters[10].label} language={language} />
          <h2 className="text-2xl font-semibold md:text-3xl">{pickText(chapters[10].title, language)}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {references.map((ref) => (
              <li key={ref.url}>
                <a className="text-[var(--accent-cyan)] underline" href={ref.url} target="_blank" rel="noreferrer">
                  {ref.label}
                </a>
              </li>
            ))}
          </ul>
        </SectionShell>
        </main>
      </div>

      {showTop ? (
        <button
          className="fixed bottom-6 right-6 rounded-full border border-[var(--border-subtle)] bg-black/70 px-3 py-2 text-sm"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Top
        </button>
      ) : null}
    </div>
  )
}
