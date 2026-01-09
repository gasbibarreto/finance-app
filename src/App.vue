<script setup lang="ts">
import Menu from './components/Menu.vue'
import Overview from './components/Overview.vue'
import Transactions from './components/transactions/Transactions.vue'
import Pots from './components/pots/Pots.vue'
import RecurringBills from './components/RecurringBills.vue'
import Budgets from './components/budgets/Budgets.vue'
import { markRaw, ref, type Component } from 'vue'
import type { ComponentsItens } from './types'

const menuItem = ref<Component>(markRaw(Overview))

const components: Record<string, Component> = {
  Overview: markRaw(Overview),
  Transactions: markRaw(Transactions),
  Pots: markRaw(Pots),
  'Recurring Bills': markRaw(RecurringBills),
  Budgets: markRaw(Budgets),
}

function changeMenuItem(itemName: ComponentsItens) {
  menuItem.value = components[itemName] || markRaw(Overview)
}
</script>

<template>
  <div class="app__container">
    <Menu class="app__container__menu" @selected-menu-item="changeMenuItem" />
    <component
      :is="menuItem"
      class="app__container__component"
      @selected-menu-item="changeMenuItem"
    />
  </div>
</template>

<style scoped lang="less">
.app__container {
  display: flex;
  
  &__component {
    flex-grow: 1;
    margin: @spacing-400 @spacing-500;
    max-width: 1140px;
  }


  @media (max-width: 1024px) {
    flex-direction: column;
    width:100vw;
    height: 100vh;

    &__menu {
      width: 100vw;
    }

    &__component {
      height: 100vh;
    }

  }
}
</style>
