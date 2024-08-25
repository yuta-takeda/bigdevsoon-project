import React from 'react'
import { Component } from './component'
import type { Colors, GameStatus } from './types'

import colorSignalSound from './assets/sounds/color-signal.mp3'
import levelClearSound from './assets/sounds/level-clear.mp3'
import rightAnswerSound from './assets/sounds/right-answer.mp3'
import wrongAnswerSound from './assets/sounds/wrong-answer.mp3'

export const Container: React.FC = () => {
  const [score, setScore] = React.useState(0)
  const [bestScore, setBestScore] = React.useState(0)
  const [level, setLevel] = React.useState(0)
  const [colorSequence, setColorSequence] = React.useState<Colors[]>([])
  const [currentColor, setCurrentColor] = React.useState<Colors | null>(null)
  const [gameStatus, setGameStatus] = React.useState<GameStatus>('idle')
  const [countDownTime, setCountDownTime] = React.useState(3)
  const [showGameRule, setShowGameRule] = React.useState(false)
  const [soundOn, setSoundOn] = React.useState(false)
  const intervalRef = React.useRef<NodeJS.Timer | undefined>(undefined)
  const colorSignal = new Audio(colorSignalSound)
  const wrongAnswer = new Audio(wrongAnswerSound)
  const rightAnswer = new Audio(rightAnswerSound)
  const levelClear = new Audio(levelClearSound)

  React.useEffect(() => {
    if (level > 0) {
      startCpuTurn()
    }
  }, [level])

  React.useEffect(() => {
    const bestScore = localStorage.getItem('ColorMemory:bestScore')
    if (bestScore) {
      setBestScore(parseInt(bestScore))
    }
  }, [])

  const prepareGame = () => {
    setColorSequence([])
    setGameStatus('countdown')
    setCountDownTime(3)

    intervalRef.current = setInterval(() => {
      setCountDownTime((prevCount) => {
        if (prevCount <= 0) {
          clearInterval(intervalRef.current)
          intervalRef.current = undefined
          setGameStatus('cpuTurn')
          setLevel((prevLevel) => prevLevel + 1)
        }

        return prevCount - 1
      })
    }, 1000)
  }

  const startCpuTurn = () => {
    const newColorSequence = [...Array(level)].map(() => {
      const randomIndex = Math.floor(Math.random() * 4)
      console.log(['green', 'red', 'yellow', 'blue'][randomIndex] as Colors)
      return ['green', 'red', 'yellow', 'blue'][randomIndex] as Colors
    })

    setColorSequence(newColorSequence)

    let colorCount = 0

    const color = newColorSequence[colorCount]
    setCurrentColor(color)
    playSound(colorSignal)
    colorCount += 1

    intervalRef.current = setInterval(() => {
      if (colorCount >= newColorSequence.length) {
        setCurrentColor(null)
        clearInterval(intervalRef.current)
        setGameStatus('playerTurn')
      } else {
        setCurrentColor(null)
        setTimeout(() => {
          const color = newColorSequence[colorCount]
          setCurrentColor(color)
          playSound(colorSignal)
          colorCount += 1
        }, 500)
      }
    }, 2000)
  }

  const handlePlayerTurn = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (gameStatus !== 'playerTurn') {
      return
    }

    const target = e.target as HTMLButtonElement
    const selectedColor = target.dataset.color as Colors

    if (selectedColor === colorSequence[0] && colorSequence.length > 1) {
      console.log('correct')
      playSound(rightAnswer)
      setColorSequence((prevColorSequence) => prevColorSequence.slice(1))
      setScore((prevScore) => prevScore + 1)
    } else if (selectedColor === colorSequence[0]) {
      console.log('clear')
      playSound(levelClear)
      setScore((prevScore) => prevScore + 1)
      setGameStatus('levelClear')
    } else {
      console.log('wrong')
      playSound(wrongAnswer)
      const newBestScore = Math.max(score, bestScore)
      setBestScore(newBestScore)
      localStorage.setItem('ColorMemory:bestScore', newBestScore.toString())
      setGameStatus('gameOver')
    }
  }

  const quitGame = (_: React.MouseEvent<HTMLButtonElement>, retry: boolean) => {
    retry ? prepareGame() : setGameStatus('idle')

    setScore(0)
    setLevel(0)
    setColorSequence([])
    setCurrentColor(null)
  }

  const handleShowGameRule = () => {
    setShowGameRule((prevStatus) => !prevStatus)
  }

  const playSound = (sound: HTMLAudioElement) => {
    if (soundOn) {
      sound.volume = 0.5
      sound.play()
    }
  }

  const handleSoundOn = () => {
    setSoundOn((prevStatus) => !prevStatus)
  }

  return (
    <Component
      gameStatus={gameStatus}
      currentColor={currentColor}
      level={level}
      score={score}
      bestScore={bestScore}
      countDownTime={countDownTime}
      showGameRule={showGameRule}
      soundOn={soundOn}
      handleShowGameRule={handleShowGameRule}
      handleSoundOn={handleSoundOn}
      handlePlayerTurn={handlePlayerTurn}
      prepareGame={prepareGame}
      quitGame={quitGame}
    />
  )
}
