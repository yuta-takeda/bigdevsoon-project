import React from 'react'
import { Link } from 'react-router-dom'
import type { SocialPlatform } from './container'

interface Props {
  socialPlatforms: SocialPlatform[]
  maxMessageLength: number
  toneOfVoices: string[]
  postStyles: string[]
  setSelectedPlatform: (platform: string) => void
  selectedPlatform: string
  setMessage: (message: string) => void
  message: string
  setSelectedToneOfVoice: (tone: string) => void
  selectedToneOfVoice: string
  setSelectedPostStyle: (style: string) => void
  selectedPostStyle: string
  isPostable: () => boolean
}

export const Component: React.FC = (props) => {
  const {
    socialPlatforms,
    maxMessageLength,
    toneOfVoices,
    postStyles,
    setSelectedPlatform,
    selectedPlatform,
    setMessage,
    message,
    setSelectedToneOfVoice,
    selectedToneOfVoice,
    setSelectedPostStyle,
    selectedPostStyle,
    isPostable,
  } = props

  return (
    <div className="flex flex-col items-center justify-content">
      <div className="p-8 w-full max-w-screen-md bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center">Generate your post</h1>
        <div className="mb-4">
          <div className="mb-2 font-bold text-gray-700">Social platform</div>
          <div className="flex space-x-3">
            {socialPlatforms.map((platform) => {
              return (
                <button
                  className="flex items-center p-1 w-8 h-8 rounded-md border-2 border-solid justify-content hover:saturate-[7085%] hover:filter hover:brightness-[100%] hover:contrast-[106%]"
                  onClick={() => setSelectedPlatform(platform.name)}
                  key={platform.name}
                  type="button"
                >
                  <img
                    src={platform.icon}
                    alt={platform.name}
                    height={32}
                    width={32}
                    style={{
                      filter:
                        selectedPlatform === platform.name ?
                          'invert(17%) sepia(91%) saturate(7085%) hue-rotate(128deg) brightness(100%) contrast(106%)'
                        : '',
                    }}
                  />
                </button>
              )
            })}
          </div>
        </div>
        <div className="mb-4">
          <div className="flex flex-row justify-between">
            <label className="mb-2 font-bold text-gray-700" htmlFor="message">
              Your message
            </label>
            <div>
              {message.length} / {maxMessageLength}
            </div>
          </div>
          <textarea
            id="message"
            name="message"
            className="py-2 px-4 w-full rounded-md border focus:ring-2 focus:ring-blue-200 focus:outline-none"
            rows={5}
            maxLength={maxMessageLength}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4">
          <div className="mb-2 font-bold text-gray-700">Tone of Voice</div>
          <div className="flex flex-wrap gap-2">
            {toneOfVoices.map((tone) => {
              return (
                <button
                  className={`py-2 px-4 text-sm rounded-full border ${selectedToneOfVoice === tone ? 'bg-blue-200' : 'bg-white hover:bg-gray-200'}`}
                  key={tone}
                  onClick={() => setSelectedToneOfVoice(tone)}
                  type="button"
                >
                  {tone}
                </button>
              )
            })}
          </div>
        </div>
        <div className="mb-4">
          <div className="mb-2 font-bold text-gray-700">Post style</div>
          <div className="flex flex-wrap gap-2">
            {postStyles.map((style) => {
              return (
                <button
                  className={`py-2 px-4 text-sm rounded-full border ${selectedPostStyle === style ? 'bg-blue-200' : 'bg-white hover:bg-gray-200'}`}
                  key={style}
                  onClick={() => setSelectedPostStyle(style)}
                  type="button"
                >
                  {style}
                </button>
              )
            })}
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link
            to={{
              pathname: '/result',
              search: `?platform=${selectedPlatform}&message=${message}&tone=${selectedToneOfVoice}&style=${selectedPostStyle}`,
            }}
          >
            <button
              className={`py-2 w-full text-white rounded-full ${isPostable() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300'}`}
              disabled={!isPostable()}
              type="button"
            >
              Generate post
            </button>
          </Link>
        </div>
      </div>
      {!process.env.REACT_APP_OPENAI_API_KEY && (
        <footer className="mt-4">env REACT_APP_OPENAI_API_KEY is not set. So this app is running in demo mode.</footer>
      )}
    </div>
  )
}
