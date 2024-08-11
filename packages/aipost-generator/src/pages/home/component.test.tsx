import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Component } from './component'

const mockFn = jest.fn()

const component = (isPostable: () => boolean) => {
  return (
    <BrowserRouter>
      <Component
        setSelectedPlatform={mockFn}
        selectedPlatform={'Facebook'}
        setMessage={mockFn}
        message={''}
        setSelectedToneOfVoice={mockFn}
        selectedToneOfVoice={'Polite'}
        setSelectedPostStyle={mockFn}
        selectedPostStyle={'Work'}
        isPostable={isPostable}
      />
    </BrowserRouter>
  )
}

test('Postable でないとき送信ボタンは disabled', () => {
  render(component(jest.fn(() => false)))

  expect(screen.getByRole('button', { name: 'Generate post' })).toBeDisabled()
})

test('Postable なとき送信ボタンは disabled でない', () => {
  render(component(jest.fn(() => true)))

  expect(screen.getByRole('button', { name: 'Generate post' })).not.toBeDisabled()
})
