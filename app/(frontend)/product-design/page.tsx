// app/product-design/page.tsx (Server Component)
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import ProductDesignsList from './page.client'

export default async function ProductDesignPage() {
  const payload = await getPayload({ config: configPromise })
  const productDesigns = await payload.find({
    collection: 'product-design',
    limit: 100,
    pagination: false,
    sort: '-date',
    depth: 1,
    select: {
      title: true,
      description: true,
      mainImage: true,
      slug: true,
      downloadLink: true,
      enableDownloads: true,
    },
  })

  return (
    // <div className='flex w-full h-[calc(100vh-12rem)]'>
    <div className='flex w-full h-auto'>
      <ProductDesignsList designs={productDesigns.docs} />
    </div>
  )
}
