import { mount } from 'enzyme'
import { render, cleanup, fireEvent } from '@testing-library/react'

import Card from '../card.components'

afterEach(cleanup)

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

it('Test with react testing library', () => {
  const { getByText } = render(<Card />)

  expect(getByText(/Title/)).toBeInTheDocument()
  expect(getByText(/Description/)).toBeInTheDocument()

  const btn = getByText('Click')
  fireEvent.click(btn)
  expect(getByText('Sherlock Holmes and John Watson')).toBeInTheDocument()
  expect(getByText('Sherlock Holmes and John Watson').textContent).toBe('Sherlock Holmes and John Watson')
})