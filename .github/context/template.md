# 📱 Especificação de UI/UX: FamilyFinance — App de Gestão Financeira Familiar

> **Última atualização:** Março 2026 · FamilyFinance v1.1.0-beta

## 1. Visão Geral & Contexto

**Objetivo:** Gestão financeira colaborativa para casais e famílias: controle de receitas, despesas, orçamento mensal por categoria e metas de poupança compartilhadas.

**Plataforma:** iOS / Android (Híbrido — React Native + Expo). Otimizado para smartphones; suporte a tablet na Fase 5.

**Público-alvo:** Consumidores finais (B2C) — casais e famílias que querem controle financeiro conjunto e colaboração em tempo real.

**Vibe/Conceito Visual:** Dark Mode nativo. Interface densa e funcional — estilo "ferramenta financeira premium". Referências visuais: Notion Finance, Linear App, apps de fintech premium (Nubank, C6 Bank). Uso de verde esmeralda (`#6EE7B7`) como cor de destaque financeiro positivo sobre fundo quase-preto (`#0F1117`). Tipografia elegante (LexendDeca para corpo, LexendGiga para headings de destaque) — legível em qualquer luminosidade.

> **Fonte da verdade para tokens:** Use sempre `src/theme/index.ts`. Nunca hardcode valores.

---

## 2. Design Tokens & Fundamentos

> ⚠️ Usar sempre as variáveis do `src/theme/index.ts`. Nunca hardcodear cores ou tamanhos.

### 2.1 Paleta de Cores

| Token | Valor | Uso |
|---|---|---|
| `bg.primary` | `#0F1117` | Fundo principal de todas as telas |
| `bg.secondary` | `#12151C` | Tab bar, fundo alternativo |
| `bg.card` | `rgba(255,255,255,0.04)` | Superfície de card / item de lista |
| `bg.cardBorder` | `rgba(255,255,255,0.07)` | Borda de card |
| `bg.overlay` | `rgba(10,12,18,0.97)` | Modais e overlays |
| `brand.green` | `#6EE7B7` | CTA, income, destaques positivos |
| `brand.greenMuted` | `rgba(110,231,183,0.12)` | Backgrounds de sucesso |
| `members.ana` | `#F9A8D4` | Identificação membro Ana |
| `members.pedro` | `#93C5FD` | Identificação membro Pedro |
| `income` | `#6EE7B7` | Valores de entrada |
| `expense` | `#F87171` | Valores de saída / alertas críticos |
| `warning` | `#F59E0B` | Avisos (≥80% do orçamento) |
| `text.primary` | `#FFFFFF` | Texto principal |
| `text.secondary` | `rgba(255,255,255,0.60)` | Labels, legendas |
| `text.muted` | `rgba(255,255,255,0.35)` | Metadata, datas |
| `text.faint` | `rgba(255,255,255,0.20)` | Placeholders, versão |

**Cores por categoria:**
| Categoria | Cor |
|---|---|
| `food` (Alimentação) | `#F97316` laranja |
| `home` (Casa) | `#8B5CF6` roxo |
| `transport` (Transporte) | `#3B82F6` azul |
| `health` (Saúde) | `#10B981` verde |
| `leisure` (Lazer) | `#F59E0B` âmbar |
| `education` (Educação) | `#EC4899` rosa |

### 2.2 Tipografia

> Fontes carregadas em `App.tsx` via `expo-font`: **LexendDeca** e **LexendGiga**.

| Uso | Família | Peso | Tamanho |
|---|---|---|---|
| Títulos principais (H1) | LexendGiga | Bold 700 | 20–24px |
| Valores monetários | LexendDeca | Bold 700 | 18–22px (numeros tabulares) |
| Labels de card (H3) | LexendDeca | SemiBold 600 | 14–15px |
| Corpo de item de lista | LexendDeca | Regular 400 | 13–14px |
| Tags / Badges | LexendDeca | SemiBold 600 | 10px / letter-spacing: 0.5 |
| Subtexto / Metadados | LexendDeca | Regular 400 | 11–12px / color: muted |

