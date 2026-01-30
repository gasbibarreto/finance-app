<script setup lang="ts">
import { reactive } from 'vue'
import type { Pot } from '@/types/interfaces'
import { useFinanceStore } from '@/stores/finance'
import { useColors } from '@/composables/useColors'

const { colorOptions } = useColors()

const props = defineProps({
  potsName: { type: String },
  potsTotal: { type: Number },
  potsTarget: { type: Number },
  potsTheme: { type: String },
  openModalEdit: { type: Boolean, default: false },
})

const formData = reactive({
  potName: props.potsName || '',
  potTotal: props.potsTotal || '',
  potTarget: props.potsTarget || '',
  selectedColor: props.potsTheme || '#000000',
})

// STORE
const financeStore = useFinanceStore()

const handleSubmit = () => {
  const potData: Pot = {
    name: formData.potName.trim(),
    total: Number(formData.potTotal),
    target: Number(formData.potTarget),
    theme: formData.selectedColor,
  }

  if(potData.name.trim() === '' || potData.theme.trim() === '' || potData.target === 0) {
    console.warn(`Pot "${potData.name}" is invalid`)
    return
  }
  
  if (props.potsName) {
    financeStore.updatePot(props.potsName, potData)
    handleClose()
  } else {
    financeStore.addPot(potData)
    handleClose()
  }
}

// FUNCTIONS
function handleClose() {
  emit('closeNewPot')
}

// EMITS
const emit = defineEmits<{
  (e: 'closeNewPot'): void
}>()
</script>
<template>
  <Teleport to="body">
    <div class="pots__new">
      <div class="pots__new__header">
        <h1>{{ openModalEdit ? 'Edit Pot' : 'Add New Pot' }}</h1>
        <img src="/images/icon-close-modal.svg" alt="close" @click="handleClose()" />
      </div>

      <div class="pots__new__content">
        <p class="pots__new__content__description">
          {{
            openModalEdit
              ? 'If your saving targets change, feel free to update your pots.'
              : 'Create a pot to set savings targets. These can help keep you on track as you save for'
          }}
        </p>
        <form class="pots__new__content__form" @submit.prevent="handleSubmit()">
          <label for="pot-name">Pot Name</label>
          <input
            id="pot-name"
            v-model="formData.potName"
            type="text"
            placeholder="e.g. Rainy Days"
            maxlength="20"
          />

          <label for="pot-target">Target</label>
          <input
            id="pot-target"
            v-model="formData.potTarget"
            type="number"
            placeholder="$ e.g. 2000"
            min="0,1"
            max="1000000"
          />

          <label for="theme">Theme</label>
          <select id="theme" v-model="formData.selectedColor">
            <option v-for="color in colorOptions" :key="color.name" :value="color.value">
              {{ color.displayName }}
            </option>
          </select>
          <button type="submit" class="pots__new__button">
            {{ openModalEdit ? 'Save Changes' : 'Add Pot' }}
          </button>
        </form>
      </div>
    </div>
  </Teleport>
</template>
<style lang="less" scoped>
.pots__new {
  position: fixed;
  z-index: 2;
  top: 15%;
  left: calc(50% - 560px / 2);
  width: 560px;
  height: 430px;
  max-width: 560px;
  border-radius: @spacing-150;
  padding: @spacing-400;
  background-color: @white;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: @spacing-300;

    h1 {
      font-size: @font-size-xl;
      font-weight: @font-weight-bold;
      line-height: 120%;
      opacity: 1;
      color: @grey-900;
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    gap: @spacing-200;

    &__description {
      font-size: @font-size-md;
      font-weight: @font-weight-normal;
      font-size: @font-size-sm;
      color: @grey-500;
    }

    &__form {
      display: flex;
      flex-direction: column;
      gap: @spacing-150;

      & select {
        font-size: @font-size-sm;
        font-weight: @font-weight-normal;
        padding: @spacing-100;
        border-radius: @spacing-100;
        cursor: pointer;
      }

      & label {
        font-size: @font-size-sm;
        font-weight: @font-weight-normal;
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
        line-height: 150%;
        gap: @spacing-200;
        border-radius: @spacing-100;
        padding: @spacing-200;
        cursor: pointer;
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
