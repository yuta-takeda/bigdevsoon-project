import React, { useEffect, useState } from 'react'

interface Props {
  images: string[]
  intervalMs: number
}

export const Slideshow: React.FC<Props> = (props) => {
  const { images, intervalMs } = props
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, intervalMs)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="overflow-hidden relative m-4">
      <div
        className="flex duration-700 transition-trasform"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img key={index} src={image} alt={`slide ${index}`} className="object-contain" />
        ))}
      </div>
    </div>
  )
}
