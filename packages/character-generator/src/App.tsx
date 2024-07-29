import React from 'react'

import hair1 from './assets/customize-look-preview-icons-right-side/hair/hair-1.svg'
import hair2 from './assets/customize-look-preview-icons-right-side/hair/hair-2.svg'
import hair3 from './assets/customize-look-preview-icons-right-side/hair/hair-3.svg'
import hair4 from './assets/customize-look-preview-icons-right-side/hair/hair-4.svg'
import hair5 from './assets/customize-look-preview-icons-right-side/hair/hair-5.svg'
import hair6 from './assets/customize-look-preview-icons-right-side/hair/hair-6.svg'

import eye1 from './assets/customize-look-preview-icons-right-side/eyes/eyes-1.svg'
import eye2 from './assets/customize-look-preview-icons-right-side/eyes/eyes-2.svg'
import eye3 from './assets/customize-look-preview-icons-right-side/eyes/eyes-3.svg'
import eye4 from './assets/customize-look-preview-icons-right-side/eyes/eyes-4.svg'
import eye5 from './assets/customize-look-preview-icons-right-side/eyes/eyes-5.svg'
import eye6 from './assets/customize-look-preview-icons-right-side/eyes/eyes-6.svg'

import ears1 from './assets/customize-look-preview-icons-right-side/ears/ears-1.svg'
import ears2 from './assets/customize-look-preview-icons-right-side/ears/ears-2.svg'
import ears3 from './assets/customize-look-preview-icons-right-side/ears/ears-3.svg'
import ears4 from './assets/customize-look-preview-icons-right-side/ears/ears-4.svg'
import ears5 from './assets/customize-look-preview-icons-right-side/ears/ears-5.svg'

import nose1 from './assets/customize-look-preview-icons-right-side/nose/nose-1.svg'
import nose2 from './assets/customize-look-preview-icons-right-side/nose/nose-2.svg'
import nose3 from './assets/customize-look-preview-icons-right-side/nose/nose-3.svg'
import nose4 from './assets/customize-look-preview-icons-right-side/nose/nose-4.svg'
import nose5 from './assets/customize-look-preview-icons-right-side/nose/nose-5.svg'
import nose6 from './assets/customize-look-preview-icons-right-side/nose/nose-6.svg'

import mouth1 from './assets/customize-look-preview-icons-right-side/mouth/mouth-1.svg'
import mouth2 from './assets/customize-look-preview-icons-right-side/mouth/mouth-2.svg'
import mouth3 from './assets/customize-look-preview-icons-right-side/mouth/mouth-3.svg'
import mouth4 from './assets/customize-look-preview-icons-right-side/mouth/mouth-4.svg'
import mouth5 from './assets/customize-look-preview-icons-right-side/mouth/mouth-5.svg'
import mouth6 from './assets/customize-look-preview-icons-right-side/mouth/mouth-6.svg'

import accessory1 from './assets/customize-look-preview-icons-right-side/accessories/accessory-1.svg'
import accessory2 from './assets/customize-look-preview-icons-right-side/accessories/accessory-2.svg'
import accessory3 from './assets/customize-look-preview-icons-right-side/accessories/accessory-3.svg'
import accessory4 from './assets/customize-look-preview-icons-right-side/accessories/accessory-4.svg'
import accessory5 from './assets/customize-look-preview-icons-right-side/accessories/accessory-5.svg'

import baseCanvas from './assets/character-images-left-side/default/basic-character.png'
import hairCanvas1 from './assets/character-images-left-side/hair/hair-1.png'
import hairCanvas2 from './assets/character-images-left-side/hair/hair-2.png'
import hairCanvas3 from './assets/character-images-left-side/hair/hair-3.png'
import hairCanvas4 from './assets/character-images-left-side/hair/hair-4.png'
import hairCanvas5 from './assets/character-images-left-side/hair/hair-5.png'
import hairCanvas6 from './assets/character-images-left-side/hair/hair-6.png'

