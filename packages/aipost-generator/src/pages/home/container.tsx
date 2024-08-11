import React, { useState } from 'react'
import { Component } from './component'

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
