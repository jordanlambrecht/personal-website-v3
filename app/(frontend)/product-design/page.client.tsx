'use client'

import type { ProductDesign } from '@payload-types'
import React, { useState, useEffect } from 'react'

import { Card, CardHeader, Image, Link } from '@nextui-org/react'

export default function ProductDesignsList({
  designs,
}: {
  designs: ProductDesign[]
}) {
  const [selectedDesign, setSelectedDesign] = useState<ProductDesign | null>(
    null
  )

  useEffect(() => {
    if (designs && designs.length > 0) {
      setSelectedDesign(designs[0])
    }
  }, [designs])

  return (
    <div className='relative grid w-full h-auto grid-cols-1 grid-rows-3 gap-4 md:grid-cols-4 lg:grid-cols-6'>
      {designs.map((design) => (
        <Card
          as={Link}
          key={design.id}
          href={`product-design/${design.slug}`}
          id={'1'}
          className='transition duration-100 ease-in-out cursor-pointer sm:col-span-5 md:col-span-3 aspect-golden hover:scale-99'
        >
          <CardHeader className='absolute z-10 top-1 flex-col !items-start '>
            <p className='font-bold uppercase text-tiny text-white/60'></p>
            <h2 className='font-medium text-white text-large'>
              {design.title || 'Untitled'}
            </h2>
          </CardHeader>
          <Image
            removeWrapper
            alt='Card background'
            className='z-0 object-cover w-full h-full'
            src={
              typeof design.mainImage === 'object' && design.mainImage?.url
                ? design.mainImage.url
                : typeof design.mainImage === 'string'
                  ? design.mainImage
                  : '/fallback-image.jpg'
            } //TODO: NEED FALLBACK IMAGE
          />
        </Card>
      ))}
    </div>
  )
}
