import { IoArrowForward } from 'react-icons/io5'

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center
        px-6 pt-28 pb-16 overflow-hidden"
    >
      {/* Radial green glow — mirrors the mobile app's green brand ambient */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse, rgba(110,231,183,0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Status badge */}
      <span
        className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase
          text-brand-green border border-[rgba(110,231,183,0.25)] rounded-pill px-4 py-1.5
          mb-8 animate-fade-up"
      >
        <span
          className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse-dot"
          aria-hidden="true"
        />
        Em breve · iOS &amp; Android
      </span>

      {/* Logo mark */}
      <div
        className="font-heading font-bold leading-none my-10 animate-fade-up relative inline-block select-none"
        style={{ fontSize: 'clamp(5rem, 15vw, 10rem)' }}
        aria-label="4U2 Finance"
      >
        <span className="text-brand-green">$</span>
        <span className="text-members-ana">2</span>
      </div>

      {/* Headline */}
      <h1
        className="font-heading font-bold leading-[1.05] tracking-tight max-w-4xl
          animate-[fadeUp_0.6s_0.1s_ease_both]"
        style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
      >
        Finanças em família,
        <br />
        <em className="not-italic text-brand-green">do jeito</em>{' '}
        de{' '}
        <span className="text-members-ana">vocês dois</span>
      </h1>

      {/* Subheadline */}
      <p
        className="mt-6 font-light text-content-secondary max-w-lg leading-relaxed
          animate-[fadeUp_0.6s_0.2s_ease_both]"
        style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)' }}
      >
        Um app para casais e famílias organizarem o dinheiro juntos —
        sem planilha, sem briga, com metas que fazem sentido para vocês.
      </p>

      {/* CTA buttons */}
      <div
        className="flex items-center gap-4 mt-6 flex-wrap justify-center
          animate-[fadeUp_0.6s_0.3s_ease_both]"
      >
        <a
          href="#early-access"
          className="inline-flex items-center gap-2 bg-brand-green text-bg-primary font-medium
            tracking-wide px-8 py-3.5 rounded-pill transition-all text-sm
            hover:bg-brand-green-hover hover:-translate-y-px no-underline"
        >
          Quero acesso antecipado
          <IoArrowForward size={16} aria-hidden="true" />
        </a>

        <a
          href="#como-funciona"
          className="inline-flex items-center bg-transparent text-content-primary font-normal
            text-sm px-7 py-3.5 rounded-pill border border-border transition-all
            hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.04)] no-underline"
        >
          Como funciona
        </a>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
          text-[0.7rem] tracking-[0.12em] uppercase text-content-muted
          animate-[fadeUp_1s_0.8s_ease_both]"
        aria-hidden="true"
      >
        scroll
        <span
          className="block w-px h-10 animate-scroll-line"
          style={{
            background: 'linear-gradient(to bottom, #1D9E75, transparent)',
          }}
        />
      </div>
    </section>
  )
}
