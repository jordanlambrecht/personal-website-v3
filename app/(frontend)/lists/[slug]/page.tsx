import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import configPromise from '@payload-config'
import RichText from '@/components/RichText'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

const queryListBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'lists',
    draft,
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

export default async function List({ params }: Args) {
  const resolvedParams = await params
  const { slug = '' } = resolvedParams
  const list = await queryListBySlug({ slug })

  if (!list) {
    return <div>List not found</div>
  }
  const { title, things, categories, publishedAt, status } = list

  return (
    <article className='pt-8 pb-8'>
      <h1 className='text-3xl font-bold text-center'>{title}</h1>
      {/* Published At */}
      <p className='text-sm text-center text-gray-500'>
        Published At:{' '}
        {publishedAt ? new Date(publishedAt).toLocaleString() : 'Unknown'}
      </p>

      {/* Status */}
      <p className='text-sm text-center text-gray-500'>Status: {status}</p>
      <RichText
        className='max-w-[48rem] mx-auto'
        data={list.content}
        enableGutter={false}
      />
      <div className='mt-4'>
        {list.content ? (
          <div
            className='mx-auto prose'
            dangerouslySetInnerHTML={{ __html: list.content }}
          />
        ) : (
          <p>No content available for this list.</p>
        )}
      </div>
      {categories?.length > 0 && (
        <div className='mt-8'>
          <h2 className='text-xl font-bold'>Categories</h2>
          <ul className='list-disc list-inside'>
            {categories.map((category: any) => (
              <li key={category.id}>{category.name}</li>
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}
