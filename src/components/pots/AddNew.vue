<script setup lang="ts">
import { reactive } from 'vue'
import type { Pot } from '@/interfaces'
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

  console.log(potData)

  if (props.potsName) {
    financeStore.updatePot(props.potsName, potData)
  } else {
    financeStore.addPot(potData)
  }
  handleClose()
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
        <img src="@/assets/images/icon-close-modal.svg" alt="close" @click="handleClose()" />
      </div>

      <p class="pots__new__description">
        {{
          openModalEdit
            ? 'If your saving targets change, feel free to update your pots.'
            : 'Create a pot to set savings targets. These can help keep you on track as you save for'
        }}
      </p>
      <form class="pots__new__form" @submit.prevent="handleSubmit()">
        <label for="pot-name">Pot Name</label>
        <input id="pot-name" v-model="formData.potName" type="text" placeholder="e.g. Rainy Days" />

        <label for="pot-target">Target</label>
        <input
          id="pot-target"
          v-model="formData.potTarget"
          type="number"
          placeholder="$ e.g. 2000"
          min="0"
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
  </Teleport>
</template>
<style lang="less" scoped>
.pots__new {
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

    h1 {
      font-size: @font-size-xl;
      font-weight: @font-weight-bold;
      line-height: 120%;
      opacity: 1;
      color: @grey-900;
    }
  }

  &__description {
    font-size: @font-size-md;
    font-weight: @font-weight-normal;
    font-size: @font-size-sm;
    letter-spacing: 0px;
    line-height: 150%;
    opacity: 1;
    color: @grey-500;
  }

  &__form {
    display: flex;
    flex-direction: column;
    width: 496px;
    height: 255px;
    gap: @spacing-200;
    margin-top: @spacing-200;
    margin-bottom: @spacing-400;

    & label {
      font-size: @font-size-sm;
      font-weight: @font-weight-bold;
      font-style: Bold;
      line-height: 150%;
      letter-spacing: 0px;
      color: @grey-500;
    }

    & input {
      width: 496px;
      height: 45px;
      gap: @spacing-200;
      opacity: 1;
      border-radius: @spacing-100;
      border-width: 1px;
      padding: @spacing-150 @spacing-250;
    }

    & select {
      width: 536px;
      height: 45px;
      gap: @spacing-200;
      opacity: 1;
      border-radius: @spacing-100;
      border-width: 1px;
      padding: @spacing-150 @spacing-250;

      & option {
        font-size: @font-size-sm;
        font-weight: @font-weight-normal;
        line-height: 150%;
        letter-spacing: 0px;
        color: @grey-500;
      }
    }
  }

  &__button {
    background-color: @grey-900;
    color: @white;
    font-size: @font-size-sm;
    font-weight: @font-weight-normal;
    line-height: 150%;
    width: 536px;
    height: 53px;
    gap: @spacing-200;
    opacity: 1;
    border-radius: @spacing-100;
    padding: @spacing-200;
    cursor: pointer;
  }
}
</style>
