<script setup lang="ts">
import type { ComponentsItens } from '@/types'
import { ref } from 'vue'

const menuItems = [
  { name: 'Overview', icon: 'icon-nav-overview.svg' },
  { name: 'Transactions', icon: 'icon-nav-transactions.svg' },
  { name: 'Budgets', icon: 'icon-nav-budgets.svg' },
  { name: 'Pots', icon: 'icon-nav-pots.svg' },
  { name: 'Recurring Bills', icon: 'icon-nav-recurring-bills.svg' },
]

const selectedItem = ref('')
const showMenu = ref(true)

function selectItem(itemName: ComponentsItens | string) {
  selectedItem.value = itemName as string
  emit('selectedMenuItem', itemName as ComponentsItens)
}

function getIconUrl(iconFileName: string) {
  return `/images/${iconFileName}`
}

const emit = defineEmits<{
  (e: 'selectedMenuItem', value: ComponentsItens): void
}>()
</script>

<template>
  <div :class="['menu', { 'menu--collapsed': !showMenu }]">
    <div class="menu__top">
      <img
        v-if="showMenu"
        class="menu__top__img"
        src="/images/logo-large.svg"
        alt="logo do app finance em tamanho grande"
      />

      <img
        v-else
        class="menu__top__img"
        src="/images/logo-small.svg"
        alt="logo do app finance em tamanho pequeno"
      />

      <ul class="menu__top__list">
        <li
          v-for="item in menuItems"
          :key="item.name"
          :class="[
            'menu__top__list__itens',
            { 'menu__top__list__itens--selected': selectedItem === item.name },
          ]"
          @click="selectItem(item.name)"
        >
          <img :src="getIconUrl(item.icon)" :alt="item.name + ' icon'" />
          <button v-show="showMenu">{{ item.name }}</button>
        </li>
      </ul>
    </div>
    <div class="menu__bottom" @click="showMenu = !showMenu">
      <img
        :class="[{ menu__bottom__rotate: !showMenu }]"
        src="/images/icon-minimize-menu.svg"
      />
      <button v-show="showMenu">Minimize Menu</button>
    </div>
  </div>
</template>

<style scoped lang="less">
.menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: @grey-900;
  width: 300px;
  height: 100vh;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;

  &--collapsed {
    width: 80px;

    .menu__top {
      &__list {
        &__itens {
          width: 40px;
        }
      }
    }

    @media (max-width: 768px) {
    }
  }

  &__top {
    &__img {
      margin: 40px 32px;
    }

    &__list {
      display: flex;
      flex-direction: column;
      list-style: none;
      padding-inline-start: 0;

      &__itens {
        display: flex;
        width: 245px;
        margin-top: @spacing-200;
        padding-top: @spacing-200;
        padding-bottom: @spacing-200;
        padding-left: @spacing-300;

        img {
          padding-right: @spacing-200;
        }

        button {
          background: none;
          border: none;
          color: @grey-300;
          font-size: @font-size-md;
          cursor: pointer;
          font-weight: @font-weight-bold;
        }

        &:hover :not(.menu__top__list__itens--selected) {
          button {
            color: @white;
          }
        }

        &--selected {
          background-color: @white;
          font-weight: @font-weight-bold;
          border-left: 5px solid @green;
          border-bottom-right-radius: 10px;
          border-top-right-radius: 10px;

          button {
            color: @grey-900;

            &:hover {
              color: @grey-900;
            }
          }
        }
      }
    }
  }

  &__bottom {
    display: flex;
    justify-content: left;
    padding: 16px 32px;
    margin-bottom: @spacing-500;

    button {
      background: none;
      border: none;
      font-size: @font-size-md;
      color: @grey-300;
      padding-left: @spacing-200;
      cursor: pointer;
    }

    &__rotate {
      transform: rotate(180deg);
    }
  }
}
</style>
