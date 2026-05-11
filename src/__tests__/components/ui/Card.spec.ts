import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Card from '@/components/ui/Card.vue'

describe('Card.vue', () => {
  it('renders the title', () => {
    const wrapper = mount(Card, {
      props: {
        title: 'My Card Title',
      },
    })
    expect(wrapper.text()).toContain('My Card Title')
  })

  it('renders the card action text', () => {
    const wrapper = mount(Card, {
      props: {
        title: 'Test Title',
        cardAction: 'View Details',
      },
    })
    expect(wrapper.text()).toContain('View Details')
  })

  it('emits "actionClick" event when the action is clicked', async () => {
    const wrapper = mount(Card, {
      props: {
        title: 'Test Title',
        cardAction: 'Click Me',
      },
    })

    await wrapper.find('.card__header-actions').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('actionClick')
  })

  it('renders slot content', () => {
    const wrapper = mount(Card, {
      props: {
        title: 'Test Title',
      },
      slots: {
        default: '<div class="slot-content">Hello from slot</div>',
      },
    })
    expect(wrapper.html()).toContain('<div class="slot-content">Hello from slot</div>')
  })
})
