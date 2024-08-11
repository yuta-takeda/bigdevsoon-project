import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { Container } from './container'

const user = userEvent.setup()

const container = () => {
  return (
    <BrowserRouter>
      <Container />
    </BrowserRouter>
  )
}

test('すべてのオプションを選択後、フォームを送信できる', async () => {
  render(container())

  await user.click(screen.getByRole('button', { name: 'Twitter' }))
  await user.click(screen.getByRole('button', { name: 'Polite' }))
  await user.click(screen.getByRole('button', { name: 'Work' }))
  await user.type(screen.getByRole('textbox', { name: 'Your message' }), 'Hello, World!')

  const submitBtn = screen.getByRole('button', { name: 'Generate post' })
  expect(submitBtn).toBeEnabled()
  expect(submitBtn.closest('a')).toHaveAttribute(
    'href',
    '/result?platform=Twitter&message=Hello, World!&tone=Polite&style=Work'
  )
})

test('1つでもオプションが選択されていなければ、フォームを送信できない', async () => {
  render(container())

  await user.click(screen.getByRole('button', { name: 'Polite' }))
  await user.click(screen.getByRole('button', { name: 'Work' }))
  await user.type(screen.getByRole('textbox', { name: 'Your message' }), 'Hello, World!')

  expect(screen.getByRole('button', { name: 'Generate post' })).toBeDisabled()
})
