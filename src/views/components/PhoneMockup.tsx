import type { TransactionItem, CategoryBudget } from '../../models/types'

interface PhoneMockupProps {
  transactions: TransactionItem[]
  categories: CategoryBudget[]
}

function txDotColor(tx: TransactionItem): string {
  if (tx.type === 'income') return 'bg-brand-green'
  if (tx.member === 'AN') return 'bg-members-ana'
  return 'bg-content-secondary'
}

export default function PhoneMockup({ transactions, categories }: PhoneMockupProps) {
  return (
    <div className="relative max-w-[280px] mx-auto" aria-label="Prévia do app 4U2 Finance">
      {/* Phone shell */}
      <div
        className="bg-bg-tertiary border border-[rgba(255,255,255,0.1)] rounded-[36px] px-4 py-6"
        style={{
          boxShadow:
            '0 0 0 1px rgba(255,255,255,0.05), 0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)',
        }}
      >
        {/* Dynamic Island */}
        <div className="w-20 h-5 bg-black rounded-pill mx-auto mb-4" aria-hidden="true" />

        {/* Screen */}
        <div className="bg-bg-secondary rounded-2xl p-5 min-h-[420px]">

          {/* App Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="font-heading text-base font-bold" aria-label="4U2 Finance">
              <span className="text-brand-green">$</span>
              <span className="text-members-ana">2</span>
            </div>
            <div className="flex" aria-label="Membros da família">
              <div
                className="w-6 h-6 rounded-full border-2 border-bg-secondary bg-members-ana-dim
                  text-white flex items-center justify-center text-[0.6rem] font-semibold"
                aria-label="Membro EB"
              >
                EB
              </div>
              <div
                className="w-6 h-6 rounded-full border-2 border-bg-secondary bg-brand-green-muted
                  text-white flex items-center justify-center text-[0.6rem] font-semibold -ml-1.5"
                aria-label="Membro AN"
              >
                AN
              </div>
            </div>
          </div>

          {/* Balance Card */}
          <div
            className="border border-[rgba(110,231,183,0.15)] rounded-xl p-[1.1rem] mb-4"
            style={{
              background:
                'linear-gradient(135deg, rgba(110,231,183,0.12), rgba(249,168,212,0.06))',
            }}
            aria-label="Saldo familiar"
          >
            <div className="text-[0.65rem] tracking-widest uppercase text-content-secondary mb-1">
              Saldo familiar
            </div>
            <div className="font-heading text-[1.8rem] font-bold text-brand-green tracking-tight">
              R$ 12.480
            </div>
            <div className="text-[0.65rem] text-content-secondary mt-0.5">
              Atualizado agora · 2 contas
            </div>
          </div>

          {/* Category Mini Cards */}
          <div className="grid grid-cols-2 gap-2 mb-4" aria-label="Orçamento por categoria">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-bg-tertiary rounded-[10px] p-2.5 border border-border"
              >
                <div className="text-[0.6rem] text-content-secondary mb-0.5">{cat.label}</div>
                <div className={`font-heading text-base font-semibold ${cat.colorClass}`}>
                  {cat.value}
                </div>
                <div
                  className="h-[3px] rounded-sm mt-1.5 overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.07)' }}
                  role="progressbar"
                  aria-valuenow={cat.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className={`h-full rounded-sm ${cat.fillColorClass}`}
                    style={{ width: `${cat.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Recent Transactions */}
          <div className="flex flex-col gap-2" aria-label="Transações recentes">
            {transactions.map((tx, idx) => (
              <div
                key={tx.id}
                className={`flex items-center justify-between py-2 ${
                  idx < transactions.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${txDotColor(tx)}`}
                    aria-hidden="true"
                  />
                  <div>
                    <div className="text-[0.7rem] font-normal">{tx.name}</div>
                    <div className="text-[0.6rem] text-content-secondary">
                      {tx.category} · {tx.member}
                    </div>
                  </div>
                </div>
                <div
                  className={`font-heading text-sm font-semibold ${
                    tx.type === 'income' ? 'text-brand-green' : 'text-members-ana'
                  }`}
                  aria-label={`${tx.type === 'income' ? 'Entrada' : 'Saída'} de R$ ${tx.amount}`}
                >
                  {tx.type === 'income' ? '+' : '-'} R${' '}
                  {tx.amount.toLocaleString('pt-BR')}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
