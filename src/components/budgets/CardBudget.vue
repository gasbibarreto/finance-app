<script setup lang="ts">
import type { PropType } from 'vue'
import type { Budget } from '@/types'
import { formatCurrency } from '@/common/common'
import type { Transaction } from '@/types'
import Card from '../Card.vue'

defineProps({
  budget: {
    type: Object as PropType<Budget>,
    required: true,
  },
  transactions: {
    type: Array as PropType<Transaction[]>,
    required: true,
  },
})

function redirectToView(view: string) {
  console.log(view)
}
</script>
<template>
  <div class="card-budget">
    <div class="card-budget__header">
      <h2>{{ budget.category }}</h2>
    </div>
    <div class="card-budget__content">
      <p>{{ 'Maximum of ' + formatCurrency(budget.maximum) }}</p>
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
        <ul class="card-budget__list__transactions">
          <li v-for="item in transactions" :key="Object.keys(item)[0]">
            <p>{{ item.name }}</p>
            <p>{{ formatCurrency(item.amount) }}</p>
            <p>{{ item.date }}</p>
          </li>
        </ul>
      </Card>
    </div>
  </div>
</template>
<style lang="less" scoped>
.card-budget {
  background-color: @white;
  border-radius: @spacing-150;
  margin-top: @spacing-300;
  padding: @spacing-250;

  &__list {
    padding: 10px;

    &__card {
      background-color: @beige-100;
    }

    &__transactions {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  }
}
</style>
