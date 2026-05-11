import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ActionsModal from '@/components/actionsModal/ActionsModal.vue'

describe('ActionsModal.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders edit and delete actions', () => {
    const wrapper = mount(ActionsModal, {
      props: {
        actionsType: 'Pot',
        actionsTitle: 'My Test Pot'
      }
    })

    expect(wrapper.text()).toContain('Edit Pot')
    expect(wrapper.text()).toContain('Delete Pot')
  })
})
