type ComponentsItens = 'Overview' | 'Transactions' | 'Budgets' | 'Pots' | 'Recurring Bills'

type SortItens = 'Latest' | 'Oldest' | 'A to Z' | 'Z to A' | 'Highest' | 'Lowest'

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

type BudgetCategories = (typeof BUDGET_CATEGORIES)[number]

export type { ComponentsItens, SortItens, BudgetCategories }
