import React from 'react'
import checkMenuIcon from './assets/icons/check-menu-icon.svg'
import logo from './assets/icons/logo.svg'
import aboutUsSecFood from './assets/images/about-us-section-food.png'
import heroSecFood from './assets/images/hero-section-food.png'
import heroSecFoodSlide1 from './assets/images/hero-section-slide-food-1.png'
import heroSecFoodSlide2 from './assets/images/hero-section-slide-food-2.png'
import heroSecFoodSlide3 from './assets/images/hero-section-slide-food-3.png'
import heroSecFoodSlide4 from './assets/images/hero-section-slide-food-4.png'
import menuChickpaeSalad from './assets/images/menu-section-chickpae-salad.png'
import menuChickpaeWrap from './assets/images/menu-section-chickpae-wrap.png'
import menuMightyBurger from './assets/images/menu-section-mighty-burger.png'

import { Slideshow } from './components/Slideshow'

const menus = [
  {
    name: 'Mighty burger',
    description: 'Served with fries and drink.',
    image: menuMightyBurger,
  },
  {
    name: "Chickpae's salad",
    description: 'Served with fries and drink.',
    image: menuChickpaeSalad,
  },
  {
    name: "Chickpae's wrap",
    description: 'Served with fries and drink.',
    image: menuChickpaeWrap,
  },
]

const App: React.FC = () => {
  return (
    <div>
      <header className="flex fixed top-0 z-10 justify-between items-center px-24 w-screen bg-white shadow-xl h-[72px]">
        <img src={logo} alt="TheVeggieKingLogo" width={154.5} height={30} />
        <nav>
          <span className="mx-2">
            <a href="#aboutus">ABOUT US</a>
          </span>
          <span className="mx-2">
            <a href="#menu">MENU</a>
          </span>
          <span className="mx-2">
            <a href="#">CONTACT</a>
          </span>
        </nav>
      </header>
      <section id="top">
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
            <button type="button" className="py-2 px-4 bg-orange-500 rounded-full hover:text-white hover:bg-orange-600">
              <a href="#menu">
                <div className="flex items-center">
                  Check menu
                  <img src={checkMenuIcon} alt={'check menu icon'} className="ml-2" />
                </div>
              </a>
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
      <section id="aboutus">
        <div className="flex justify-center items-center p-48 h-screen">
          <div className="w-1/2"></div>
          <div className="w-1/2">
            <h1 className="pb-2 text-xl text-amber-400">About Us</h1>
            <h2 className="pb-2 text-3xl">Few words about us</h2>
            <p>
              We are not ordinary food truck. We create a place overflowing with positive energy that it expresses
              important to us values. Get to know them specifically.
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute bg-green-700 rounded-full bottom-[10vh] left-[-10vw] w-[75vh] h-[75vh]"></div>
          <div className="absolute bottom-0 left-[10vw] w-[75vh] h-[75vh]">
            <img src={aboutUsSecFood} alt={'salad'} width={456} height={445} />
          </div>
        </div>
      </section>
      <section id="menu">
        <div className="flex flex-col justify-center p-48 h-screen">
          <div className="mb-12 text-center">
            <h1 className="pb-2 text-xl text-amber-400">Menu</h1>
            <h2 className="pb-2 text-3xl">Explore out best food</h2>
            <p>Below you can see our best selling meals!</p>
          </div>
          <div className="flex gap-12 justify-center">
            {menus.map((menu, index) => {
              return (
                <div key={index} className="rounded-lg shadow-xl w-[20vw]">
                  <div>
                    <img src={menu.image} alt={menu.name} className="object-cover" width={780} height={512} />
                  </div>
                  <div className="m-4">
                    <h3 className="mb-2 text-xl font-bold">{menu.name}</h3>
                    <p>{menu.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
