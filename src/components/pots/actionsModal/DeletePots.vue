<script setup lang="ts">
const props = defineProps({
  potsTitle: { type: String, required: true },
})

function deletePot() {
  emit('deletePot')
}

function cancel() {
  emit('cancel')
}

const emit = defineEmits<{
  (e: 'deletePot'): void
  (e: 'cancel'): void
}>()
</script>
<template>
  <Teleport to="body">
    <div class="pots__actions">
      <h1>Delete '{{ potsTitle }}'?</h1>
      <p>Are you sure you want to delete this pot? This action cannot be undone.</p>
      <div class="pots__actions__button">
        <button type="button" class="pots__actions__button__delete button" @click="deletePot()">Yes, confirm deletion</button>
        <button type="button" class="pots__actions__button__back button" @click="cancel()">No, go back</button>
      </div>
  </div>
  </Teleport>
</template>
<style lang="less" scoped>
.pots__actions {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 35%;
  width: 560px;
  max-width: 560px;
  border-radius: @spacing-150;
  padding: @spacing-400;
  background-color: @white;

  h1 {
    font-size: @font-size-xl;
    font-weight: @font-weight-bold;
    line-height: 120%;
    opacity: 1;
    color: @grey-900;
    margin-bottom: @spacing-200;
  }
  
  p {
    font-size: @font-size-md;
    font-weight: @font-weight-normal;
    line-height: 150%;
    opacity: 1;
    color: @grey-500;
    margin-bottom: @spacing-200;
  }

&__button {
  display: flex;
  flex-direction: column;
  gap: @spacing-200;

  button {
    height: 53px;
    border-radius: @spacing-100;
    cursor: pointer;
    border: none;
    font-size: @font-size-sm;
    font-weight: @font-weight-normal;
  }

  &__delete {
    background-color: @red;
    color: @white;
  }

  &__back {
    background-color: @white;
    color: @grey-500;
  }
}

}
</style>
