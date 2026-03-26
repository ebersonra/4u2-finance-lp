import { steps } from '../../models/landingData'

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="px-6 py-24 max-w-4xl mx-auto text-center">
      <div className="text-xs font-medium tracking-[0.14em] uppercase text-brand-green mb-4 reveal">
        Como funciona
      </div>

      <h2
        className="font-heading font-bold leading-tight tracking-tight mx-auto text-center reveal"
        style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
      >
        Pronto em{' '}
        <em className="not-italic text-brand-green">3 minutos</em>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 text-left reveal">
        {steps.map((step) => (
          <div key={step.id} className="relative pl-4 border-l border-border">
            {/* Large faded step number — visual motif from mobile app's step indicators */}
            <div
              className="font-heading text-[3rem] font-bold leading-none mb-3"
              style={{ color: 'rgba(110,231,183,0.15)' }}
              aria-hidden="true"
            >
              {step.number}
            </div>

            <h3 className="font-heading text-xl font-semibold mb-2">{step.title}</h3>

            <p className="text-sm font-light text-content-secondary leading-loose">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
