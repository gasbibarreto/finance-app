export type ComponentsItens = 'Overview' | 'Transactions' | 'Budgets' | 'Pots' | 'Recurring Bills'

export type ColorStyles = {
  green: string
  yellow: string
  cyan: string
  navy: string
  red: string
  purple: string
  'purple-other': string // Propriedades com hífens devem usar aspas
  tourquise: string
  brown: string
  magenta: string
  blue: string
  'navy-grey': string // Propriedades com hífens devem usar aspas
  'army-green': string // Propriedades com hífens devem usar aspas
  gold: string
  orange: string
  white: string
}

export interface Pot {
  name: string
  target: number
  total: number
  theme: string
}
