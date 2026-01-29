<script setup lang="ts">
import { useFinanceStore } from '@/stores/finance'
import { computed, reactive, ref, type PropType } from 'vue'
import { useColors } from '@/composables/useColors'
import type { Budget } from '@/types/interfaces'
import { BUDGET_CATEGORIES, BUDGET_CATEGORIES as budgetCategories } from '@/types'

const financeStore = useFinanceStore()
const budgets = computed(() => financeStore.budgets)

const { colorOptions, normalizeColor } = useColors()

const props = defineProps({
  budgetCategory: { type: String },
  budgetMaximum: { type: Number },
  budgetTheme: { type: String },
  openModalEditBudget: { type: Boolean, default: false },
})

const normalizedTheme = computed(() => {
  if (!props.budgetTheme) return ''
  return normalizeColor(props.budgetTheme.trim())
})

const formData = reactive({
  category: props.budgetCategory || BUDGET_CATEGORIES[0],
  maximum: props.budgetMaximum || 0,
  theme: normalizedTheme.value,
})

const handleSubmitBudget = () => {
  const budgetData: Budget = {
    category: formData.category,
    maximum: formData.maximum,
    theme: formData.theme,
  }

  if(budgetData.category.trim() === '' || budgetData.theme.trim() === '' || budgetData.maximum === 0) {
    console.warn(`Budget "${budgetData.category}" is invalid`)
    return
  }

  if (props.openModalEditBudget) {
    financeStore.updateBudget(formData.category, budgetData)
    handleCloseBudget()
  } else {
    financeStore.addBudget(budgetData)
    handleCloseBudget()
  }
}

const handleCloseBudget = () => {
  emit('closeNewBudget')
}

const emit = defineEmits<{
  (e: 'closeNewBudget'): void
}>()
</script>
<template>
  <Teleport to="body">
    <div class="new__budget">
      <div class="new__budget__header">
        <h1>{{ openModalEditBudget ? 'Edit Budget' : 'Add New Budget' }}</h1>
        <img src="/images/icon-close-modal.svg" alt="close" @click="handleCloseBudget()" />
      </div>

      <div class="new__budget__content">
        <p class="new__budget__content__description">
          {{
            openModalEditBudget
              ? 'As your budgets change, feel free to update your spending limits.'
              : 'Choose a category to set a spending budget. These categories can help you monitor spending.'
          }}
        </p>
        <form class="new__budget__content__form" @submit.prevent="handleSubmitBudget()">
          <label for="budget-name">Budget Category</label>
          <select id="budget-category" v-model="formData.category" :disabled="openModalEditBudget">
            <option v-for="category in budgetCategories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
          <label for="budget-maximum">Maximum Spend</label>
          <input
            id="budget-maximum"
            type="number"
            placeholder="$ 50"
            min="0"
            max="1000000"
            v-model="formData.maximum"
          />
          <label for="budget-theme">Theme</label>
          <select id="budget-theme" v-model="formData.theme">
            <option v-for="color in colorOptions" :key="color.name" :value="color.value">
              {{ color.displayName }}
            </option>
          </select>
          <button type="submit" class="new__budget__content__form__button">
            {{ openModalEditBudget ? 'Save Changes' : 'Add Budget' }}
          </button>
        </form>
      </div>
    </div>
  </Teleport>
</template>
<style lang="less" scoped>
.new__budget {
  position: fixed;
  z-index: 999;
  top: 15%;
  left: calc(50% - 560px / 2);
  width: 560px;
  height: 400px;
  max-width: 560px;
  border-radius: @spacing-150;
  padding: @spacing-400;
  background-color: @white;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: @spacing-300;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: @spacing-200;

    &__form {
      display: flex;
      flex-direction: column;
      gap: @spacing-150;

      & label {
        font-size: @font-size-sm;
        font-weight: @font-weight-normal;
      }

      & select {
        font-size: @font-size-sm;
        font-weight: @font-weight-normal;
        padding: @spacing-100;
        border-radius: @spacing-100;
        cursor: pointer;
      }

      & input {
        font-size: @font-size-sm;
        font-weight: @font-weight-normal;
        padding: @spacing-100;
        border-radius: @spacing-100;
        cursor: pointer;
        border-width: 1px;
      }

      & button {
        background-color: @grey-900;
        color: @white;
        font-size: @font-size-sm;
        font-weight: @font-weight-normal;
        padding: @spacing-200;
        border-radius: @spacing-100;
        cursor: pointer;
        border: none;
      }
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
    left: calc(42% - 300px / 2);
  }
}
</style>
