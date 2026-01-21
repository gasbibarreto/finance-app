<script setup lang="ts">
import { useFinanceStore } from '@/stores/finance'
import { computed, type Ref } from 'vue'
import { formatCurrency, getImagePath, formatDateOrdinal } from '@/utils/utils'
import { ref } from 'vue'
import type { SortItens } from '@/types'

const dateToday = ref(new Date().getDate())
const searchBill = ref('')
const sortedBills = ref<SortItens>('Latest' as SortItens)
const openSelectSortMobile = ref(false)
const sortItens = ref<SortItens[]>(['Latest', 'Oldest', 'A to Z', 'Z to A', 'Highest', 'Lowest'])

const financeStore = useFinanceStore()
const recurringBills = computed(() =>
  financeStore.transactions.filter((bill) => bill.recurring === true),
)
const recurringBillsPaied = computed(() => financeStore.recurringBillsPaied)
const recurringBillsUpcoming = computed(() => financeStore.recurringBillsUpcoming)
const recurringBillsDue = computed(() => financeStore.recurringBillsDue)
const totalBills = computed(
  () =>
    recurringBillsPaied.value.total +
    recurringBillsUpcoming.value.total +
    recurringBillsDue.value.total,
)

const recurringBillsFiltered = computed(() => {
  let recurringBillsCopy = [...recurringBills.value]

  const selectedSortFunction = {
    Latest: function latest(a: any, b: any) {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    },
    Oldest: function oldest(a: any, b: any) {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    },
    'A to Z': function aToZ(a: any, b: any) {
      return a.name.localeCompare(b.name)
    },
    'Z to A': function zToA(a: any, b: any) {
      return b.name.localeCompare(a.name)
    },
    Highest: function highest(a: any, b: any) {
      return b.amount - a.amount
    },
    Lowest: function lowest(a: any, b: any) {
      return a.amount - b.amount
    },
  }

  if (searchBill.value !== '') {
    recurringBillsCopy = recurringBillsCopy.filter((bill) =>
      bill.name.toLowerCase().includes(searchBill.value.toLowerCase()),
    )
  }

  if (sortedBills.value in selectedSortFunction) {
    recurringBillsCopy.sort((a, b) => selectedSortFunction[sortedBills.value as SortItens](a, b))
  }

  return recurringBillsCopy
})

