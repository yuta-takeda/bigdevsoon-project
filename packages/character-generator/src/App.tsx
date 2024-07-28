import React from 'react'

import hair1 from './assets/customize-look-preview-icons-right-side/hair/hair-1.svg'
import hair2 from './assets/customize-look-preview-icons-right-side/hair/hair-2.svg'
import hair3 from './assets/customize-look-preview-icons-right-side/hair/hair-3.svg'
import hair4 from './assets/customize-look-preview-icons-right-side/hair/hair-4.svg'
import hair5 from './assets/customize-look-preview-icons-right-side/hair/hair-5.svg'
import hair6 from './assets/customize-look-preview-icons-right-side/hair/hair-6.svg'

import baseCanvas from './assets/character-images-left-side/default/basic-character.png'
import hairCanvas1 from './assets/character-images-left-side/hair/hair-1.png'
import hairCanvas2 from './assets/character-images-left-side/hair/hair-2.png'
import hairCanvas3 from './assets/character-images-left-side/hair/hair-3.png'
import hairCanvas4 from './assets/character-images-left-side/hair/hair-4.png'
import hairCanvas5 from './assets/character-images-left-side/hair/hair-5.png'
import hairCanvas6 from './assets/character-images-left-side/hair/hair-6.png'

interface CurrentFaceParts {
  base: string
  hairs: string
}

const faceParts = {
  hairs: [
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
}

const genres = ['Hair', 'Eyes', 'Ears', 'Nose', 'Mouth', 'Background', 'Accessories']

const facePartsOrder = ['base', 'hairs'] as const

const App: React.FC = () => {
  const [currentFaceParts, setCurrentFaceParts] = React.useState<CurrentFaceParts>({
    base: baseCanvas,
    hairs: '',
  })

  React.useEffect(() => {
    drawFace()
  }, [currentFaceParts])

  const setFaceParts = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLImageElement
    const facetype = target.dataset.facetype
    const imgid = target.dataset.imgid
    if (!facetype || !imgid) return

    const canvasSrc = faceParts.hairs.find((hair) => hair.name === imgid)?.canvasSrc
    if (!canvasSrc) return

    setCurrentFaceParts({
      ...currentFaceParts,
      [facetype]: canvasSrc,
    })
  }

  const drawFace = () => {
    const canvas = document.querySelector('canvas#canvas') as HTMLCanvasElement
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let loadedImages = 0
    const imageObjects = [] as HTMLImageElement[]
    facePartsOrder.forEach((partType) => {
      const canvasSrc = currentFaceParts[partType as (typeof facePartsOrder)[number]]
      if (!canvasSrc) {
        loadedImages++
        return
      }

      const img = new Image()
      img.src = canvasSrc
      img.onload = () => {
        loadedImages++
        imageObjects.push(img)
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
              {genres.map((genre) => {
                return <div className="py-1 px-4 mb-1 rounded-full border border-solid border-sky-600">{genre}</div>
              })}
            </div>
            <div className="flex flex-wrap gap-8 justify-between">
              {faceParts.hairs.map((hair) => {
                return (
                  <div className="w-1/4" key={hair.name}>
                    <img
                      src={hair.src}
                      alt={hair.name}
                      data-facetype={'hairs'}
                      data-imgid={hair.name}
                      onClick={setFaceParts}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
