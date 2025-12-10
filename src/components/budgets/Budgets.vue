<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFinanceStore } from '@/stores/finance'
import CardBudget from './CardBudget.vue'

const financeStore = useFinanceStore()
const budgets = computed(() => financeStore.budgets)
const transactions = computed(() => financeStore.transactions)

const showNewBudgetModal = ref(false)

function filterTransactionsByCategory(category: string) {
  const groupedByCategory = Object.groupBy(
    transactions.value,
    (transaction) => transaction.category,
  )
  return groupedByCategory[category]?.slice(0, 3)
}
</script>
<template>
  <div class="budgets">
    <div class="budgets__header">
      <h1>Budgets</h1>
      <button @click="showNewBudgetModal = true">+ Add New Budget</button>
    </div>
    <div class="budgets__card">
      <ul class="budgets__card__list">
        <li v-for="budget in budgets" :key="budget.theme">
          <CardBudget
            :budget="budget"
            :transactions="filterTransactionsByCategory(budget.category) || []"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="less" scoped>
.budgets {
  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__card {

    &__list {
      list-style: none;
      padding: 0px;
      margin: 0px;
    }
  }
}
</style>