import eyeCanvas1 from './assets/character-images-left-side/eyes/eye-1.png'
import eyeCanvas2 from './assets/character-images-left-side/eyes/eye-2.png'
import eyeCanvas3 from './assets/character-images-left-side/eyes/eye-3.png'
import eyeCanvas4 from './assets/character-images-left-side/eyes/eye-4.png'
import eyeCanvas5 from './assets/character-images-left-side/eyes/eye-5.png'
import eyeCanvas6 from './assets/character-images-left-side/eyes/eye-6.png'

import earsCanvas1 from './assets/character-images-left-side/ears/ear-1.png'
import earsCanvas2 from './assets/character-images-left-side/ears/ear-2.png'
import earsCanvas3 from './assets/character-images-left-side/ears/ear-3.png'
import earsCanvas4 from './assets/character-images-left-side/ears/ear-4.png'
import earsCanvas5 from './assets/character-images-left-side/ears/ear-5.png'

import noseCanvas1 from './assets/character-images-left-side/nose/nose-1.png'
import noseCanvas2 from './assets/character-images-left-side/nose/nose-2.png'
import noseCanvas3 from './assets/character-images-left-side/nose/nose-3.png'
import noseCanvas4 from './assets/character-images-left-side/nose/nose-4.png'
import noseCanvas5 from './assets/character-images-left-side/nose/nose-5.png'
import noseCanvas6 from './assets/character-images-left-side/nose/nose-6.png'

import mouthCanvas1 from './assets/character-images-left-side/mouth/mouth-1.png'
import mouthCanvas2 from './assets/character-images-left-side/mouth/mouth-2.png'
import mouthCanvas3 from './assets/character-images-left-side/mouth/mouth-3.png'
import mouthCanvas4 from './assets/character-images-left-side/mouth/mouth-4.png'
import mouthCanvas5 from './assets/character-images-left-side/mouth/mouth-5.png'
import mouthCanvas6 from './assets/character-images-left-side/mouth/mouth-6.png'

import accessoryCanvas1 from './assets/character-images-left-side/accessories/accessory-1.png'
import accessoryCanvas2 from './assets/character-images-left-side/accessories/accessory-2.png'
import accessoryCanvas3 from './assets/character-images-left-side/accessories/accessory-3.png'
import accessoryCanvas4 from './assets/character-images-left-side/accessories/accessory-4.png'
import accessoryCanvas5 from './assets/character-images-left-side/accessories/accessory-5.png'

import checkIcon from './assets/icons/check-icon.svg'

interface CurrentFaceParts {
  base: string
  hair: string
  eyes: string
  ears: string
  nose: string
  mouth: string
  accessories: string
  background: string
}
type SelectableFaceParts = Exclude<keyof CurrentFaceParts, 'base'>

const facePartsOrder = ['background', 'base', 'hair', 'eyes', 'ears', 'nose', 'mouth', 'accessories'] as const

const genreLabels = ['Hair', 'Eyes', 'Ears', 'Nose', 'Mouth', 'Background', 'Accessories']

const backgroundColors = ['gray', 'cyan', 'magenta', 'green', 'yellow', 'orange']

