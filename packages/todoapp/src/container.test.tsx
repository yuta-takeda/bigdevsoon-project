import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoContainer } from './container'

const user = userEvent.setup()

// Todo を生成する
beforeEach(async () => {
  render(<TodoContainer />)

  const textbox = screen.getByPlaceholderText('Create a new todo...')
  await user.type(textbox, 'テストです')
  const addButton = screen.getByRole('button', { name: 'Add todo' })
  await user.click(addButton)
})

test('Todo を追加できる', async () => {
  expect(screen.queryAllByLabelText('todo')).toHaveLength(1)
  expect(screen.getByText('テストです')).toBeInTheDocument()
})

test('クリックすると Todo のステータスを変更できる', async () => {
  const todoItem = screen.getByLabelText('todo')
  await user.click(todoItem)
  const todoLabel = screen.getByText('テストです')
  expect(todoLabel).toHaveClass('todoTextCompleted')
})

test('Xボタンをクリックすると、Todo を削除できる', async () => {
  const todoItem = screen.getByLabelText('todo')
  await user.hover(todoItem)
  const deleteButton = screen.getByRole('button', { name: 'delete-todo' })
  await user.click(deleteButton)
  expect(todoItem).not.toBeInTheDocument()
})

// toHaveStyle を使いたいが、inline style しか検知できないので click できることだけ見ている
test('テーマを変更できる', async () => {
  const toggleThemeButton = screen.getByRole('button', { name: 'toggle-theme' })
  await user.click(toggleThemeButton)
})
