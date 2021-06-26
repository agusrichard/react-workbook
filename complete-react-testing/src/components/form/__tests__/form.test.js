import { render, fireEvent, cleanup, screen } from '@testing-library/react'

import Form from '../form.components'

afterEach(cleanup)

it('Test for placeholder', () => {
  render(<Form />)

  const usernameInput = screen.getByPlaceholderText(/Username/)
  const passwordInput = screen.getByPlaceholderText(/Password/)
  const ageInput = screen.getByPlaceholderText(/Age/)

  expect(usernameInput).toBeInTheDocument()
  expect(passwordInput).toBeInTheDocument()
  expect(ageInput).toBeInTheDocument()

  fireEvent.change(usernameInput, { target: { value: 'My Username' } })
  fireEvent.change(passwordInput, { target: { value: 'My Password' } })
  fireEvent.change(ageInput, { target: { value: 21 } })

  const submitBtn = screen.getByText('Submit')
  fireEvent.click(submitBtn)

  expect(screen.getByText('My Username')).toBeInTheDocument()
  expect(screen.getByText('My Password')).toBeInTheDocument()
  expect(screen.getByText('21')).toBeInTheDocument()
})