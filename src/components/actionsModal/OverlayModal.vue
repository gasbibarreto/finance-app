<script setup lang="ts">
import type { SortItens } from '@/types'
import { type PropType } from 'vue'

const props = defineProps({
  sortItens: { type: Array as PropType<SortItens[]>, required: true },
})

const emit = defineEmits<{
  (e: 'selectSortOption', value: SortItens): void
}>()

function handleSelectOption(option: SortItens) {
  emit('selectSortOption', option)
}
</script>
<template>
  <Teleport to="body">
    <div class="overlay__modal">
      <div class="overlay__modal__container">
        <div class="overlay__modal__container__list">
          <div
            class="overlay__modal__container__list__item"
            v-for="option in sortItens"
            :key="option"
            @click="handleSelectOption(option)"
          >
            {{ option }}
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<style lang="less" scoped>
.overlay__modal {
  position: absolute;
  top: 92%;
  right: 22px;
  z-index: 999;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;

  &__container {
    background-color: @white;
    border-radius: @spacing-100;
    padding: @spacing-100;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    &__list {
      display: flex;
      flex-direction: column;
      gap: @spacing-100;

      &__item {
        font-size: @font-size-sm;
        cursor: pointer;
        padding: @spacing-100;
        border-radius: @spacing-100;
        transition: background-color 0.2s;

        &:hover {
        }

        &:active {
        }
      }
    }
  }
}
</style>
