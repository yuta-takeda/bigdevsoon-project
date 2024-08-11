import React, { useEffect, useState } from 'react'

interface Props {
  text: string
}

export const TypingText: React.FC<Props> = (props) => {
  const { text } = props
  const [typingText, setTypingText] = useState<string>('')
  useEffect(() => {
    if (text === '') {
      return
    }

    setTypingText('')
    const textItr = text[Symbol.iterator]()
    let timerId: NodeJS.Timeout
    ;(function typeText() {
      const nextChar = textItr.next()
      console.log(nextChar)
      if (nextChar.done) {
        return
      }
      setTypingText((current) => current + nextChar.value)
      timerId = setTimeout(typeText, 100)
    })()

    return () => {
      clearTimeout(timerId)
    }
  }, [text])

  return (
    <div>
      <article
        className={`${typingText.length >= text.length ? '' : "after:content-['|'] after:animate-blink after:pl-1"}`}
      >
        {text ? typingText : 'Generating...'}
      </article>
    </div>
  )
}
