<script setup lang="ts">
import { ref } from 'vue'
import AddMoneyOrWithdraw from '../actionsModal/AddMoneyOrWithdraw.vue'
import ActionsModal from '../actionsModal/ActionsModal.vue'
import { formatCurrency } from '@/utils/utils'

const openModalMoney = ref(false)
const openModalActions = ref(false)
const openModalWithdraw = ref(false)

const props = defineProps({
  potsTitle: { type: String, required: true },
  potsValue: { type: Number },
  potsPercentage: { type: Number },
  potsTargetValue: { type: Number },
  potsTheme: { type: String },
})
</script>
<template>
  <div class="card">
    <div class="card__header">
      <div class="card__header__title">
        <span class="card__header__bullet" :style="{ backgroundColor: potsTheme }"></span>
        <h1>{{ potsTitle }}</h1>
      </div>
      <div class="card__header__icon-wrapper">
        <img
          src="/images/icon-ellipsis.svg"
          @click="openModalActions = !openModalActions"
          alt="ellipsis"
        />
        <ActionsModal
          v-if="openModalActions"
          :actions-type="'Pot'"
          :actions-title="potsTitle"
          :actions-value="potsValue"
          :actions-target-value="potsTargetValue"
          :actions-theme="potsTheme"
          @close-actions-modal="openModalActions = false"
        />
      </div>
    </div>
    <div class="card__total">
      <p>Total saved</p>
      <p>{{ formatCurrency(potsValue || 0) }}</p>
    </div>
    <div class="card__target">
      <progress 
        class="card__target__progress" 
        :style="{ '--progress-color': potsTheme }"
        :value="potsPercentage" 
        max="100"
      ></progress>
      <div class="card__target__progress__info">
        <p>{{ potsPercentage }}%</p>
        <p>Target of ${{ potsTargetValue }}</p>
      </div>
    </div>
    <div class="card__actions">
      <div>
        <button @click="openModalMoney = true">+ Add Money</button>
        <AddMoneyOrWithdraw
          v-if="openModalMoney"
          :add-money-withdraw-title="props.potsTitle"
          :money="true"
          @close-add-money-withdraw="openModalMoney = false"
        />
      </div>
      <div>
        <button @click="openModalWithdraw = true">+ Withdraw</button>
        <AddMoneyOrWithdraw
          v-if="openModalWithdraw"
          :add-money-withdraw-title="props.potsTitle"
          :withdraw="true"
          @close-add-money-withdraw="openModalWithdraw = false"
        />
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.card {
  border-radius: @spacing-150;
  padding: @spacing-300;
  background-color: @white;

  &__header {
    display: flex;
    align-items: flex-start;

    &__title {
      display: flex;
      align-items: center;
      gap: @spacing-100;
      width: 100%;
    }

    &__bullet {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    &__icon-wrapper {
      position: relative;
      display: inline-block;
      cursor: pointer;
    }

    h1 {
      font-size: @font-size-lg;
      font-weight: @font-weight-bold;
      line-height: 120%;
      opacity: 1;
      color: @grey-900;
    }

    &__actions {
      gap: @spacing-200;
      margin-top: @spacing-300;

      &__handle {
        border: none;
        cursor: pointer;
        font-size: @font-size-xs;
        font-weight: @font-weight-light;
      }
    }
  }

  &__total {
    display: flex;
    justify-content: space-between;
    gap: @spacing-100;
    margin-top: @spacing-300;

    p {
      font-size: @font-size-xs;
      font-weight: @font-weight-normal;
      line-height: 120%;
      opacity: 1;
      color: @grey-500;
    }

    p:last-child {
      font-size: @font-size-xl;
      font-weight: @font-weight-bold;
      line-height: 120%;
      opacity: 1;
      color: @grey-900;
    }
  }

  &__target {
    display: flex;
    flex-direction: column;
    gap: @spacing-100;
    margin-top: @spacing-200;

    &__progress {
      width: 100%;
      height: 10px;
      appearance: none; 
      border: 1px solid @beige-100;
      border-radius: 10px;

      &::-webkit-progress-bar {
        background-color: @beige-100;
        border-radius: 10px;
      }

      &::-webkit-progress-value {
        background-color: var(--progress-color, @beige-100);
        border-radius: 10px;
      }

      &::-moz-progress-bar {
        background-color: var(--progress-color, @beige-100);
        border-radius: 10px;
      }

      &__info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: @spacing-150;
        
        p {
          font-size: @font-size-xs;
          font-weight: @font-weight-normal;
          color: @grey-500;
        }

        p:first-child {
          font-weight: @font-weight-bold;
        }
      }
    }

    &__progress__info {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  &__actions {
    display: flex;
    justify-content: space-between;
    gap: @spacing-200;
    margin-top: @spacing-300;

    button {
      background-color: @beige-100;
      border: none;
      cursor: pointer;
      font-size: @font-size-md;
      font-weight: @font-weight-bold;
      color: @grey-900;

      &:first-child {
        height: 53px;
        border-radius: 8px;
        padding: @spacing-200;
      }

      &:last-child {
        height: 53px;
        border-radius: 8px;
        padding: @spacing-200;
      }
    }
  }

  @media (max-width: 1024px) {

  }
}
</style>
