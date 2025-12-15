
<script setup lang="ts">
import { ref } from 'vue'
import AddNew from '../AddNew.vue'
import DeleteItem from '../actionsModal/DeleteItem.vue'
import { useFinanceStore } from '@/stores/finance'

const props = defineProps({
  actionsTitle: { type: String, required: true },
  actionsValue: { type: Number },
  actionsTargetValue: { type: Number },
  actionsTheme: { type: String },
})

const financeStore = useFinanceStore()

const openModalActions = ref(false)
const openModalEdit = ref(false)
const openModalDelete = ref(false)

function handleEditClick() {
  openModalEdit.value = true
  openModalActions.value = false
}

function handleDeleteClick() {
  openModalDelete.value = true
  openModalActions.value = false
}

function handleDeletePot(potsTitle: string) {
  console.log(potsTitle)
  financeStore.deletePot(potsTitle)
  openModalDelete.value = false
}

function handleCancelDelete() {
  openModalDelete.value = false
}

function handleClose() {
  openModalEdit.value = false
  openModalDelete.value = false
  emit('closeActionsModal')
}

const emit = defineEmits<{
  (e: 'closeActionsModal'): void
}>()
</script>
<template>
    <div class="card__actions">
        <div class="card__actions__header">
            <div class="card__actions__header__handle" @click="handleEditClick()">Edit Pot</div>
            <div class="card__actions__header__handle" @click="handleDeleteClick()">Delete Pot</div>
        </div>
      <AddNew
        v-if="openModalEdit"
        :pots-name="actionsTitle"
        :pots-total="actionsValue"
        :pots-target="actionsTargetValue"
        :pots-theme="actionsTheme"
        @close-new-pot="handleClose()"
      />
      <DeleteItem
        v-if="openModalDelete"
        :pots-title="actionsTitle"
        @delete-pot="handleDeletePot(actionsTitle)"
        @cancel="handleCancelDelete()"
        @close-delete-item="handleClose()"
      />
    </div>
</template>
<style lang="less" scoped>
.card__actions {
    position: absolute;
    z-index: 999;
    top: 100%;
    right: 0;
    width: 100px;
    border-radius: @spacing-150;
    padding: @spacing-400;
    background-color: @white;
}
</style>