import React from 'react'
import { Component } from './component'
import { faceParts } from './faceParts'
import type { CurrentFaceParts, SelectableFaceParts } from './types.d'

import baseCanvas from './assets/character-images-left-side/default/basic-character.png'

const facePartsOrder = ['background', 'base', 'hair', 'eyes', 'ears', 'nose', 'mouth', 'accessories'] as const

const genreLabels = ['Hair', 'Eyes', 'Ears', 'Nose', 'Mouth', 'Background', 'Accessories']

const backgroundColors = ['gray', 'cyan', 'magenta', 'green', 'yellow', 'orange']

const localStorageKey = 'characterGenerator.currentFaceParts'

export const Container: React.FC = () => {
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
    <Component
      setRandomFaceParts={setRandomFaceParts}
      downloadImage={downloadImage}
      genreLabels={genreLabels}
      handleCurrentSelectedType={handleCurrentSelectedType}
      currentSelectedType={currentSelectedType}
      backgroundColors={backgroundColors}
      currentFaceParts={currentFaceParts}
      setFaceParts={setFaceParts}
      faceParts={faceParts}
      downloadSuccess={downloadSuccess}
      handleDownloadLabel={handleDownloadLabel}
    />
  )
}
