import { useMemo } from 'react'
import { chapters } from '../data/chapters'
import type { Language } from '../types/report'

interface NavigationProps {
  activeId: string
  language: Language
}

export function ScrollSpyNav({ activeId, language }: NavigationProps) {
  const items = useMemo(() => chapters, [])

  return (
    <aside className="scroll-spy">
      {items.map((chapter) => (
        <a
          key={chapter.id}
          className={activeId === chapter.id ? 'active' : ''}
          href={`#${chapter.id}`}
        >
          <span>{chapter.no}</span>
          <span>{chapter.label[language]}</span>
        </a>
      ))}
    </aside>
  )
}

export function BackToTopButton({ visible }: { visible: boolean }) {
  return (
    <button
      aria-label="Back to top"
      className={`back-to-top ${visible ? 'show' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      type="button"
    >
      ↑
    </button>
  )
}

interface MobileTocDrawerProps extends NavigationProps {
  open: boolean
  onClose: () => void
}

export function MobileTocDrawer({ activeId, language, onClose, open }: MobileTocDrawerProps) {
  const items = useMemo(() => chapters, [])

  return (
    <div className={`toc-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
      <button aria-label="Close chapter navigation" className="toc-backdrop" onClick={onClose} type="button" />
      <aside className="toc-panel" aria-label="Chapter navigation">
        <div className="toc-header">
          <p>{language === 'zh' ? '章节导航' : 'Chapter Navigation'}</p>
          <button onClick={onClose} type="button">
            {language === 'zh' ? '关闭' : 'Close'}
          </button>
        </div>
        <nav className="toc-links">
          {items.map((chapter) => (
            <a
              key={chapter.id}
              className={activeId === chapter.id ? 'active' : ''}
              href={`#${chapter.id}`}
              onClick={onClose}
            >
              <span>{chapter.no}</span>
              <span>{chapter.label[language]}</span>
            </a>
          ))}
        </nav>
      </aside>
    </div>
  )
}
