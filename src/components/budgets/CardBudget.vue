<script setup lang="ts">
import { computed, ref, type PropType } from 'vue'
import type { Budget, Transaction } from '@/types/interfaces'
import { formatCurrency, formatPercentage } from '@/utils/utils'
import Card from '../ui/Card.vue'
import ActionsModal from '../actionsModal/ActionsModal.vue'
import TransactionsList from '../transactions/TransactionsList.vue'

const props = defineProps({
  budget: {
    type: Object as PropType<Budget>,
    required: true,
  },
  transactions: {
    type: Array as PropType<Transaction[]>,
    required: true,
  },
})

const openModalActions = ref(false)

const budgetValuePercentage = computed(() => {
  const percentage = Math.abs((totalSpendingPerCategory(props.budget.category) / props.budget.maximum) * 100)
  return formatPercentage(percentage)
});

function totalSpendingPerCategory(category: string) {
  return props.transactions
    .filter((transaction: Transaction) => transaction.category === category)
    .reduce((total: number, transaction: Transaction) => total + transaction.amount, 0)
}

function totalBudgetSpend(category: string) {
  return formatCurrency(totalSpendingPerCategory(category))
}

function totalBudgetRemaining(category: string) {
  return formatCurrency(props.budget.maximum - totalSpendingPerCategory(category))
}

function redirectToView(view: string) {
  console.log(view)
}
</script>
<template>
  <div class="card-budget">
    <div class="card-budget__header">
      <div class="card-budget__header__title">
        <span
          class="card-budget__header__title__bullet"
          :style="{ backgroundColor: budget.theme }"
        ></span>
        <h2>{{ budget.category }}</h2>
      </div>
      <div class="card-budget__header__icon-wrapper">
        <img
          src="/images/icon-ellipsis.svg"
          @click="openModalActions = !openModalActions"
          alt="ellipsis"
        />
        <ActionsModal
          v-if="openModalActions"
          :actions-type="'Budget'"
          :actions-title="budget.category"
          :actions-value="budget.maximum"
          :actions-theme="budget.theme"
          @close-actions-modal="openModalActions = false"
        />
      </div>
    </div>
    <div class="card-budget__content">
      <p>{{ 'Maximum of ' + formatCurrency(budget.maximum) }}</p>
      <progress 
      class="card-budget__content__progress" 
      :style="{ '--progress-color': budget.theme }"
      :value="budgetValuePercentage" 
      max="100">
    </progress>
    <p>{{ budgetValuePercentage }}%</p>

    </div>
    <div class="card-budget__content__cost">
      <div class="card-budget__content__cost__spent">
        <p>Spent</p>
        <span>{{ totalBudgetSpend(budget.category) }}</span>
      </div>
      <div class="card-budget__content__cost__remaining">
        <p>Remaining</p>
        <span>{{ totalBudgetRemaining(budget.category) }}</span>
      </div>
    </div>
    <div class="card-budget__info"></div>
    <div class="card-budget__list">
      <Card
        class="card-budget__list__card"
        title="Latest Spendings"
        cardAction="See All"
        :style-color="true"
        @actionClick="redirectToView('Transactions')"
      >
        <TransactionsList :transactions="transactions.slice(0, 3)" />
      </Card>
    </div>
  </div>
</template>
<style lang="less" scoped>
.card-budget {
  background-color: @white;
  border-radius: @spacing-150;
  margin-top: @spacing-300;
  padding: @spacing-300;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: @spacing-100;

    &__title {
      display: flex;
      align-items: center;
      gap: @spacing-100;

      &__bullet {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        flex-shrink: 0;
      }
    }

    &__icon-wrapper {
      position: relative;
      display: inline-block;
      cursor: pointer;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    margin-top: @spacing-200;

    p {
      font-size: @font-size-xs;
      font-weight: @font-weight-normal;
      color: @grey-500;
    }

    &__progress {
      width: 100%;
      height: 30px;
      appearance: none;
      border: 3px solid @beige-100;
      background-color: @beige-100;
      border-radius: 5px;
      margin-top: @spacing-150;

      &::-webkit-progress-bar {
        background-color: @beige-100;
        border-radius: 5px;
      }

      &::-webkit-progress-value {
        background-color: var(--progress-color, @beige-100);
        border-radius: 5px;
      }

      &::-moz-progress-bar {
        background-color: var(--progress-color, @beige-100);
        border-radius: 5px;
      }
    }

    &__cost {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin-top: @spacing-200;

      p {
        font-size: @font-size-xs;
        color: @grey-500;
        padding-bottom: @spacing-100;
      }

      span {
        font-size: @font-size-sm;
        font-weight: @font-weight-bold;
      }

      &__spent {
        border-left: 4px solid @green;
        padding-left: @spacing-200;
      }

      &__remaining {
        border-left: 4px solid @beige-100;
        padding-left: @spacing-200;
      }
    }
  }

  &__list {
    margin-top: @spacing-200;

    &__card {
      background-color: @beige-100;
      border-radius: @spacing-150;
    }

    &__transactions {
      list-style: none;
      padding: 0;
      margin: 0;

      &__item {
        display: flex;

        img {
          width: 24px;
          height: 24px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
