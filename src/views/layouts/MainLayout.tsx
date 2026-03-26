import type { ReactNode } from 'react'
import { useScrollReveal } from '../../controllers/useScrollReveal'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  useScrollReveal()

  return <div className="relative min-h-screen">{children}</div>
}
