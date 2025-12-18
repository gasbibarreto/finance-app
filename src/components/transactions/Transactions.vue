<script setup lang="ts">
import data from '@/assets/data/data.json'
import { computed, ref } from 'vue'
import { getImageUrl } from '@/common/common'
import { useFinanceStore } from '@/stores/finance'
import type { SortItens } from '@/types'

// Variables
const term = ref()
const category = ref('All Transactions')
const sortedItens = ref<SortItens[]>(['Latest', 'Oldest', 'A to Z', 'Z to A', 'Highest', 'Lowest'])
const selectedSort = ref('Latest')
const pageNumber = ref(1)
const itemsPerPage = ref(10)

// STORE
const financeStore = useFinanceStore()
const transactions = computed(() => financeStore.transactions)

// Computed
const pageNumberTotal = computed(() => {
  return Math.ceil(transactions.value.length / itemsPerPage.value)
})

const startIndex = computed(() => {
    return (pageNumber.value - 1) * itemsPerPage.value
})

const endIndex = computed(() => {
  return startIndex.value + itemsPerPage.value
})

const sortTransactions = computed(() => {
  let transactionsCopy = [...transactions.value]

  const selectedSortFunction = {
    Latest: function latest(a: any, b: any) {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    },
    Oldest: function oldest(a: any, b: any) {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    },
    'A to Z': function aToZ(a: any, b: any) {
      return a.name.localeCompare(b.name)
    },
    'Z to A': function zToA(a: any, b: any) {
      return b.name.localeCompare(a.name)
    },
    Highest: function highest(a: any, b: any) {
      return b.amount - a.amount
    },
    Lowest: function lowest(a: any, b: any) {
      return a.amount - b.amount
    },
  }

  if (term.value) {
    //como o filter nao altera o array que o chama ele precisa ser reatribuido a variavel
    transactionsCopy = transactionsCopy.filter((transaction) => {
      return (
        transaction.name.toLowerCase().includes(term.value.toLowerCase()) ||
        transaction.amount === Number(term.value)
      )
    })
  }

  if (!category.value.includes('All Transactions')) {
    //como o filter nao altera o array que o chama ele precisa ser reatribuido a variavel
    transactionsCopy = transactionsCopy.filter((transaction) => {
      console.log('passei aqui categoria')
      return transaction.category.includes(category.value)
    })
  }

  if (selectedSort.value in selectedSortFunction) {
    transactionsCopy.sort((a, b) => selectedSortFunction[selectedSort.value as SortItens](a, b))
  }

  if (transactionsCopy.length > itemsPerPage.value) {
    transactionsCopy = transactionsCopy.slice(startIndex.value, endIndex.value)
  }

  return transactionsCopy
})

const categoryList = computed(() => {
  const category = data.transactions.map((transaction) => {
    return transaction.category
  })
  const categorySet = [...new Set(category)]
  categorySet.push('All Transactions')

  return categorySet
})

