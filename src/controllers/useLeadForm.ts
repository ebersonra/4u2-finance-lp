// ─── Controller: Register Form ────────────────────────────────────────────────
// Implements the same 3-step registration flow as OnboardingScreen.tsx +
// OTPVerifyScreen.tsx from the mobile app.
//
// Step 1 — form:   Name + Phone + Email + Terms acceptance → POST /user-auth
//                  → POST /request-otp  → advance to step "otp"
// Step 2 — otp:    6-digit code input  → POST /verify-otp  → advance to "success"
// Step 3 — success: account confirmed ✅
//
// Security: CWE-20 (input validation + sanitization), no token storage in browser.

import { useState, useCallback, useEffect, useRef } from 'react'
import type { RegisterFormState, RegisterFormData } from '../models/types'

// ── Constants ──────────────────────────────────────────────────────────────────

const API_BASE          = '/api'
const OTP_RESEND_COOLDOWN = 60 // seconds — matches OTPVerifyScreen.tsx

// ── Validation (mirrors OnboardingScreen.tsx) ─────────────────────────────────

const PHONE_RE = /^[\d\s\-()+]{8,20}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function sanitize(value: string): string {
  return value.trim().replace(/[<>]/g, '')
}

function normalizePhone(raw: string): string {
  return raw.replace(/\D/g, '')
}

function validate(
  data: RegisterFormData,
): Partial<Record<keyof RegisterFormData, string>> {
  const errs: Partial<Record<keyof RegisterFormData, string>> = {}
  const name  = sanitize(data.name)
  const phone = sanitize(data.phone)
  const email = sanitize(data.email)

  if (!name || name.length < 2)
    errs.name = 'Nome deve ter pelo menos 2 caracteres.'
  if (!phone || !PHONE_RE.test(phone))
    errs.phone = 'Telefone inválido (8–20 dígitos, somente números).'
  if (!email || !EMAIL_RE.test(email))
    errs.email = 'E-mail obrigatório para receber o código de acesso.'

  return errs
}

// ── API helpers ────────────────────────────────────────────────────────────────

async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    let message = `Erro ${res.status}`
    try {
      const json = await res.json()
      message = json?.message ?? json?.error ?? message
    } catch {
      // use default message
    }
    throw new Error(message)
  }
  return res.json() as Promise<T>
}

// ── Initial state ──────────────────────────────────────────────────────────────

const INITIAL_STATE: RegisterFormState = {
  data: { name: '', phone: '', email: '' },
  step: 'form',
  termsAccepted: false,
  privacyAccepted: false,
  fieldErrors: {},
  apiError: null,
  isLoading: false,
  otp: '',
  otpError: null,
  cooldown: 0,
}

// ── Hook ───────────────────────────────────────────────────────────────────────

