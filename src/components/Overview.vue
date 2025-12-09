<script setup lang="ts">
import data from '@/assets/data/data.json'
import { computed, ref, type Component } from 'vue'
import Card from './Card.vue'
import type { ComponentsItens } from '@/types.ts'
import { getImageUrl, formatCurrency } from '@/common/common'
import { useFinanceStore } from '@/stores/finance'

// STORE
const financeStore = useFinanceStore()
const balance = computed(() => financeStore.balance)
const pots = computed(() => financeStore.pots.slice(0, 4))
const transactions = computed(() => financeStore.transactions.slice(0, 5))
const budgets = computed(() => financeStore.budgets)

// POTS
const totalSaved = computed(() => {
  return pots.value.reduce((total, pot) => total + (pot.total ?? 0), 0)
})

// RECORRING BILLS
const recurringBillsPaied = computed(() => {
  // capturar pagamentos com data anterior a hoje
  const dateToday = new Date().getDate()
  const paidBillsPerDate = transactions.value.filter((bill) => {
    const billDate = new Date(bill.date).getDate()
    if (bill.recurring === true && billDate < dateToday) {
      return bill.amount
    }
  })

  return Math.ceil(
    Math.abs(paidBillsPerDate.reduce((total, bill) => total + (bill.amount ?? 0), 0)),
  )
})

const recurringBillsUpcoming = computed(() => {
  // capturar pagamentos com data posterior a hoje
  const dateToday = new Date().getDate()
  const upcomingBillsPerDate = transactions.value.filter((bill) => {
    const billDate = new Date(bill.date).getDate()
    if (bill.recurring === true && billDate >= dateToday) {
      return bill.amount
    }
  })

  return Math.ceil(
    Math.abs(upcomingBillsPerDate.reduce((total, bill) => total + (bill.amount ?? 0), 0)),
  )
})

const recurringBillsDue = computed(() => {
  // capturar pagamentos com data igual a hoje
  const dateToday = new Date().getDate()
  const dueBillsPerDate = data.transactions.filter((bill) => {
    const billDate = new Date(bill.date).getDate()
    if (bill.recurring === true && billDate === dateToday) {
      return bill.amount
    }
  })
  return Math.ceil(Math.abs(dueBillsPerDate.reduce((total, bill) => total + (bill.amount ?? 0), 0)))
})

// FUNCTIONS
function redirectToView(viewName: ComponentsItens) {
  emit('selectedMenuItem', viewName)
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
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
              <img src="../assets/images/icon-pot.svg" alt="" />
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
          <div class="overview__transaction">
            <ul>
              <li v-for="transaction in transactions" :key="transaction.name">
                <div class="overview__transaction__name">
                  <img :src="getImageUrl(transaction.avatar)" alt="" />
                  <span>{{ transaction.name }}</span>
                </div>
                <div class="overview__transaction__amount">
                  <span
                    :class="{
                      'overview__transaction__amount--color': transaction.amount > 0,
                    }"
                    >{{ formatCurrency(transaction.amount) }}
                  </span>
                  <span>{{ formatDate(transaction.date) }}</span>
                </div>
              </li>
            </ul>
          </div>
        </Card>
      </div>

      <div class="overview__categories-card overview__categories-card--right">
        <Card title="Budgets" cardAction="See Details" @actionClick="redirectToView('Budgets')">
          <div class="overview__budgets">
            <div class="overview__budgets__total">
              <img src="../assets/images/chart.png" />
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
              <span>{{ formatCurrency(recurringBillsPaied) }}</span>
            </div>
            <div class="overview__recurring-bills__upcoming">
              <p>Upcoming Bills</p>
              <span>{{ formatCurrency(recurringBillsUpcoming) }}</span>
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
  display: flex;
  flex-direction: column;

  &__title {
    font-size: @font-size-xl;
    font-weight: 600;
  }

  &__summary {
    display: flex;
    margin-top: @spacing-400;
    margin-bottom: @spacing-400;

    &-card {
      background-color: @white;
      border-radius: 12px;
      padding: @spacing-300;
      width: 100%;

      h2 {
        font-size: @font-size-sm;
        font-weight: @font-weight-normal;
      }

      p {
        font-size: @font-size-xl;
        font-weight: @font-weight-bold;
        margin-top: @spacing-150;
      }

      /* spacing between cards */
      & + & {
        margin-left: @spacing-150;
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

      &--left {
        display: flex;
        width: 580px;
      }

      &--right {
        display: flex;
        width: 470px;
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

  .overview__transaction {
    ul {
      list-style: none;
      padding: 0;
    }

    li {
      display: flex;
      border-bottom: 1px solid @grey-100;
      padding-top: 12px;
      padding-bottom: 10px;
    }

    img {
      width: @spacing-500;
      height: @spacing-500;
      border-radius: 50%;
      margin-right: @spacing-150;
    }

    &__name {
      display: flex;
      flex: 1;
      align-items: center;
      margin-bottom: @spacing-150;

      span {
        font-size: @font-size-sm;
        font-weight: @font-weight-bold;
      }
    }

    &__amount {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: @spacing-100;

      span:first-child {
        font-weight: @font-weight-bold;
        font-style: Regular;
        font-size: @font-size-sm;
      }

      span:last-child {
        font-weight: @font-weight-normal;
        font-style: Regular;
        font-size: @font-size-xs;
      }

      &--color {
        color: @green;
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
}
</style>
