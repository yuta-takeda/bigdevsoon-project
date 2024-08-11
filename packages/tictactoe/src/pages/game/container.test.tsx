import '@testing-library/jest-dom'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import type { FieldIcon } from './container'
import { Container } from './container'

const user = userEvent.setup()

const container = (
  props = {
    initialField: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ] as FieldIcon[][],
  }
) => {
  return (
    <MemoryRouter initialEntries={['?player=X']}>
      <Container initialField={props.initialField} />
    </MemoryRouter>
  )
}

test('マスをクリックすると、カウントが更新される。その後相手ターンになり、再びこちらにターンが移る', async () => {
  render(container())

  const square = screen.getByLabelText('Place X at (1, 1)')
  expect(within(square).queryByAltText('X')).not.toBeInTheDocument()
  await user.click(square)
  expect(screen.getByLabelText('X Player count')).toHaveTextContent('1')
  expect(within(square).getByAltText('X')).toBeInTheDocument()
  await waitFor(() => expect(screen.getByLabelText('O Player count')).toHaveTextContent('1'))
  await waitFor(() => expect(screen.getByAltText('Current Player is X')).toBeInTheDocument())
})

describe('一列同じマークが並ぶと勝敗が決まる', () => {
  test('横一列の場合', async () => {
    render(
      container({
        initialField: [
          ['X', 'X', null],
          ['O', 'O', null],
          [null, null, null],
        ],
      })
    )

    const square = screen.getByLabelText('Place X at (2, 0)')
    await user.click(square)

    const winnerDiv = screen.getByLabelText('winner')
    expect(winnerDiv).toHaveTextContent('WON THIS ROUND')
    expect(within(winnerDiv).getByAltText('X')).toBeInTheDocument()
  })

  test('縦一列の場合', async () => {
    render(
      container({
        initialField: [
          ['X', 'O', 'X'],
          ['O', 'O', null],
          [null, null, 'X'],
        ],
      })
    )

    const square = screen.getByLabelText('Place X at (2, 1)')
    await user.click(square)

    const winnerDiv = screen.getByLabelText('winner')
    expect(winnerDiv).toHaveTextContent('WON THIS ROUND')
    expect(within(winnerDiv).getByAltText('X')).toBeInTheDocument()
  })

  test('斜め（右下がり）の場合', async () => {
    render(
      container({
        initialField: [
          ['X', 'O', 'X'],
          ['O', null, null],
          [null, 'O', 'X'],
        ],
      })
    )

    const square = screen.getByLabelText('Place X at (1, 1)')
    await user.click(square)

    const winnerDiv = screen.getByLabelText('winner')
    expect(winnerDiv).toHaveTextContent('WON THIS ROUND')
    expect(within(winnerDiv).getByAltText('X')).toBeInTheDocument()
  })

  test('斜め（左下がり）の場合', async () => {
    render(
      container({
        initialField: [
          [null, 'O', 'X'],
          ['O', 'X', null],
          [null, 'O', 'X'],
        ],
      })
    )

    const square = screen.getByLabelText('Place X at (0, 2)')
    await user.click(square)

    const winnerDiv = screen.getByLabelText('winner')
    expect(winnerDiv).toHaveTextContent('WON THIS ROUND')
    expect(within(winnerDiv).getByAltText('X')).toBeInTheDocument()
  })
})

test('すべてのマスが埋まっても勝敗が決まらない場合、引き分けとなる', async () => {
  render(
    container({
      initialField: [
        ['O', 'X', 'X'],
        [null, 'X', 'O'],
        ['O', 'O', 'X'],
      ],
    })
  )

  const square = screen.getByLabelText('Place X at (0, 1)')
  await user.click(square)

  expect(screen.getByText('NOBODY WINS')).toBeInTheDocument()
  expect(screen.getByText('THIS GAME IS A TIE')).toBeInTheDocument()
})
