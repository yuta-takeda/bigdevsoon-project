import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { HomeComponent } from './component'

const component = () => {
  return (
    <BrowserRouter>
      <HomeComponent />
    </BrowserRouter>
  )
}

test('New Game をクリックすると、NewGame 画面に遷移する', () => {
  render(component())
  const newGameButton = screen.getByRole('link', { name: 'New Game' })
  expect(newGameButton).toHaveAttribute('href', '/new_game')
})
