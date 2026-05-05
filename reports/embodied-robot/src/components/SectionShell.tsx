import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionShellProps {
  id: string
  children: ReactNode
}

export function SectionShell({ id, children }: SectionShellProps) {
  return (
    <motion.section
      id={id}
      className="section-shell"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  )
}
