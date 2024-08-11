import '@testing-library/jest-dom'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { Component } from './component'

const mockFn = jest.fn()

const user = userEvent.setup()

const field = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

test('Xターンのとき、Xのアイコンを表示している', () => {
  render(
    <BrowserRouter>
      <Component
        yourIcon={'X'}
        currentPlayer={'X'}
        yourCount={0}
        cpuCount={0}
        handlePlace={mockFn}
        field={field}
        isGameOver={false}
        isDraw={false}
      />
    </BrowserRouter>
  )

  expect(screen.getByAltText('Current Player is X')).toBeInTheDocument()
  expect(screen.queryByAltText('Current Player is O')).not.toBeInTheDocument()
})

test('X,O それぞれの配置数を表示している', () => {
  render(
    <BrowserRouter>
      <Component
        yourIcon={'X'}
        currentPlayer={'X'}
        yourCount={3}
        cpuCount={2}
        handlePlace={mockFn}
        field={field}
        isGameOver={false}
        isDraw={false}
      />
    </BrowserRouter>
  )

  expect(screen.getByLabelText('X Player count')).toHaveTextContent('3')
  expect(screen.getByLabelText('O Player count')).toHaveTextContent('2')
})

test('Reset Gameをクリックすると、/new_game に戻る', () => {
  render(
    <BrowserRouter>
      <Component
        yourIcon={'X'}
        currentPlayer={'X'}
        yourCount={0}
        cpuCount={0}
        handlePlace={mockFn}
        field={field}
        isGameOver={false}
        isDraw={false}
      />
    </BrowserRouter>
  )

  expect(screen.getByRole('link', { name: 'Reset Game' })).toHaveAttribute('href', '/new_game')
})

test('引き分けのとき、NOBODY WINS を表示する', () => {
  render(
    <BrowserRouter>
      <Component
        yourIcon={'X'}
        currentPlayer={'X'}
        yourCount={0}
        cpuCount={0}
        handlePlace={mockFn}
        field={field}
        isGameOver={true}
        isDraw={true}
      />
    </BrowserRouter>
  )

  expect(screen.getByText('NOBODY WINS')).toBeInTheDocument()
  expect(screen.getByText('THIS GAME IS A TIE')).toBeInTheDocument()
})

test('引き分けでないとき、勝者を表示する', () => {
  render(
    <BrowserRouter>
      <Component
        yourIcon={'X'}
        currentPlayer={'X'}
        yourCount={0}
        cpuCount={0}
        handlePlace={mockFn}
        field={field}
        isGameOver={true}
        isDraw={false}
      />
    </BrowserRouter>
  )

  const winnerDiv = screen.getByLabelText('winner')
  expect(winnerDiv).toHaveTextContent('WON THIS ROUND')
  expect(within(winnerDiv).getByAltText('X')).toBeInTheDocument()
})

test('自ターンのときはマスをクリックできない', async () => {
  render(
    <BrowserRouter>
      <Component
        yourIcon={'X'}
        currentPlayer={'X'}
        yourCount={0}
        cpuCount={0}
        handlePlace={mockFn}
        field={field}
        isGameOver={false}
        isDraw={false}
      />
    </BrowserRouter>
  )

  const square = screen.getByLabelText('Place X at (1, 1)')
  await user.click(square)
  expect(mockFn).toHaveBeenCalled()
})

test('相手ターンのときはマスをクリックできない', async () => {
  render(
    <BrowserRouter>
      <Component
        yourIcon={'X'}
        currentPlayer={'O'}
        yourCount={0}
        cpuCount={0}
        handlePlace={mockFn}
        field={field}
        isGameOver={false}
        isDraw={false}
      />
    </BrowserRouter>
  )

  const square = screen.getByLabelText('Place O at (1, 1)')
  await user.click(square)
  expect(mockFn).not.toHaveBeenCalled()
})
