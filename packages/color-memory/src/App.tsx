import React from 'react'
import Modal from 'react-modal'

import gameRuleIcon from './assets/icons/game-rules-icon.svg'
import soundOffIcon from './assets/icons/sound-off-icon.svg'
import soundOnIcon from './assets/icons/sound-on-icon.svg'

import colorSignalSound from './assets/sounds/color-signal.mp3'
import levelClearSound from './assets/sounds/level-clear.mp3'
import rightAnswerSound from './assets/sounds/right-answer.mp3'
import wrongAnswerSound from './assets/sounds/wrong-answer.mp3'

type GameStatus = 'idle' | 'countdown' | 'cpuTurn' | 'playerTurn' | 'levelClear' | 'gameOver'
type Colors = 'green' | 'red' | 'yellow' | 'blue'

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '25%',
    backgroundColor: '#374151', // gray-700
    border: 'none',
    overflow: 'hidden',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
}

const gameOverModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    height: '35%',
    backgroundColor: '#374151', // gray-700
    border: 'none',
    overflow: 'hidden',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
}

const App: React.FC = () => {
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
      setBestScore((prevBestScore) => Math.max(prevBestScore, score))
      setGameStatus('gameOver')
    }
  }

  const quitGame = (e: React.MouseEvent<HTMLButtonElement>, retry: boolean) => {
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

  React.useEffect(() => {
    if (level > 0) {
      startCpuTurn()
    }
  }, [level])

  const title =
    gameStatus === 'cpuTurn' ? 'WATCH CLOSELY'
    : gameStatus === 'playerTurn' ? 'YOUR TURN'
    : gameStatus === 'levelClear' ? `LEVEL ${level} CLEAR!`
    : 'COLOR MEMORY'

  interface CircleProps {
    size: 'small' | 'large'
    highlightColor?: Colors
  }

  const Circle: React.FC<CircleProps> = (props) => {
    const { size, highlightColor } = props

    const circleSize = {
      small: {
        circle: 'w-[100px] h-[100px]',
        colorButton: 'w-[35px] h-[35px]',
        centerCircle: 'w-[40px] h-[40px] top-[30px] left-[30px]',
        topBorder: 'top-[10px]',
        bottomBorder: 'bottom-[10px]',
        leftBorder: 'left-[10px]',
        rightBorder: 'right-[10px]',
      },
      large: {
        circle: 'w-[400px] h-[400px]',
        colorButton: 'w-[170px] h-[170px]',
        centerCircle: 'w-[150px] h-[150px] top-[125px] left-[125px]',
        topBorder: 'top-[20px]',
        bottomBorder: 'bottom-[20px]',
        leftBorder: 'left-[20px]',
        rightBorder: 'right-[20px]',
      },
    }

    return (
      <div className={`relative bg-gray-600 rounded-full ${circleSize[size].circle}`}>
        <button
          className={`absolute ${gameStatus === 'playerTurn' && 'hover:bg-[color:hsl(120,100,50)]'} ${currentColor === 'green' || highlightColor === 'green' ? 'bg-[color:hsl(120,100,50)]' : 'bg-[color:hsl(120,30,50)]'} rounded-tl-full ${circleSize[size].colorButton} ${circleSize[size].topBorder} ${circleSize[size].leftBorder}`}
          data-color="green"
          onClick={handlePlayerTurn}
        ></button>
        <button
          className={`absolute ${gameStatus === 'playerTurn' && 'hover:bg-[color:hsl(0,100,50)]'} ${currentColor === 'red' || highlightColor === 'red' ? 'bg-[color:hsl(0,100,50)]' : 'bg-[color:hsl(0,30,50)]'} rounded-tr-full ${circleSize[size].colorButton} ${circleSize[size].topBorder} ${circleSize[size].rightBorder}`}
          data-color="red"
          onClick={handlePlayerTurn}
        ></button>
        <button
          className={`absolute ${gameStatus === 'playerTurn' && 'hover:bg-[color:hsl(60,100,50)]'} ${currentColor === 'yellow' || highlightColor === 'yellow' ? 'bg-[color:hsl(60,100,50)]' : 'bg-[color:hsl(60,30,50)]'} rounded-bl-full ${circleSize[size].colorButton} ${circleSize[size].bottomBorder} ${circleSize[size].leftBorder}`}
          data-color="yellow"
          onClick={handlePlayerTurn}
        ></button>
        <button
          className={`absolute rounded-br-full ${gameStatus === 'playerTurn' && 'hover:bg-[color:hsl(200,100,50)]'}  ${currentColor === 'blue' || highlightColor === 'blue' ? 'bg-[color:hsl(200,100,50)]' : 'bg-[color:hsl(200,30,50)]'} ${circleSize[size].colorButton} ${circleSize[size].bottomBorder} ${circleSize[size].rightBorder}`}
          data-color="blue"
          onClick={handlePlayerTurn}
        ></button>
        <div className={`absolute bg-gray-600 rounded-full ${circleSize[size].centerCircle}`}></div>
      </div>
    )
  }

  return (
    <div className="flex relative flex-col justify-center items-center w-screen h-screen bg-gray-800">
      <h1 className="mb-8 text-4xl font-semibold text-white">{title}</h1>
      <Circle size={'large'} />
      {gameStatus === 'idle' || gameStatus === 'levelClear' ?
        <button
          type="button"
          className="py-2 mt-8 bg-orange-400 rounded-lg w-[400px] shadow-[0_5px_0_rgb(217,119,6)] hover:bg-orange-300"
          onClick={prepareGame}
        >
          <span className="font-semibold">{gameStatus === 'idle' ? 'NEW GAME' : 'NEXT LEVEL'}</span>
        </button>
      : <div className="py-2 mt-8 text-2xl font-semibold text-white">SCORE: {score}</div>}
      <button
        className="flex absolute top-6 left-6 justify-center items-center bg-gray-600 rounded-lg w-[48px] h-[48px]"
        onClick={handleShowGameRule}
      >
        <img src={gameRuleIcon} alt="show game rule" width={24} height={24} />
      </button>
      <button
        className="flex absolute top-6 right-6 justify-center items-center bg-gray-600 rounded-lg w-[48px] h-[48px]"
        onClick={handleSoundOn}
      >
        {soundOn ?
          <img src={soundOnIcon} alt="turn off sound" width={24} height={24} />
        : <img src={soundOffIcon} alt="turn on sound" width={24} height={24} />}
      </button>
      {bestScore > 0 && (
        <div className="flex absolute bottom-6 items-center sm:left-6 justify-left">
          <span className="text-xl font-bold text-white">BEST SCORE: {bestScore}</span>
        </div>
      )}
      <Modal isOpen={gameStatus === 'countdown'} contentLabel="Countdown" style={modalStyles} ariaHideApp={false}>
        <div className="flex justify-center items-center w-full h-full">
          <div className="text-5xl font-bold text-white h-128">{countDownTime === 0 ? 'START' : countDownTime}</div>
        </div>
      </Modal>
      <Modal isOpen={gameStatus === 'gameOver'} contentLabel="GameOver" style={gameOverModalStyles} ariaHideApp={false}>
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className="text-5xl font-bold text-white">GAME OVER</div>
          <div className="flex gap-8">
            <button
              type="button"
              className="py-2 mt-8 w-32 bg-gray-400 rounded-lg w-128 shadow-[0_5px_0_#6b7280] hover:bg-gray-300"
              onClick={(e) => quitGame(e, false)}
            >
              <span className="font-semibold">QUIT</span>
            </button>
            <button
              type="button"
              className="py-2 mt-8 w-32 bg-orange-400 rounded-lg w-128 shadow-[0_5px_0_rgb(217,119,6)] hover:bg-orange-300"
              onClick={(e) => quitGame(e, true)}
            >
              <span className="font-semibold">TRY AGAIN</span>
            </button>
          </div>
        </div>
      </Modal>
      <Modal isOpen={showGameRule} contentLabel="GameRule" style={gameOverModalStyles} ariaHideApp={false}>
        <div className="flex flex-col gap-1 justify-center items-center w-full h-full">
          <div className="text-3xl font-bold text-white">GAME RULES</div>
          <div className="text-white text-md">Repeat the upcoming sequences of signals.</div>
          <div className="flex gap-4 justify-center items-center mt-4">
            <Circle size={'small'} highlightColor={'green'} />
            <Circle size={'small'} highlightColor={'red'} />
            <Circle size={'small'} highlightColor={'blue'} />
            <Circle size={'small'} highlightColor={'yellow'} />
          </div>
          <button
            type="button"
            className="py-2 mt-8 w-32 bg-sky-400 rounded-lg w-128 shadow-[0_5px_0_#0ea5e9] hover:bg-sky-300"
            onClick={handleShowGameRule}
          >
            <span className="font-semibold">OK</span>
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default App
