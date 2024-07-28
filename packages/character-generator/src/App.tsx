import React from 'react'
import './App.css'

const genres = ['Hair', 'Eyes', 'Ears', 'Nose', 'Mouth', 'Background', 'Accessories']

const App: React.FC = () => {
  return (
    <div className="flex justify-center px-8 w-full h-screen">
      <div className="flex flex-col justify-center max-w-[1000px]">
        <header className="text-2xl font-bold md:text-4xl">CHARACTER GENERATOR</header>
        <div className="flex flex-col justify-center mt-8 md:flex-row">
          <div className="mr-4 mb-8 bg-slate-300 w-[80vw] h-[80vw] md:w-[45vw] md:h-[45vw] md:max-w-[500px] md:max-h-[500px]"></div>
          <div className="md:ml-4 w-[80vw] md:w-[45vw] md:max-w-[500px]">
            <h2 className="mb-4 text-xl font-bold">Customize Look</h2>
            <div className="flex flex-wrap gap-2 text-sm text-sky-600">
              {genres.map((genre) => {
                return <div className="py-1 px-4 mb-1 rounded-full border border-solid border-sky-600">{genre}</div>
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
