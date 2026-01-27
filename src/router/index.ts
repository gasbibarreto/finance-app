import { createRouter, createWebHistory } from 'vue-router'
import Overview from '@/components/views/Overview.vue'
import Transactions from '@/components/transactions/Transactions.vue'
import Pots from '@/components/pots/Pots.vue'
import RecurringBills from '@/components/views/RecurringBills.vue'
import Budgets from '@/components/budgets/Budgets.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Overview,
    },
    {
      path: '/overview',
      name: 'Overview',
      component: Overview
    },
    {
      path: '/transactions',
      name: 'Transactions',
      component: Transactions,
      props: true
    },
    {
      path: '/budgets',
      name: 'Budgets',
      component: Budgets
    },
    {
      path: '/pots',
      name: 'Pots',
      component: Pots
    },
    {
      path: '/recurring-bills',
      name: 'RecurringBills',
      component: RecurringBills
    },
  ],
})

export default router
