<script setup lang="ts">
const props = defineProps({
  addMoneyWithdrawTitle: { type: String, required: true },
})

function close() {
  emit('closeAddMoneyWithdraw')
}

const emit = defineEmits<{
  (e: 'closeAddMoneyWithdraw'): void
}>()
</script>
<template>
  <Teleport to="body">
    <div class="pots__new">
      <h1>{{ addMoneyWithdrawTitle }}</h1>
      <button @click="close()">close</button>
    </div>
  </Teleport>
</template>
<style lang="less" scoped>
.pots__new {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;

  h1 {

  }

  button {
  }
}
</style>
