import type {
  BiText,
  CompetitorData,
  Language,
  ScenarioData,
  StatData,
  TableData,
} from '../types/report'

interface LanguageProps {
  language: Language
}

export function GlowBadge({ text }: { text: string }) {
  return <span className="glow-badge">{text}</span>
}

export function BiParagraph({ text, language }: { text: BiText; language: Language }) {
  return <p className="muted">{text[language]}</p>
}

export function StatCard({ data, language }: { data: StatData; language: Language }) {
  return (
    <article className="stat-card">
      <strong>{data.value}</strong>
      <span>{data.label[language]}</span>
    </article>
  )
}

export function DataTable({ data, language }: { data: TableData; language: Language }) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {data.headers.map((header) => (
              <th key={header.en}>{header[language]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, index) => (
            <tr key={`${row[0]?.en ?? 'row'}-${index}`}>
              {row.map((cell) => (
                <td key={`${cell.en}-${index}`}>{cell[language]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function ScenarioCard({ data, language }: { data: ScenarioData; language: Language }) {
  return (
    <article className="scenario-card">
      <h4>{data.title[language]}</h4>
      <p>{data.description[language]}</p>
    </article>
  )
}

export function CompetitorCard({ data, language }: { data: CompetitorData; language: Language }) {
  return (
    <article className="competitor-card">
      <h4>{data.name}</h4>
      <p className="muted">{data.role[language]}</p>
      <p>{data.note[language]}</p>
      <ul>
        {data.strengths.map((strength, index) => (
          <li key={`${data.name}-${index}`}>{strength[language]}</li>
        ))}
      </ul>
    </article>
  )
}

export function LanguageToggle({ language, setLanguage }: LanguageProps & { setLanguage: (lang: Language) => void }) {
  return (
    <div className="language-toggle">
      <button
        className={language === 'zh' ? 'active' : ''}
        onClick={() => setLanguage('zh')}
        type="button"
      >
        中文
      </button>
      <button
        className={language === 'en' ? 'active' : ''}
        onClick={() => setLanguage('en')}
        type="button"
      >
        EN
      </button>
    </div>
  )
}
