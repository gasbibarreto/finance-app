<script setup lang="ts">
import { ref } from 'vue'
import AddMoneyAndWithdraw from './actionsModal/AddMoneyAndWithdraw.vue'

const openModalMoney = ref(false)
const openModalWithdraw = ref(false)

const props = defineProps({
  potsTitle: { type: String, required: true },
  potsValue: { type: Number },
  potsPercentage: { type: Number },
  potsTargetValue: { type: Number },
})
</script>
<template>
  <div class="card">
    <p>{{ potsTitle }}</p>
    <p>{{ potsValue }}</p>
    <p>%{{ potsPercentage }}</p>
    <p>Target of ${{ potsTargetValue }}</p>
    <div class="card__actions">
      <div>
      <button @click="openModalMoney = true">Add Money</button>
      <AddMoneyAndWithdraw
        v-if="openModalMoney"
        add-money-withdraw-title="Add money to"
        @close-add-money-withdraw="openModalMoney = false"
      />
    </div>
    <div>
      <button @click="openModalWithdraw = true">Withdraw</button>
      <AddMoneyAndWithdraw
        v-if="openModalWithdraw"
        add-money-withdraw-title="Withdraw from"
        @close-add-money-withdraw="openModalWithdraw = false"
      />
    </div>
    </div>

  </div>
</template>
<style lang="less" scoped>
.card {
  width: 502px;
  height: 303px;
  border-radius: @spacing-150;
  padding: @spacing-300;
  background-color: @white;

  &__actions {
    display: flex;
    justify-content: space-between;
    gap: @spacing-200;

    button {
    background-color: @beige-100;
    border: none;
    cursor: pointer;
  }
  }

}
</style>


