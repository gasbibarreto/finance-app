<script setup lang="ts">
import { useFinanceStore } from '@/stores/finance'
import { computed, type Ref } from 'vue'
import { formatCurrency } from '@/common/common'
import { ref } from 'vue'
import type { SortItens } from '@/types'

const searchBill = ref('')
const sortedBills = ref<SortItens>('Latest')
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
</script>
<template>
  <div class="recurring-bills">
    <div class="recurring-bills__header">
      <h1>Recurring Bills</h1>
    </div>
    <div class="recurring-bills__content">
      <div>
        <div>
          <h2>Total Bills</h2>
          <p>{{ '(' + formatCurrency(totalBills) + ')' }}</p>
          <p>Paied Bills</p>
          <p>
            {{ recurringBillsPaied.count + ' (' + formatCurrency(recurringBillsPaied.total) + ')' }}
          </p>
          <p>Total Upcoming</p>
          <p>
            {{
              recurringBillsUpcoming.count +
              ' (' +
              formatCurrency(recurringBillsUpcoming.total) +
              ')'
            }}
          </p>
          <p>Due Soon</p>
          <p>
            {{ recurringBillsDue.count + ' (' + formatCurrency(recurringBillsDue.total) + ')' }}
          </p>
        </div>
      </div>
      <div class="recurring-bills__content__list">
        <div>
          <input type="text" placeholder="Search bills" v-model="searchBill" />
          <img src="../assets/images/icon-search.svg" alt="Icon search" />
        </div>
        <div>
          <p>Sort by</p>
          <select v-model="sortedBills">
            <option value="Latest">Latest</option>
            <option value="Oldest">Oldest</option>
            <option value="Z-A">A to Z</option>
            <option value="Z-A">Z to A</option>
            <option value="Highest">Highest</option>
            <option value="Lowest">Lowest</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>Bill Title</th>
              <th>Due Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="bill in recurringBillsFiltered" :key="recurringBills.indexOf(bill)">
              <td>{{ bill.name }}</td>
              <td>{{ bill.date }}</td>
              <td>{{ formatCurrency(bill.amount) }}</td>
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
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: @spacing-300;

    &__list {
    }
  }
}
</style>
