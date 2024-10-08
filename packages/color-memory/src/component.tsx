import React from 'react'
import Modal from 'react-modal'
import { Circle } from './components/Circle'
import type { Colors, GameStatus } from './types'

import gameRuleIcon from './assets/icons/game-rules-icon.svg'
import soundOffIcon from './assets/icons/sound-off-icon.svg'
import soundOnIcon from './assets/icons/sound-on-icon.svg'

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

const compactModalStyles = {
  ...modalStyles,
  ...{
    content: {
      ...modalStyles.content,
      width: '500px',
      height: '35%',
    },
  },
}

interface Props {
  gameStatus: GameStatus
  currentColor: Colors | null
  level: number
  score: number
  bestScore: number
  countDownTime: number
  showGameRule: boolean
  soundOn: boolean
  handleShowGameRule: () => void
  handleSoundOn: () => void
  handlePlayerTurn: (_: React.MouseEvent<HTMLButtonElement>) => void
  prepareGame: () => void
  quitGame: (_: React.MouseEvent<HTMLButtonElement>, __: boolean) => void
}

export const Component: React.FC<Props> = (props) => {
  const {
    gameStatus,
    currentColor,
    level,
    score,
    bestScore,
    countDownTime,
    showGameRule,
    soundOn,
    handleShowGameRule,
    handleSoundOn,
    handlePlayerTurn,
    prepareGame,
    quitGame,
  } = props

  const title =
    gameStatus === 'cpuTurn' ? 'WATCH CLOSELY'
    : gameStatus === 'playerTurn' ? 'YOUR TURN'
    : gameStatus === 'levelClear' ? `LEVEL ${level} CLEAR!`
    : 'COLOR MEMORY'

  return (
    <div className="flex relative flex-col justify-center items-center w-screen h-screen bg-gray-800">
      <h1 className="mb-8 text-4xl font-semibold text-white">{title}</h1>
      <Circle size={'large'} gameStatus={gameStatus} currentColor={currentColor} handlePlayerTurn={handlePlayerTurn} />
      {gameStatus === 'idle' || gameStatus === 'levelClear' ?
        <button
          type="button"
          className="py-2 mt-8 bg-orange-400 rounded-lg w-[400px] shadow-[0_5px_0_rgb(217,119,6)] hover:bg-orange-300 h-10"
          onClick={prepareGame}
        >
          <span className="font-semibold">{gameStatus === 'idle' ? 'NEW GAME' : 'NEXT LEVEL'}</span>
        </button>
      : <div className="py-2 mt-8 h-10 text-2xl font-semibold text-white">SCORE: {score}</div>}
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
      <Modal isOpen={gameStatus === 'gameOver'} contentLabel="GameOver" style={compactModalStyles} ariaHideApp={false}>
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
      <Modal isOpen={showGameRule} contentLabel="GameRule" style={compactModalStyles} ariaHideApp={false}>
        <div className="flex flex-col gap-1 justify-center items-center w-full h-full">
          <div className="text-3xl font-bold text-white">GAME RULES</div>
          <div className="text-white text-md">Repeat the upcoming sequences of signals.</div>
          <div className="flex gap-3 justify-center items-center mt-4">
            <Circle size={'small'} gameStatus={gameStatus} currentColor={'green'} handlePlayerTurn={handlePlayerTurn} />
            <Circle size={'small'} gameStatus={gameStatus} currentColor={'red'} handlePlayerTurn={handlePlayerTurn} />
            <Circle size={'small'} gameStatus={gameStatus} currentColor={'blue'} handlePlayerTurn={handlePlayerTurn} />
            <Circle
              size={'small'}
              gameStatus={gameStatus}
              currentColor={'yellow'}
              handlePlayerTurn={handlePlayerTurn}
            />
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
