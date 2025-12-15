export type ComponentsItens = 'Overview' | 'Transactions' | 'Budgets' | 'Pots' | 'Recurring Bills'

export interface Pot {
  name: string
  target: number
  total: number
  theme: string
}

export interface Budget {
  category: string
  maximum: number
  theme: string
}

export interface Transaction {
  avatar: string
  name: string
  category: string
  date: string
  amount: number
  recurring: boolean
}
