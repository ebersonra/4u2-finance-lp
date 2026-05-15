export default function NavBar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4
        bg-[rgba(10,12,16,0.85)] backdrop-blur-xl border-b border-border"
      aria-label="Navegação principal"
    >
      <a
        href="#"
        className="flex items-center gap-3 no-underline"
        aria-label="4U2 Finance — ir para o início"
      >
        <img
          src="/logo.png"
          alt="4U2 Finance logo"
          className="w-9 h-9 rounded-xl"
          width={36}
          height={36}
        />
        <span className="font-heading text-xl font-bold tracking-tight text-content-primary">
          <span className="text-brand-green">4U</span>
          <span className="text-members-ana">2</span>
          {' '}Finance
        </span>
      </a>

      <a
        href="#early-access"
        className="text-xs font-medium tracking-widest uppercase text-bg-primary bg-brand-green
          px-5 py-2 rounded-pill transition-opacity hover:opacity-85 no-underline"
      >
        Acesso antecipado
      </a>
    </nav>
  )
}
