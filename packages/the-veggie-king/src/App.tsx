import React from 'react'
import logo from './assets/icons/logo.svg'

const App: React.FC = () => {
  return (
    <div>
      <header className="flex fixed top-0 justify-between items-center py-4 px-12 w-screen shadow-xl">
        <img src={logo} alt="TheVeggieKingLogo" width={154.5} height={30} />
        <nav>
          <span className="mx-2">
            <a href="#">ABOUT US</a>
          </span>
          <span className="mx-2">
            <a href="#">MENU</a>
          </span>
          <span className="mx-2">
            <a href="#">CONTACT</a>
          </span>
        </nav>
      </header>
    </div>
  )
}

export default App
