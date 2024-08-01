import React from 'react'

import checkIcon from './assets/icons/check-icon.svg'
import closeIcon from './assets/icons/close-icon.svg'
import downloadIcon from './assets/icons/download-icon.svg'
import infoIcon from './assets/icons/info-icon.svg'
import randomIcon from './assets/icons/random-icon.svg'

import baseCanvas from './assets/character-images-left-side/default/basic-character.png'

import { faceParts } from './faceParts'

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

const localStorageKey = 'characterGenerator.currentFaceParts'

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
  const [downloadSuccess, setDownloadSuccess] = React.useState<boolean>(false)

  React.useEffect(() => {
    const savedFaceParts = localStorage.getItem(localStorageKey)
    if (savedFaceParts) {
      setCurrentFaceParts(JSON.parse(savedFaceParts))
    }
  }, [])

  React.useEffect(() => {
    drawFace()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFaceParts])

  const setFaceParts = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLImageElement
    const facetype = target.dataset.facetype
    const imgid = target.dataset.imgid
    if (!facetype || !imgid) return

    const canvasSrc =
      currentSelectedType === 'background' ? imgid : (
        faceParts[currentSelectedType].find((parts) => parts.name === imgid)?.canvasSrc
      )
    if (!canvasSrc) return

    const newFaceParts = { ...currentFaceParts, [facetype]: canvasSrc }
    localStorage.setItem(localStorageKey, JSON.stringify(newFaceParts))
    setCurrentFaceParts(newFaceParts)
  }

  const setRandomFaceParts = () => {
    const randomFaceParts = {} as CurrentFaceParts
    genreLabels
      .map((label) => label.toLowerCase())
      .forEach((partsType) => {
        if (partsType === 'background') {
          randomFaceParts.background = backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
        } else {
          const parts = faceParts[partsType as Exclude<SelectableFaceParts, 'background'>]

          const randomParts = parts[Math.floor(Math.random() * parts.length)]
          randomFaceParts[partsType as Exclude<SelectableFaceParts, 'background'>] = randomParts.canvasSrc
        }
      })

    const newFaceParts = { ...currentFaceParts, ...randomFaceParts }
    localStorage.setItem(localStorageKey, JSON.stringify(newFaceParts))
    setCurrentFaceParts(newFaceParts)
  }

  const handleCurrentSelectedType = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLButtonElement
    const facetype = target.dataset.facetype
    if (!facetype) return

    setCurrentSelectedType(facetype as SelectableFaceParts)
  }

  const downloadImage = () => {
    const canvas = document.querySelector('canvas#canvas') as HTMLCanvasElement
    if (!canvas) return

    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = 'character.png'
    link.click()

    setDownloadSuccess(true)
    setTimeout(() => {
      setDownloadSuccess(false)
    }, 3000)
  }

  const handleDownloadLabel = () => {
    setDownloadSuccess(false)
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
    <div className="flex relative justify-center px-8 my-8 w-full md:my-0 md:h-screen">
      <div className="flex flex-col justify-center max-w-[1000px]">
        <header className="text-2xl font-bold md:text-4xl">CHARACTER GENERATOR</header>
        <div className="flex flex-col justify-center mt-8 md:flex-row">
          <div className="mr-4 mb-24 md:mb-0 md:h-full w-[80vw] h-[80vw] md:w-[45vw] md:max-w-[500px]">
            <canvas id="canvas" width={500} height={500} className="mb-6 w-full"></canvas>
            <div className="flex gap-4 w-full justify-stretch">
              <button
                type="button"
                className="py-2 px-4 text-white bg-blue-700 rounded-lg hover:opacity-75 grow"
                onClick={setRandomFaceParts}
              >
                <div className="flex gap-2 justify-center">
                  <img
                    src={randomIcon}
                    width={16}
                    height={16}
                    className="filter brightness-0 invert"
                    alt="make random face"
                  />
                  Random
                </div>
              </button>
              <button
                type="button"
                className="py-2 px-4 rounded-lg border-2 border-solid hover:opacity-75 grow"
                onClick={downloadImage}
              >
                <div className="flex gap-2 justify-center">
                  <img src={downloadIcon} width={16} height={16} alt="download" />
                  Download
                </div>
              </button>
            </div>
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
                          <img src={checkIcon} width={16} height={16} alt="part is used" />
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
                          <img src={checkIcon} width={16} height={16} alt="part is used" />
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
      {downloadSuccess && (
        <div className="flex absolute right-8 bottom-8 gap-2 p-2 text-white bg-blue-400" onClick={handleDownloadLabel}>
          <img src={infoIcon} width={20} height={20} className="filter brightness-0 invert" alt="info" />
          Image has been downloaded
          <img src={closeIcon} width={16} height={16} className="filter brightness-0 invert" alt="remove popup" />
        </div>
      )}
    </div>
  )
}

export default App
