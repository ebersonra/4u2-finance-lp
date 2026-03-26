import { IoHeart } from 'react-icons/io5'

export default function Footer() {
  return (
    <footer
      className="border-t border-border px-6 py-8 flex items-center justify-between
        flex-wrap gap-4 max-w-screen-xl mx-auto"
    >
      <a
        href="#"
        className="font-heading text-lg font-bold text-content-primary no-underline"
        aria-label="4U2 Finance — ir para o início da página"
      >
        <span className="text-brand-green">$</span>
        <span className="text-members-ana">2</span>
        {' '}Finance
      </a>

      <p className="text-sm font-light text-content-secondary inline-flex items-center gap-1">
        © 2026 4U2 Finance · 4U &amp; 4ALL · Feito com
        <IoHeart size={14} style={{ color: '#F9A8D4' }} aria-hidden="true" />
        no Brasil
      </p>
    </footer>
  )
}