const faceParts = {
  hair: [
    {
      name: 'hair-1',
      src: hair1,
      canvasSrc: hairCanvas1,
    },
    {
      name: 'hair-2',
      src: hair2,
      canvasSrc: hairCanvas2,
    },
    {
      name: 'hair-3',
      src: hair3,
      canvasSrc: hairCanvas3,
    },
    {
      name: 'hair-4',
      src: hair4,
      canvasSrc: hairCanvas4,
    },
    {
      name: 'hair-5',
      src: hair5,
      canvasSrc: hairCanvas5,
    },
    {
      name: 'hair-6',
      src: hair6,
      canvasSrc: hairCanvas6,
    },
  ],
  eyes: [
    {
      name: 'eye-1',
      src: eye1,
      canvasSrc: eyeCanvas1,
    },
    {
      name: 'eye-2',
      src: eye2,
      canvasSrc: eyeCanvas2,
    },
    {
      name: 'eye-3',
      src: eye3,
      canvasSrc: eyeCanvas3,
    },
    {
      name: 'eye-4',
      src: eye4,
      canvasSrc: eyeCanvas4,
    },
    {
      name: 'eye-5',
      src: eye5,
      canvasSrc: eyeCanvas5,
    },
    {
      name: 'eye-6',
      src: eye6,
      canvasSrc: eyeCanvas6,
    },
  ],
  ears: [
    {
      name: 'ears-1',
      src: ears1,
      canvasSrc: earsCanvas1,
    },
    {
      name: 'ears-2',
      src: ears2,
      canvasSrc: earsCanvas2,
    },
    {
      name: 'ears-3',
      src: ears3,
      canvasSrc: earsCanvas3,
    },
    {
      name: 'ears-4',
      src: ears4,
      canvasSrc: earsCanvas4,
    },
    {
      name: 'ears-5',
      src: ears5,
      canvasSrc: earsCanvas5,
    },
  ],
  nose: [
    {
      name: 'nose-1',
      src: nose1,
      canvasSrc: noseCanvas1,
    },
    {
      name: 'nose-2',
      src: nose2,
      canvasSrc: noseCanvas2,
    },
    {
      name: 'nose-3',
      src: nose3,
      canvasSrc: noseCanvas3,
    },
    {
      name: 'nose-4',
      src: nose4,
      canvasSrc: noseCanvas4,
    },
    {
      name: 'nose-5',
      src: nose5,
      canvasSrc: noseCanvas5,
    },
    {
      name: 'nose-6',
      src: nose6,
      canvasSrc: noseCanvas6,
    },
  ],
  mouth: [
    {
      name: 'mouth-1',
      src: mouth1,
      canvasSrc: mouthCanvas1,
    },
    {
      name: 'mouth-2',
      src: mouth2,
      canvasSrc: mouthCanvas2,
    },
    {
      name: 'mouth-3',
      src: mouth3,
      canvasSrc: mouthCanvas3,
    },
    {
      name: 'mouth-4',
      src: mouth4,
      canvasSrc: mouthCanvas4,
    },
    {
      name: 'mouth-5',
      src: mouth5,
      canvasSrc: mouthCanvas5,
    },
    {
      name: 'mouth-6',
      src: mouth6,
      canvasSrc: mouthCanvas6,
    },
  ],
  accessories: [
    {
      name: 'accessory-1',
      src: accessory1,
      canvasSrc: accessoryCanvas1,
    },
    {
      name: 'accessory-2',
      src: accessory2,
      canvasSrc: accessoryCanvas2,
    },
    {
      name: 'accessory-3',
      src: accessory3,
      canvasSrc: accessoryCanvas3,
    },
    {
      name: 'accessory-4',
      src: accessory4,
      canvasSrc: accessoryCanvas4,
    },
    {
      name: 'accessory-5',
      src: accessory5,
      canvasSrc: accessoryCanvas5,
    },
  ],
}

