import './App.css'
import { useEffect, useState } from 'react'

import { Empty, Todo, TodoId } from './todo_pb'
import { TodoServiceClient } from './todo_grpc_web_pb'

const client = new TodoServiceClient('http://localhost:8000')

function App() {
  const defaultNewTodo = {
    title: '',
    description: '',
    completed: false,
  }

  const [todos, setTodos] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [todoIdForEdit, setTodoIdForEdit] = useState('')
  const [newTodo, setNewTodo] = useState(defaultNewTodo)

  const getAll = () => {
    const empty = new Empty()
    client.getAll(empty, null, (err, response) => {
      if (err) {
        console.error(err)
      } else {
        const responseTodos = response.getTodosList().map(todo => ({
          id: todo.getId(),
          title: todo.getTitle(),
          description: todo.getDescription(),
          completed: todo.getCompleted()
        }))
        setTodos(responseTodos)
      }
    })
  }

  const saveTodo = () => {
    const todo = new Todo()
    todo.setTitle(newTodo.title)
    todo.setDescription(newTodo.description)
    todo.setCompleted(newTodo.completed)
    if (isEdit) {
      todo.setId(todoIdForEdit)
      client.update(todo, null, (err, _) => {
        if (err) {
          alert('Failed to update todo')
        }
      })
    } else {
      client.create(todo, null, (err, _) => {
        if (err) {
          alert('Failed to add todo')
        }
      })
    }

    setIsEdit(false)
    setTodoIdForEdit('')
    setNewTodo(defaultNewTodo)
    getAll()
  }

  const deleteTodo = (id) => {
    const todoId = new TodoId()
    todoId.setId(id)
    client.delete(todoId, null, (err, _) => {
      if (err) {
        alert('Failed to delete todo')
      }
    })
    getAll()
  }

  useEffect(() => {
    getAll()
  }, [])

  return (
    <div className="container">
      <h1>{isEdit ? 'Edit' : 'Add'} Todo</h1>
      <form>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={newTodo.title}
            onChange={e => setNewTodo(prev => ({...prev, title: e.target.value}))}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Description"
            value={newTodo.description}
            onChange={e => setNewTodo(prev => ({...prev, description: e.target.value}))}
          />
        </div>
        <div>
          <label htmlFor="completed">Completed</label>
          <input
            id="completed"
            type="checkbox"
            checked={newTodo.completed}
            onChange={e => setNewTodo(prev => ({...prev, completed: e.target.checked}))}
            />
        </div>
        <button type="submit" onClick={saveTodo}>{isEdit ? 'Edit' : 'Add'}</button>
      </form>
      <h1>Todos</h1>
      <div>
        {todos.map(todo => (
          <div key={todo.id}>
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
            <p>{todo.completed ? 'Completed' : 'Not completed'}</p>
            <div>
              <button onClick={() => {
                setIsEdit(true)
                setNewTodo(todo)
                setTodoIdForEdit(todo.id)
              }}>Edit</button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
