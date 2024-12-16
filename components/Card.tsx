'use client'
import { cn } from '@/utilities/cn'
import useClickableCard from '@utilities/useClickableCard'
import Link from 'next/link'
import { Fragment } from 'react'

import type { List } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardListData = Pick<List, 'slug' | 'categories' | 'meta' | 'title'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardListData
  relationTo?: 'lists'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const {
    className,
    doc,
    relationTo,
    showCategories,
    title: titleFromProps,
  } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories =
    categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
        className
      )}
      ref={card.ref}
    >
      <div className='relative w-full '>
        {!metaImage && <div className=''>No image</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media resource={metaImage} size='33vw' />
        )}
      </div>
      <div className='p-4'>
        {showCategories && hasCategories && (
          <div className='mb-4 text-sm uppercase'>
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle =
                      titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className='prose'>
            <h3>
              <Link className='not-prose' href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && (
          <div className='mt-2'>
            {description && <p>{sanitizedDescription}</p>}
          </div>
        )}
      </div>
    </article>
  )
}