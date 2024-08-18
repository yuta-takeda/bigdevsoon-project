import React from 'react'

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

const App: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-800">
      <Circle />
    </div>
  )
}

export default App
