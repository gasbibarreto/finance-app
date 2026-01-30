<script setup lang="ts">
import type { BudgetCategories, SortItens } from '@/types'
import { type PropType } from 'vue'

const props = defineProps({
  sortItens: { type: Array as PropType<SortItens[] | BudgetCategories[]>, required: true },
})

const emit = defineEmits<{
  (e: 'selectSortOption', value: SortItens | BudgetCategories): void
}>()

function handleSelectOption(option: SortItens | BudgetCategories) {
  emit('selectSortOption', option)
}
</script>
<template>
  <div class="overlay__container">
    <ul class="overlay__container__list">
      <li v-for="option in sortItens" :key="option" class="overlay__container__item">
        <button type="button" class="overlay__button" @click="handleSelectOption(option)">
          {{ option }}
        </button>
      </li>
    </ul>
  </div>
</template>
<style lang="less" scoped>
.overlay__container {
  position: absolute;
  right: 0;
  z-index: 2;
  background: #fff;
  border-radius: 12px;
}

.overlay__container__list {
  list-style: none;
  margin: 0;
  padding: 8px 0;
}

.overlay__container__item + .overlay__container__item {
  border-top: 1px solid #eee;
}

.overlay__container__item {
  padding: 12px 16px;
  cursor: pointer;

  button {
    background: none;
    border: none;
    font-size: @font-size-xs;
    font-weight: @font-weight-light;
    color: @grey-500;
    cursor: pointer;
  }

  &:active {
    background-color: #f5f5f5;
  }
}
</style>
