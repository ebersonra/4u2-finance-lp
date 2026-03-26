// ─── Controller: Lead Form ────────────────────────────────────────────────────
// Encapsulates all business logic for the email capture form:
// field updates, validation, and submission side-effects.

import { useState, useCallback } from 'react'
import type { LeadFormData, LeadFormState } from '../models/types'

/** Validates email format without relying on browser-only APIs. */
const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export function useLeadForm() {
  const [state, setState] = useState<LeadFormState>({
    data: { name: '', email: '' },
    isSubmitted: false,
    hasError: false,
  })

  const updateField = useCallback((field: keyof LeadFormData, value: string) => {
    setState((prev) => ({
      ...prev,
      data: { ...prev.data, [field]: value },
      hasError: false,
    }))
  }, [])

  const submit = useCallback(() => {
    const { name, email } = state.data

    if (!name.trim() || !email.trim() || !isValidEmail(email)) {
      setState((prev) => ({ ...prev, hasError: true }))
      setTimeout(() => setState((prev) => ({ ...prev, hasError: false })), 1500)
      return
    }

    // Integration point: POST to Netlify Forms / ConvertKit / Mailchimp
    // For Netlify Forms: add name="lead" data-netlify="true" to the form element
    // and POST to '/' with URLSearchParams including 'form-name': 'lead'.
    // No console.log in production — remove before going live.

    setState((prev) => ({ ...prev, isSubmitted: true }))
  }, [state.data])

  return { state, updateField, submit }
}
