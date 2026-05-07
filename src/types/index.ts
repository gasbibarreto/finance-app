export type ComponentsItens = 'Overview' | 'Transactions' | 'Budgets' | 'Pots' | 'Recurring Bills'

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

export type SortItens = (typeof SORT_ITENS)[number]

export type BudgetCategories = (typeof BUDGET_CATEGORIES)[number]

export interface Transaction {
  avatar: string
  name: string
  category: string
  date: string
  amount: number
  recurring: boolean
}

export interface Budget {
  category: string
  maximum: number
  theme: string
}

export interface Pot {
  name: string
  total: number
  target: number
  theme: string
}

export interface Balance {
  current: number
  income: number
  expenses: number
}
