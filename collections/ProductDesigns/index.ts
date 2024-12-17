import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'

import {
  FixedToolbarFeature,
  HeadingFeature,
  LinkFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
// import { checkbox } from '@nextui-org/theme'

export const ProductDesigns: CollectionConfig = {
  slug: 'product-design',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'updatedAt'],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    maxPerDoc: 50,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      // admin: {
      //   position: 'sidebar',
      // },
      tabs: [
        {
          label: 'Content',
          fields: [
            // required
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'mainImage',
              label: 'Main Image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              type: 'richText',
              name: 'details',
              label: 'Details',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({
                      enabledHeadingSizes: ['h2', 'h3', 'h4'],
                    }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                    LinkFeature(),
                  ]
                },
              }),
            },
          ],
        },

        {
          label: 'Extra Content',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  type: 'checkbox',
                  name: 'enableExtraImages',
                  label: 'Enable Extra Images',
                  defaultValue: false,
                },
                {
                  type: 'checkbox',
                  name: 'enableWrittenContent',
                  label: 'Enable Extra Written Content',
                  defaultValue: false,
                },
              ],
            },

            {
              type: 'upload',
              relationTo: 'media',
              name: 'extraImages',
              hasMany: true,
              filterOptions: {
                mimeType: { contains: 'image' },
              },
              admin: {
                condition: (data, siblingData) =>
                  Boolean(siblingData?.enableExtraImages),
              },
            },
            {
              type: 'richText',
              name: 'extraRichTextContent',
              label: 'Extra Written Content',
              admin: {
                condition: (data, siblingData) =>
                  Boolean(siblingData?.enableWrittenContent),
              },
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({
                      enabledHeadingSizes: ['h2', 'h3', 'h4'],
                    }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                    LinkFeature(),
                  ]
                },
              }),
            },
          ],
        },
      ],
    },

    {
      type: 'collapsible',
      label: 'Links & Such',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          type: 'checkbox',
          name: 'enableMakerworld',
          label: 'Enable Makerworld',
          defaultValue: false,
        },
        {
          type: 'checkbox',
          name: 'enableDownload',
          label: 'Enable Download',
          defaultValue: false,
        },
        {
          type: 'checkbox',
          name: 'enablePurchase',
          label: 'Enable Buy',
          defaultValue: false,
        },
        {
          name: 'makerworldLink',
          type: 'text',
          label: 'Makerworld Link',
          admin: {
            placeholder: 'enter a link to the Makerworld project',
            condition: (data, siblingData) =>
              Boolean(siblingData?.enableMakerworld),
          },
        },

        {
          name: 'downloadLink',
          type: 'relationship',
          label: 'Download File',
          relationTo: 'product-files', // Link to ProductFiles
          admin: {
            condition: (data, siblingData) =>
              Boolean(siblingData?.enableDownload), // Only show if downloads are enabled
          },
        },
        {
          name: 'purchaseLink',
          type: 'text',
          label: 'Purchase Link',
          admin: {
            placeholder: 'enter a link to Etsy',
            condition: (data, siblingData) => Boolean(siblingData?.enableBuy),
          },
        },
      ],
    },

    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
    },

    {
      name: 'status',
      label: 'Status',
      type: 'select',
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' },
      ],
      required: true,
    },
    ...slugField(),
  ],
  // upload: true,
}

export default ProductDesigns
