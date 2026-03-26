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

export interface LeadFormData {
  name: string
  email: string
}

export interface LeadFormState {
  data: LeadFormData
  isSubmitted: boolean
  hasError: boolean
}