function dueSoonFormatDate(date: string) {
  const dateToday = new Date().getDate()
  const dateBill = new Date(date).getDate()

  console.log('dateToday', dateToday)
  console.log('dateBill', dateBill)
  if (dateBill.toString() === dateToday.toString()) {
  } else {
  }

  //return formatDateOrdinal(date)
}
</script>
<template>
  <div class="recurring-bills">
    <div class="recurring-bills__header">
      <h1>Recurring Bills</h1>
    </div>
    <div class="recurring-bills__content">
      <div>
        <div class="recurring-bills__content__summary">
          <div class="recurring-bills__content__summary__total">
            <img src="/images/icon-recurring-bills.svg" alt="Icon recurring bills" />
            <h2>Total Bills</h2>
            <span>{{ formatCurrency(totalBills) }}</span>
          </div>
          <div class="recurring-bills__content__summary__all-bills">
            <h3>Summary</h3>
            <div class="recurring-bills__content__summary__all-bills__summary-item">
              <p>Paied Bills</p>
              <span>
                {{
                  recurringBillsPaied.count + ' (' + formatCurrency(recurringBillsPaied.total) + ')'
                }}
              </span>
            </div>
            <div class="recurring-bills__content__summary__all-bills__summary-item">
              <p>Total Upcoming</p>
              <span>
                {{
                  recurringBillsUpcoming.count +
                  ' (' +
                  formatCurrency(recurringBillsUpcoming.total) +
                  ')'
                }}
              </span>
            </div>
            <div class="recurring-bills__content__summary__all-bills__summary-item due-soon">
              <p>Due Soon</p>
              <span>
                {{ recurringBillsDue.count + ' (' + formatCurrency(recurringBillsDue.total) + ')' }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="recurring-bills__content__list">
        <div class="recurring-bills__content__list__search">
          <div class="recurring-bills__content__list__search__input">
            <input type="text" placeholder="Search bills" v-model="searchBill" />
            <img src="/images/icon-search.svg" alt="Icon search" />
          </div>
          <div class="recurring-bills__content__list__search__sort">
            <p>Sort by</p>
            <select v-model="sortedBills" >
              <option :value="option" v-for="option in sortItens" :key="option">{{ option || sortItens[0] }}</option>
            </select>
            <!-- Overlay mobile com Teleport (substitui o select mobile) -->
            <Teleport to="body">
              
            </Teleport>
            <img class="recurring-bills__content__list__search__sort__icon-mobile" src="/images/icon-sort-mobile.svg" alt="Icon sort" @click="openSelectSortMobile = !openSelectSortMobile"/>
          </div>
        </div>
        <table class="recurring-bills__content__table">
          <thead>
            <tr class="recurring-bills__content__table__header">
              <th>Bill Title</th>
              <th>Due Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody class="recurring-bills__content__table__body">
            <tr v-for="bill in recurringBillsFiltered" :key="recurringBills.indexOf(bill)">
              <td class="recurring-bills__content__table__body__name">
                <img :src="getImagePath(bill.avatar)" alt="Icon bill" />
                <span>{{ bill.name }}</span>
              </td>
              <td class="recurring-bills__content__table__body__due-date">
                <div>
                  <span
                    :class="{
                      'recurring-bills__content__table__body__due-date__span--color':
                        new Date(bill.date).getDate() === dateToday,
                    }"
                    >{{ formatDateOrdinal(bill.date) }}</span
                  >
                  <img
                    v-if="new Date(bill.date).getDate() === dateToday"
                    src="/images/icon-bill-due.svg"
                    alt="Icon bill paid"
                  />
                  <img v-else src="/images/icon-bill-paid.svg" alt="Icon bill due" />
                </div>
              </td>
              <td class="recurring-bills__content__table__body__amount">
                <span
                  :class="{
                    'recurring-bills__content__table__body__amount--color':
                      new Date(bill.date).getDate() === dateToday,
                  }"
                  >{{ formatCurrency(bill.amount) }}</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.recurring-bills {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: @font-size-xl;
      font-weight: @font-weight-bold;
      color: @grey-900;
    }
  }

  &__content {
    margin-top: @spacing-400;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: @spacing-300;

    &__summary {
      display: flex;
      flex-direction: column;
      gap: @spacing-200;

      &__total {
        display: flex;
        flex-direction: column;
        gap: @spacing-100;
        background-color: @grey-900;
        color: @white;
        padding: @spacing-300;
        border-radius: @spacing-150;

        img {
          width: @spacing-500;
          height: @spacing-500;
        }

        h2 {
          margin-top: @spacing-400;
          font-size: @font-size-md;
          font-weight: @font-weight-bold;
        }

        span {
          margin-top: @spacing-100;
          font-size: @font-size-xl;
          font-weight: @font-weight-bold;
        }
      }

      &__all-bills {
        display: flex;
        flex-direction: column;
        gap: @spacing-100;
        background-color: @white;
        padding: @spacing-300;
        border-radius: @spacing-150;

        &__summary-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: @spacing-100;
          padding-bottom: @spacing-200;
          margin-top: @spacing-150;

          p {
            font-size: @font-size-xs;
            font-weight: @font-weight-light;
            color: @grey-500;
          }

          span {
            font-size: @font-size-xs;
            font-weight: @font-weight-bold;
            color: @grey-900;
          }

          &.due-soon {
            p,
            span {
              color: @red;
            }
          }

          &:not(:last-child) {
            border-bottom: 1px solid @grey-100;
          }
        }
      }
    }

    &__list {
      background-color: @white;
      padding: @spacing-400;
      border-radius: @spacing-150;

      &__search {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: @spacing-100;

        &__input {
          display: flex;
          align-items: center;
          position: relative;
          gap: @spacing-100;

          input {
            border-radius: @spacing-100;
            border: 1px solid @grey-300;
            padding: @spacing-100 @spacing-250 @spacing-100 @spacing-100;
            width: 250px;
            height: 20px;
            font-size: @font-size-xs;
            font-weight: @font-weight-light;
          }

          img {
            position: absolute;
            right: 10px;
            pointer-events: none;
          }
        }

        &__sort {
          display: flex;
          align-items: center;
          gap: @spacing-100;

          p {
            font-size: @font-size-xs;
            font-weight: @font-weight-light;
            color: @grey-500;
          }

          select {
            background-color: transparent;
            font-size: @font-size-xs;
            font-weight: @font-weight-light;
            padding: @spacing-100;
            border-radius: @spacing-100;
            border: 1px solid @grey-300;
          }

          &__icon-mobile {
              display: none;
          }
        }
      }
    }

    &__table {
      width: 100%;
      margin-top: @spacing-250;

      &__header {
        th {
          color: @grey-500;
          font-size: @font-size-xs;
          font-weight: @font-weight-normal;
          text-align: left;
          padding: @spacing-250 0px;
        }
      }

      &__body {
        td {
          border-top: 1px solid @grey-100;
          padding: @spacing-250 0px;
        }

        &__name {
          font-size: @font-size-xs;
          font-weight: @font-weight-bold;
          display: flex;
          align-items: center;
          gap: @spacing-150;

          img {
            width: @spacing-400;
            height: @spacing-400;
            border-radius: 50%;
          }
        }

        &__due-date {
          font-size: @font-size-xs;
          font-weight: @font-weight-light;
          color: @green;

          div {
            display: flex;
            align-items: center;
            gap: @spacing-100;

            img {
              width: @spacing-200;
              height: @spacing-200;
            }
          }

          &__span--color {
            color: @grey-900;
          }
        }

        &__amount {
          font-size: @font-size-xs;
          font-weight: @font-weight-bold;

          &--color {
            color: @red;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {

    &__content {
      grid-template-columns: 1fr;
    

      &__list {
        padding: @spacing-250;

        &__search {
          gap: @spacing-300;
          

          &__sort {
            p, select {
              display: none;
            }

            &__icon-mobile {
              display: inline;
              width: @spacing-200;
              height: @spacing-200;
              cursor: pointer;

            }

            &__open-select-sort-mobile {
              display: inline;
              position: absolute;
              margin-top: @spacing-300;
            }
          }
        }
      }

     &__table {
      &__header {
        display: none;
      }
     }
    }
  }
}
</style>
