import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Component } from './component'

const mockFn = jest.fn()

const component = (isPostable: () => boolean) => {
  return (
    <BrowserRouter>
      <Component
        socialPlatforms={[
          {
            name: 'Facebook',
            icon: 'https://img.icons8.com/ios-filled/50/000000/facebook-new.png',
          },
          {
            name: 'Twitter',
            icon: 'https://img.icons8.com/ios-filled/50/000000/twitter.png',
          },
          {
            name: 'Reddit',
            icon: 'https://img.icons8.com/ios-filled/50/000000/reddit.png',
          },
          {
            name: 'LinkedIn',
            icon: 'https://img.icons8.com/ios-filled/50/000000/linkedin.png',
          },
        ]}
        maxMessageLength={200}
        toneOfVoices={['Polite', 'Funny', 'Friendly', 'Informal', 'Serious', 'Optimistic', 'Motivational']}
        postStyles={['Work', 'Opinion', 'Case study', 'Story', 'Tutorial']}
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
