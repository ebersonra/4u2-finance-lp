// ─── LeadCapture — 3-step account creation ────────────────────────────────────
// Mirrors OnboardingScreen.tsx (form step) + OTPVerifyScreen.tsx (otp step)
// from the mobile app.
//
// Step 1 — form:    Name + Phone + Email + Terms + Privacy → criar conta
// Step 2 — otp:     6-digit code (same cell UI as mobile) → verificar
// Step 3 — success: conta criada ✅

import { useRef } from 'react'
import { IoCheckmarkCircle, IoMailOpenOutline, IoArrowBackOutline } from 'react-icons/io5'
import { useLeadForm } from '../../controllers/useLeadForm'

const TERMS_URL   = 'https://bargainly.com.br/termos'
const PRIVACY_URL = 'https://bargainly.com.br/privacidade'

const inputClass =
  'bg-bg-secondary border border-border rounded-xl px-4 py-3 font-body text-sm ' +
  'font-light text-content-primary placeholder:text-content-secondary ' +
  'outline-none transition-colors focus:border-border-focus w-full'

const inputErrorClass =
  'bg-bg-secondary border border-border-error rounded-xl px-4 py-3 font-body text-sm ' +
  'font-light text-content-primary placeholder:text-content-secondary ' +
  'outline-none w-full'

