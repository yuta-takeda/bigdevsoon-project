import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Component } from './component'

export const Container: React.FC = () => {
  const [generatedMessage, setGeneratedMessage] = useState<string>('')
  const [searchParams] = useSearchParams()
  useEffect(() => {
    if (generatedMessage !== '') {
      return
    }

    ;(async () => {
      if (!process.env.REACT_APP_OPENAI_API_KEY) {
        setGeneratedMessage(
          'env REACT_APP_OPENAI_API_KEY がセットされていないのデモメッセージを表示しています。REACT_APP_OPENAI_API_KEY をセットして試してください🙇‍'
        )
        return
      }

      const platform = searchParams.get('platform')
      const toneOfVoice = searchParams.get('tone')
      const postStyle = searchParams.get('style')
      const message = searchParams.get('message')

      const postMessage = `${platform}への投稿を以下の条件で生成してください。言語：日本語、口調：${toneOfVoice}、スタイル：${postStyle}、メッセージ：${message}、文頭と文末の「」や " は不要です`
      // `Generate a ${platform} post with a ${toneOfVoice} tone in a ${postStyle} style with the following message: "${message}". これを日本語でのみ返してください`;

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      }
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: postMessage }],
          temperature: 0.7,
        },
        { headers: headers }
      )
      setGeneratedMessage(response.data.choices[0].message.content)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generatedMessage])

  const handleRegenerate = () => {
    setGeneratedMessage('')
  }

  const handleCopyText = () => {
    navigator.clipboard.writeText(generatedMessage)
    alert('テキストをクリップボードにコピーしました')
  }

  return (
    <Component
      generatedMessage={generatedMessage}
      handleRegenerate={handleRegenerate}
      handleCopyText={handleCopyText}
    />
  )
}
