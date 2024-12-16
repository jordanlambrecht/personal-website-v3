'use client'

import React, { useState, useEffect } from 'react'
import { Media } from '@/components/Media'
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  Button,
  Link,
} from '@nextui-org/react'

type ProductDesign = {
  id: string
  slug: string
  title?: string
  description?: string
  mainImage?: any
  downloadLink?: string
  enableDownloads?: boolean
}

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
      setSelectedDesign(designs[0]) // Select first by default
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
          className='transition cursor-pointer sm:col-span-5 md:col-span-3 aspect-golden hover:border-4'
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
            src={design.mainImage.url}
          />
        </Card>
      ))}
    </div>
  )
}

// {
/* Right column: sticky details pane */
// }
// {
//   selectedDesign && (
//     <div className='top-0 right-0 w-1/3 h-full p-4 overflow-hidden bg-gray-200 '>
//       <div className='sticky top-0'>
//         <h1 className='mb-4 text-3xl font-bold'>
//           {selectedDesign.title || 'Untitled'}
//         </h1>
//         {selectedDesign.description && (
//           <p className='mb-4 text-gray-700'>{selectedDesign.description}</p>
//         )}
//         {selectedDesign.mainImage && (
//           <div className='mb-4 aspect-[4/3] overflow-hidden rounded'>
//             <Media
//               resource={selectedDesign.mainImage}
//               className='object-cover w-full h-full'
//               imgClassName='object-cover'
//             />
//           </div>
//         )}

//         {/* Download Link if enabled */}
//         {selectedDesign.enableDownloads && selectedDesign.downloadLink && (
//           <a
//             href={selectedDesign.downloadLink}
//             target='_blank'
//             rel='noopener noreferrer'
//             className='inline-block px-4 py-2 mt-4 text-white bg-gray-800 rounded hover:bg-gray-700'
//           >
//             Download
//           </a>
//         )}
//       </div>
//     </div>
//   )
// }
