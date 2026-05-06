type ComponentsItens = 'Overview' | 'Transactions' | 'Budgets' | 'Pots' | 'Recurring Bills';
export declare const SORT_ITENS: readonly ["Latest", "Oldest", "A to Z", "Z to A", "Highest", "Lowest"];
export declare const BUDGET_CATEGORIES: readonly ["Food & Drink", "Housing", "Transportation", "Utilities", "Health & Fitness", "Entertainment", "Other", "All Transactions"];
type SortItens = (typeof SORT_ITENS)[number];
type BudgetCategories = (typeof BUDGET_CATEGORIES)[number];
export type { ComponentsItens, SortItens, BudgetCategories };
