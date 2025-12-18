<script setup lang="ts">
import { ref, type PropType } from 'vue'
import type { Budget, Transaction } from '@/interfaces'
import { formatCurrency } from '@/common/common'
import Card from '../Card.vue'
import ActionsModal from '../actionsModal/ActionsModal.vue'
import TransactionsList from '../transactions/TransactionsList.vue'

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

const openModalActions = ref(false)

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
          src="@/assets/images/icon-ellipsis.svg"
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
  padding: @spacing-250;

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
    justify-content: space-between;
    align-items: center;
  }

  &__list {
    padding: 10px;

    &__card {
      background-color: @beige-100;
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
