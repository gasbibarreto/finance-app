<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  cardAction: { type: String, required: false },
  styleColor: { type: Boolean, required: false },
})

const backgroundColor = computed(() => {
  return props.styleColor ? 'beige-100' : 'white'
})

const emit = defineEmits<{
  (e: 'actionClick'): void
}>()

const onActionClick = () => {
  emit('actionClick')
}
</script>

<template>
  <div class="card">
    <div class="card__content">
      <div class="card__header">
        <h2>{{ props.title }}</h2>
        <div class="card__header-actions" @click="onActionClick">
          <p>{{ props.cardAction }}</p>
          <img src="/images/icon-caret-right.svg" alt="" />
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="less">
.card {
  &__content {
    background-color: v-bind(backgroundColor);
    border-radius: 12px;
    padding: @spacing-300;
    margin-bottom: @spacing-150;

    h2 {
      font-size: @font-size-md;
      margin: 0;
    }
  }

  /* Header row (title + actions) */
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: @spacing-200;
  }

  &__header-actions {
    display: flex;
    align-items: center;
    gap: @spacing-100;
    cursor: pointer;

    p {
      font-size: @font-size-sm;
      color: @grey-500;
      margin: 0;
    }
  }

  &__list {
    display: flex;
    align-items: center;
    gap: @spacing-250;
    margin-bottom: @spacing-200;

    &-total {
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
        margin: 0 0 @spacing-100 0;
      }

      span {
        font-size: @font-size-lg;
        font-weight: @font-weight-bold;
        line-height: 120%;
      }

      &--info {
        margin-left: @spacing-150;
      }
    }
  }
}
</style>
