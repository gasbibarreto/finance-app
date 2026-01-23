<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFinanceStore } from '@/stores/finance'
import { formatCurrency } from '@/utils/utils'
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
        <img src="/images/chart.png" alt="chart budget" />
        <p>Spending Summary</p>
        <ul class="budgets__content__card__total__list">
          <li
            v-for="item in budgets"
            :key="item.category"
            :style="{ borderLeft: '4px solid ' + item.theme }"
          >
            <div class="budgets__content__card__total__list__item">
              <span class="budgets__content__card__total__list__item__category">{{
                item.category
              }}</span>
              <div class="budgets__content__card__total__list__item__container">
                <span class="budgets__content__card__total__list__item__container__amount">{{
                  totalSpendingAmountByCategory(item.category)
                }}</span>
                <span class="budgets__content__card__total__list__item__container__maximum"
                  >of {{ formatCurrency(item.maximum) }}</span
                >
              </div>
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
  // Header
  &__header {
    display: flex;
    justify-content: space-between;

    h1 {
      font-size: @font-size-xl;
      font-weight: @font-weight-bold;
      color: @grey-900;
    }

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

  // Content
  &__content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: @spacing-300;
    margin-top: @spacing-300;

    // Spending Summary Card
    &__card__total {
      display: flex;
      flex-direction: column;
      gap: @spacing-200;
      margin-top: @spacing-300;
      background-color: @white;
      border-radius: @spacing-150;
      padding: @spacing-300;
      min-height: 400px;
      align-self: start;

      img {
        align-self: center;
        width: 200px;
        height: 200px;
      }

      p {
        font-size: @font-size-md;
        font-weight: @font-weight-bold;
        color: @grey-900;
      }
    }

    // Spending Summary List
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
        color: @grey-900;

        &__category {
          font-size: @font-size-xs;
          font-weight: @font-weight-normal;
          color: @grey-900;
        }

        &__container {
          display: flex;
          align-items: flex-end;

          &__amount {
            font-size: @font-size-sm;
            font-weight: @font-weight-bold;
            color: @grey-900;
            margin-right: @spacing-100;
          }

          &__maximum {
            font-size: @font-size-xs;
            font-weight: @font-weight-normal;
            color: @grey-900;
          }
        }
      }
    }
  }

  // Budget Cards
  &__card {
    &__list {
      list-style: none;
      padding: 0px;
      margin: 0px;
    }
  }

  @media (max-width: 768px) {
    &__content {
      grid-template-columns: 1fr;
    }
  }
}
</style>
