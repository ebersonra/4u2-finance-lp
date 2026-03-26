import { IoCheckmarkCircle } from 'react-icons/io5'
import { useLeadForm } from '../../controllers/useLeadForm'

export default function LeadCapture() {
  const { state, updateField, submit } = useLeadForm()

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') submit()
  }

  return (
    <section id="early-access" className="px-6 py-20 pb-28 max-w-2xl mx-auto text-center">
      <div className="text-xs font-medium tracking-[0.14em] uppercase text-brand-green mb-4 reveal">
        Acesso antecipado
      </div>

      <h2
        className="font-heading font-bold tracking-tight leading-tight mb-4 reveal"
        style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
      >
        Seja o primeiro a{' '}
        <em className="not-italic text-brand-green">experimentar</em>
      </h2>

      <p className="text-sm font-light text-content-secondary mb-10 reveal">
        O app está em desenvolvimento final. Deixe seu e-mail e entraremos em contato assim
        que o acesso beta estiver disponível.
      </p>

      {!state.isSubmitted ? (
        <>
          <div className="flex flex-col gap-3 max-w-sm mx-auto reveal">
            <input
              type="text"
              placeholder="Seu nome"
              autoComplete="name"
              value={state.data.name}
              onChange={(e) => updateField('name', e.target.value)}
              aria-label="Seu nome"
              className="bg-bg-secondary border border-border rounded-pill px-6 py-3.5
                font-body text-sm font-light text-content-primary placeholder:text-content-secondary
                outline-none transition-colors focus:border-border-focus w-full"
            />

            <input
              type="email"
              placeholder="Seu melhor e-mail"
              autoComplete="email"
              value={state.data.email}
              onChange={(e) => updateField('email', e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Seu melhor e-mail"
              aria-invalid={state.hasError}
              className={`bg-bg-secondary rounded-pill px-6 py-3.5 font-body text-sm font-light
                text-content-primary placeholder:text-content-secondary outline-none
                transition-colors focus:border-border-focus w-full border ${
                  state.hasError ? 'border-border-error' : 'border-border'
                }`}
            />

            <button
              type="button"
              onClick={submit}
              className="bg-brand-green text-bg-primary border-none rounded-pill px-8 py-3.5
                font-body text-sm font-medium cursor-pointer transition-all tracking-wide
                hover:bg-brand-green-hover hover:-translate-y-px"
            >
              Quero acesso antecipado
            </button>
          </div>

          <p className="mt-4 text-xs text-content-faint reveal">
            Sem spam. Sem cartão de crédito. Apenas novidades do 4U2 Finance.
          </p>
        </>
      ) : (
        <div
          className="flex items-center justify-center gap-2 font-heading text-xl
            text-brand-green mt-4 animate-fade-up"
          role="status"
          aria-live="polite"
        >
          <IoCheckmarkCircle size={24} aria-hidden="true" />
          Recebemos seu contato! Te avisamos em breve.
        </div>
      )}
    </section>
  )
}
