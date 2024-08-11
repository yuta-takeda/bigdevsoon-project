import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Component } from './component'

const mockFn = jest.fn()

const component = () => {
  return (
    <BrowserRouter>
      <Component generatedMessage={'test'} handleRegenerate={mockFn} handleCopyText={mockFn} />
    </BrowserRouter>
  )
}

test('生成されたテキストを表示する', async () => {
  render(component())

  await waitFor(() => expect(screen.getByRole('article')).toHaveTextContent('test'))
})

test('Back to Generator をクリックしたとき入力画面に戻る', async () => {
  render(component())

  const link = screen.getByRole('link', { name: '← Back to Generator' })
  expect(link).toHaveAttribute('href', '/')
})
