// ─── Domain Types ─────────────────────────────────────────────────────────────
// Defines all data shapes used across the Model and Controller layers.
// Keep in sync with the mobile app's TypeScript interfaces.

import type { IconType } from 'react-icons'

export interface FeatureCard {
  id: string
  /** react-icons component from the Io5 (Ionicons 5) set */
  Icon: IconType
  iconVariant: 'green' | 'pink'
  title: string
  description: string
  /** Feature ainda não disponível no app — exibe badge "Em breve" */
  isFuture?: boolean
}

export interface Step {
  id: string
  number: string
  title: string
  description: string
}

export interface SocialItem {
  id: string
  value: string
  label: string
  icon?: 'star' | 'check'
}

export interface TransactionItem {
  id: string
  name: string
  category: string
  member: string
  amount: number
  type: 'income' | 'expense'
}

export interface CategoryBudget {
  id: string
  label: string
  value: string
  progress: number
  /** Tailwind text color class for the value label */
  colorClass: string
  /** Tailwind bg color class for the progress bar fill */
  fillColorClass: string
}

// ─── Registration flow (3 steps: form → otp → success) ────────────────────────

export type RegisterStep = 'form' | 'otp' | 'success'

export interface RegisterFormData {
  name: string
  phone: string
  email: string
}

export interface RegisterFormState {
  data: RegisterFormData
  step: RegisterStep
  termsAccepted: boolean
  privacyAccepted: boolean
  fieldErrors: Partial<Record<keyof RegisterFormData, string>>
  apiError: string | null
  isLoading: boolean
  /** OTP digits (max 6) — only used in the otp step */
  otp: string
  otpError: string | null
  /** Seconds remaining before user can resend OTP */
  cooldown: number
}

/** @deprecated Use RegisterFormData instead */
export interface LeadFormData {
  name: string
  email: string
}

/** @deprecated Use RegisterFormState instead */
export interface LeadFormState {
  data: LeadFormData
  isSubmitted: boolean
  hasError: boolean
}
