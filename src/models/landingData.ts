// ─── Static Content Data ──────────────────────────────────────────────────────
// Single source of truth for all landing page copy and mock UI data.
// Controllers and Views consume these — never hardcode strings in components.

import {
  IoCardOutline,
  IoTrophyOutline,
  IoStatsChartOutline,
  IoChatbubbleEllipsesOutline,
  IoCloudOfflineOutline,
  IoShieldCheckmarkOutline,
} from 'react-icons/io5'
import type { FeatureCard, Step, SocialItem, TransactionItem, CategoryBudget } from './types'

export const features: FeatureCard[] = [
  {
    id: 'open-finance',
    Icon: IoCardOutline,
    iconVariant: 'green',
    title: 'Open Finance',
    description:
      'Conecte as contas bancárias de vocês dois. Extratos, saldos e boletos atualizados automaticamente — sem digitar nada.',
  },
  {
    id: 'goals',
    Icon: IoTrophyOutline,
    iconVariant: 'pink',
    title: 'Metas do casal',
    description:
      'Viagem, carro, reforma. Criem metas juntos, acompanhem o progresso e celebrem cada conquista no app.',
  },
  {
    id: 'budget',
    Icon: IoStatsChartOutline,
    iconVariant: 'green',
    title: 'Orçamento por categoria',
    description:
      'Defina limites para cada categoria do mês. O app avisa quando está chegando perto — antes de estourar.',
  },
  {
    id: 'whatsapp',
    Icon: IoChatbubbleEllipsesOutline,
    iconVariant: 'pink',
    title: 'Lançamento pelo WhatsApp',
    description:
      'Mande "gastei 45 no uber" para o bot e pronto — o lançamento já entra no app. Sem abrir nada, onde estiver.',
  },
  {
    id: 'offline',
    Icon: IoCloudOfflineOutline,
    iconVariant: 'green',
    title: '100% offline',
    description:
      'Sem internet? O app funciona igual. Tudo fica salvo no dispositivo e sincroniza quando a conexão voltar.',
  },
  {
    id: 'privacy',
    Icon: IoShieldCheckmarkOutline,
    iconVariant: 'pink',
    title: 'Privacidade total',
    description:
      'Seus dados nunca são vendidos. Conformidade com LGPD, criptografia ponta a ponta e consentimento explícito.',
  },
]

export const steps: Step[] = [
  {
    id: 'download',
    number: '01',
    title: 'Baixe e crie a família',
    description:
      'Instale o app, crie sua conta e convide sua pessoa com um código de 8 caracteres.',
  },
  {
    id: 'connect',
    number: '02',
    title: 'Conecte seus bancos',
    description:
      'Autorize o Open Finance e veja os extratos de vocês dois aparecerem automaticamente.',
  },
  {
    id: 'goals-setup',
    number: '03',
    title: 'Defina as metas',
    description:
      'Criem as metas do casal, configurem o orçamento por categoria e deixem o app trabalhar.',
  },
  {
    id: 'together',
    number: '04',
    title: 'Acompanhem juntos',
    description:
      'Tudo em tempo real, offline ou online. Qualquer gasto lançado por um aparece para os dois.',
  },
]

export const socialItems: SocialItem[] = [
  { id: 'offline', value: '100%', label: 'offline-first' },
  { id: 'open-finance', value: 'Open Finance', label: 'integrado', icon: 'star' },
  { id: 'platforms', value: 'iOS', label: '& Android' },
  { id: 'lgpd', value: 'LGPD', label: 'compliant', icon: 'check' },
]

export const mockTransactions: TransactionItem[] = [
  {
    id: 'tx1',
    name: 'iFood',
    category: 'Alimentação',
    member: 'EB',
    amount: 68,
    type: 'expense',
  },
  {
    id: 'tx2',
    name: 'Salário',
    category: 'Receita',
    member: 'AN',
    amount: 4800,
    type: 'income',
  },
  {
    id: 'tx3',
    name: 'Uber',
    category: 'Transporte',
    member: 'EB',
    amount: 24,
    type: 'expense',
  },
]

export const mockCategories: CategoryBudget[] = [
  {
    id: 'food',
    label: 'Alimentação',
    value: 'R$ 840',
    progress: 68,
    colorClass: 'text-members-ana',
    fillColorClass: 'bg-members-ana-dim',
  },
  {
    id: 'home',
    label: 'Moradia',
    value: 'R$ 2.100',
    progress: 90,
    colorClass: 'text-brand-green',
    fillColorClass: 'bg-brand-green',
  },
  {
    id: 'leisure',
    label: 'Lazer',
    value: 'R$ 320',
    progress: 32,
    colorClass: 'text-brand-green',
    fillColorClass: 'bg-brand-green',
  },
  {
    id: 'goal',
    label: 'Meta viagem',
    value: '64%',
    progress: 64,
    colorClass: 'text-members-ana',
    fillColorClass: 'bg-members-ana-dim',
  },
]
