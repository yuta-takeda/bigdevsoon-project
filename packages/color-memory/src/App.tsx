import React from 'react'
import Modal from 'react-modal'

import gameRuleIcon from './assets/icons/game-rules-icon.svg'
import soundOnIcon from './assets/icons/sound-on-icon.svg'

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
    height: '25%',
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
  const intervalRef = React.useRef<NodeJS.Timer | undefined>(undefined)

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

  const retryGame = () => {
    setLevel(0)
    prepareGame()
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
    colorCount += 1

    intervalRef.current = setInterval(() => {
      if (colorCount > newColorSequence.length) {
        clearInterval(intervalRef.current)
        setGameStatus('playerTurn')
      } else {
        setCurrentColor(null)
        setTimeout(() => {
          const color = newColorSequence[colorCount]
          setCurrentColor(color)
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
      setColorSequence((prevColorSequence) => prevColorSequence.slice(1))
      setScore((prevScore) => prevScore + 1)
    } else if (selectedColor === colorSequence[0]) {
      console.log('clear')
      setScore((prevScore) => prevScore + 1)
      setGameStatus('levelClear')
    } else {
      console.log('wrong')
      setGameStatus('gameOver')
    }
  }

  const quitGame = () => {
    setGameStatus('idle')
    setScore(0)
    setLevel(0)
    setColorSequence([])
    setCurrentColor(null)
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

  const Circle: React.FC = () => {
    return (
      <div className="relative bg-gray-600 rounded-full w-[500px] h-[500px]">
        <button
          className={`absolute ${gameStatus === 'playerTurn' && 'hover:bg-[color:hsl(120,100,50)]'} ${currentColor === 'green' ? 'bg-[color:hsl(120,100,50)]' : 'bg-[color:hsl(120,30,50)]'} rounded-tl-full w-[205px] h-[205px] top-[30px] left-[30px]`}
          data-color="green"
          onClick={handlePlayerTurn}
        ></button>
        <button
          className={`absolute ${gameStatus === 'playerTurn' && 'hover:bg-[color:hsl(0,100,50)]'} ${currentColor === 'red' ? 'bg-[color:hsl(0,100,50)]' : 'bg-[color:hsl(0,30,50)]'} rounded-tr-full w-[205px] h-[205px] top-[30px] right-[30px]`}
          data-color="red"
          onClick={handlePlayerTurn}
        ></button>
        <button
          className={`absolute ${gameStatus === 'playerTurn' && 'hover:bg-[color:hsl(60,100,50)]'} ${currentColor === 'yellow' ? 'bg-[color:hsl(60,100,50)]' : 'bg-[color:hsl(60,30,50)]'} rounded-bl-full w-[205px] h-[205px] bottom-[30px] left-[30px]`}
          data-color="yellow"
          onClick={handlePlayerTurn}
        ></button>
        <button
          className={`absolute rounded-br-full ${gameStatus === 'playerTurn' && 'hover:bg-[color:hsl(200,100,50)]'}  ${currentColor === 'blue' ? 'bg-[color:hsl(200,100,50)]' : 'bg-[color:hsl(200,30,50)]'} w-[205px] h-[205px] bottom-[30px] right-[30px]`}
          data-color="blue"
          onClick={handlePlayerTurn}
        ></button>
        <div className="absolute bg-gray-600 rounded-full w-[200px] h-[200px] top-[150px] left-[150px]"></div>
        {gameStatus}
      </div>
    )
  }

  return (
    <div className="flex relative flex-col justify-center items-center w-screen h-screen bg-gray-800">
      <h1 className="mb-8 text-4xl font-semibold text-white">{title}</h1>
      <Circle />
      {gameStatus === 'idle' || gameStatus === 'levelClear' ?
        <button
          type="button"
          className="py-2 mt-8 bg-orange-400 rounded-lg w-[500px] shadow-[0_5px_0_rgb(217,119,6)] hover:bg-orange-300"
          onClick={prepareGame}
        >
          <span className="font-semibold">{gameStatus === 'idle' ? 'NEW GAME' : 'NEXT LEVEL'}</span>
        </button>
      : <div className="py-2 mt-8 text-2xl font-semibold text-white">SCORE: {score}</div>}
      <div className="flex absolute top-6 left-6 justify-center items-center bg-gray-600 rounded-lg w-[48px] h-[48px]">
        <img src={gameRuleIcon} alt="show game rule" width={24} height={24} />
      </div>
      <div className="flex absolute top-6 right-6 justify-center items-center bg-gray-600 rounded-lg w-[48px] h-[48px]">
        <img src={soundOnIcon} alt="turn off sound" width={24} height={24} />
      </div>
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
              onClick={quitGame}
            >
              <span className="font-semibold">QUIT</span>
            </button>
            <button
              type="button"
              className="py-2 mt-8 w-32 bg-orange-400 rounded-lg w-128 shadow-[0_5px_0_rgb(217,119,6)] hover:bg-orange-300"
              onClick={retryGame}
            >
              <span className="font-semibold">TRY AGAIN</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default App
