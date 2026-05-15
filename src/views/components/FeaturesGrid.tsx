import { features } from '../../models/landingData'

export default function FeaturesGrid() {
  return (
    <section className="relative px-6 py-24 max-w-screen-xl mx-auto">
      <div className="text-xs font-medium tracking-[0.14em] uppercase text-brand-green mb-4 reveal">
        Funcionalidades
      </div>

      <h2
        className="font-heading font-bold leading-tight tracking-tight max-w-xl reveal"
        style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
      >
        Feito para quem{' '}
        <em className="not-italic text-brand-green">vive junto</em>
      </h2>

      {/* Grid separated by 1px borders — matches mobile app's card border style */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px mt-16
          border border-border rounded-xl overflow-hidden reveal"
      >
        {features.map((feature) => (
          <div
            key={feature.id}
            className="bg-bg-secondary p-10 transition-colors duration-300 hover:bg-bg-tertiary relative"
          >
            {/* Badge "Em breve" para features não implementadas */}
            {feature.isFuture && (
              <span
                className="absolute top-4 right-4 inline-flex items-center gap-1 text-[0.6rem]
                  font-semibold tracking-widest uppercase px-2.5 py-1 rounded-pill
                  border border-[rgba(245,158,11,0.35)] text-[#F59E0B]"
                style={{ background: 'rgba(245,158,11,0.08)' }}
                aria-label="Funcionalidade prevista para versão futura"
              >
                <span className="w-1 h-1 rounded-full bg-[#F59E0B] inline-block" aria-hidden="true" />
                Em breve
              </span>
            )}

            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                feature.iconVariant === 'green'
                  ? 'bg-[rgba(110,231,183,0.1)] text-brand-green'
                  : 'bg-[rgba(249,168,212,0.1)] text-members-ana'
              }`}
            >
              <feature.Icon size={24} aria-hidden="true" />
            </div>

            <h3 className="font-heading text-xl font-semibold mb-2.5 tracking-tight flex items-center gap-2">
              {feature.title}
            </h3>

            <p className="text-sm font-light text-content-secondary leading-loose">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
