import { useState } from 'react'
import {
  IoHomeOutline, IoHome,
  IoRepeatOutline, IoRepeat,
  IoPieChartOutline, IoPieChart,
  IoFlagOutline, IoFlag,
  IoPersonOutline, IoPerson,
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
  IoEyeOutline,
  IoRestaurantOutline,
  IoHomeOutline as IoHouseOutline,
  IoCarOutline,
  IoMedkitOutline,
  IoGameControllerOutline,
  IoBookOutline,
  IoTrendingUpOutline,
  IoPersonCircle,
} from 'react-icons/io5'
import type { TransactionItem, CategoryBudget } from '../../models/types'

interface PhoneMockupProps {
  transactions: TransactionItem[]
  categories: CategoryBudget[]
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const CAT_ICON: Record<string, React.ElementType> = {
  food:      IoRestaurantOutline,
  home:      IoHouseOutline,
  transport: IoCarOutline,
  health:    IoMedkitOutline,
  leisure:   IoGameControllerOutline,
  education: IoBookOutline,
  income:    IoTrendingUpOutline,
}
const CAT_COLOR: Record<string, string> = {
  food:      '#F97316',
  home:      '#8B5CF6',
  transport: '#3B82F6',
  health:    '#10B981',
  leisure:   '#F59E0B',
  education: '#EC4899',
  income:    '#34D399',
}

// ── HomeScreen ────────────────────────────────────────────────────────────────
// Espelha: HomeScreen.tsx — Header + Balance Card + Categories grid + Transactions

function HomeScreen({ transactions }: Pick<PhoneMockupProps, 'transactions'>) {
  const [balanceVisible, setBalanceVisible] = useState(true)

  const cats = [
    { id: 'food',      label: 'Alimentação', amount: 840,  catKey: 'food'      },
    { id: 'home',      label: 'Casa',        amount: 2100, catKey: 'home'      },
    { id: 'transport', label: 'Transporte',  amount: 380,  catKey: 'transport' },
    { id: 'income',    label: 'Renda',       amount: 8600, catKey: 'income'    },
  ]

  return (
    <div className="flex flex-col gap-3">
      {/* Header — mirrors: headerLabel + headerTitle + person-circle icon */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[0.5rem] tracking-[0.12em] uppercase text-content-secondary font-medium">
            MAIO 2026
          </div>
          <div className="font-heading text-sm font-bold mt-0.5">
            Olá, Tom
          </div>
        </div>
        <IoPersonCircle size={28} style={{ color: '#6EE7B7' }} aria-hidden="true" />
      </div>

      {/* Balance Card — mirrors: balanceCard + balanceSplit */}
      <div
        className="rounded-xl p-3 border border-[rgba(110,231,183,0.2)]"
        style={{ background: '#1B2B1F' }}
        aria-label="Saldo do mês"
      >
        <div className="text-[0.5rem] tracking-widest uppercase text-content-secondary mb-1">
          Saldo do mês
        </div>
        <div className="flex items-center justify-between mb-2">
          <div className="font-heading text-[1.35rem] font-bold text-brand-green tracking-tight">
            {balanceVisible ? 'R$ 4.480' : 'R$ --------'}
          </div>
          <button
            type="button"
            onClick={() => setBalanceVisible((v) => !v)}
            className="p-0.5 border-none bg-transparent cursor-pointer"
            aria-label={balanceVisible ? 'Ocultar saldo' : 'Exibir saldo'}
          >
            <IoEyeOutline size={14} style={{ color: 'rgba(255,255,255,0.35)' }} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { label: 'Entradas', value: 'R$ 8.600', color: '#34D399', Icon: IoArrowDownCircleOutline },
            { label: 'Saídas',   value: 'R$ 4.120', color: '#F87171', Icon: IoArrowUpCircleOutline  },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg p-2"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              <div className="flex items-center gap-1 mb-1">
                <item.Icon size={10} style={{ color: item.color }} aria-hidden="true" />
                <span className="text-[0.5rem] text-content-secondary">{item.label}</span>
              </div>
              <span className="font-heading text-xs font-semibold" style={{ color: item.color }}>
                {balanceVisible ? item.value : '--------'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Categories grid — mirrors: categoryCard + categoryIconWrap */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[0.55rem] font-semibold text-content-primary">Categorias</span>
          <span className="text-[0.5rem] text-brand-green">Ver tudo</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {cats.map((cat) => {
            const Icon  = CAT_ICON[cat.catKey] ?? IoRestaurantOutline
            const color = CAT_COLOR[cat.catKey] ?? '#6EE7B7'
            return (
              <div
                key={cat.id}
                className="rounded-xl p-2.5 border border-border"
                style={{ background: 'rgba(255,255,255,0.035)' }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center mb-1.5"
                  style={{ background: `${color}20` }}
                >
                  <Icon size={14} style={{ color }} aria-hidden="true" />
                </div>
                <div className="text-[0.5rem] text-content-secondary mb-0.5">{cat.label}</div>
                <div className="font-heading text-xs font-semibold text-content-primary">
                  {balanceVisible
                    ? `R$ ${cat.amount.toLocaleString('pt-BR')}`
                    : '--------'}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Transactions — mirrors: SwipeableTransactionCard list */}
      <div>
        <div className="text-[0.5rem] font-semibold text-content-secondary mb-1 tracking-widest uppercase">
          Hoje
        </div>
        <div className="flex flex-col gap-0">
          {transactions.slice(0, 3).map((tx, idx) => {
            const isIncome = tx.type === 'income'
            const catKey   = tx.category === 'Renda' ? 'income'
              : tx.category === 'Alimentação' ? 'food'
              : tx.category === 'Transporte'  ? 'transport'
              : tx.category === 'Delivery'    ? 'food'
              : 'food'
            const Icon  = CAT_ICON[catKey] ?? IoRestaurantOutline
            const color = CAT_COLOR[catKey] ?? '#6EE7B7'
            return (
              <div
                key={tx.id}
                className={`flex items-center gap-2 py-2 ${
                  idx < 2 ? 'border-b border-border' : ''
                }`}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}20` }}
                >
                  <Icon size={13} style={{ color }} aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[0.65rem] font-medium truncate">{tx.name}</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span
                      className="text-[0.48rem] font-semibold px-1 py-0.5 rounded"
                      style={{
                        background: tx.member === 'AN' ? 'rgba(249,168,212,0.15)' : 'rgba(110,231,183,0.12)',
                        color:      tx.member === 'AN' ? '#F9A8D4' : '#6EE7B7',
                      }}
                    >
                      {tx.member}
                    </span>
                    <span className="text-[0.48rem] text-content-secondary">{tx.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 flex-shrink-0">
                  {isIncome
                    ? <IoArrowDownCircleOutline size={9} style={{ color: '#34D399' }} />
                    : <IoArrowUpCircleOutline   size={9} style={{ color: '#F87171' }} />}
                  <span
                    className="font-heading text-xs font-semibold"
                    style={{ color: isIncome ? '#34D399' : 'rgba(255,255,255,0.9)' }}
                  >
                    {isIncome ? '' : '-'}R${tx.amount.toLocaleString('pt-BR')}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ── TransactionsScreen ────────────────────────────────────────────────────────
// Espelha: TransactionsScreen.tsx — filtros + lista com ícone categoria + badge membro

function TransactionsScreen({ transactions }: Pick<PhoneMockupProps, 'transactions'>) {
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all')

  const allTx = [
    ...transactions,
    { id: 'tx5', name: 'Farmácia',   category: 'Saúde',       member: 'AN', amount: 45,   type: 'expense' as const },
    { id: 'tx6', name: 'Netflix',    category: 'Streaming',   member: 'TM', amount: 55,   type: 'expense' as const },
    { id: 'tx7', name: 'Salário AN', category: 'Renda',       member: 'AN', amount: 3800, type: 'income'  as const },
  ]

  const filtered = filter === 'all' ? allTx
    : filter === 'income'  ? allTx.filter((t) => t.type === 'income')
    : allTx.filter((t) => t.type === 'expense')

  const catKeyFor = (cat: string) =>
    cat === 'Renda' || cat === 'Renda AN' || cat === 'Salário AN' ? 'income'
    : cat === 'Alimentação' ? 'food'
    : cat === 'Transporte'  ? 'transport'
    : cat === 'Saúde'       ? 'health'
    : cat === 'Delivery'    ? 'food'
    : 'leisure'

  return (
    <div className="flex flex-col gap-2.5">
      {/* Header */}
      <div className="font-heading text-sm font-bold">Lançamentos</div>

      {/* Search bar */}
      <div
        className="flex items-center gap-2 rounded-xl px-3 py-2 border border-border"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      >
        <span className="text-content-secondary text-[0.55rem]">🔍</span>
        <span className="text-[0.58rem] text-content-secondary">Buscar lançamento…</span>
      </div>

      {/* Filter chips — mirrors: all/income/expense filter */}
      <div className="flex gap-1.5">
        {(['all', 'income', 'expense'] as const).map((f) => {
          const labels = { all: 'Todos', income: 'Entradas', expense: 'Saídas' }
          const isActive = filter === f
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className="text-[0.5rem] font-semibold px-2 py-1 rounded-full border transition-all cursor-pointer"
              style={{
                background:   isActive ? 'rgba(110,231,183,0.15)' : 'transparent',
                borderColor:  isActive ? 'rgba(110,231,183,0.4)'  : 'rgba(255,255,255,0.07)',
                color:        isActive ? '#6EE7B7'                : 'rgba(255,255,255,0.35)',
              }}
            >
              {labels[f]}
            </button>
          )
        })}
      </div>

      {/* Grouped label */}
      <div className="text-[0.5rem] tracking-widest uppercase text-content-secondary">Maio 2026</div>

      {/* Transaction rows */}
      <div className="flex flex-col gap-0">
        {filtered.slice(0, 5).map((tx, idx) => {
          const isIncome = tx.type === 'income'
          const catKey   = catKeyFor(tx.category)
          const Icon     = CAT_ICON[catKey] ?? IoRestaurantOutline
          const color    = CAT_COLOR[catKey] ?? '#6EE7B7'
          return (
            <div
              key={tx.id}
              className={`flex items-center gap-2 py-2 ${idx < filtered.slice(0,5).length - 1 ? 'border-b border-border' : ''}`}
            >
              {/* Category icon */}
              <div
                className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${color}20` }}
              >
                <Icon size={13} style={{ color }} aria-hidden="true" />
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="text-[0.65rem] font-medium truncate">{tx.name}</div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span
                    className="text-[0.45rem] font-semibold px-1 py-0.5 rounded"
                    style={{
                      background: tx.member === 'AN' ? 'rgba(249,168,212,0.15)' : 'rgba(110,231,183,0.12)',
                      color:      tx.member === 'AN' ? '#F9A8D4' : '#6EE7B7',
                    }}
                  >
                    {tx.member}
                  </span>
                  <span className="text-[0.48rem] text-content-secondary">{tx.category}</span>
                </div>
              </div>
              {/* Amount + direction arrow */}
              <div className="flex items-center gap-0.5 flex-shrink-0">
                {isIncome
                  ? <IoArrowDownCircleOutline size={9} style={{ color: '#34D399' }} />
                  : <IoArrowUpCircleOutline   size={9} style={{ color: '#F87171' }} />}
                <span
                  className="font-heading text-[0.65rem] font-semibold"
                  style={{ color: isIncome ? '#34D399' : 'rgba(255,255,255,0.9)' }}
                >
                  R${tx.amount.toLocaleString('pt-BR')}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── BudgetScreen ──────────────────────────────────────────────────────────────
// Espelha: BudgetScreen.tsx — total card + category cards com ícone, tag, progress bar

function BudgetScreen() {
  const budgets = [
    { id: 'food',      catKey: 'food',      label: 'Alimentação', spent: 840,  limit: 1200, tag: null   },
    { id: 'home',      catKey: 'home',      label: 'Casa',        spent: 2100, limit: 2300, tag: '⚠️ 91%' },
    { id: 'transport', catKey: 'transport', label: 'Transporte',  spent: 380,  limit: 600,  tag: null   },
    { id: 'health',    catKey: 'health',    label: 'Saúde',       spent: 200,  limit: 400,  tag: null   },
    { id: 'leisure',   catKey: 'leisure',   label: 'Lazer',       spent: 320,  limit: 500,  tag: null   },
  ]
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0)
  const totalLimit = budgets.reduce((s, b) => s + b.limit, 0)
  const totalPct   = Math.round((totalSpent / totalLimit) * 100)

  return (
    <div className="flex flex-col gap-2.5">
      {/* Header — mirrors: title + familyBadge */}
      <div className="flex items-center justify-between">
        <div className="font-heading text-sm font-bold">Orçamento</div>
        <span
          className="text-[0.48rem] font-semibold px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(110,231,183,0.12)', color: '#6EE7B7' }}
        >
          👨‍👩‍👧 Família
        </span>
      </div>

      {/* Total progress card — mirrors: totalCard */}
      <div
        className="rounded-xl p-3 border border-border"
        style={{ background: 'rgba(255,255,255,0.035)' }}
      >
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[0.55rem] text-content-secondary">Total do mês</span>
          <span className="font-heading text-xs font-semibold" style={{ color: '#F59E0B' }}>
            {totalPct}%
          </span>
        </div>
        <div
          className="h-[5px] rounded-full overflow-hidden mb-1.5"
          style={{ background: 'rgba(255,255,255,0.07)' }}
          role="progressbar" aria-valuenow={totalPct} aria-valuemin={0} aria-valuemax={100}
        >
          <div
            className="h-full rounded-full"
            style={{ width: `${totalPct}%`, background: '#F59E0B' }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="font-heading text-xs font-semibold" style={{ color: '#F59E0B' }}>
            R$ {totalSpent.toLocaleString('pt-BR')}
          </span>
          <span className="text-[0.5rem] text-content-secondary">
            / R$ {totalLimit.toLocaleString('pt-BR')}
          </span>
        </div>
      </div>

      {/* Category cards — mirrors: catCard */}
      {budgets.map((b) => {
        const pct      = Math.round((b.spent / b.limit) * 100)
        const over     = pct >= 90
        const Icon     = CAT_ICON[b.catKey] ?? IoRestaurantOutline
        const color    = CAT_COLOR[b.catKey] ?? '#6EE7B7'
        const remain   = b.limit - b.spent
        return (
          <div
            key={b.id}
            className="rounded-xl p-2.5 border"
            style={{
              background:   'rgba(255,255,255,0.035)',
              borderColor:  over ? 'rgba(248,113,113,0.3)' : 'rgba(255,255,255,0.07)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              {/* Icon */}
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${color}20` }}
              >
                <Icon size={14} style={{ color }} aria-hidden="true" />
              </div>
              {/* Name + tag */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[0.62rem] font-medium">{b.label}</span>
                  {over && (
                    <span
                      className="text-[0.45rem] font-semibold px-1.5 py-0.5 rounded"
                      style={{ background: 'rgba(248,113,113,0.15)', color: '#F87171' }}
                    >
                      Atenção
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-[0.5rem] text-content-secondary">
                    R$ {b.spent.toLocaleString('pt-BR')} gasto
                  </span>
                  <span className="text-[0.5rem] text-content-secondary">
                    lim. R$ {b.limit.toLocaleString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>
            {/* Progress bar */}
            <div
              className="h-[3px] rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.07)' }}
              role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(pct,100)}%`, background: over ? '#F87171' : color }}
              />
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[0.48rem]" style={{ color: over ? '#F87171' : color }}>
                {pct}% utilizado
              </span>
              <span className="text-[0.48rem] text-content-secondary">
                Restam R$ {remain.toLocaleString('pt-BR')}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── GoalsScreen ───────────────────────────────────────────────────────────────
// Espelha: GoalsScreen.tsx — SwipeableGoalCard com ProgressBar, deadline, sugestão mensal

function GoalsScreen() {
  const goals = [
    { id: 'trip', label: 'Viagem Europa', icon: '✈️', saved: 8400,  target: 14000, color: '#6EE7B7', deadline: 'Dez/2026', suggestion: 'R$ 933/mês' },
    { id: 'car',  label: 'Carro novo',    icon: '🚗', saved: 22000, target: 55000, color: '#F9A8D4', deadline: 'Jun/2027', suggestion: 'R$ 2.538/mês' },
    { id: 'fund', label: 'Fundo reserva', icon: '🛡️', saved: 5200,  target: 10000, color: '#93C5FD', deadline: 'Mar/2027', suggestion: 'R$ 480/mês'  },
  ]

  return (
    <div className="flex flex-col gap-2.5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="font-heading text-sm font-bold">Metas</div>
        <button
          type="button"
          className="text-[0.55rem] font-semibold px-2.5 py-1 rounded-full border-none cursor-pointer"
          style={{ background: 'rgba(110,231,183,0.12)', color: '#6EE7B7' }}
          aria-label="Adicionar meta"
        >
          + Nova meta
        </button>
      </div>

      {goals.map((g) => {
        const pct = Math.round((g.saved / g.target) * 100)
        return (
          <div
            key={g.id}
            className="rounded-xl p-3 border border-border"
            style={{ background: 'rgba(255,255,255,0.035)' }}
          >
            {/* Top row: icon + label + deadline */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-base"
                  style={{ background: `${g.color}15` }}
                >
                  {g.icon}
                </span>
                <span className="font-heading text-[0.7rem] font-bold">{g.label}</span>
              </div>
              <span className="text-[0.5rem] text-content-secondary">{g.deadline}</span>
            </div>
            {/* Values */}
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-heading text-sm font-bold" style={{ color: g.color }}>
                {pct}%
              </span>
              <span className="text-[0.52rem] text-content-secondary">
                R$ {g.saved.toLocaleString('pt-BR')} / R$ {g.target.toLocaleString('pt-BR')}
              </span>
            </div>
            {/* Progress bar */}
            <div
              className="h-[4px] rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.07)' }}
              role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${pct}%`, background: g.color }}
              />
            </div>
            {/* Suggestion */}
            <div className="text-[0.48rem] text-content-secondary mt-1.5">
              Sugestão: <span style={{ color: g.color }}>{g.suggestion}</span> para cumprir o prazo
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── ProfileScreen (preview) ───────────────────────────────────────────────────
// Espelha: ProfileScreen.tsx — avatar, nome, configurações

function ProfileScreen() {
  return (
    <div className="flex flex-col gap-3">
      {/* Avatar + name */}
      <div className="flex flex-col items-center py-3 gap-2">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold"
          style={{ background: '#22C55E', color: '#fff' }}
          aria-label="Avatar do usuário"
        >
          TM
        </div>
        <div className="text-center">
          <div className="font-heading text-sm font-bold">Tom</div>
          <div className="text-[0.55rem] text-content-secondary mt-0.5">tom@email.com</div>
        </div>
        <span
          className="text-[0.48rem] font-semibold px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(110,231,183,0.12)', color: '#6EE7B7' }}
        >
          👨‍👩‍👧 Família · 2 membros
        </span>
      </div>

      {/* Settings list */}
      {[
        { icon: '🌙', label: 'Tema',              desc: 'Escuro'       },
        { icon: '👆', label: 'Biometria',          desc: 'Face ID ativo' },
        { icon: '🔔', label: 'Notificações',        desc: 'Ativadas'     },
        { icon: '👥', label: 'Grupo familiar',      desc: 'Ver membros'  },
      ].map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-2.5 rounded-xl p-2.5 border border-border"
          style={{ background: 'rgba(255,255,255,0.035)' }}
        >
          <span className="text-sm">{item.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="text-[0.62rem] font-medium">{item.label}</div>
            <div className="text-[0.5rem] text-content-secondary">{item.desc}</div>
          </div>
          <span className="text-[0.5rem] text-content-secondary">›</span>
        </div>
      ))}

      {/* Version */}
      <div className="text-center text-[0.48rem] text-content-secondary mt-1">
        v1.0.59 · 4U2 Finance
      </div>
    </div>
  )
}

// ── Tab Bar ───────────────────────────────────────────────────────────────────
// Espelha: CustomTabBar com os 5 tabs reais do app

type TabKey = 'home' | 'transactions' | 'budget' | 'goals' | 'profile'

const TABS: { key: TabKey; label: string; Icon: React.ElementType; IconActive: React.ElementType }[] = [
  { key: 'home',         label: 'Início',    Icon: IoHomeOutline,     IconActive: IoHome     },
  { key: 'transactions', label: 'Lançtos',   Icon: IoRepeatOutline,   IconActive: IoRepeat   },
  { key: 'budget',       label: 'Orçamento', Icon: IoPieChartOutline, IconActive: IoPieChart },
  { key: 'goals',        label: 'Metas',     Icon: IoFlagOutline,     IconActive: IoFlag     },
  { key: 'profile',      label: 'Perfil',    Icon: IoPersonOutline,   IconActive: IoPerson   },
]

// ── Main export ───────────────────────────────────────────────────────────────

export default function PhoneMockup({ transactions }: PhoneMockupProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('home')

  return (
    <div className="relative max-w-[300px] mx-auto" aria-label="Prévia do app 4U2 Finance">
      {/* Phone shell */}
      <div
        className="bg-bg-tertiary border border-[rgba(255,255,255,0.1)] rounded-[38px] px-3.5 pt-4 pb-0 overflow-hidden"
        style={{
          boxShadow:
            '0 0 0 1px rgba(255,255,255,0.05), 0 40px 80px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.07)',
        }}
      >
        {/* Dynamic Island */}
        <div className="w-20 h-[18px] bg-black rounded-pill mx-auto mb-3" aria-hidden="true" />

        {/* Screen */}
        <div className="bg-bg-secondary rounded-t-2xl flex flex-col" style={{ minHeight: 460 }}>
          {/* Scrollable content */}
          <div className="flex-1 px-4 pt-4 pb-2 overflow-hidden">
            {activeTab === 'home'         && <HomeScreen         transactions={transactions} />}
            {activeTab === 'transactions' && <TransactionsScreen transactions={transactions} />}
            {activeTab === 'budget'       && <BudgetScreen />}
            {activeTab === 'goals'        && <GoalsScreen />}
            {activeTab === 'profile'      && <ProfileScreen />}
          </div>

          {/* Tab bar — mirrors: CustomTabBar with 5 tabs */}
          <div
            className="flex items-center justify-around px-2 pt-2 pb-4 border-t border-border"
            style={{ background: 'rgba(10,12,18,0.97)' }}
            role="tablist"
            aria-label="Navegação principal"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.key
              const Icon = isActive ? tab.IconActive : tab.Icon
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={tab.label}
                  onClick={() => setActiveTab(tab.key)}
                  className="flex flex-col items-center gap-0.5 cursor-pointer border-none bg-transparent px-1 py-1 rounded-xl transition-colors"
                  style={{
                    background: isActive ? 'rgba(110,231,183,0.12)' : 'transparent',
                  }}
                >
                  <Icon
                    size={16}
                    style={{ color: isActive ? '#6EE7B7' : 'rgba(255,255,255,0.35)' }}
                    aria-hidden="true"
                  />
                  <span
                    className="text-[0.42rem] tracking-wide"
                    style={{
                      color:      isActive ? '#6EE7B7' : 'rgba(255,255,255,0.35)',
                      fontFamily: isActive ? '"Lexend Deca", sans-serif' : undefined,
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {tab.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

