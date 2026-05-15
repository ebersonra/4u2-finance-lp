import { IoHeart } from 'react-icons/io5'

export default function Footer() {
  return (
    <footer
      className="border-t border-border px-6 py-8 flex items-center justify-between
        flex-wrap gap-4 max-w-screen-xl mx-auto"
    >
      <a
        href="#"
        className="flex items-center gap-2.5 no-underline"
        aria-label="4U2 Finance — ir para o início da página"
      >
        <img
          src="/logo.png"
          alt="4U2 Finance"
          className="w-7 h-7 rounded-lg"
          width={28}
          height={28}
        />
        <span className="font-heading text-base font-bold text-content-primary">
          <span className="text-brand-green">4U</span>
          <span className="text-members-ana">2</span>
          {' '}Finance
        </span>
      </a>

      <p className="text-sm font-light text-content-secondary inline-flex items-center gap-1">
        © 2026 4U2 Finance · Organize &amp; Unite · Feito com
        <IoHeart size={14} style={{ color: '#F9A8D4' }} aria-hidden="true" />
        no Brasil
      </p>
    </footer>
  )
}