export default function LeadCapture() {
  const { state, updateField, setTerms, submit, updateOtp, verifyOtp, resendOtp, goBack } =
    useLeadForm()
  const otpInputRef = useRef<HTMLInputElement>(null)

  // ── Step 1: form ─────────────────────────────────────────────────────────────

  if (state.step === 'form') {
    return (
      <section id="early-access" className="px-6 py-20 pb-28 max-w-lg mx-auto text-center">
        <div className="text-xs font-medium tracking-[0.14em] uppercase text-brand-green mb-4 reveal">
          Criar conta
        </div>

        <h2
          className="font-heading font-bold tracking-tight leading-tight mb-3 reveal"
          style={{ fontSize: 'clamp(1.9rem, 5vw, 3rem)' }}
        >
          Comece a organizar{' '}
          <em className="not-italic text-brand-green">juntos</em>
        </h2>

        <p className="text-sm font-light text-content-secondary mb-8 reveal">
          Preencha seus dados e verifique seu e-mail para entrar no 4U2 Finance.
        </p>

        <div className="flex flex-col gap-3 max-w-sm mx-auto text-left reveal">
          {/* Nome */}
          <div>
            <input
              type="text"
              placeholder="Nome completo"
              autoComplete="name"
              value={state.data.name}
              onChange={(e) => updateField('name', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              aria-label="Nome completo"
              aria-invalid={!!state.fieldErrors.name}
              className={state.fieldErrors.name ? inputErrorClass : inputClass}
            />
            {state.fieldErrors.name && (
              <p className="text-[0.72rem] text-red-400 mt-1 pl-1">{state.fieldErrors.name}</p>
            )}
          </div>

          {/* Telefone (WhatsApp) */}
          <div>
            <input
              type="tel"
              placeholder="Telefone (WhatsApp) — ex: 11999998888"
              autoComplete="tel"
              inputMode="numeric"
              value={state.data.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              aria-label="Telefone WhatsApp"
              aria-invalid={!!state.fieldErrors.phone}
              className={state.fieldErrors.phone ? inputErrorClass : inputClass}
            />
            {state.fieldErrors.phone && (
              <p className="text-[0.72rem] text-red-400 mt-1 pl-1">{state.fieldErrors.phone}</p>
            )}
          </div>

          {/* E-mail */}
          <div>
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              autoComplete="email"
              value={state.data.email}
              onChange={(e) => updateField('email', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit()}
              aria-label="E-mail"
              aria-invalid={!!state.fieldErrors.email}
              className={state.fieldErrors.email ? inputErrorClass : inputClass}
            />
            {state.fieldErrors.email && (
              <p className="text-[0.72rem] text-red-400 mt-1 pl-1">{state.fieldErrors.email}</p>
            )}
          </div>

          {/* Checkboxes — mirrors OnboardingScreen termsAccepted / privacyAccepted */}
          <div className="flex flex-col gap-2 mt-1">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={state.termsAccepted}
                onChange={(e) => setTerms('termsAccepted', e.target.checked)}
                className="mt-0.5 accent-brand-green flex-shrink-0"
                aria-label="Aceitar Termos de Uso"
              />
              <span className="text-[0.72rem] text-content-secondary leading-relaxed">
                Li e aceito os{' '}
                <a
                  href={TERMS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-green underline hover:no-underline"
                >
                  Termos de Uso
                </a>
              </span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={state.privacyAccepted}
                onChange={(e) => setTerms('privacyAccepted', e.target.checked)}
                className="mt-0.5 accent-brand-green flex-shrink-0"
                aria-label="Aceitar Política de Privacidade"
              />
              <span className="text-[0.72rem] text-content-secondary leading-relaxed">
                Li e aceito a{' '}
                <a
                  href={PRIVACY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-green underline hover:no-underline"
                >
                  Política de Privacidade
                </a>
              </span>
            </label>
          </div>

          {/* API error banner */}
          {state.apiError && (
            <div
              className="rounded-xl px-4 py-3 text-[0.75rem] text-red-300 border border-red-400/30"
              style={{ background: 'rgba(248,113,113,0.08)' }}
              role="alert"
              aria-live="polite"
            >
              {state.apiError}
            </div>
          )}

          {/* Submit */}
          <button
            type="button"
            onClick={() => void submit()}
            disabled={state.isLoading}
            className="bg-brand-green text-bg-primary border-none rounded-pill px-8 py-3.5
              font-body text-sm font-medium cursor-pointer transition-all tracking-wide
              hover:bg-brand-green-hover hover:-translate-y-px disabled:opacity-60
              disabled:cursor-not-allowed disabled:translate-y-0 mt-1"
          >
            {state.isLoading ? 'Criando conta…' : 'Criar conta grátis'}
          </button>
        </div>

        <p className="mt-4 text-xs text-content-faint reveal">
          Sem spam. Sem cartão de crédito. Dados protegidos com LGPD.
        </p>
      </section>
    )
  }

  // ── Step 2: otp ──────────────────────────────────────────────────────────────

  if (state.step === 'otp') {
    const cells = Array.from({ length: 6 }, (_, i) => state.otp[i] ?? '')
    const canVerify = state.otp.length === 6

    return (
      <section id="early-access" className="px-6 py-20 pb-28 max-w-lg mx-auto text-center">
        {/* Back */}
        <button
          type="button"
          onClick={goBack}
          aria-label="Voltar"
          className="flex items-center gap-1.5 text-sm text-content-secondary mb-6
            mx-auto border-none bg-transparent cursor-pointer hover:text-content-primary
            transition-colors"
        >
          <IoArrowBackOutline size={18} aria-hidden="true" />
          Voltar
        </button>

        {/* Header */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{ background: 'rgba(110,231,183,0.12)' }}
          aria-hidden="true"
        >
          <IoMailOpenOutline size={32} style={{ color: '#6EE7B7' }} />
        </div>

        <h2 className="font-heading font-bold text-2xl tracking-tight mb-2 reveal">
          Verifique seu e-mail
        </h2>
        <p className="text-sm font-light text-content-secondary mb-8 reveal">
          Enviamos um código de 6 dígitos para{' '}
          <span className="text-brand-green font-medium">{state.data.email}</span>
        </p>

        {/* OTP cells — same visual as OTPVerifyScreen.tsx */}
        <div
          className="relative flex gap-2.5 justify-center mb-2"
          onClick={() => otpInputRef.current?.focus()}
          role="group"
          aria-label="Código de verificação"
        >
          {cells.map((char, i) => {
            const isActive = state.otp.length === i
            const hasError = !!state.otpError
            return (
              <div
                key={i}
                className="w-11 h-14 rounded-xl flex items-center justify-center
                  font-heading text-xl font-bold border transition-colors select-none"
                style={{
                  background:   'rgba(255,255,255,0.04)',
                  borderColor:  hasError
                    ? 'rgba(248,113,113,0.6)'
                    : isActive
                    ? '#6EE7B7'
                    : char
                    ? 'rgba(110,231,183,0.3)'
                    : 'rgba(255,255,255,0.07)',
                  color: char ? '#fff' : 'transparent',
                }}
              >
                {char || (isActive ? (
                  <span
                    className="w-px h-6 animate-pulse"
                    style={{ background: '#6EE7B7' }}
                    aria-hidden="true"
                  />
                ) : null)}
              </div>
            )
          })}

          {/* Hidden real input — same pattern as OTPVerifyScreen */}
          <input
            ref={otpInputRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            autoFocus
            autoComplete="one-time-code"
            value={state.otp}
            onChange={(e) => updateOtp(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && canVerify && void verifyOtp()}
            aria-label="Código OTP de 6 dígitos"
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
        </div>

        {/* OTP field error */}
        {state.otpError && (
          <p className="text-[0.75rem] text-red-400 mb-3" role="alert">{state.otpError}</p>
        )}

        {/* API error banner */}
        {state.apiError && (
          <div
            className="rounded-xl px-4 py-3 text-[0.75rem] text-red-300 border
              border-red-400/30 mb-4 max-w-xs mx-auto"
            style={{ background: 'rgba(248,113,113,0.08)' }}
            role="alert"
            aria-live="polite"
          >
            {state.apiError}
          </div>
        )}

        {/* Verify button */}
        <button
          type="button"
          onClick={() => void verifyOtp()}
          disabled={state.isLoading || !canVerify}
          className="bg-brand-green text-bg-primary border-none rounded-pill px-10 py-3.5
            font-body text-sm font-medium cursor-pointer transition-all tracking-wide
            hover:bg-brand-green-hover hover:-translate-y-px disabled:opacity-50
            disabled:cursor-not-allowed disabled:translate-y-0 mt-2 w-full max-w-xs"
        >
          {state.isLoading ? 'Verificando…' : 'Verificar código'}
        </button>

        {/* Resend */}
        <div className="mt-5 text-xs text-content-secondary">
          Não recebeu o código?{' '}
          {state.cooldown > 0 ? (
            <span className="text-content-faint">
              Reenviar em <span className="text-brand-green font-medium">{state.cooldown}s</span>
            </span>
          ) : (
            <button
              type="button"
              onClick={() => void resendOtp()}
              disabled={state.isLoading}
              className="text-brand-green underline border-none bg-transparent
                cursor-pointer hover:no-underline disabled:opacity-50"
            >
              Reenviar código
            </button>
          )}
        </div>
      </section>
    )
  }

  // ── Step 3: success ──────────────────────────────────────────────────────────

  return (
    <section
      id="early-access"
      className="px-6 py-20 pb-28 max-w-lg mx-auto text-center"
    >
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
        style={{ background: 'rgba(110,231,183,0.12)' }}
        aria-hidden="true"
      >
        <IoCheckmarkCircle size={42} style={{ color: '#6EE7B7' }} />
      </div>

      <h2 className="font-heading font-bold text-3xl tracking-tight mb-3">
        Conta criada!
      </h2>

      <p className="text-sm font-light text-content-secondary leading-relaxed">
        Bem-vindo ao <span className="text-brand-green font-medium">4U2 Finance</span>,{' '}
        <span className="text-content-primary">{state.data.name.split(' ')[0]}</span>!
        <br />
        Enviamos o link para baixar o app no e-mail{' '}
        <span className="text-brand-green">{state.data.email}</span>.
        <br />
        Verifique sua caixa de entrada.
      </p>
    </section>
  )
}

