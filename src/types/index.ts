type ComponentsItens = 'Overview' | 'Transactions' | 'Budgets' | 'Pots' | 'Recurring Bills'

export const SORT_ITENS = ['Latest', 'Oldest', 'A to Z', 'Z to A', 'Highest', 'Lowest'] as const

export const BUDGET_CATEGORIES = [
  'Food & Drink',
  'Housing',
  'Transportation',
  'Utilities',
  'Health & Fitness',
  'Entertainment',
  'Other',
  'All Transactions',
] as const

type SortItens = (typeof SORT_ITENS)[number]

type BudgetCategories = (typeof BUDGET_CATEGORIES)[number]

export type { ComponentsItens, SortItens, BudgetCategories }
