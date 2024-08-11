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

test('◯か☓を選択して、ゲームを開始できる', async () => {
  render(container())

  await user.click(screen.getByRole('radio', { name: 'Select X' }))
  expect(screen.getByRole('link', { name: 'Start Game' })).toHaveAttribute('href', '/game?player=X')

  await user.click(screen.getByRole('radio', { name: 'Select O' }))
  expect(screen.getByRole('link', { name: 'Start Game' })).toHaveAttribute('href', '/game?player=O')
})
