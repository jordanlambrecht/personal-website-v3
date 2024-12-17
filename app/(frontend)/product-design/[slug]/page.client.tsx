'use client'

import { Image } from '@nextui-org/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import type { Media } from '@payload-types'
import { useState } from 'react'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import 'yet-another-react-lightbox/plugins/counter.css'

type GalleryProps = {
  images: Array<{ url: string; alt: string }>
  onImageClick?: (index: number, imageUrl: string) => void
  heroImage: { url: string; alt: string } | null
}

export const Gallery: React.FC<GalleryProps> = ({ images, heroImage }) => {
  const [open, setOpen] = useState(false) // Control lightbox visibility
  const [index, setIndex] = useState(0) // Track which image is active

  const slides = images.map((image) => ({
    src: image.url,
    alt: image.alt || 'Image',
  }))

  if (heroImage) {
    slides.unshift({ src: heroImage.url, alt: heroImage.alt })
  }
  return (
    <>
      <section className='grid grid-cols-2 gap-4 mt-12 md:grid-cols-3'>
        {images.map((image, idx) => (
          <div
            key={idx + 1}
            role='button'
            className='relative aspect-[4/3] overflow-hidden rounded-md cursor-pointer'
            onClick={() => {
              setIndex(idx + 1)
              setOpen(true)
            }}
          >
            <Image
              src={image.url}
              alt={image.alt || `Gallery image ${idx + 2}`}
              radius='sm'
              classNames={{
                img: 'object-cover w-full h-full',
              }}
            />
          </div>
        ))}
      </section>
      <Lightbox
        slides={slides}
        open={open}
        index={index}
        close={() => setOpen(false)}
        controller={{
          closeOnBackdropClick: true,
        }}
        plugins={[Counter]}
        styles={{
          container: {
            backgroundColor: 'rgba(0, 0, 0, .4)',
            backdropFilter: 'blur(10px)',
          },
        }}
      />
    </>
  )
}
