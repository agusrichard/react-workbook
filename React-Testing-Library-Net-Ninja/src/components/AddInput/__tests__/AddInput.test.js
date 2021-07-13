import { fireEvent, render, screen } from '@testing-library/react'
import AddInput from '../AddInput'

const mockedSetTodo = jest.fn()

describe('should render child element tests', () => {
    it('should render input element', () => {
        render(<AddInput todos={[]} setTodos={mockedSetTodo} />)

        const element = screen.getByPlaceholderText(/Add a new task here.../i)
        expect(element).toBeInTheDocument()
    })

    it('should render button element', () => {
        render(<AddInput todos={[]} setTodos={mockedSetTodo} />)

        const element = screen.getByText(/Add/i)
        expect(element).toBeInTheDocument()
    })
})

describe('events with the component tests', () => {
    it('should change value of input component', () => {
        render(<AddInput todos={[]} setTodos={mockedSetTodo} />)

        const element = screen.getByPlaceholderText(/Add a new task here.../i)
        fireEvent.change(element, { target: { value: 'Some todo here' } })
        expect(element.value).toBe('Some todo here')
    })

    it('should have empty input value after click the button', () => {
        render(<AddInput todos={[]} setTodos={mockedSetTodo} />)

        const inputElement = screen.getByPlaceholderText(/Add a new task here.../i)
        fireEvent.change(inputElement, { target: { value: 'Some todo here' } })
        const buttonElement = screen.getByText(/Add/i)
        fireEvent.click(buttonElement)
        expect(inputElement.value).toBe('')
    })
})