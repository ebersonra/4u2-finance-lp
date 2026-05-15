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
      {/* Secondary pink glow — matches the dual-member palette */}
      <div
        className="absolute top-1/3 left-1/3 w-[400px] h-[400px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse, rgba(249,168,212,0.05) 0%, transparent 70%)',
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

      {/* Logo mark — actual app icon */}
      <div
        className="animate-fade-up relative inline-block select-none mb-4"
        style={{ animationDelay: '0.05s' }}
      >
        <img
          src="/logo.png"
          alt="4U2 Finance"
          className="w-32 h-32 rounded-[2.5rem] mx-auto"
          style={{
            boxShadow:
              '0 0 0 1px rgba(110,231,183,0.2), 0 32px 64px rgba(0,0,0,0.5), 0 0 80px rgba(110,231,183,0.12)',
          }}
          width={128}
          height={128}
        />
      </div>

      {/* Tagline — mirrors splash screen "ORGANIZE · UNITE" */}
      <p
        className="font-heading text-xs font-semibold tracking-[0.3em] uppercase
          text-brand-green mb-8 animate-fade-up"
        style={{ animationDelay: '0.08s' }}
      >
        ORGANIZE · UNITE
      </p>

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
        className="flex items-center gap-4 mt-8 flex-wrap justify-center
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
