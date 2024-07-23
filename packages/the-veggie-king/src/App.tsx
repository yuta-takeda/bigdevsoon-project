import React, { useState } from 'react'
import checkMenuIcon from './assets/icons/check-menu-icon.svg'
import menuCloseIcon from './assets/icons/close-menu-icon.svg'
import facebookIcon from './assets/icons/facebook-icon.svg'
import instagramIcon from './assets/icons/instagram-icon.svg'
import logo from './assets/icons/logo.svg'
import mapIcon from './assets/icons/map-icon.svg'
import menuOpenIcon from './assets/icons/menu-icon.svg'
import phoneIcon from './assets/icons/phone-icon.svg'
import timeIcon from './assets/icons/time-icon.svg'
import twitterIcon from './assets/icons/twitter-icon.svg'
import aboutUsSecFood from './assets/images/about-us-section-food.png'
import galleryPhoto1 from './assets/images/gallery-photo-1.png'
import galleryPhoto2 from './assets/images/gallery-photo-2.png'
import galleryPhoto3 from './assets/images/gallery-photo-3.png'
import galleryPhoto4 from './assets/images/gallery-photo-4.png'
import galleryPhoto5 from './assets/images/gallery-photo-5.png'
import galleryPhoto6 from './assets/images/gallery-photo-6.png'
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

const contactItems = [
  {
    name: 'Working Hours',
    description: 'Today 12 pm - 9 pm',
    image: timeIcon,
  },
  {
    name: 'Find Us',
    description: '3883 Rupert St. Vancouver',
    image: mapIcon,
  },
  {
    name: 'Call to Us',
    description: '(604) 569-2198',
    image: phoneIcon,
  },
]

const galleryPhotos = [galleryPhoto1, galleryPhoto2, galleryPhoto3, galleryPhoto4, galleryPhoto5, galleryPhoto6]

