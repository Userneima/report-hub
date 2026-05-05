import type { BiText, Language } from '../types/report'

export function pickText(text: BiText, language: Language): string {
  return language === 'zh' ? text.zh : text.en
}
