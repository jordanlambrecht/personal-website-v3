// app/(frontend)/product-design/[slug]/page.tsx

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { Media } from '@/components/Media'
import { Button, ButtonGroup } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import type { ProductDesign } from '@payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { Gallery } from './page.client'
import { LinkIcon, DownloadIcon } from '@/components/icons'
import { BuyMeACoffeeWidget } from '@/components/BuyMeACoffeeWidget'
import H1 from '@/components/ui/H1'

export const Description = ({ data }: { data: SerializedEditorState }) => {
  return <RichText data={data} />
}

async function queryProductDesignBySlug(
  slug: string | undefined
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
      slug: true,
      enableDownload: true,
      enableMakerworld: true,
      enablePurchase: true,
      makerworldLink: true,
      purchaseLink: true,
      downloadLink: true,
      details: true,
      extraImages: true,
      enableExtraImages: true,
      extraRichTextContent: true,
      enableWrittenContent: true,
    },
  })

  return result.docs?.[0] || null || undefined
}

export default async function ProductDesignPage({
  params: paramsPromise,
}: {
  params: Promise<{ slug?: string }>
}) {
  const resolvedParams = await paramsPromise
  const { slug = '' } = resolvedParams
  const product = await queryProductDesignBySlug(slug)

  if (!product) {
    return (
      // 404
      <div className='flex flex-col justify-center w-full text-center align-items-center md:gap-y-4'>
        <H1 className='text-4xl font-black'>Product Design Not Found 😓</H1>
        <div>
          <Button
            as={Link}
            variant='ghost'
            color='primary'
            size='lg'
            aria-label='Go Back'
            href='/product-design'
            className='w-auto'
          >
            ⟵ Back to all product designs
          </Button>
        </div>
      </div>
    )
  }

  const showMakerworld =
    (product.enableMakerworld ?? false) && (product.makerworldLink ?? false)

  const showDownload =
    (product.enableDownload ?? false) && (product.downloadLink ?? false)

  const showPurchase =
    (product.enablePurchase ?? false) && (product.purchaseLink ?? false)

  const showButtonGroup = showMakerworld || showDownload || showPurchase

  return (
    <article className='flex flex-col gap-y-3 md:gap-y-6 '>
      <div className='w-full'>
        <H1 className='text-3xl font-bold text-left'>{product.title}</H1>
      </div>
      <div className='flex flex-col w-full md:flex-row md:gap-x-8'>
        {/* CONTENT */}
        <div className='w-full md:w-3/5'>
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
        {/* RIGHT COLUMN */}
        <div className='flex flex-col justify-between w-full h-auto text-left md:w-2/5 md:gap-y-6'>
          <div className='mb-4'>
            {product.details && <Description data={product.details} />}
          </div>
          <div className='my-4'>
            {showButtonGroup ? (
              <ButtonGroup
                variant='ghost'
                color='primary'
                size='lg'
                className='flex flex-row w-full'
              >
                {showDownload && (
                  <Button
                    className='flex-grow float-left align-self-start align-start'
                    endContent={<DownloadIcon width={'20'} height={'20'} />}
                    aria-label='Download project files'
                    href={
                      typeof product.downloadLink === 'object' &&
                      product.downloadLink?.url
                        ? product.downloadLink.url
                        : undefined
                    }
                    as={Link}
                  >
                    Download
                  </Button>
                )}
                {showMakerworld && (
                  <Button
                    className='flex-grow'
                    href={product.makerworldLink ?? undefined}
                    as={Link}
                    rel='noopener noreferrer'
                    aria-label='View on Makerworld'
                    target='_blank'
                    endContent={<LinkIcon width={'20'} height={'20'} />}
                  >
                    MakerWorld
                  </Button>
                )}
                {showPurchase && (
                  <Button
                    className='flex-grow'
                    as={Link}
                    href={product.purchaseLink ?? undefined}
                    rel='noopener noreferrer'
                    aria-label='Purchase a copy'
                    endContent={<LinkIcon width={'20'} height={'20'} />}
                  >
                    Buy
                  </Button>
                )}
              </ButtonGroup>
            ) : (
              <ButtonGroup isDisabled className='w-full'>
                <Button
                  className='flex-grow w-full align-middle align-self-start'
                  endContent={<DownloadIcon width={'20'} height={'20'} />}
                  aria-label='Content download coming soon.'
                >
                  Download Coming Soon
                </Button>
              </ButtonGroup>
            )}
            <Link href='/product-design' className='w-full my-2 text-center'>
              ← Back to all product designs
            </Link>
          </div>
          {/* BMAC */}
          <div>
            <BuyMeACoffeeWidget />
          </div>
        </div>
      </div>
      {product.enableWrittenContent && product.extraRichTextContent && (
        <section className='flex flex-col w-full'>
          {' '}
          <Description data={product.extraRichTextContent} />
        </section>
      )}

      {product.enableExtraImages && (
        <Gallery
          images={
            product.extraImages
              ?.map((image) => {
                if (typeof image === 'string') {
                  return { url: image, alt: '' }
                } else if (image?.url) {
                  return { url: image.url, alt: image.alt || '' }
                }
                return null // Filter out invalid items
              })
              .filter(Boolean) as { url: string; alt: string }[] // Ensure type matches
          }
          heroImage={
            typeof product.mainImage === 'object' && product.mainImage?.url
              ? { url: product.mainImage.url, alt: product.mainImage.alt || '' }
              : { url: '', alt: '' } // Fallback to an empty object if not valid
          }
        />
      )}
    </article>
  )
}
