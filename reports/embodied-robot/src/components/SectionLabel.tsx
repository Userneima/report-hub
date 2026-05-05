import type { BiText, Language } from '../types/report'

interface SectionLabelProps {
  no: string
  label: BiText
  language: Language
}

export function SectionLabel({ no, label, language }: SectionLabelProps) {
  return (
    <div className="section-label">
      <span className="accent-dot" />
      <span>{no}</span>
      <span>{label[language]}</span>
    </div>
  )
}
