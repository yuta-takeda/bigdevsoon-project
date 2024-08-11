import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { Container } from './container'

const user = userEvent.setup()

const component = () => {
  return (
    <BrowserRouter>
      <Container />
    </BrowserRouter>
  )
}

test('再生成ボタンをクリックしたとき、テキストを再生成する', async () => {
  render(component())

  await user.click(screen.getByRole('button', { name: 'Regenerate message' }))
  await waitFor(() => expect(screen.getByRole('article')).toHaveTextContent('Generating...'))
})
