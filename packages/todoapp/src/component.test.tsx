import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { TodoComponent } from './component'
import type { Todo } from './container'

const mockFn = jest.fn()

const component = (todos: Todo[]) => {
  return (
    <TodoComponent
      todos={todos}
      isDarkMode={false}
      toggleTheme={mockFn}
      setShowButton={mockFn}
      showButton={false}
      addTodo={mockFn}
      showDeleteButton={mockFn}
      hideDeleteButton={mockFn}
      toggleCompleted={mockFn}
      deleteTodo={mockFn}
    />
  )
}

test('すべての Todo と completed の件数を表示できる', () => {
  const todos = [
    { id: 1, text: 'Learn React', completed: true },
    { id: 2, text: 'Learn Redux', completed: false },
    { id: 3, text: 'Learn React Testing Library', completed: false },
  ]

  render(component(todos))

  expect(screen.queryAllByLabelText('todo')).toHaveLength(3)
  expect(screen.getByText('Learn React')).toHaveClass('todoTextCompleted')
  expect(screen.getByText('Learn Redux')).toHaveClass('todoText')
  expect(screen.getByText('1 / 3 tasks completed')).toBeInTheDocument()
})

test('Todo が表示されていない', () => {
  const todos = [] as Todo[]

  render(component(todos))

  expect(screen.queryAllByLabelText('todo')).toHaveLength(0)
  expect(screen.getByText("You're todo's are empty")).toBeInTheDocument()
})
