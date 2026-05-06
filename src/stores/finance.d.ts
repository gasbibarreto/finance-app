import type { Budget, Pot, Transaction } from '@/types/interfaces';
export declare const useFinanceStore: import("pinia").StoreDefinition<"finance", Pick<{
    balance: {
        current: number;
        income: number;
        expenses: number;
    };
    transactions: import("vue").Ref<{
        avatar: string;
        name: string;
        category: string;
        date: string;
        amount: number;
        recurring: boolean;
    }[], Transaction[] | {
        avatar: string;
        name: string;
        category: string;
        date: string;
        amount: number;
        recurring: boolean;
    }[]>;
    budgets: import("vue").Ref<{
        category: string;
        maximum: number;
        theme: string;
    }[], Budget[] | {
        category: string;
        maximum: number;
        theme: string;
    }[]>;
    pots: import("vue").Ref<{
        name: string;
        total: number;
        target: number;
        theme: string;
    }[], Pot[] | {
        name: string;
        total: number;
        target: number;
        theme: string;
    }[]>;
    updatedBalance: import("vue").ComputedRef<{
        current: number;
        income: number;
        expenses: number;
    }>;
    recurringBillsPaid: import("vue").ComputedRef<{
        total: number;
        count: number;
    }>;
    recurringBillsUpcoming: import("vue").ComputedRef<{
        total: number;
        count: number;
    }>;
    recurringBillsDue: import("vue").ComputedRef<{
        total: number;
        count: number;
    }>;
    addTransaction: (transaction: Transaction) => void;
    updateTransaction: (index: number, updatedTransaction: Partial<Transaction>) => void;
    deleteTransaction: (index: number) => void;
    deleteTransactionById: (date: string, name: string) => void;
    addBudget: (newBudget: Budget) => void;
    updateBudget: (category: string, updatedBudget: Partial<Budget>) => void;
    deleteBudget: (category: string) => void;
    addPot: (newPot: Pot) => void;
    updatePot: (name: string, updatedPot: Pot) => void;
    deletePot: (name: string) => void;
    addMoneyToPot: (name: string, amount: number) => void;
    withdrawMoneyFromPot: (name: string, amount: number) => void;
    updateBalance: () => void;
    resetData: () => void;
}, "balance" | "transactions" | "budgets" | "pots">, Pick<{
    balance: {
        current: number;
        income: number;
        expenses: number;
    };
    transactions: import("vue").Ref<{
        avatar: string;
        name: string;
        category: string;
        date: string;
        amount: number;
        recurring: boolean;
    }[], Transaction[] | {
        avatar: string;
        name: string;
        category: string;
        date: string;
        amount: number;
        recurring: boolean;
    }[]>;
    budgets: import("vue").Ref<{
        category: string;
        maximum: number;
        theme: string;
    }[], Budget[] | {
        category: string;
        maximum: number;
        theme: string;
    }[]>;
    pots: import("vue").Ref<{
        name: string;
        total: number;
        target: number;
        theme: string;
    }[], Pot[] | {
        name: string;
        total: number;
        target: number;
        theme: string;
    }[]>;
    updatedBalance: import("vue").ComputedRef<{
        current: number;
        income: number;
        expenses: number;
    }>;
    recurringBillsPaid: import("vue").ComputedRef<{
        total: number;
        count: number;
    }>;
    recurringBillsUpcoming: import("vue").ComputedRef<{
        total: number;
        count: number;
    }>;
    recurringBillsDue: import("vue").ComputedRef<{
        total: number;
        count: number;
    }>;
    addTransaction: (transaction: Transaction) => void;
    updateTransaction: (index: number, updatedTransaction: Partial<Transaction>) => void;
    deleteTransaction: (index: number) => void;
    deleteTransactionById: (date: string, name: string) => void;
    addBudget: (newBudget: Budget) => void;
    updateBudget: (category: string, updatedBudget: Partial<Budget>) => void;
    deleteBudget: (category: string) => void;
    addPot: (newPot: Pot) => void;
    updatePot: (name: string, updatedPot: Pot) => void;
    deletePot: (name: string) => void;
    addMoneyToPot: (name: string, amount: number) => void;
    withdrawMoneyFromPot: (name: string, amount: number) => void;
    updateBalance: () => void;
    resetData: () => void;
}, "updatedBalance" | "recurringBillsPaid" | "recurringBillsUpcoming" | "recurringBillsDue">, Pick<{
    balance: {
        current: number;
        income: number;
        expenses: number;
    };
    transactions: import("vue").Ref<{
        avatar: string;
        name: string;
        category: string;
        date: string;
        amount: number;
        recurring: boolean;
    }[], Transaction[] | {
        avatar: string;
        name: string;
        category: string;
        date: string;
        amount: number;
        recurring: boolean;
    }[]>;
    budgets: import("vue").Ref<{
        category: string;
        maximum: number;
        theme: string;
    }[], Budget[] | {
        category: string;
        maximum: number;
        theme: string;
    }[]>;
    pots: import("vue").Ref<{
        name: string;
        total: number;
        target: number;
        theme: string;
    }[], Pot[] | {
        name: string;
        total: number;
        target: number;
        theme: string;
    }[]>;
    updatedBalance: import("vue").ComputedRef<{
        current: number;
        income: number;
        expenses: number;
    }>;
    recurringBillsPaid: import("vue").ComputedRef<{
        total: number;
        count: number;
    }>;
    recurringBillsUpcoming: import("vue").ComputedRef<{
        total: number;
        count: number;
    }>;
    recurringBillsDue: import("vue").ComputedRef<{
        total: number;
        count: number;
    }>;
    addTransaction: (transaction: Transaction) => void;
    updateTransaction: (index: number, updatedTransaction: Partial<Transaction>) => void;
    deleteTransaction: (index: number) => void;
    deleteTransactionById: (date: string, name: string) => void;
    addBudget: (newBudget: Budget) => void;
    updateBudget: (category: string, updatedBudget: Partial<Budget>) => void;
    deleteBudget: (category: string) => void;
    addPot: (newPot: Pot) => void;
    updatePot: (name: string, updatedPot: Pot) => void;
    deletePot: (name: string) => void;
    addMoneyToPot: (name: string, amount: number) => void;
    withdrawMoneyFromPot: (name: string, amount: number) => void;
    updateBalance: () => void;
    resetData: () => void;
}, "addTransaction" | "updateTransaction" | "deleteTransaction" | "deleteTransactionById" | "addBudget" | "updateBudget" | "deleteBudget" | "addPot" | "updatePot" | "deletePot" | "addMoneyToPot" | "withdrawMoneyFromPot" | "updateBalance" | "resetData">>;