export function useLeadForm() {
  const [state, setState] = useState<RegisterFormState>(INITIAL_STATE)
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Countdown timer for OTP resend (mirrors OTPVerifyScreen.tsx useEffect)
  useEffect(() => {
    if (state.cooldown <= 0) return
    cooldownRef.current = setInterval(() => {
      setState((prev) => {
        if (prev.cooldown <= 1) {
          clearInterval(cooldownRef.current!)
          return { ...prev, cooldown: 0 }
        }
        return { ...prev, cooldown: prev.cooldown - 1 }
      })
    }, 1000)
    return () => clearInterval(cooldownRef.current!)
  }, [state.cooldown > 0 && state.step === 'otp'])

  // ── Field updates ────────────────────────────────────────────────────────────

  const updateField = useCallback(
    (field: keyof RegisterFormData, value: string) => {
      setState((prev) => ({
        ...prev,
        data: { ...prev.data, [field]: value },
        fieldErrors: { ...prev.fieldErrors, [field]: undefined },
        apiError: null,
      }))
    },
    [],
  )

  const setTerms = useCallback((field: 'termsAccepted' | 'privacyAccepted', value: boolean) => {
    setState((prev) => ({ ...prev, [field]: value, apiError: null }))
  }, [])

  // ── Step 1 → 2: Create account + send OTP ────────────────────────────────────

  const submit = useCallback(async (): Promise<void> => {
    const errs = validate(state.data)
    if (Object.keys(errs).length > 0) {
      setState((prev) => ({ ...prev, fieldErrors: errs }))
      return
    }
    if (!state.termsAccepted || !state.privacyAccepted) {
      setState((prev) => ({
        ...prev,
        apiError: 'Aceite os Termos de Uso e a Política de Privacidade para continuar.',
      }))
      return
    }

    setState((prev) => ({ ...prev, isLoading: true, apiError: null }))

    try {
      const payload = {
        name:  sanitize(state.data.name),
        phone: normalizePhone(state.data.phone),
        email: sanitize(state.data.email).toLowerCase(),
      }

      // Step A: create or retrieve the account (mirrors authService.createUser)
      await apiPost('/user-auth', {
        action:                     'getOrCreate',
        terms_accepted_at:          new Date().toISOString(),
        terms_version:              '1.0',
        privacy_policy_accepted_at: new Date().toISOString(),
        ...payload,
      })

      // Step B: send OTP to email (mirrors jwtSessionService.requestOTP)
      await apiPost('/request-otp', { email: payload.email })

      setState((prev) => ({
        ...prev,
        isLoading: false,
        step: 'otp',
        otp: '',
        otpError: null,
        cooldown: OTP_RESEND_COOLDOWN,
      }))
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Erro ao criar conta. Tente novamente.'
      setState((prev) => ({ ...prev, isLoading: false, apiError: msg }))
    }
  }, [state.data, state.termsAccepted, state.privacyAccepted])

  // ── OTP digit input ──────────────────────────────────────────────────────────

  const updateOtp = useCallback((raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 6)
    setState((prev) => ({ ...prev, otp: digits, otpError: null }))
  }, [])

  // ── Step 2 → 3: Verify OTP ───────────────────────────────────────────────────

  const verifyOtp = useCallback(async (): Promise<void> => {
    if (!/^\d{6}$/.test(state.otp)) {
      setState((prev) => ({
        ...prev,
        otpError: 'O código deve ter exatamente 6 dígitos.',
      }))
      return
    }

    setState((prev) => ({ ...prev, isLoading: true, otpError: null, apiError: null }))

    try {
      // mirrors jwtSessionService.verifyOTP — we don't store the JWT in the browser
      await apiPost('/verify-otp', {
        email: sanitize(state.data.email).toLowerCase(),
        token: state.otp,
      })
      setState((prev) => ({ ...prev, isLoading: false, step: 'success' }))
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Código inválido ou expirado.'
      setState((prev) => ({ ...prev, isLoading: false, otpError: msg }))
    }
  }, [state.otp, state.data.email])

  // ── Resend OTP ────────────────────────────────────────────────────────────────

  const resendOtp = useCallback(async (): Promise<void> => {
    if (state.cooldown > 0) return
    setState((prev) => ({ ...prev, isLoading: true, apiError: null }))
    try {
      await apiPost('/request-otp', {
        email: sanitize(state.data.email).toLowerCase(),
      })
      setState((prev) => ({
        ...prev,
        isLoading: false,
        otp: '',
        otpError: null,
        cooldown: OTP_RESEND_COOLDOWN,
      }))
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Erro ao reenviar código.'
      setState((prev) => ({ ...prev, isLoading: false, apiError: msg }))
    }
  }, [state.cooldown, state.data.email])

  // ── Back to form ─────────────────────────────────────────────────────────────

  const goBack = useCallback(() => {
    setState((prev) => ({ ...prev, step: 'form', otp: '', otpError: null, apiError: null }))
  }, [])

  return { state, updateField, setTerms, submit, updateOtp, verifyOtp, resendOtp, goBack }
}

