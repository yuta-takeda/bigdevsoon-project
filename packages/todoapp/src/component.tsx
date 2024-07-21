import React, { MouseEvent } from 'react'
import emptyState from './assets/emptystate.svg'
import deleteIcon from './assets/icons/close.svg'
import darkModeIcon from './assets/icons/dark-mode.svg'
import lightModeIcon from './assets/icons/light-mode.svg'
import './component.css'
import type { Todo } from './container'

interface TodoProps {
  todos: Todo[]
  isDarkMode: boolean
  toggleTheme: () => void
  setShowButton: (value: boolean) => void
  showButton: boolean
  addTodo: () => void
  showDeleteButton: (e: MouseEvent) => void
  hideDeleteButton: (e: MouseEvent) => void
  toggleCompleted: (id: number) => void
  deleteTodo: (e: MouseEvent, id: number) => void
}

export const TodoComponent: React.FC<TodoProps> = ({
  todos,
  isDarkMode,
  toggleTheme,
  setShowButton,
  showButton,
  addTodo,
  showDeleteButton,
  hideDeleteButton,
  toggleCompleted,
  deleteTodo,
}: TodoProps) => {
  return (
    <div className="App">
      <div className="header">
        <div className="title">TODO</div>
        <div className="toggle" onClick={() => toggleTheme()} role="button" aria-label="toggle-theme">
          <img src={isDarkMode ? lightModeIcon : darkModeIcon} alt={'モード切替'} />
        </div>
      </div>
      <div className="background">
        <div className="addTodo">
          <div className="inputField">
            <input
              type="text"
              className="input"
              placeholder="Create a new todo..."
              onChange={() => setShowButton(true)}
            />
            {showButton && (
              <button type="button" className="button" onClick={() => addTodo()}>
                Add todo
              </button>
            )}
          </div>
        </div>
        {todos.length > 0 ?
          <div className="todoList">
            {todos.map((todo) => {
              return (
                <div
                  className="todo"
                  key={todo.id}
                  onMouseEnter={(e) => showDeleteButton(e)}
                  onMouseLeave={(e) => hideDeleteButton(e)}
                  onClick={() => toggleCompleted(todo.id)}
                  aria-label="todo"
                >
                  <div className="todoLabel">
                    <input type="checkbox" checked={todo.completed} readOnly />
                    <div className={todo.completed ? 'todoTextCompleted' : 'todoText'}>{todo.text}</div>
                  </div>
                  <img
                    src={deleteIcon}
                    className="deleteTodo"
                    height="24"
                    width="24"
                    alt="delete-todo"
                    aria-label="delete-todo"
                    role="button"
                    onClick={(e) => deleteTodo(e, todo.id)}
                  />
                </div>
              )
            })}
            <footer className="footer">
              <p>
                {todos.filter((todo) => todo.completed).length} / {todos.length} tasks completed
              </p>
            </footer>
          </div>
        : <div className="emptyTodo">
            <img src={emptyState} className="emptyState" alt="no todo" />
            <p>You're todo's are empty</p>
            <small>Please add first one</small>
          </div>
        }
      </div>
    </div>
  )
}