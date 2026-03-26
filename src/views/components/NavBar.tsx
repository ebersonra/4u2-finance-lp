export default function NavBar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5
        bg-[rgba(10,12,16,0.8)] backdrop-blur-xl border-b border-border"
      aria-label="Navegação principal"
    >
      <a
        href="#"
        className="font-heading text-2xl font-bold tracking-tight text-content-primary no-underline"
        aria-label="4U2 Finance — ir para o início"
      >
        <span className="text-brand-green">$</span>
        <span className="text-members-ana">2</span>
        {' '}Finance
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
