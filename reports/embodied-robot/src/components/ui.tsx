import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { TrendingDown, TrendingUp } from 'lucide-react'
import type { BiText, CompetitorData, Language, ScenarioData, StatData, TableData } from '../types/report'
import { pickText } from '../utils/i18n'

export function SectionShell({
  id,
  children,
}: {
  id: string
  children: ReactNode
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className="scroll-mt-24 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md md:p-8 lg:p-9"
    >
      {children}
    </motion.section>
  )
}

export function SectionLabel({
  no,
  label,
  language,
}: {
  no: string
  label: BiText
  language: Language
}) {
  return (
    <div className="mb-5 flex items-center gap-3 text-sm uppercase tracking-[0.12em] text-[var(--text-muted)]">
      <span className="h-2 w-2 rounded-full bg-[var(--accent-cyan)] shadow-[0_0_16px_var(--accent-cyan)]" />
      <span>{no}</span>
      <span>{pickText(label, language)}</span>
    </div>
  )
}

export function StatCard({ stat, language }: { stat: StatData; language: Language }) {
  const isDownTrend = /^-/.test(stat.value)
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
      <div className="rounded-lg border border-white/10 bg-black/35 px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-semibold text-[var(--accent-cyan)]">{stat.value}</div>
          <span className="inline-flex items-center text-cyan-200/90">
            {isDownTrend ? <TrendingDown size={15} /> : <TrendingUp size={15} />}
          </span>
        </div>
      </div>
      <div className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{pickText(stat.label, language)}</div>
      {stat.source ? <div className="mt-2 text-[11px] text-[var(--text-muted)]">{pickText(stat.source, language)}</div> : null}
      {stat.methodNote ? <div className="mt-1 text-[11px] text-[var(--text-muted)]">{pickText(stat.methodNote, language)}</div> : null}
    </div>
  )
}

export function DataTable({ table, language }: { table: TableData; language: Language }) {
  const headers = table.headers.map((header) => pickText(header, language))
  const techColIndex = headers.findIndex((h) => /Tech Maturity|技术成熟度/i.test(h))
  const stageColIndex = headers.findIndex((h) => /Commercial Stage|商业化阶段/i.test(h))
  const pricingColIndex = headers.findIndex((h) => /Pricing|价格带/i.test(h))

  const techBadgeClass = (value: string) => {
    if (/TRL 8-9|高/.test(value)) return 'bg-emerald-300/20 text-emerald-100 border-emerald-300/40'
    if (/TRL 6-7|TRL 7-8|中高/.test(value)) return 'bg-cyan-300/20 text-cyan-100 border-cyan-300/40'
    if (/TRL 5-6|中/.test(value)) return 'bg-violet-300/20 text-violet-100 border-violet-300/40'
    return 'bg-white/10 text-white/80 border-white/20'
  }

  const stageBadgeClass = (value: string) => {
    if (/规模|Scaled|Mature/.test(value)) return 'bg-blue-300/28 text-blue-100 border-blue-300/40'
    if (/试运|Pilot|early/.test(value)) return 'bg-blue-300/20 text-blue-100 border-blue-300/35'
    return 'bg-blue-300/12 text-blue-100/90 border-blue-300/30'
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead className="bg-white/5">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className={`border-b border-white/12 px-4 py-3 font-medium text-[var(--text-secondary)] ${
                  /Pricing|价格带/.test(header) ? 'text-right' : 'text-left'
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, idx) => (
            <tr key={idx} className="border-b border-white/10 last:border-b-0">
              {row.map((cell, cellIdx) => (
                <td
                  key={`${idx}-${cellIdx}`}
                  className={`px-4 py-3 text-[var(--text-primary)] ${
                    cellIdx === pricingColIndex ? 'text-right' : 'text-left'
                  }`}
                >
                  {cellIdx === techColIndex ? (
                    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${techBadgeClass(pickText(cell, language))}`}>
                      {pickText(cell, language)}
                    </span>
                  ) : cellIdx === stageColIndex ? (
                    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${stageBadgeClass(pickText(cell, language))}`}>
                      {pickText(cell, language)}
                    </span>
                  ) : (
                    pickText(cell, language)
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function ScenarioCard({ item, language }: { item: ScenarioData; language: Language }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-sm">
      <h4 className="text-base font-semibold">{pickText(item.title, language)}</h4>
      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{pickText(item.description, language)}</p>
    </div>
  )
}

export function CompetitorCard({ item, language }: { item: CompetitorData; language: Language }) {
  const isViolet = /Tesla|Figure/i.test(item.name)
  const isBlue = /Unitree/i.test(item.name)
  const theme = isViolet
    ? {
        border: 'hover:border-violet-300/55',
        glow: 'hover:shadow-[inset_0_0_0_1px_rgba(167,139,250,0.45),0_10px_24px_rgba(109,40,217,0.2)]',
        badge: 'border-violet-300/40 bg-violet-400/15 text-violet-100',
        icon: 'text-violet-200',
      }
    : isBlue
      ? {
          border: 'hover:border-blue-300/55',
          glow: 'hover:shadow-[inset_0_0_0_1px_rgba(96,165,250,0.45),0_10px_24px_rgba(30,64,175,0.18)]',
          badge: 'border-blue-300/35 bg-blue-300/12 text-blue-100',
          icon: 'text-blue-200',
        }
      : {
          border: 'hover:border-cyan-300/55',
          glow: 'hover:shadow-[inset_0_0_0_1px_rgba(34,211,238,0.45),0_10px_24px_rgba(8,145,178,0.18)]',
          badge: 'border-cyan-300/35 bg-cyan-300/12 text-cyan-100',
          icon: 'text-cyan-200',
        }

  return (
    <div
      className={`rounded-xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 ${theme.border} ${theme.glow}`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h4 className="text-base font-semibold">{item.name}</h4>
        <span className={`rounded-full border px-2 py-1 text-xs font-semibold ${theme.badge}`}>{pickText(item.role, language)}</span>
      </div>
      <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{pickText(item.note, language)}</p>
      <ul className="mt-4 space-y-2 text-xs text-[var(--text-muted)]">
        {item.strengths.map((s) => (
          <li key={s.en} className="flex items-center gap-2">
            <CheckCircle2 size={14} className={theme.icon} />
            <span>{pickText(s, language)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