### 2.3 Espaçamento

```
xs=4  sm=8  md=12  lg=16  xl=20  xxl=24  xxxl=32
```
- Padding interno de cards: `xl` (20) vertical, `lg` (16) horizontal
- Gap entre cards: `md` (12)
- Margem lateral segura mobile: `xl` (20)
- Scroll `paddingBottom`: 100px (acima da tab bar)

### 2.4 Bordas & Sombras

```
radius: sm=8  md=12  lg=16  xl=20  xxl=24  pill=999
```
- Cards: `radius.xl` com `borderWidth: 1, borderColor: cardBorder`
- Botões CTA primários: `radius.xl`, height 52, sem borda, bg `brand.green`
- Chips de filtro / badges: `radius.pill`
- Tags de alerta: `radius.sm`

---

## 3. Estrutura de Navegação

```
RootStack (NativeStack)
├── Main (BottomTabs)
│   ├── 🏠 Home          – Resumo mensal, saldo, categorias, últimas transações
│   ├── 📋 Transactions  – Lista completa com filtros e busca
│   ├── 📊 Budget        – Orçamento mensal por categoria
│   ├── 🎯 Goals         – Metas de poupança compartilhadas
│   └── 👤 Profile       – Membros, configurações, segurança
└── Stacks / Modais
    ├── AddTransaction    – Formulário de nova transação
    ├── TransactionDetail – Ver / editar / excluir
    ├── AddGoal           – Formulário de nova meta
    ├── GoalDetail        – Histórico de aportes
    └── CategoryDetail    – Histórico e edição de limite
```

- Tab bar fundo: `bg.secondary`, ícone ativo: `brand.green`
- Modais: apresentação bottom-sheet com overlay `bg.overlay`

---

## 4. Telas — Especificação por Tela

### 4.1 HomeScreen

**Stack:** `Main > Home`
**Consumo API:** `GET /summary/monthly`, `GET /transactions?limit=5`, `GET /budgets/current`

Layout (scroll vertical):
1. **Header** — mês atual (ex: "Março 2026") + botões 🔔 e ⚙
2. **Member Chips** — filtro horizontal: Família / Ana / Pedro
3. **Balance Card** — saldo do mês com toggle 👁 + entradas/saídas
4. **Member Split Card** — barras de gasto proporcional por membro
5. **Categorias Grid** — 2 colunas × 2 linhas (4 cards), cada um com ProgressBar
6. **Últimas Transações** — 5 mais recentes, clicáveis → `TransactionDetail`
7. **FAB** `+` fixo → `AddTransaction`

Estados: loading (skeletons), error (ErrorBanner), empty (EmptyState).

---

### 4.2 TransactionsScreen

**Stack:** `Main > Transactions`
**Consumo API:** `GET /transactions`

Layout:
1. Header + botão `+ Novo` → `AddTransaction`
2. Filtros chips: Todos / Saídas / Entradas
3. Barra de busca
4. Lista agrupada por data (Hoje / Ontem / data)
5. Swipe-to-delete → `DELETE /transactions/:id` (Fase 1.1)
6. Pull-to-refresh

---

### 4.3 BudgetScreen

**Stack:** `Main > Budget`
**Consumo API:** `GET /budgets/current`

Layout:
1. Header título + mês + limite total
2. **Total Progress Card** — progresso geral
3. Lista de categorias com barra de progresso colorida por alerta
   - `< 80%` → cor da categoria
   - `≥ 80%` → `warning`
   - `≥ 100%` → `expense`
4. Toque → `CategoryDetail`

---

### 4.4 GoalsScreen

**Stack:** `Main > Goals`
**Consumo API:** `GET /goals`

Layout:
1. Header + contador + botão `+ Nova` → `AddGoal`
2. Cards de meta: emoji, nome, prazo, %, barra, stats, dica mensal
3. Toque → `GoalDetail`
4. 🎉 Animação ao atingir 100% (Fase 1.3)

---

### 4.5 ProfileScreen

