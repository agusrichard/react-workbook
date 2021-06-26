import { mount } from 'enzyme'

import Card from '../card.components'

it('Test the card default', () => {
  const wrapper = mount(<Card />)

  expect(wrapper.props().title).toBe('Title')
  expect(wrapper.props().description).toBe('Description')
})

it('Test after click', () => {
  const wrapper = mount(<Card />)

  const btn = wrapper.find('button')
  btn.simulate('click')
  const myLoveText = wrapper.find('#detective')
  expect(myLoveText.text()).toBe('Sherlock Holmes and John Watson')
})