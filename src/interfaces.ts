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
