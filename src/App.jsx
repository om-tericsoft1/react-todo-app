import { useState } from 'react'
import './App.css'

export default function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('all')

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }])
      setInput('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') addTodo()
  }

  const completedCount = todos.filter(t => t.completed).length
  const activeCount = todos.length - completedCount

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>✓ My Tasks</h1>
          <p className="subtitle">Stay organized and productive</p>
        </header>

        <div className="input-section">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="input"
          />
          <button onClick={addTodo} className="add-btn">
            Add
          </button>
        </div>

        <div className="stats">
          <div className="stat">
            <span className="stat-label">Active</span>
            <span className="stat-value">{activeCount}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Completed</span>
            <span className="stat-value">{completedCount}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Total</span>
            <span className="stat-value">{todos.length}</span>
          </div>
        </div>

        <div className="filters">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

        <div className="todos-list">
          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              <p>
                {todos.length === 0
                  ? 'No tasks yet. Add one to get started!'
                  : 'No tasks in this category.'}
              </p>
            </div>
          ) : (
            filteredTodos.map(todo => (
              <div key={todo.id} className="todo-item">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="checkbox"
                />
                <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="delete-btn"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {todos.length > 0 && (
          <button
            onClick={() => setTodos(todos.filter(t => !t.completed))}
            className="clear-btn"
          >
            Clear Completed
          </button>
        )}
      </div>
    </div>
  )
}