const App: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu)
  }

  const menuList = (
    <>
      <a href="#aboutus">
        <li className="hover:text-gray-400">ABOUT US</li>
      </a>
      <a href="#menu">
        <li className="hover:text-gray-400">MENU</li>
      </a>
      <a href="#contact">
        <li className="hover:text-gray-400">CONTACT</li>
      </a>
    </>
  )

  return (
    <div>
      <header className="flex fixed top-0 z-10 flex-col py-6 px-6 w-screen bg-white shadow-xl sm:px-24 min-h-[72px]">
        <div className="flex justify-between items-center">
          <div>
            <a href="#top" className="hover:opacity-75">
              <img src={logo} alt="TheVeggieKingLogo" width={154.5} height={30} />
            </a>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="sm:hidden hover:opacity-75">
            <button type="button" onClick={handleOpenMenu} className="z-10">
              <img src={openMenu ? menuCloseIcon : menuOpenIcon} />
            </button>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden sm:block">
            <ul className="flex gap-x-6">{menuList}</ul>
          </nav>
        </div>

        {/* Mobile Menu */}
        {openMenu && (
          <nav className="my-8 w-full text-center bg-white transition duration-500 ease-in-out">
            <ul className="flex flex-col gap-y-6">{menuList}</ul>
          </nav>
        )}
      </header>
      <section id="top">
        <div className="flex justify-center items-center px-4 h-screen sm:pl-24">
          <div className="pr-4 w-3/4 sm:w-2/3">
            <h2 className="pb-4 text-4xl font-bold leading-tight sm:text-6xl">
              Healthy & Fresh
              <br />
              Food For You
            </h2>
            <p className="pb-4">Created for lovers of healthy, delicious and non-obvious food.</p>
            <button type="button" className="py-2 px-4 bg-orange-500 rounded-full hover:text-white hover:bg-orange-600">
              <a href="#menu">
                <div className="flex items-center">
                  Check menu
                  <img src={checkMenuIcon} alt={'check menu icon'} className="ml-2" />
                </div>
              </a>
            </button>
          </div>
          <div className="w-1/4 h-full bg-green-700 sm:w-1/3"></div>
        </div>
        <div className="relative">
          <div className="absolute w-[40vh] right-[-20vh] bottom-[50vh] sm:bottom-[15vh] sm:left-[50vw] sm:w-[30vw]">
            <Slideshow
              images={[heroSecFoodSlide1, heroSecFoodSlide2, heroSecFoodSlide3, heroSecFoodSlide4]}
              intervalMs={5000}
            />
          </div>
          <div className="absolute left-0 bottom-[-5vh]">
            <img src={heroSecFood} alt={'hero section food image'} />
          </div>
        </div>
      </section>
      <section id="aboutus">
        <div className="flex justify-center items-center p-8 h-screen sm:p-48">
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
        <div className="relative -z-10">
          <div className="absolute bg-green-700 rounded-full bottom-[10vh] left-[-120vw] w-[75vh] h-[75vh] sm:left-[-10vw]"></div>
          <div className="absolute bottom-0 left-[-75vw] w-[75vh] h-[75vh] sm:left-[10vw]">
            <img src={aboutUsSecFood} alt={'salad'} width={456} height={445} />
          </div>
        </div>
      </section>
      <section id="menu">
        <div className="flex flex-col justify-center h-screen sm:p-48">
          <div className="mb-12 text-center">
            <h1 className="pb-2 text-xl text-amber-400">Menu</h1>
            <h2 className="pb-2 text-3xl">Explore out best food</h2>
            <p>Below you can see our best selling meals!</p>
          </div>
          <div className="flex flex-col gap-12 justify-center items-center sm:flex-row">
            {menus.map((menu, index) => {
              return (
                <div key={index} className="rounded-lg shadow-xl w-[60vw] sm:w-[20vw]">
                  <div className="overflow-hidden">
                    <img
                      src={menu.image}
                      alt={menu.name}
                      className="object-cover transition-all hover:scale-110"
                      width={780}
                      height={512}
                    />
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
      <section id="gallery">
        <div className="flex flex-col justify-center h-screen">
          <div className="m-4 text-center">
            <h2 className="pb-2 text-3xl">Good food = happy clients</h2>
          </div>
          <div className="grid grid-cols-3 gap-0">
            {galleryPhotos.map((image, index) => {
              return (
                <div key={index} className="overflow-hidden h-[30vh]">
                  <img
                    src={image}
                    alt={'gallery image'}
                    width={960}
                    height={624}
                    className="object-cover w-full h-full transition-all hover:scale-110"
                  />
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <section id="contact">
        <div className="flex flex-col justify-center h-[calc(100vh_-_120px)]">
          <div className="mb-8 text-center">
            <h1 className="pb-2 text-xl text-amber-400">Contact</h1>
            <h2 className="pb-2 text-3xl">We're waiting for you!</h2>
          </div>
          <div className="flex flex-col gap-12 justify-center items-center sm:flex-row">
            {contactItems.map((contactItem, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center p-4 text-center rounded-full shadow-2xl w-[60vw] max-w-72 sm:w-[20vw]"
                >
                  <img src={contactItem.image} alt={contactItem.name} width={32} height={32} />
                  <h3 className="m-2 text-lg font-bold">{contactItem.description}</h3>
                  <p>{contactItem.name}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <footer className="bg-stone-200">
        <div className="flex gap-8 justify-between px-6 pt-6 pb-8 border-b sm:px-24 border-stone-400 min-h-[120px]">
          <div className="flex flex-col">
            <div className="mb-6">
              <a href="#top" className="hover:opacity-75">
                <img src={logo} alt="TheVeggieKingLogo" width={154.5} height={30} />
              </a>
            </div>
            <div>
              <nav className="hidden sm:block">
                <ul className="flex gap-x-6">{menuList}</ul>
              </nav>
              <nav className="sm:hidden">
                <ul className="flex flex-col gap-y-4">{menuList}</ul>
              </nav>
            </div>
          </div>
          <div className="w-1/2 sm:w-1/3">
            <p className="mb-4">
              Stay up to date with our new openings, upcoming events, seasonal specials and promotions. Check our
              socials.
            </p>
            <div className="flex gap-4">
              <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
                <img src={twitterIcon} alt={'twitter link'} width={24} height={24} />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-75"
              >
                <img src={facebookIcon} alt={'facebook link'} width={24} height={24} />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-75"
              >
                <img src={instagramIcon} alt={'instagram link'} width={24} height={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="py-4 px-24">© 2023 The Veggie King</div>
      </footer>
    </div>
  )
}

export default App
