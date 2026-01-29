<script setup lang="ts">
import { getImagePath } from '@/utils/utils'
import type { ComponentsItens } from '@/types'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  selectedMenu: ComponentsItens
}>()

const menuItems = [
  { name: 'Overview', icon: '/images/icon-nav-overview.svg', path: '/overview' },
  { name: 'Transactions', icon: '/images/icon-nav-transactions.svg', path: '/transactions' },
  { name: 'Budgets', icon: '/images/icon-nav-budgets.svg', path: '/budgets' },
  { name: 'Pots', icon: '/images/icon-nav-pots.svg', path: '/pots' },
  {
    name: 'Recurring Bills',
    icon: '/images/icon-nav-recurring-bills.svg',
    path: '/recurring-bills',
  },
]

const showMenu = ref(true)

function selectItem(path: string) {
  router.push({ path: path })
}
</script>

<template>
  <div :class="['menu', 'menu--responsive', { 'menu--collapsed': !showMenu }]">
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
            { 'menu__top__list__itens--selected': selectedMenu === item.name },
          ]"
          @click="selectItem(item.path)"
        >
          <img :src="getImagePath(item.icon)" :alt="item.name + ' icon'" />
          <button v-show="showMenu">{{ item.name }}</button>
        </li>
      </ul>
    </div>
    <div class="menu__bottom" @click="showMenu = !showMenu">
      <img :class="[{ menu__bottom__rotate: !showMenu }]" src="/images/icon-minimize-menu.svg" />
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
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  width: 300px;

  &--collapsed {
    width: 80px;

    .menu__top {
      &__list {
        &__itens {
          width: 40px;
        }
      }
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
        cursor: pointer;

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
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: left;
    padding: 16px 32px;
    cursor: pointer;

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

  &--responsive {
    @media (max-width: 1024px) {
      width: 100vw;
      height: 80px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;

      .menu__top {
        &__img {
          display: none;
        }

        &__list {
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
          padding: 0;
          margin: 0;

          &__itens {
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: @spacing-100;
            width: 100px;
            margin-top: 6px;
            padding-right: 0px;
            padding-left: 0px;

            img {
              padding-right: 0px;
            }

            button {
              font-size: @font-size-xs;
            }

            &--selected {
              border-top-right-radius: 10px;
              border-top-left-radius: 10px;
              border-bottom-right-radius: 0;
              border-bottom-left-radius: 0;
              border-left: none;
              border-bottom: 5px solid @green;
              padding-bottom: @spacing-50;
              padding-left: 0px;
            }
          }
        }
      }
      .menu__bottom {
        display: none;
      }
    }

    @media (max-width: 768px) {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      padding-bottom: 5px;
    }
  }
}
</style>
