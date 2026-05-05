import type { ReactNode } from 'react'
import { Factory, Globe2, Lightbulb, TrendingUp } from 'lucide-react'
import type { ChapterMeta, Language, SectionContent } from '../types/report'
import { SectionLabel, SectionShell } from '../components/ui'
import { pickText } from '../utils/i18n'
import worldMapOutlineUrl from '../assets/world-map-outline.svg?url'

export function ReportSection({
  chapter,
  content,
  language,
  children,
}: {
  chapter: ChapterMeta
  content: SectionContent
  language: Language
  children?: ReactNode
}) {
  const isEcosystem = chapter.id === 'ecosystem'

  return (
    <SectionShell id={chapter.id}>
      <SectionLabel no={chapter.no} label={chapter.label} language={language} />
      <h2 className="text-2xl font-semibold md:text-3xl lg:text-[2.05rem]">{pickText(chapter.title, language)}</h2>
      <p className="mt-4 text-[var(--text-secondary)] leading-7 lg:text-[1.02rem]">{pickText(content.intro, language)}</p>
      {isEcosystem ? (
        <div className="relative mt-5 overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url(${worldMapOutlineUrl})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: '1100px auto',
            }}
          />

          <div className="relative z-10 rounded-xl border border-cyan-300/35 border-l-4 border-l-cyan-200 bg-[rgba(0,255,255,0.05)] p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-cyan-200">
              <Lightbulb size={14} />
              <span>{language === 'zh' ? '关键洞察' : 'Key Insight'}</span>
            </div>
            <p className="mt-2 text-sm leading-7 text-[var(--text-primary)] lg:text-[0.98rem]">
              {language === 'zh'
                ? '核心观察：具身智能正进入“区域错位竞争”阶段。中国聚焦规模化降本（Supply），新加坡发力标准互联（Protocol），北美主导算法范式（Model）。'
                : 'Core observation: embodied intelligence is entering a “regional offset competition” phase. China focuses on scalable cost-down (Supply), Singapore pushes interoperable standards (Protocol), and North America leads algorithm paradigms (Model).'}
            </p>
          </div>

          <div className="relative z-10 mt-5 grid gap-4 md:grid-cols-3">
            {/* China */}
            <div className="rounded-xl border border-cyan-300/35 bg-cyan-300/10 p-4 backdrop-blur-sm transition hover:border-cyan-300/55">
              <div className="flex items-center gap-2">
                <Factory size={16} className="text-cyan-200" />
                <div className="text-sm font-semibold text-cyan-100">
                  {language === 'zh' ? '制造与政策' : 'Manufacturing & Policy'}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-cyan-300/35 bg-cyan-300/12 px-2 py-1 text-[11px] font-medium text-cyan-100">
                  MIIT 标准体系
                </span>
                <span className="rounded-full border border-cyan-300/35 bg-cyan-300/12 px-2 py-1 text-[11px] font-medium text-cyan-100">
                  {language === 'zh' ? '规模化部署' : 'Scalable deployment'}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{pickText(content.bullets[0], language)}</p>
            </div>

            {/* Singapore */}
            <div className="rounded-xl border border-blue-300/35 bg-blue-300/10 p-4 backdrop-blur-sm transition hover:border-blue-300/55">
              <div className="flex items-center gap-2">
                <Globe2 size={16} className="text-blue-200" />
                <div className="text-sm font-semibold text-blue-100">
                  {language === 'zh' ? '标准与试验田' : 'Standards & Testbed'}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-blue-300/35 bg-blue-300/12 px-2 py-1 text-[11px] font-medium text-blue-100">
                  Open-RMF
                </span>
                <span className="rounded-full border border-blue-300/35 bg-blue-300/12 px-2 py-1 text-[11px] font-medium text-blue-100">
                  {language === 'zh' ? '沙盒机制' : 'Sandbox mechanism'}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{pickText(content.bullets[1], language)}</p>
            </div>

            {/* Global trends */}
            <div className="rounded-xl border border-emerald-300/35 bg-emerald-300/10 p-4 backdrop-blur-sm transition hover:border-emerald-300/55">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-emerald-200" />
                <div className="text-sm font-semibold text-emerald-100">
                  {language === 'zh' ? '商业化回归（ROI）' : 'Commercial return (ROI)'}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-emerald-300/35 bg-emerald-300/12 px-2 py-1 text-[11px] font-medium text-emerald-100">
                  ROI
                </span>
                <span className="rounded-full border border-emerald-300/35 bg-emerald-300/12 px-2 py-1 text-[11px] font-medium text-emerald-100">
                  {language === 'zh' ? '人机比' : 'Human-robot ratio'}
                </span>
                <span className="rounded-full border border-emerald-300/35 bg-emerald-300/12 px-2 py-1 text-[11px] font-medium text-emerald-100">
                  {language === 'zh' ? '单位经济性' : 'Unit economics'}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{pickText(content.bullets[2], language)}</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {content.bullets.length > 0 ? (
            <div className="mt-5 rounded-xl border border-cyan-300/35 border-l-4 border-l-cyan-200 bg-[rgba(0,255,255,0.05)] p-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-cyan-200">
                <Lightbulb size={14} />
                <span>{language === 'zh' ? '关键洞察' : 'Key Insight'}</span>
              </div>
              <p className="mt-2 text-sm leading-7 text-[var(--text-primary)] lg:text-[0.98rem]">{pickText(content.bullets[0], language)}</p>
            </div>
          ) : null}
          <ol className="mt-4 space-y-3 text-sm text-[var(--text-muted)]">
            {content.bullets.slice(1).map((bullet, idx) => (
              <li key={bullet.en} className="rounded-lg border border-white/10 bg-white/[0.03] p-3 leading-7 backdrop-blur-sm">
                <span className="mr-2 text-[var(--accent-cyan)]">{idx + 1}.</span>
                {pickText(bullet, language)}
              </li>
            ))}
          </ol>
        </>
      )}
      {children ? <div className="mt-6">{children}</div> : null}
    </SectionShell>
  )
}
