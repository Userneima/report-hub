export type Language = 'zh' | 'en'

export interface BiText {
  zh: string
  en: string
}

export interface ChapterMeta {
  id: string
  no: string
  label: BiText
  title: BiText
}

export interface SectionContent {
  id: string
  intro: BiText
  bullets: BiText[]
}

export interface TableData {
  headers: BiText[]
  rows: BiText[][]
}

export interface StatData {
  label: BiText
  value: string
  source?: BiText
  methodNote?: BiText
}

export interface ScenarioData {
  title: BiText
  description: BiText
}

export interface CompetitorData {
  name: string
  role: BiText
  note: BiText
  strengths: BiText[]
}
