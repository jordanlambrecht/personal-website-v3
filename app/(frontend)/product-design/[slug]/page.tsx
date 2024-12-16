import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { Media } from '@/components/Media'

import { Button, ButtonGroup } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
type ProductDesign = {
  id: string
  slug: string
  title?: string
  description?: string
  mainImage?: any
  downloadLink?: string
  enableDownloads?: boolean
}
export const DownloadIcon = ({
  fill = 'currentColor',
  filled,
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill={filled ? fill : 'none'}
      height={size || height || 16}
      viewBox='0 0 16 16'
      width={size || width || 16}
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fill={fill}
        d='M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M8 5a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5A.5.5 0 0 1 8 5'
      />
    </svg>
  )
}

export const LinkIcon = ({
  fill = 'currentColor',
  filled,
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill={filled ? fill : 'none'}
      height={size || height || 16}
      viewBox='0 0 16 16'
      width={size || width || 16}
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      {/* <path
        fill-rule='evenodd'
        fill={fill}
        stroke={fill}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
        d='M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5'
      />
      <path
        fill={fill}
        stroke={fill}
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
        fill-rule='evenodd'
        d='M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z'
      /> */}
      <path
        fill={fill}
        d='M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707'
      />
    </svg>
  )
}
async function queryProductDesignBySlug(
  slug: string
): Promise<ProductDesign | null> {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'product-design',
    draft,
    limit: 1,
    pagination: false,
    depth: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
    select: {
      title: true,
      description: true,
      mainImage: true,
      downloadLink: true,
      enableDownloads: true,
      slug: true,
    },
  })

  return result.docs?.[0] || null
}

export default async function ProductDesignPage({
  params,
}: {
  params: { slug?: string }
}) {
  const { slug = '' } = params
  const product = await queryProductDesignBySlug(slug)

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <article className='flex flex-col gap-4 '>
      <div className='w-full'>
        {product.title && (
          <h1 className='mb-4 text-3xl font-bold text-left'>{product.title}</h1>
        )}
      </div>
      <div className='flex flex-row w-full gap-x-8'>
        <div className='w-3/5'>
          {product.mainImage && (
            <div className='mb-4 overflow-hidden rounded aspect-4/3'>
              <Media
                resource={product.mainImage}
                className='object-cover w-full h-full'
                imgClassName='object-cover'
              />
            </div>
          )}
        </div>
        <div className='w-full text-left md:w-2/5'>
          {product.description && (
            <p className='mb-4 text-gray-700'>{product.description}</p>
          )}
          {product.enableDownloads && product.downloadLink && (
            <ButtonGroup variant='ghost' color='primary' size='lg'>
              <Button
                className='float-left align-self-start align-start'
                endContent={<DownloadIcon width={'20'} height={'20'} />}
                aria-label='Take a photo'
                href={product.downloadLink}
                as={Link}
                rel='noopener noreferrer'
              >
                Download
              </Button>
              <Button
                className=''
                href={product.downloadLink}
                as={Link}
                rel='noopener noreferrer'
                aria-label='Take a photo'
                endContent={<LinkIcon width={'20'} height={'20'} />}
              >
                MakerWorld
              </Button>
              <Button
                className=''
                href={product.downloadLink}
                as={Link}
                rel='noopener noreferrer'
                aria-label='Take a photo'
                endContent={<LinkIcon width={'20'} height={'20'} />}
              >
                Buy
              </Button>
            </ButtonGroup>
          )}
        </div>
      </div>
    </article>
  )
}
