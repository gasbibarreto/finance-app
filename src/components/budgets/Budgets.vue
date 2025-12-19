<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFinanceStore } from '@/stores/finance'
import { formatCurrency } from '@/common/common'
import CardBudget from './CardBudget.vue'
import AddNewBudget from './AddNewBudget.vue'

const financeStore = useFinanceStore()
const budgets = computed(() => financeStore.budgets)
const transactions = computed(() => financeStore.transactions)

const showNewBudgetModal = ref(false)

function handleShowNewBudgetModal() {
  showNewBudgetModal.value = true
}

function totalSpendingAmountByCategory(category: string) {
  const groupedByCategory = Object.groupBy(
    transactions.value,
    (transaction) => transaction.category,
  )
  const total = groupedByCategory[category]?.reduce(
    (total, transaction) => total + transaction.amount,
    0,
  )
  const absoluteTotal = Math.abs(total ?? 0)
  return absoluteTotal ? formatCurrency(absoluteTotal) : '$0.00'
}

function filterTransactionsByCategory(category: string) {
  const groupedByCategoryFilter = Object.groupBy(
    transactions.value,
    (transaction) => transaction.category,
  )
  return groupedByCategoryFilter[category]?.slice(0, 3)
}
</script>
<template>
  <div class="budgets">
    <div class="budgets__header">
      <h1>Budgets</h1>
      <button @click="handleShowNewBudgetModal()">+ Add New Budget</button>
      <AddNewBudget v-if="showNewBudgetModal" @close-new-budget="showNewBudgetModal = false" />
    </div>
    <div class="budgets__content">
      <div class="budgets__content__card__total">
        <img src="@/assets/images/chart.png" alt="chart budget" />
        <p>Spending Summary</p>
        <ul class="budgets__content__card__total__list">
          <li
            v-for="item in budgets"
            :key="item.category"
            :style="{ borderLeft: '4px solid ' + item.theme }"
          >
            <div class="budgets__content__card__total__list__item">
              <span>{{ item.category }}</span>
              <span>{{ totalSpendingAmountByCategory(item.category) }}</span>
              <span>of {{ formatCurrency(item.maximum) }}</span>
            </div>
          </li>
        </ul>
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
  </div>
</template>
<style lang="less" scoped>
.budgets {
  &__header {
    display: flex;
    justify-content: space-between;

    button {
      background-color: @grey-900;
      color: @white;
      padding: @spacing-100 @spacing-200;
      border-radius: @spacing-100;
      border: none;
      cursor: pointer;
      font-size: @font-size-xs;
    }
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: @spacing-300;

    &__card__total {
      display: flex;
      flex-direction: column;
      gap: @spacing-200;
    }

    &__card__total__list {
      list-style: none;
      padding: 0px;
      margin: 0px;

      &__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: @spacing-100;
        border-radius: @spacing-100;
        margin-bottom: @spacing-100;
      }
    }
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
