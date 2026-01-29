<script setup lang="ts">
import Menu from './components/layout/Menu.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { ComponentsItens } from './types'

const route = useRoute()

const pathToMenuName: Record<string, ComponentsItens> = {
  '/': 'Overview',
  '/overview': 'Overview',
  '/transactions': 'Transactions',
  '/budgets': 'Budgets',
  '/pots': 'Pots',
  '/recurring-bills': 'Recurring Bills',
}

function getMenuFromPath(path: string): ComponentsItens {
  return pathToMenuName[path] ?? 'Overview'
}

const selectedMenuItem = computed(() => getMenuFromPath(route.path))
</script>

<template>
  <div class="app__container">
    <Menu class="app__container__menu" :selected-menu="selectedMenuItem" />
    <router-view class="app__container__component" />
  </div>
</template>

<style scoped lang="less">
.app__container {
  display: flex;
  min-height: 100vh;

  &__menu {
    align-self: stretch;
  }

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
