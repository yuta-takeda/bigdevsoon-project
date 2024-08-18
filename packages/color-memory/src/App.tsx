import React from 'react'
import Modal from 'react-modal'

import gameRuleIcon from './assets/icons/game-rules-icon.svg'
import soundOnIcon from './assets/icons/sound-on-icon.svg'

const Circle: React.FC = () => {
  return (
    <div className="relative bg-gray-600 rounded-full w-[500px] h-[500px]">
      <div className="absolute bg-green-300 rounded-tl-full w-[205px] h-[205px] top-[30px] left-[30px]"></div>
      <div className="absolute bg-red-500 rounded-tr-full w-[205px] h-[205px] top-[30px] right-[30px]"></div>
      <div className="absolute bg-amber-300 rounded-bl-full w-[205px] h-[205px] bottom-[30px] left-[30px]"></div>
      <div className="absolute rounded-br-full bg-sky-300 w-[205px] h-[205px] bottom-[30px] right-[30px]"></div>
      <div className="absolute bg-gray-600 rounded-full w-[200px] h-[200px] top-[150px] left-[150px]"></div>
    </div>
  )
}

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

const App: React.FC = () => {
  const [score, setScore] = React.useState(0)
  const [bestScore, setBestScore] = React.useState(0)
  const [level, setLevel] = React.useState(1)
  const [colorSequence, setColorSequence] = React.useState([])
  const [gameStatus, setGameStatus] = React.useState<GameStatus>('idle')
  const [countDownTime, setCountDownTime] = React.useState(3)
  const intervalRef = React.useRef<NodeJS.Timer | undefined>(undefined)

  type GameStatus = 'idle' | 'countdown' | 'cpuTurn' | 'playerTurn' | 'gameOver'

  const startCountDown = () => {
    setScore(0)
    setLevel(1)
    setColorSequence([])
    setGameStatus('countdown')
    setCountDownTime(3)

    intervalRef.current = setInterval(() => {
      setCountDownTime((prevCount) => {
        if (prevCount <= 0) {
          clearInterval(intervalRef.current)
          intervalRef.current = undefined
          setGameStatus('cpuTurn')
        }

        return prevCount - 1
      })
    }, 1000)
  }

  React.useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const title =
    gameStatus === 'cpuTurn' ? 'WATCH CLOSELY'
    : gameStatus === 'playerTurn' ? 'YOUR TURN'
    : 'COLOR MEMORY'

  return (
    <>
      <div className="flex relative flex-col justify-center items-center w-screen h-screen bg-gray-800">
        <h1 className="mb-8 text-4xl font-semibold text-white">{title}</h1>
        <Circle />
        {gameStatus === 'idle' && (
          <button
            type="button"
            className="py-2 mt-8 bg-orange-400 rounded-lg w-[500px] shadow-[0_5px_0_rgb(217,119,6)] hover:translate-y-1 hover:bg-orange-300"
            onClick={startCountDown}
          >
            <span className="font-semibold">NEW GAME</span>
          </button>
        )}
        <div className="flex absolute top-6 left-6 justify-center items-center bg-gray-600 rounded-lg w-[48px] h-[48px]">
          <img src={gameRuleIcon} alt="show game rule" width={24} height={24} />
        </div>
        <div className="flex absolute top-6 right-6 justify-center items-center bg-gray-600 rounded-lg w-[48px] h-[48px]">
          <img src={soundOnIcon} alt="turn off sound" width={24} height={24} />
        </div>
      </div>
      <Modal isOpen={gameStatus === 'countdown'} contentLabel="Countdown" style={modalStyles}>
        <div className="flex justify-center items-center w-full h-full">
          <div className="text-5xl font-bold text-white h-128">{countDownTime === 0 ? 'START' : countDownTime}</div>
        </div>
      </Modal>
    </>
  )
}

export default App
