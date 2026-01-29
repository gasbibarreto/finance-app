<script setup lang="ts">
import { useFinanceStore } from '@/stores/finance'
import { ref } from 'vue'

const props = defineProps({
  addMoneyWithdrawTitle: { type: String, required: true },
  money: { type: Boolean },
  potsTargetValue: {type: Number, required: true },
  withdraw: { type: Boolean },
})

const financeStore = useFinanceStore()

const amount = ref(0)

const handleSubmitMoneyOrWithdraw = () => {
  if(amount.value > props.potsTargetValue) {
    console.warn(`Amount is greater than pots target value`)
    return
  }

  if (props.money) {
    financeStore.addMoneyToPot(props.addMoneyWithdrawTitle, amount.value)
    close()
  } else {
    financeStore.withdrawMoneyFromPot(props.addMoneyWithdrawTitle, amount.value)
    close()
  }
}

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
      <div class="pots__new__header">
        <h1>{{ addMoneyWithdrawTitle }}</h1>
        <img src="/images/icon-close-modal.svg" alt="close" @click="close()" />
      </div>
      <div class="pots__new__content">
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit.
          Pellentesque aliquet nibh nec urna. In nisi neque, aliquet.
        </p>
        <form class="pots__new__form" @submit.prevent="handleSubmitMoneyOrWithdraw()">
          <label for="amount">{{ props.money ? 'Amount to Add' : 'Amount to Withdraw' }}</label>
          <input id="amount" type="number" v-model="amount" placeholder="$ 20" min="0" max="1000000"/>
          <button type="submit" class="pots__new__button">
            {{ props.money ? 'Confirm Addition' : 'Confirm Withdraw' }}
          </button>
        </form>
      </div>
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

    p {
      font-size: @font-size-md;
      font-weight: @font-weight-normal;
      line-height: 150%;
      color: @grey-500;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: @spacing-200;

      label {
        font-size: @font-size-sm;
        font-weight: @font-weight-bold;
        color: @grey-500;
      }

      input {
        gap: @spacing-200;
        border-radius: @spacing-100;
        border-width: 1px;
        padding: @spacing-150 @spacing-250;
      }

      button {
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
