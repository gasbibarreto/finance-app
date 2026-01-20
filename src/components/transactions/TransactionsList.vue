<script setup lang="ts">
import { formatCurrency, formatDate, getImagePath } from '@/utils/utils'
import type { Transaction } from '@/types/interfaces'

const props = defineProps<{
  transactions: Transaction[]
}>()
</script>
<template>
  <div class="overview__transaction">
    <ul>
      <li v-for="transaction in transactions" :key="transaction.name">
        <div class="overview__transaction__name">
          <img :src="getImagePath(transaction.avatar)" alt="" />
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
</template>
<style lang="less" scoped>
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
</style>
