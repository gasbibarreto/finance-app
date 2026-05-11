import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CardBudget from '@/components/budgets/CardBudget.vue'
import { createPinia, setActivePinia } from 'pinia'
import type { Budget, Transaction } from '@/types/index'

const mockRouter = {
  push: vi.fn(),
}

vi.mock('vue-router', () => ({
  useRouter: () => mockRouter,
}))

const budgetMock: Budget = {
  category: 'Groceries',
  maximum: 500,
  theme: 'blue',
}

const transactionsMock: Transaction[] = [
  {
    avatar: "",
    name: "Transaction 1",
    category: "Groceries",
    date: "2023-01-15",
    amount: 50,
    recurring: false
  },
  { 
    avatar: "",
    name: "Transaction 2",
    category: "Groceries",
    date: "2023-01-16",
    amount: 25,
    recurring: false
    },
]

describe('CardBudget.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('renders budget information correctly', () => {
    const wrapper = mount(CardBudget, {
      props: {
        budget: budgetMock,
        transactions: transactionsMock,
      },
      global: {
        stubs: {
          ActionsModal: true,
          TransactionsList: true,
          Card: {
            template: '<div><slot/></div>',
          },
        },
      },
    })

    expect(wrapper.find('h2').text()).toBe('Groceries')
    expect(wrapper.text()).toContain('Maximum of $500.00')
    expect(wrapper.text()).toContain('15.00%') // (50+25) / 500 = 0.15
    expect(wrapper.find('.card-budget__content__cost__spent span').text()).toBe('$75.00')
    expect(wrapper.find('.card-budget__content__cost__remaining span').text()).toBe('$425.00')
  })
})
