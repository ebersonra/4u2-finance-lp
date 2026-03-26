import PhoneMockup from './PhoneMockup'
import { mockTransactions, mockCategories } from '../../models/landingData'

export default function AppPreview() {
  return (
    <section className="px-6 py-24 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <div className="reveal">
        <div className="text-xs font-medium tracking-[0.14em] uppercase text-brand-green mb-4">
          O app
        </div>

        <h2
          className="font-heading font-bold leading-tight tracking-tight mb-5"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
        >
          Tudo que vocês precisam,{' '}
          <em className="not-italic text-members-ana">numa tela só</em>
        </h2>

        <p className="text-sm font-light text-content-secondary leading-loose mb-8">
          Veja o saldo consolidado do casal, os gastos por categoria, as metas que vocês
          estão construindo juntos — e os boletos que vencem essa semana, tudo puxado
          automaticamente pelo Open Finance.
        </p>

        <a
          href="#early-access"
          className="inline-flex items-center gap-2 bg-brand-green text-bg-primary font-medium
            tracking-wide text-sm px-8 py-3.5 rounded-pill transition-all
            hover:bg-brand-green-hover hover:-translate-y-px no-underline"
        >
          Garantir meu acesso
        </a>
      </div>

      {/* Phone mockup renders first on mobile (order-first) */}
      <div className="reveal md:order-last order-first flex justify-center">
        <PhoneMockup transactions={mockTransactions} categories={mockCategories} />
      </div>
    </section>
  )
}
