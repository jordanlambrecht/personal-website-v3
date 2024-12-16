import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const lists = await payload.find({
    collection: 'lists',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })
  return (
    <div className='pt-24 pb-24'>
      <div className='container mb-16'>
        <div className='prose dark:prose-invert max-w-none'>
          <h1>Lists</h1>
        </div>
      </div>
      <CollectionArchive lists={lists.docs} />
    </div>
  )
}
