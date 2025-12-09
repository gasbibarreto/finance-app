<!-- 
  EXEMPLO: Como usar o store Pinia no componente Transactions
  
  Para usar este exemplo, substitua o conteúdo do seu Transactions.vue
  ou renomeie este arquivo para Transactions.vue
-->

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFinanceStore } from '@/stores/finance'

// Usar o store Pinia
const financeStore = useFinanceStore()

// Variables
const term = ref()
const category = ref('All Transactions')
const sortedItens = ref(['Latest', 'Oldest', 'A to Z', 'Z to A', 'Highest', 'Lowest'])
const selectedSort = ref('Latest')
const pageNumber = ref(1)
const pageNumberTotal = ref(5)
const itemsPerPage = ref(10)

// Computed
const startIndex = computed(() => {
  return (pageNumber.value - 1) * itemsPerPage.value
})

const endIndex = computed(() => {
  return startIndex.value + itemsPerPage.value
})

// Usar transactions do store
const sortTransactions = computed(() => {
  let transactionsCopy = [...financeStore.transactions]

  if (term.value) {
    transactionsCopy = transactionsCopy.filter((transaction) => {
      return (
        transaction.name.toLowerCase().includes(term.value.toLowerCase()) ||
        transaction.amount === Number(term.value)
      )
    })
  }

  if (category.value !== 'All Transactions') {
    transactionsCopy = transactionsCopy.filter((transaction) => {
      return transaction.category === category.value
    })
  }

  // Aplicar ordenação
  if (selectedSort.value.includes('Oldest')) {
    transactionsCopy.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
  } else if (selectedSort.value.includes('Latest')) {
    transactionsCopy.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  } else if (selectedSort.value.includes('A to Z')) {
    transactionsCopy.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
  } else if (selectedSort.value.includes('Z to A')) {
    transactionsCopy.sort((a, b) => {
      return b.name.localeCompare(a.name)
    })
  } else if (selectedSort.value === 'Highest') {
    transactionsCopy.sort((a, b) => {
      return b.amount - a.amount
    })
  } else {
    transactionsCopy.sort((a, b) => {
      return a.amount - b.amount
    })
  }

  if (transactionsCopy.length < pageNumber.value) {
    return []
  } else {
    transactionsCopy = transactionsCopy.slice(startIndex.value, endIndex.value)
  }

  return transactionsCopy
})

const categoryList = computed(() => {
  const categories = financeStore.transactions.map((transaction) => {
    return transaction.category
  })
  const categorySet = [...new Set(categories)]
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

// Exemplo: Adicionar nova transação
function handleAddTransaction() {
  financeStore.addTransaction({
    avatar: '../assets/images/avatars/new-transaction.jpg',
    name: 'Nova Transação',
    category: 'General',
    date: new Date().toISOString(),
    amount: -50.0,
    recurring: false,
  })
}

// Exemplo: Deletar transação
function handleDeleteTransaction(index: number) {
  financeStore.deleteTransaction(index)
}

// Exemplo: Atualizar transação
function handleUpdateTransaction(index: number) {
  financeStore.updateTransaction(index, {
    amount: -100.0,
    category: 'Shopping',
  })
}
</script>

<template>
  <div class="transactions">
    <h2>Transactions</h2>

    <!-- Exemplo de botões para manipular dados -->
    <div style="margin-bottom: 20px">
      <button @click="handleAddTransaction">Adicionar Transação</button>
    </div>

    <div class="transactions__content">
      <div class="transactions__content__header">
        <div>
          <input v-model="term" placeholder="Search transactions" />
          <img src="../assets/images/icon-search.svg" alt="Icon search" />
        </div>
        <div>
          <p>Sort by</p>
          <select v-model="selectedSort">
            <option v-for="option in sortedItens" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div>
          <p>Category</p>
          <select v-model="category">
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
              <th>Ações</th>
            </tr>
          </thead>
          <tbody class="transactions__content__table__body">
            <tr v-for="(transaction, index) in sortTransactions" :key="index">
              <td>
                <img :src="getAvatarUrl(transaction.avatar)" alt="" />
                {{ transaction.name }}
              </td>
              <td>{{ transaction.category }}</td>
              <td>{{ transaction.date }}</td>
              <td :class="{ income: transaction.amount > 0, expense: transaction.amount < 0 }">
                {{ transaction.amount }}
              </td>
              <td>
                <button @click="handleDeleteTransaction(index)">Deletar</button>
                <button @click="handleUpdateTransaction(index)">Editar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav>
        <div>
          <button @click="changePage(pageNumber - 1)" :disabled="pageNumber === 1">Previous</button>
        </div>
        <div>
          <button
            v-for="page in pageNumberTotal"
            :key="page"
            @click="changePage(page)"
            :disabled="pageNumber === page"
          >
            {{ page }}
          </button>
        </div>
        <div>
          <button @click="changePage(pageNumber + 1)" :disabled="pageNumber === pageNumberTotal">
            Next
          </button>
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
