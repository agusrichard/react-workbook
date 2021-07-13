import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import TodoFooter from '../TodoFooter'

const MockedTodoFooter = ({ numberOfIncompleteTasks }) => (
  <Router>
    <TodoFooter numberOfIncompleteTasks={numberOfIncompleteTasks} />
  </Router>
)

describe('toBeInTheDocument block', () => {
  it('should render number of task', () => {
    render(<MockedTodoFooter numberOfIncompleteTasks={1} />)
  
    const element = screen.getByText(/task/)
    expect(element).toBeInTheDocument()
  })
  
  it('should render number of tasks', () => {
    render(<MockedTodoFooter numberOfIncompleteTasks={2} />)
  
    const element = screen.getByText(/tasks/)
    expect(element).toBeInTheDocument()
  })
  
  it('should render number of tasks of 5', () => {
    render(<MockedTodoFooter numberOfIncompleteTasks={5} />)
  
    const element = screen.getByText(/5 tasks left/)
    expect(element).toBeInTheDocument()
  })
})

describe('Another tests', () => {
  it('should render number of tasks assert with textContent and toBe', () => {
    render(<MockedTodoFooter numberOfIncompleteTasks={5} />)
  
    const element = screen.getByText(/tasks/)
    expect(element.textContent).toBe('5 tasks left')
  })
  
  it('should render number of tasks assert with toHaveTextContent', () => {
    render(<MockedTodoFooter numberOfIncompleteTasks={5} />)
  
    const element = screen.getByText(/tasks/)
    expect(element).toHaveTextContent('5 tasks left')
  })
  
  it('should render number of tasks assert with toBeVisible', () => {
    render(<MockedTodoFooter numberOfIncompleteTasks={5} />)
  
    const element = screen.getByText(/tasks/)
    expect(element).toBeVisible()
  })
  
  it('should render number of tasks negated with not', () => {
    render(<MockedTodoFooter numberOfIncompleteTasks={5} />)
  
    const element = screen.getByText(/tasks/)
    expect(element).not.toBeFalsy()
  })
})