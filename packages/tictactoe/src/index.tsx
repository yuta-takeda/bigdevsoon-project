import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import './index.css'
import { GamePage } from './pages/game'
import { HomePage } from './pages/home'
import { NewGamePage } from './pages/newGame'
import reportWebVitals from './reportWebVitals'

const Layout = () => {
  return (
    <main className="flex flex-col justify-center items-center w-screen h-screen">
      <Outlet />
    </main>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/new_game" element={<NewGamePage />} />
          <Route path="/game" element={<GamePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
