// app/product-design/page.tsx (Server Component)
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import ProductDesignsList from './page.client'
import type { ProductDesign } from '@payload-types'
import H1 from '@/components/ui/H1'
import { Link } from '@nextui-org/link'

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

  const validDesigns = productDesigns.docs.filter(
    (design): design is ProductDesign => typeof design.slug === 'string'
  ) as ProductDesign[]
  return (
    <div className='flex flex-col w-full h-auto gap-8 text-left'>
      <div>
        <H1>Product Design</H1>
        <p className='mb-2'>
          Here’s where I share the stuff I’ve designed. Some of it’s practical,
          some of it’s fun, and most of it’s a little messy.
        </p>
        <p className='mb-4'>
          You can also find me on{' '}
          <Link target='_blank' href='https://makerworld.com/jordyjordy'>
            Makerworld
          </Link>
          .
        </p>
        <p className='my-2 font-bold'> What’s here: </p>
        <ul>
          <li className='my-2'>
            <span className='font-semibold'>Downloadable Models:</span> If
            you’ve got a 3D printer, you can grab the files and print them
            yourself.
          </li>
          <li className='my-2'>
            <span className='font-semibold'>Links to Buy:</span> Not everyone
            has a printer, so I’m working on offering physical versions for sale
            (coming soon-ish).
          </li>
          <li className='my-2'>
            <span className='font-semibold'>Why I Made Them:</span> I’ll throw
            in a bit of context for each one because everything here solves a
            problem, even if it’s just the problem of “this would be cool to
            make.”
          </li>
        </ul>
      </div>
      <ProductDesignsList designs={validDesigns} />
    </div>
  )
}