**Stack:** `Main > Profile`
**Consumo API:** `GET /profile`, `GET /members`

Layout:
1. Family Card (avatar família, nome, membros, botão `+`)
2. Lista de configurações (Settings rows)
3. Versão no rodapé

---

### 4.6 AddTransaction (Modal)

**Consumo API:** `POST /transactions`

Campos:
- Nome (TextInput obrigatório)
- Valor (teclado numérico customizado, > 0)
- Tipo toggle: Entrada / Saída
- Categoria (grid de ícones selecionável)
- Membro (chips selecionável)
- Data (DatePicker, padrão hoje)
- Recorrente (toggle booleano)
- Nota (TextInput multiline, opcional)

---

### 4.7 TransactionDetail

**Consumo API:** `GET /transactions/:id`, `PUT /transactions/:id`, `DELETE /transactions/:id`

Exibe todos os campos. Botões: Editar e Excluir (com Alert de confirmação).

---

### 4.8 AddGoal

**Consumo API:** `POST /goals`

Campos: Nome, emoji (picker), valor alvo (> 0), prazo (YYYY-MM), cor (swatch picker), membros compartilhados.

---

### 4.9 GoalDetail

**Consumo API:** `GET /goals/:id/deposits`, `POST /goals/:id/deposit`

Histórico de aportes + botão "Depositar" com modal de valor.

---

### 4.10 CategoryDetail

**Consumo API:** `GET /transactions?category=:id`, `PATCH /budgets/categories/:id`

Gráfico sparkline (Fase 2) + lista de transações da categoria + modal de edição de limite.

---

## 5. Componentes Reutilizáveis Esperados

| Componente | Props | Descrição |
|---|---|---|
| `<ProgressBar>` | `value, color, height?, style?` | Barra de progresso |
| `<Card>` | `children, style?, onPress?` | Container padrão |
| `<Badge>` | `label, color, style?` | Tag colorida |
| `<SectionHeader>` | `title, actionLabel?, onAction?` | Cabeçalho de seção |
| `<EmptyState>` | `message, icon?, action?` | Placeholder lista vazia |
| `<LoadingSpinner>` | `size?, color?` | Carregamento |
| `<ErrorBanner>` | `message, onRetry` | Erro recuperável |
| `<SkeletonBlock>` | `width, height, borderRadius?` | Placeholder loading |

---

## 6. Padrões de Estado de UI

Toda tela com dados da API deve implementar:

```
loading → Skeletons ou spinner central
error   → <ErrorBanner message onRetry>
empty   → <EmptyState message="Nenhum registro..." icon="📋" action={...}>
success → Renderização normal
```

---

## 7. Acessibilidade

- `accessibilityLabel` em todos botões e ícones interativos
- `accessibilityRole` em elementos de lista e botões
- Contraste mínimo WCAG AA (4.5:1)
- Suporte a Dynamic Type e VoiceOver/TalkBack (Fase 5)

---

## 8. Internacionalização

- Locale: `pt-BR`
- Moeda: BRL via `fmt()` (`src/utils/helpers.ts`)
- Datas via `fmtDate()` e `relativeDate()` de helpers
- Preparar i18n namespace para Fase 5 (`i18next`)

---

## 9. Status de Sincronização Offline

### 9.1 Indicador de Sync (SyncStatusBar)

Exibido no topo das telas principais quando o sync está ativo ou offline. Usa o hook `useSync` para obter o status.

| Status | Aparência |
|---|---|
| `idle` | Oculto |
| `syncing` | Barra sutil animada com `brand.green` + texto "Sincronizando..." |
| `offline` | Faixa `warning` + texto "Sem conexão — dados locais" |
| `error` | Faixa `expense` + texto "Erro na sincronização" + botão "Tentar novamente" |

### 9.2 Indicadores de Dados Locais

Itens de lista criados offline (pendentes de sync) exibem um ícone sutil `Feather "clock"` em `text.muted` ao lado do timestamp.

---

*Atualizado: Março 2026 · FamilyFinance v1.1.0-beta*