const App: React.FC = () => {
  const [currentFaceParts, setCurrentFaceParts] = React.useState<CurrentFaceParts>({
    base: baseCanvas,
    hair: '',
    eyes: '',
    ears: '',
    nose: '',
    mouth: '',
    accessories: '',
    background: '',
  })
  const [currentSelectedType, setCurrentSelectedType] = React.useState<SelectableFaceParts>('hair')

  React.useEffect(() => {
    drawFace()
  }, [currentFaceParts])

  const setFaceParts = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLImageElement
    const facetype = target.dataset.facetype
    const imgid = target.dataset.imgid
    if (!facetype || !imgid) return

    const canvasSrc =
      currentSelectedType == 'background' ? imgid : (
        faceParts[currentSelectedType].find((parts) => parts.name === imgid)?.canvasSrc
      )
    if (!canvasSrc) return

    setCurrentFaceParts({
      ...currentFaceParts,
      [facetype]: canvasSrc,
    })
  }

  const handleCurrentSelectedType = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLButtonElement
    const facetype = target.dataset.facetype
    if (!facetype) return

    setCurrentSelectedType(facetype as SelectableFaceParts)
  }

  const drawFace = () => {
    const canvas = document.querySelector('canvas#canvas') as HTMLCanvasElement
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let loadedImages = 0
    const imageObjects = [] as HTMLImageElement[]
    facePartsOrder.forEach((partType) => {
      // background の場合は canvas のスタイルを変更するだけ
      if (partType === 'background') {
        if (currentFaceParts.background) {
          canvas.style.backgroundColor = currentFaceParts.background
        }
        loadedImages++
        return
      }

      const canvasSrc = currentFaceParts[partType as (typeof facePartsOrder)[number]]
      if (!canvasSrc) {
        loadedImages++
        return
      }

      const img = new Image()
      img.src = canvasSrc
      imageObjects.push(img)

      img.onload = () => {
        loadedImages++
        if (loadedImages === facePartsOrder.length) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          imageObjects.forEach((img) => {
            ctx.drawImage(img, 0, 0)
          })
        }
      }
    })
  }

  return (
    <div className="flex justify-center px-8 w-full h-screen">
      <div className="flex flex-col justify-center max-w-[1000px]">
        <header className="text-2xl font-bold md:text-4xl">CHARACTER GENERATOR</header>
        <div className="flex flex-col justify-center mt-8 md:flex-row">
          <div className="mr-4 mb-8 w-[80vw] h-[80vw] md:w-[45vw] md:h-[45vw] md:max-w-[500px] md:max-h-[500px]">
            <canvas id="canvas" width={500} height={500} className="w-full h-full"></canvas>
          </div>
          <div className="md:ml-4 w-[80vw] md:w-[45vw] md:max-w-[500px]">
            <h2 className="mb-4 text-xl font-bold">Customize Look</h2>
            <div className="flex flex-wrap gap-2 mb-8 text-sm text-sky-600">
              {genreLabels.map((genre) => {
                return (
                  <button
                    type="button"
                    key={genre}
                    className={`py-1 px-4 mb-1 rounded-full border border-solid hover:text-white border-sky-600 hover:bg-sky-600 ${currentSelectedType === genre.toLowerCase() ? 'text-white bg-sky-600' : 'text-sky-600'}`}
                    data-facetype={genre.toLowerCase()}
                    onClick={handleCurrentSelectedType}
                  >
                    {genre}
                  </button>
                )
              })}
            </div>
            <div className="flex flex-wrap gap-8 justify-between">
              {currentSelectedType === 'background' ?
                backgroundColors.map((color) => {
                  return (
                    <button
                      className="relative w-1/4 aspect-square"
                      style={{ backgroundColor: color }}
                      key={color}
                      type="button"
                      data-facetype="background"
                      data-imgid={color}
                      onClick={setFaceParts}
                    >
                      {currentFaceParts[currentSelectedType] === color && (
                        <div className="absolute right-0 -top-0 bg-white rounded-full border border-solid">
                          <img src={checkIcon} width={16} height={16} />
                        </div>
                      )}
                    </button>
                  )
                })
              : faceParts[currentSelectedType].map((parts) => {
                  return (
                    <div className="flex relative justify-center items-center w-1/4 min-h-[100px]" key={parts.name}>
                      <button type="button">
                        <img
                          src={parts.src}
                          alt={parts.name}
                          data-facetype={currentSelectedType}
                          data-imgid={parts.name}
                          onClick={setFaceParts}
                        />
                      </button>
                      {currentFaceParts[currentSelectedType] === parts.canvasSrc && (
                        <div className="absolute right-0 -top-4 bg-white rounded-full border border-solid">
                          <img src={checkIcon} width={16} height={16} />
                        </div>
                      )}
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
