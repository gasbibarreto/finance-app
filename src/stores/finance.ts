import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import dataJson from '@/assets/data/data.json'

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

export const useFinanceStore = defineStore('finance', () => {
  // Estado reativo dos dados
  const balance = reactive<Balance>({ ...dataJson.balance })
  const transactions = ref<Transaction[]>([...dataJson.transactions])
  const budgets = ref<Budget[]>([...dataJson.budgets])
  const pots = ref<Pot[]>([...dataJson.pots])

  // Computed para balance atualizado
  const updatedBalance = computed(() => {
    const income = transactions.value
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0)

    const expenses = Math.abs(
      transactions.value.filter((t) => t.amount < 0).reduce((sum, t) => sum + t.amount, 0),
    )

    return {
      current: income - expenses,
      income,
      expenses,
    }
  })

  // Funções para manipular transações
  function addTransaction(transaction: Transaction) {
    transactions.value.unshift(transaction)
    updateBalance()
  }

  function updateTransaction(index: number, updatedTransaction: Partial<Transaction>) {
    if (transactions.value[index]) {
      Object.assign(transactions.value[index], updatedTransaction)
      updateBalance()
    }
  }

  function deleteTransaction(index: number) {
    if (transactions.value[index]) {
      transactions.value.splice(index, 1)
      updateBalance()
    }
  }

  function deleteTransactionById(date: string, name: string) {
    const index = transactions.value.findIndex((t) => t.date === date && t.name === name)
    if (index !== -1) {
      transactions.value.splice(index, 1)
      updateBalance()
    }
  }

  // Funções para manipular budgets
  function addBudget(newBudget: Budget) {
    budgets.value.push(newBudget)
  }

  function updateBudget(index: number, updatedBudget: Partial<Budget>) {
    if (budgets.value[index]) {
      Object.assign(budgets.value[index], updatedBudget)
    }
  }

  function deleteBudget(index: number) {
    if (budgets.value[index]) {
      budgets.value.splice(index, 1)
    }
  }

  // Funções para manipular pots
  function addPot(newPot: Pot) {
    const existingPot = pots.value.find(
      (pot) => pot.name.toLowerCase() === newPot.name.toLowerCase(),
    )
    if (existingPot) {
      return
    } else {
      pots.value.push(newPot)
    }
  }

  function updatePot(name: string, updatedPot: Pot) {
    const potIndex = pots.value.findIndex((pot) => pot.name.toLowerCase() === name.toLowerCase())
    if (potIndex !== -1 && pots.value[potIndex]) {
      Object.assign(pots.value[potIndex], updatedPot)
    } else {
      console.warn(`Pot "${name}" not found to update`)
    }
  }

  function deletePot(name: String) {
    const potIndex = pots.value.findIndex((pot) => pot.name.toLowerCase() === name.toLowerCase())
    if (pots.value[potIndex]) {
      console.log('potIndex', potIndex)
      pots.value.splice(potIndex, 1)
    } else {
      console.warn(`Pot "${name}" not found to delete`)
    }
  }

  function addMoneyToPot(name: string, amount: number) {
    const potIndex = pots.value.findIndex((pot) => pot.name.toLowerCase() === name.toLowerCase())
    console.log(potIndex)
    if (potIndex !== -1 && pots.value[potIndex]) {
      pots.value[potIndex].total += amount
    } else {
      console.warn(`Pot "${name}" not found to add money`)
    }
  }

  function withdrawMoneyFromPot(name: string, amount: number) {
    const potIndex = pots.value.findIndex((pot) => pot.name.toLowerCase() === name.toLowerCase())
    if (potIndex !== -1 && pots.value[potIndex] && pots.value[potIndex].total >= amount) {
      pots.value[potIndex].total -= amount
    } else {
      console.warn(`Pot "${name}" not found to withdraw money or amount is greater than total`)
    }
  }

  // Atualizar balance
  function updateBalance() {
    const newBalance = updatedBalance.value
    balance.current = newBalance.current
    balance.income = newBalance.income
    balance.expenses = newBalance.expenses
  }

  // Resetar para dados iniciais
  function resetData() {
    balance.current = dataJson.balance.current
    balance.income = dataJson.balance.income
    balance.expenses = dataJson.balance.expenses
    transactions.value = [...dataJson.transactions]
    budgets.value = [...dataJson.budgets]
    pots.value = [...dataJson.pots]
  }

  return {
    // Estado
    balance,
    transactions,
    budgets,
    pots,
    // Computed
    updatedBalance,
    // Funções de transações
    addTransaction,
    updateTransaction,
    deleteTransaction,
    deleteTransactionById,
    // Funções de budgets
    addBudget,
    updateBudget,
    deleteBudget,
    // Funções de pots
    addPot,
    updatePot,
    deletePot,
    addMoneyToPot,
    withdrawMoneyFromPot,
    // Utilitários
    updateBalance,
    resetData,
  }
})
