import React, { useState } from 'react'
import { Component } from './component'

export interface SocialPlatform {
  name: string
  icon: string
}

const socialPlatforms = [
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
] as SocialPlatform[]

const maxMessageLength = 200
const toneOfVoices = ['Polite', 'Funny', 'Friendly', 'Informal', 'Serious', 'Optimistic', 'Motivational']
const postStyles = ['Work', 'Opinion', 'Case study', 'Story', 'Tutorial']

export const Container: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [selectedToneOfVoice, setSelectedToneOfVoice] = useState<string>('')
  const [selectedPostStyle, setSelectedPostStyle] = useState<string>('')

  const isPostable = (): boolean => {
    return !!(selectedPlatform && message && selectedToneOfVoice && selectedPostStyle)
  }

  return (
    <Component
      socialPlatforms={socialPlatforms}
      maxMessageLength={maxMessageLength}
      toneOfVoices={toneOfVoices}
      postStyles={postStyles}
      setSelectedPlatform={setSelectedPlatform}
      selectedPlatform={selectedPlatform}
      setMessage={setMessage}
      message={message}
      setSelectedToneOfVoice={setSelectedToneOfVoice}
      selectedToneOfVoice={selectedToneOfVoice}
      setSelectedPostStyle={setSelectedPostStyle}
      selectedPostStyle={selectedPostStyle}
      isPostable={isPostable}
    />
  )
}
