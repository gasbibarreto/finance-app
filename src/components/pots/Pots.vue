<script setup lang="ts">
import CardPots from './CardPots.vue'
import AddNew from './AddNew.vue'
import { computed, ref } from 'vue'
import { formatPercentage } from '@/common/common'
import { useFinanceStore } from '@/stores/finance'

const showNewPotModal = ref<Boolean>(false)

// STORE
const financeStore = useFinanceStore()
const pots = computed(() => financeStore.pots)

// FUNCTIONS
function potsPercentage(pot: { total: number; target: number }): number {
  return formatPercentage((pot.total / pot.target) * 100)
}
</script>
<template>
  <div class="pots">
    <div class="pots__header">
      <h1>Pots</h1>
      <button @click="showNewPotModal = true">+ Add New Pot</button>
      <AddNew v-if="showNewPotModal" @close-new-pot="showNewPotModal = false" />
    </div>
    <div class="pots__card">
      <ul class="pots__card__list">
        <li v-for="pot in pots" :key="pot.name">
          <CardPots
            :pots-title="pot.name"
            :pots-value="pot.total"
            :pots-percentage="potsPercentage(pot)"
            :pots-target-value="pot.target"
            :pots-theme="pot.theme"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="less" scoped>
.pots {
  &__header {
    display: flex;
    justify-content: space-between;

    h1 {
      font-size: @font-size-xl;
      font-weight: @font-weight-bold;
      line-height: 120%;
      opacity: 1;
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

  &__card {
    margin-top: @spacing-300;

    &__list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      list-style: none;
      padding: 0px;
      gap: @spacing-300;
    }
  }
}
</style>
