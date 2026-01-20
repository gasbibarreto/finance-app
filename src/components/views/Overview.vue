<script setup lang="ts">
import { computed, ref, type Component } from 'vue'
import Card from '../ui/Card.vue'
import type { ComponentsItens } from '@/types'
import { formatCurrency } from '@/utils/utils'
import { useFinanceStore } from '@/stores/finance'
import TransactionsList from '../transactions/TransactionsList.vue'

// STORE
const financeStore = useFinanceStore()
const balance = computed(() => financeStore.balance)
const pots = computed(() => financeStore.pots.slice(0, 4))
const transactions = computed(() => financeStore.transactions)
const budgets = computed(() => financeStore.budgets)
const recurringBillsPaied = computed(() => financeStore.recurringBillsPaied)
const recurringBillsUpcoming = computed(() => financeStore.recurringBillsUpcoming)
const recurringBillsDue = computed(() => financeStore.recurringBillsDue.total)

// POTS
const totalSaved = computed(() => {
  return pots.value.reduce((total, pot) => total + (pot.total ?? 0), 0)
})

// FUNCTIONS
function redirectToView(viewName: ComponentsItens) {
  emit('selectedMenuItem', viewName)
}

// EMITS
const emit = defineEmits<{
  (e: 'selectedMenuItem', value: ComponentsItens): void
}>()
</script>
<template>
  <div class="overview">
    <h1 class="overview__title">Overview</h1>

    <section class="overview__summary">
      <div class="overview__summary-card overview__summary-card--balance">
        <h2>Current Balance</h2>
        <p>{{ formatCurrency(balance.current) }}</p>
      </div>

      <div class="overview__summary-card overview__summary-card--income">
        <h2>Current Income</h2>
        <p>{{ formatCurrency(balance.income) }}</p>
      </div>

      <div class="overview__summary-card overview__summary-card--expenses">
        <h2>Current Expenses</h2>
        <p>{{ formatCurrency(balance.expenses) }}</p>
      </div>
    </section>

    <section class="overview__categories">
      <div class="overview__categories-card overview__categories-card--left">
        <Card title="Pots" card-action="See Details" @actionClick="redirectToView('Pots')">
          <div class="overview__pots">
            <div class="overview__pots__total">
              <img src="/images/icon-pot.svg" alt="" />
              <div class="overview__pots__total-info">
                <p>Total saved</p>
                <span>{{ '$' + totalSaved }}</span>
              </div>
            </div>
            <div class="overview__pots__amounts">
              <ul>
                <li
                  v-for="pot in pots"
                  :key="pot.name"
                  :style="{ borderLeft: '4px solid ' + pot.theme }"
                >
                  <div>
                    <span>{{ pot.name }}</span>
                    <span>{{ formatCurrency(pot.total) }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        <Card
          title="Transactions"
          card-action="View All"
          @actionClick="redirectToView('Transactions')"
        >
          <TransactionsList :transactions="transactions.slice(0, 5)" />
        </Card>
      </div>

      <div class="overview__categories-card overview__categories-card--right">
        <Card title="Budgets" cardAction="See Details" @actionClick="redirectToView('Budgets')">
          <div class="overview__budgets">
            <div class="overview__budgets__total">
              <img src="/images/chart.png" />
            </div>
            <div class="overview__budgets__categories">
              <ul>
                <li
                  v-for="budget in budgets"
                  :key="budget.category"
                  :style="{ borderLeft: '4px solid ' + budget.theme }"
                >
                  <div class="overview__budgets__categories--values">
                    <span>{{ budget.category }}</span>
                    <span>{{ formatCurrency(budget.maximum) }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        <Card
          title="Recurring Bills"
          cardAction="See Details"
          @actionClick="redirectToView('Recurring Bills')"
        >
          <div class="overview__recurring-bills">
            <div class="overview__recurring-bills__paied">
              <p>Paid Bills</p>
              <span>{{ formatCurrency(recurringBillsPaied.total) }}</span>
            </div>
            <div class="overview__recurring-bills__upcoming">
              <p>Upcoming Bills</p>
              <span>{{ formatCurrency(recurringBillsUpcoming.total) }}</span>
            </div>
            <div class="overview__recurring-bills__due">
              <p>Due Bills</p>
              <span>{{ formatCurrency(recurringBillsDue) }}</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  </div>
</template>
<style scoped lang="less">
.overview {
  &__title {
    font-size: @font-size-xl;
    font-weight: @font-weight-bold;
    color: @grey-900;
  }

  &__summary {
    display: flex;
    max-width: 100%; 
    margin-top: @spacing-400;
    margin-bottom: @spacing-400;
    gap: @spacing-150;

    &-card {
      background-color: @white;
      border-radius: 12px;
      padding: @spacing-300;
      flex: 1; 
      min-width: 0; 
      box-sizing: border-box;

      h2 {
        font-size: @font-size-sm;
        font-weight: @font-weight-normal;
      }

      p {
        font-size: @font-size-xl;
        font-weight: @font-weight-bold;
        margin-top: @spacing-150;
      }

      &--balance {
        background-color: @grey-900;
        color: @white;
      }
    }
  }

  &__categories {
    display: flex;
    justify-content: space-between;
    gap: @spacing-300;

    &-card {
      display: flex;
      flex-direction: column;
      flex: 1; 

      &--left {
        display: flex;
        width: 580px;
        width: 100%;
      }

      &--right {
        display: flex;
        width: 470px;
        width: 100%;
      }

      &__content {
        background-color: @white;
        border-radius: 12px;
        padding: @spacing-300;
        margin-bottom: @spacing-150;

        h2 {
          font-size: @font-size-md;
        }

        img {
          width: @spacing-500;
          height: @spacing-500;
        }
      }
    }
  }

  .overview__pots {
    display: flex;
    align-items: center;
    gap: @spacing-250;
    margin-bottom: @spacing-200;
    margin-top: @spacing-250;

    &__total {
      display: flex;
      align-items: center;
      background-color: @beige-100;
      width: 247px;
      height: 80px;
      border-radius: 12px;
      padding: @spacing-200;

      p {
        font-size: @font-size-xs;
        color: @grey-500;
        margin-bottom: @spacing-100;
      }

      span {
        font-size: @font-size-lg;
        font-weight: @font-weight-bold;
        line-height: 120%;
      }

      &-info {
        margin-left: @spacing-150;
      }
    }

    &__amounts {
      ul {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: @spacing-150;
        list-style: none;
        padding: 0;
      }

      li > div {
        display: flex;
        flex-direction: column;
        gap: @spacing-150;
      }

      li {
        margin-bottom: @spacing-100;
        padding-left: @spacing-150;

        span:first-child {
          font-size: @font-size-xs;
          color: @grey-500;
        }

        span:last-child {
          font-size: @font-size-xs;
          font-weight: @font-weight-bold;
        }
      }
    }
  }

  .overview__budgets {
    display: flex;
    gap: @spacing-300;
    margin-top: @spacing-400;
    margin-bottom: @spacing-250;
    padding: @spacing-100 0;
    &__total {
      p {
        font-size: @font-size-sm;
        color: @grey-900;
      }
    }

    &__categories {
      ul {
        list-style: none;
        padding: 0px;
        margin-top: @spacing-200;
      }

      li {
        margin-bottom: @spacing-200;
        padding: @spacing-50 @spacing-200;

        span:first-child {
          font-size: @font-size-xs;
          color: @grey-500;
          padding-bottom: @spacing-50;
        }

        span:last-child {
          font-size: @font-size-sm;
          font-weight: @font-weight-bold;
        }
      }

      &--values {
        display: flex;
        flex-direction: column;
      }
    }
  }

  .overview__recurring-bills {
    display: flex;
    flex-direction: column;
    gap: @spacing-150;
    margin-top: @spacing-300;

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: @beige-100;
      padding: @spacing-250 @spacing-200;
      border-radius: 8px;
    }

    p {
      font-size: @font-size-xs;
      color: @grey-900;
    }

    span {
      font-size: @font-size-sm;
      font-weight: @font-weight-bold;
    }

    &__paied {
      border-left: 4px solid @green;
    }

    &__upcoming {
      border-left: 4px solid @yellow;
    }

    &__due {
      border-left: 4px solid @cyan;
    }
  }

  @media (max-width: 1024px) {
    align-items: flex-start;

    &__summary {
      align-items: flex-start;
      justify-content: flex-start;
      gap: @spacing-200;
    }

    &__categories {
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: @spacing-200;
    }
  }

  @media (max-width: 768px) {
    &__summary {
      flex-direction: column;

      &-card {
        width: 100%;
      }
    }

    .overview__budgets {
      flex-direction: column;

      &__categories {
        ul {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }
      }

    }

    .overview__pots {
      flex-wrap: wrap;
    }
  }


}
</style>
