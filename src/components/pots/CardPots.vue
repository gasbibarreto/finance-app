<script setup lang="ts">
import { ref, type PropType } from 'vue'
import AddMoneyOrWithdraw from './actionsModal/AddMoneyOrWithdraw.vue'
import AddNew from '../AddNew.vue'
import PotsActions from './actionsModal/DeletePots.vue'
import { formatCurrency } from '@/common/common'
import { useFinanceStore } from '@/stores/finance'

const financeStore = useFinanceStore()

const openModalMoney = ref(false)
const openModalActions = ref(false)
const openModalWithdraw = ref(false)
const openModalEdit = ref(false)
const openModalDelete = ref(false)

const props = defineProps({
  potsTitle: { type: String, required: true },
  potsValue: { type: Number },
  potsPercentage: { type: Number },
  potsTargetValue: { type: Number },
  potsTheme: { type: String },
})

function handleEditClick() {
  openModalEdit.value = true
  openModalActions.value = false
}

function handleDeleteClick() {
  openModalDelete.value = true
  openModalActions.value = false
}

function handleCloseEdit() {
  openModalEdit.value = false
}

function handleDeletePot(potsTitle: string) {
  console.log(potsTitle)
  financeStore.deletePot(potsTitle)
  openModalDelete.value = false
}

function handleCancelDelete() {
  openModalDelete.value = false
}
</script>
<template>
  <div class="card">
    <div class="card__header">
      <div class="card__header__title">
        <span class="card__header__bullet" :style="{ backgroundColor: potsTheme }"></span>
        <h1>{{ potsTitle }}</h1>
        <img
          src="@/assets/images/icon-ellipsis.svg"
          @click="openModalActions = true"
          alt="ellipsis"
        />
      </div>
      <div class="card__header__actions" v-if="openModalActions">
        <div class="card__header__actions__handle" @click="handleEditClick">Edit Pot</div>
        <div class="card__header__actions__handle" @click="handleDeleteClick">Delete Pot</div>
      </div>
      <AddNew
        v-if="openModalEdit"
        :pots-name="potsTitle"
        :pots-total="potsValue"
        :pots-target="potsTargetValue"
        :pots-theme="potsTheme"
        @close-new-pot="handleCloseEdit"
      />
      <PotsActions
        v-if="openModalDelete"
        :pots-title="props.potsTitle"
        @delete-pot="handleDeletePot(props.potsTitle)"
        @cancel="handleCancelDelete()"
      />
    </div>
    <div class="card__total">
      <p>Total saved</p>
      <p>{{ formatCurrency(potsValue || 0) }}</p>
    </div>
    <div class="card__target">
      <p>{{ potsPercentage }}%</p>
      <p>Target of {{ potsTargetValue }}</p>
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
  width: 455px;
  border-radius: @spacing-150;
  padding: @spacing-300;
  background-color: @white;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    &__title {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: @spacing-100;
      width: 100%;
    }

    &__bullet {
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      flex-shrink: 0;
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
    justify-content: space-between;
    gap: @spacing-100;
    margin-top: @spacing-200;
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
      line-height: 150%;
      letter-spacing: 0px;
      color: @grey-900;

      &:first-child {
        width: 227px;
        height: 53px;
        gap: 16px;
        border-radius: 8px;
        padding: @spacing-200;
      }

      &:last-child {
        width: 227px;
        height: 53px;
        gap: 16px;
        border-radius: 8px;
        padding: @spacing-200;
      }
    }
  }
}
</style>
