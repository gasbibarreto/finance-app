<script setup lang="ts">
import { useFinanceStore } from '@/stores/finance'
import { computed, reactive, ref, type PropType } from 'vue'
import { useColors } from '@/composables/useColors'
import type { Budget } from '@/interfaces'

const financeStore = useFinanceStore()
const transactions = computed(() => financeStore.transactions)
const budgets = computed(() => financeStore.budgets)

const { colorOptions, normalizeColor } = useColors()

const props = defineProps({
  budgetCategory: { type: String },
  budgetMaximum: { type: Number },
  budgetTheme: { type: String },
  openModalEdit: { type: Boolean, default: false },
})

const normalizedTheme = computed(() => {
  if (!props.budgetTheme) return ''
  return normalizeColor(props.budgetTheme.trim())
})

const formData = reactive({
  category: props.budgetCategory || '',
  maximum: props.budgetMaximum || 0,
  theme: normalizedTheme.value || '',
})

const categoryList = computed(() => {
  const category = transactions.value.map((transaction) => {
    return transaction.category
  })
  const categorySet = [...new Set(category)]
  categorySet.push('All Transactions')

  return categorySet
})

const handleSubmitBudget = () => {
  const budgetData: Budget = {
    category: formData.category,
    maximum: formData.maximum,
    theme: formData.theme,
  }

  if (props.openModalEdit) {
    financeStore.updateBudget(formData.category, budgetData)
  } else {
    financeStore.addBudget(budgetData)
  }
  financeStore.addBudget(budgetData)
  console.log(budgetData)
  handleCloseBudget()
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
        <h1>{{ openModalEdit ? 'Edit Budget' : 'Add New Budget' }}</h1>
        <img src="/images/icon-close-modal.svg" alt="close" @click="handleCloseBudget()" />
      </div>

      <div class="new__budget__content">
        <p class="new__budget__content__description">
          {{
            openModalEdit
              ? 'As your budgets change, feel free to update your spending limits.'
              : 'Choose a category to set a spending budget. These categories can help you monitor spending.'
          }}
        </p>
        <form class="new__budget__content__form" @submit.prevent="handleSubmitBudget()">
          <label for="budget-name">Budget Category</label>
          <select id="budget-category" v-model="formData.category" :disabled="openModalEdit">
            <option v-for="budget in budgets" :key="budget.category" :value="budget.category">
              {{ budget.category }}
            </option>
          </select>
          <label for="budget-maximum">Maximum Spend</label>
          <input
            id="budget-maximum"
            type="number"
            placeholder="$ 50"
            min="0"
            v-model="formData.maximum"
          />
          <label for="budget-theme">Theme</label>
          <select id="budget-theme" v-model="formData.theme">
            <option v-for="color in colorOptions" :key="color.name" :value="color.value">
              {{ color.displayName }}
            </option>
          </select>
          <button type="submit" class="new__budget__content__form__button">
            {{ openModalEdit ? 'Save Changes' : 'Add Budget' }}
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
  top: 20%;
  left: 35%;
  width: 560px;
  height: 512px;
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
    }
  }
}
</style>
