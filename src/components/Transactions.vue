<script setup lang="ts">
import data from '@/assets/data/data.json'
import { computed, ref } from 'vue'

// Variables
const term = ref()
const category = ref('All Transactions')
const sortedItens = ref(['Latest', 'Oldest', 'A to Z', 'Z to A', 'Highest', 'Lowest'])
const selectedSort = ref('Latest')
const pageNumber = ref(1);
const pageNumberTotal = ref(5);
const itemsPerPage = ref(10);


// Computed

const startIndex = computed(() => {
  return (pageNumber.value - 1) * itemsPerPage.value
})

const endIndex = computed(() => {
  return startIndex.value + itemsPerPage.value
})

const sortTransactions = computed(() => {
  let transactionsCopy = [...data.transactions]

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

  if (selectedSort.value.includes('Oldest')) {
    transactionsCopy.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
    console.log('OLDEST')
  } else if (selectedSort.value.includes('Latest')) {
    transactionsCopy.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    console.log('lATEST')
  } else if (selectedSort.value.includes('A to Z')) {
    transactionsCopy.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
    console.log('A to Z')
  } else if (selectedSort.value.includes('Z to A')) {
    transactionsCopy.sort((a, b) => {
      return b.name.localeCompare(a.name)
    })
    console.log('Z to A')
  } else if (selectedSort.value === 'Highest') {
    transactionsCopy.sort((a, b) => {
      return b.amount - a.amount
    })
    console.log('highest')
  } else {
    transactionsCopy.sort((a, b) => {
      return a.amount - b.amount
    })
    console.log('else')
  }

  if(transactionsCopy.length < pageNumber.value) {
    return
  } else {
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
function getAvatarUrl(url: string) {
  return new URL(url, import.meta.url).href
}

function changePage(page: number) {
  pageNumber.value = page
}

</script>
<template>
  <div class="transactions">
    <h2>Transactions</h2>
    <div class="transactions__content">
      <div class="transactions__content__header">
        <div>
          <input v-model="term" placeholder="Search transactions" @change="{ sortTransactions }" />
          <img src="../assets/images/icon-search.svg" alt="Icon search" />
        </div>
        <div>
          <p>Sort by</p>
          <select v-model="selectedSort" @change="{ sortTransactions }">
            <option v-for="option in sortedItens" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div>
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
                <img :src="getAvatarUrl(transaction.avatar)" alt="" />
                {{ transaction.name }}
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
      <nav>
      <div>
        <button @click="changePage(pageNumber -1 )" :disabled="pageNumber === 1">Previous</button>
      </div>
      <div>
        <button 
        v-for="page in pageNumberTotal" :key="page" @click="changePage(page)" :disabled="pageNumber === page">{{ page }}
      </button>
      </div>
      <div>
        <button @click="changePage(pageNumber + 1)" :disabled="pageNumber === pageNumberTotal">Next</button>
      </div>
    </nav>
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

    &__header {
      display: flex;
      justify-content: space-between;
      padding: 16px 24px;

      div {
        display: flex;
        align-items: center;
        gap: 8px;

        p {
          font-size: 14px;
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
  }
}
</style>
