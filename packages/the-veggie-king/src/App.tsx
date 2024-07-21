import React from 'react'
import checkMenuIcon from './assets/icons/check-menu-icon.svg'
import logo from './assets/icons/logo.svg'
import heroSecFood from './assets/images/hero-section-food.png'
import heroSecFoodSlide1 from './assets/images/hero-section-slide-food-1.png'
import heroSecFoodSlide2 from './assets/images/hero-section-slide-food-2.png'
import heroSecFoodSlide3 from './assets/images/hero-section-slide-food-3.png'
import heroSecFoodSlide4 from './assets/images/hero-section-slide-food-4.png'

import { Slideshow } from './components/Slideshow'

const App: React.FC = () => {
  return (
    <div>
      <header className="flex fixed top-0 justify-between items-center px-24 w-screen shadow-xl h-[72px]">
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
      <section>
        <div className="flex justify-center items-center pl-24 h-[calc(100vh_-_72px)] mt-[72px]">
          <div className="w-2/3">
            <h2 className="pb-4 text-6xl font-bold leading-tight">
              Healthy & Fresh
              <br />
              Food For You
            </h2>
            <p className="pb-4">
              Created for lovers of healthy, delicious and
              <br />
              non-obvious food.
            </p>
            <button className="py-2 px-4 bg-orange-500 rounded-full hover:bg-orange-600">
              <div className="flex items-center">
                Check menu
                <img src={checkMenuIcon} alt={'check menu icon'} className="ml-2" />
              </div>
            </button>
          </div>
          <div className="w-1/3 h-full bg-green-700"></div>
        </div>
        <div className="relative">
          <div className="absolute left-0 bottom-[-5vh]">
            <img src={heroSecFood} alt={'hero section food image'} />
          </div>
          <div className="absolute right-[40vh] bottom-[12vh] w-[65vh]">
            <Slideshow
              images={[heroSecFoodSlide1, heroSecFoodSlide2, heroSecFoodSlide3, heroSecFoodSlide4]}
              intervalMs={5000}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