// Functions
function changePage(page: number) {
  pageNumber.value = page
}
</script>
<template>
  <div class="transactions">
    <h2>Transactions</h2>
    <div class="transactions__content">
      <div class="transactions__content__container">
        <div class="transactions__content__header">
          <div class="transactions__content__header__search">
            <input
              v-model="term"
              placeholder="Search transactions"
              @change="{ sortTransactions }"
            />
            <img src="@/assets/images/icon-search.svg" alt="Icon search" />
          </div>
          <div class="transactions__content__header__sort">
            <p>Sort by</p>
            <select v-model="selectedSort" @change="{ sortTransactions }">
              <option v-for="option in sortedItens" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
            <p>Category</p>
            <select v-model="category" @change="{ sortTransactions }">
              <option v-for="option in categoryList" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
        </div>
        <div class="transactions__content__table">
          <table class="transactions__content__table__header">
            <thead>
              <tr>
                <th>Recipient / Sender</th>
                <th>Category</th>
                <th>Transaction Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody class="transactions__content__table__body">
              <tr v-for="transaction in sortTransactions">
                <td>
                  <img :src="getImageUrl(transaction.avatar)" alt="" />
                  <span>{{ transaction.name }}</span>
                </td>
                <td>{{ transaction.category }}</td>
                <td>{{ transaction.date }}</td>
                <td :class="{ income: transaction.amount > 0, expense: transaction.amount < 0 }">
                  {{ transaction.amount }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <nav class="transactions__content__pagination">
          <div class="transactions__content__pagination__previous">
            <button @click="changePage(pageNumber - 1)" :disabled="pageNumber === 1">
              Previous
            </button>
          </div>
          <div class="transactions__content__pagination__pages">
            <button
              v-for="page in pageNumberTotal"
              :key="page"
              @click="changePage(page)"
              :class="{'selected': pageNumber == page }"
            >
              {{ page }}
            </button>
          </div>
          <div class="transactions__content__pagination__next">
            <button @click="changePage(pageNumber + 1)" :disabled="pageNumber === pageNumberTotal">
              Next
            </button>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.transactions {
  &__content {
    background-color: @white;
    border-radius: @spacing-150;
    opacity: 1;
    padding: @spacing-250;
    margin-top: @spacing-300;

    &__container {
      margin: @spacing-300;
    }

    &__header {
      display: flex;
      justify-content: space-between;

      &__search {
        display: flex;
        align-items: center;
        position: relative;
        gap: @spacing-100;

        input {
          border-radius: @spacing-100;
          border: 1px solid @grey-300;
          padding: @spacing-100 @spacing-250 @spacing-100 @spacing-100;
          width: 250px;
          height: 20px;
          font-size: @font-size-xs;
          font-weight: @font-weight-light;
        }

        img {
          position: absolute;
          right: 10px;
          pointer-events: none;
        }
      }

      &__sort {
        display: flex;
        align-items: center;
        gap: @spacing-100;

        p {
          font-size: @font-size-xs;
          font-weight: @font-weight-light;
          color: @grey-500;
        }

        select {
          background-color: transparent;
          font-size: @font-size-xs;
          font-weight: @font-weight-light;
          padding: @spacing-100;
          border-radius: @spacing-100;
          border: 1px solid @grey-300;

          option {
            font-size: @font-size-xs;
            font-weight: @font-weight-light;
            color: @grey-500;
          }

          option:checked {
            background-color: @grey-300;
            color: @grey-500;
          }
        }
      }
    }

    &__table {
      &__header {
        width: 100%;
        border-collapse: collapse;
        margin-top: @spacing-100;
        margin-bottom: @spacing-100;

        thead {

          th {
            text-align: left;
            font-size: @font-size-xs;
            font-weight: @font-weight-light;
            color: @grey-500;
            padding: @spacing-300 0px;
          }
        }

        tbody {
          tr {
            border-top: 1px solid @grey-100;
          }

          td {
            padding: @spacing-300 0px;
            align-items: center;
            font-size: @font-size-xs;
            font-weight: @font-weight-light;
            color: @grey-900;
          }

          td:first-child {
            display: flex;
            align-items: center;
            gap: @spacing-150;

            span {
              font-size: @font-size-sm;
              font-weight: @font-weight-bold;
              color: @grey-900;
            }
          }
        }
      }

      &__body {
        img {
          width: @spacing-500;
          height: @spacing-500;
          border-radius: 50%;
          margin-right: @spacing-150;
        }
      }
    }

    &__pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: @spacing-100;

    button {
      background-color: transparent;
      border: 1px solid @grey-500;
      border-radius: @spacing-100;
      padding: @spacing-100 @spacing-200;
      cursor: pointer;
      font-size: @font-size-xs;
      font-weight: @font-weight-light;
      color: @grey-900;
    }

    button:disabled {
      color: @grey-300;
    }


    &__pages {
      button.selected {
        background-color: @grey-900;
        color: @white;
      }
    }
  }
  }

}
</style>
