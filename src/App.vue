<script setup lang="ts">
import Menu from './components/layout/Menu.vue'
import Overview from './components/views/Overview.vue'
import Transactions from './components/transactions/Transactions.vue'
import Pots from './components/pots/Pots.vue'
import RecurringBills from './components/views/RecurringBills.vue'
import Budgets from './components/budgets/Budgets.vue'
import { ref, shallowRef, type Component } from 'vue'
import type { ComponentsItens } from './types'

const menuItem = shallowRef<Component>(Overview)
const selectedMenuItem = ref<ComponentsItens>('Overview')

const components: Record<string, Component> = {
  Overview: Overview,
  Transactions: Transactions,
  Pots: Pots,
  'Recurring Bills': RecurringBills,
  Budgets: Budgets,
}

function changeMenuItem(itemName: ComponentsItens) {
  menuItem.value = components[itemName] || Overview
  selectedMenuItem.value = itemName
}
</script>

<template>
  <div class="app__container">
    <Menu
      class="app__container__menu"
      :selected-menu="selectedMenuItem"
      @selected-menu-item="changeMenuItem"
    />
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
    width: 100vw;
    min-height: 100vh;

    &__menu {
      width: 100vw;
    }

    &__component {
      min-height: calc(100vh - 80px);
    }

  }

  @media (max-width: 768px) {
    
    &__component {
      padding-bottom: 100px;
      margin: @spacing-400 @spacing-300;
    }
    
  }
}
</style>
