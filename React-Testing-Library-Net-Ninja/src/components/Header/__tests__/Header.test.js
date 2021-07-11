import { render, screen } from '@testing-library/react'

import Header from '../Header'

it('should render the header title', () => {
  render(<Header title='My Header' />)

  const element = screen.getByText(/My Header/)
  expect(element).toBeInTheDocument()
})

it('should render heading, search by role', () => {
  render(<Header title='My Header' />)

  const element = screen.getByRole('heading')
  expect(element).toBeInTheDocument()
})

it('should render heading with the same text content', () => {
  render(<Header title='My Header' />)

  const element = screen.getByRole('heading')
  expect(element.textContent).toBe('My Header')
})

it('should render heading, search by role with name', () => {
  render(<Header title='My Header' />)

  const element = screen.getByRole('heading', { name: 'My Header' })
  expect(element).toBeInTheDocument()
})

it('should render heading, search title', () => {
  render(<Header title='My Header' />)

  const element = screen.getByTitle(/My Header/)
  expect(element).toBeInTheDocument()
})

it('should render heading, search by test id', () => {
  render(<Header title='My Header' testId="header"/>)

  const element = screen.getByTestId(/header/)
  expect(element).toBeInTheDocument()
})

it('should render heading, search by find by', async () => {
  render(<Header title='My Header' testId="header"/>)

  const element = await screen.findByText(/My Header/)
  expect(element).toBeInTheDocument()
})

it('should render heading, search by query by', () => {
  render(<Header title='My Header' testId="header"/>)

  const element = screen.queryByText(/My Footer/)
  expect(element).not.toBeInTheDocument()
})

it('should render heading, search by get all', () => {
  render(<Header title='My Header' testId="header"/>)

  const element = screen.getAllByText(/My Header/)
  expect(element.length).toBe(1)
})