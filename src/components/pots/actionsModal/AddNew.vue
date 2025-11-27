<script setup lang="ts">
import { computed, reactive, ref, type PropType } from 'vue'
import { appColors } from '@/colors'

const props = defineProps({
  pots: { type: Array, required: true },
})

const formData = reactive({
  potName: '',
  potTarget: '',
  selectedColor: '#000000'
});

const handleSubmit = async () => {
  console.log('Dados do formulário:', formData);
}

function close() {
  emit('closeNewPot')
}

const emit = defineEmits<{
  (e: 'closeNewPot'): void
}>()
</script>
<template>
  <Teleport to="body">
    <div class="pots__new">
      <div class="pots__new__header">
        <h1>Add New Pot</h1>
        <img src="@/assets/images/icon-close-modal.svg" alt="close" @click="close()"/>
      </div>

      <p class="pots__new__description">
        Create a pot to set savings targets. These can help keep you on track as you save for
        special purchases.
      </p>
      <form @submit.prevent="handleSubmit" class="pots__new__form">
        <label for="pot-name">Pot Name</label>
        <input id="pot-name" v-model="formData.potName" type="text" placeholder="e.g. Rainy Days" />

        <label for="pot-target">Target</label>
        <input id="pot-target" v-model="formData.potTarget" type="number" placeholder="$ e.g. 2000" min="0" />

        <label for="theme">Theme</label>
        <select id="theme" v-model="formData.selectedColor">
          <option v-for="(colorName, colorValue) in Object.keys(appColors)" :key="colorName"
            :value="Object.values(appColors)[colorValue]">
            {{ colorName }}
          </option>
        </select>

        <button type="submit" @click="handleSubmit" class="pots__new__button">Add Pot</button>
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
