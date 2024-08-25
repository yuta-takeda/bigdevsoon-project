import React from 'react'
import type { Colors, GameStatus } from '../../types'

interface CircleProps {
  size: 'small' | 'large'
  gameStatus: GameStatus
  currentColor: Colors | null
  handlePlayerTurn: (_: React.MouseEvent<HTMLButtonElement>) => void
}

export const Circle: React.FC<CircleProps> = (props) => {
  const { size, gameStatus, currentColor, handlePlayerTurn } = props

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
        className={`absolute ${gameStatus === 'playerTurn' && 'hover:bg-[color:hsl(120,100,50)]'} ${currentColor === 'green' ? 'bg-[color:hsl(120,100,50)]' : 'bg-[color:hsl(120,30,50)]'} rounded-tl-full ${circleSize[size].colorButton} ${circleSize[size].topBorder} ${circleSize[size].leftBorder}`}
        data-color="green"
        onClick={handlePlayerTurn}
      ></button>
      <button
        className={`absolute ${gameStatus === 'playerTurn' && 'hover:bg-[color:hsl(0,100,50)]'} ${currentColor === 'red' ? 'bg-[color:hsl(0,100,50)]' : 'bg-[color:hsl(0,30,50)]'} rounded-tr-full ${circleSize[size].colorButton} ${circleSize[size].topBorder} ${circleSize[size].rightBorder}`}
        data-color="red"
        onClick={handlePlayerTurn}
      ></button>
      <button
        className={`absolute ${gameStatus === 'playerTurn' && 'hover:bg-[color:hsl(60,100,50)]'} ${currentColor === 'yellow' ? 'bg-[color:hsl(60,100,50)]' : 'bg-[color:hsl(60,30,50)]'} rounded-bl-full ${circleSize[size].colorButton} ${circleSize[size].bottomBorder} ${circleSize[size].leftBorder}`}
        data-color="yellow"
        onClick={handlePlayerTurn}
      ></button>
      <button
        className={`absolute rounded-br-full ${gameStatus === 'playerTurn' && 'hover:bg-[color:hsl(200,100,50)]'}  ${currentColor === 'blue' ? 'bg-[color:hsl(200,100,50)]' : 'bg-[color:hsl(200,30,50)]'} ${circleSize[size].colorButton} ${circleSize[size].bottomBorder} ${circleSize[size].rightBorder}`}
        data-color="blue"
        onClick={handlePlayerTurn}
      ></button>
      <div className={`absolute bg-gray-600 rounded-full ${circleSize[size].centerCircle}`}></div>
    </div>
  )
}
