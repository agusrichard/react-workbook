import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import '@testing-library/jest-dom/extend-expect'

import Todo from '../Todo'

const MockedTodo = () => (
    <BrowserRouter>
        <Todo />
    </BrowserRouter>
)

const addTodos = (todos) => {
    todos.forEach(todo => {
        const inputElement = screen.getByPlaceholderText(/Add a new task here.../i)
        fireEvent.change(inputElement, { target: { value: todo } })
        
        const buttonElement = screen.getByText(/Add/i)
        fireEvent.click(buttonElement)
    })
}

describe('add new todo tests', () => {
    beforeAll(() => {
        console.log('Run before all tests')
    })

    beforeEach(() => {
        console.log('Run before each test')
    })

    afterEach(() => {
        console.log('Run after each test')
    })

    afterAll(() => {
        console.log('Run after all tests')
    })

    it('add one todo and assert the new todo', () => {
        render(<MockedTodo />)

        const inputValue = 'My new todo'
        addTodos([inputValue])

        const todoElement = screen.getByText(inputValue)
        expect(todoElement).toBeInTheDocument()
    })

    it('add three todo and assert number of todos', () => {
        render(<MockedTodo />)

        addTodos(['My first todo', 'My second todo', 'My third todo'])

        const todoElement = screen.getByText(/3 tasks left/)
        expect(todoElement).toBeInTheDocument()
    })

    it('add one todo and assert the class of the todo component', () => {
        render(<MockedTodo />)

        const inputValue = 'My new todo'
        addTodos([inputValue])

        const todoElement = screen.getByText(inputValue)
        expect(todoElement).not.toHaveClass('todo-item-active')
    })
})