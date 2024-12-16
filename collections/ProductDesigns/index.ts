import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import type { Field } from 'payload'
import { checkbox } from '@nextui-org/theme'

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
      type: 'group',
      name: 'links',
      label: 'Links',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          type: 'group',
          name: 'enableLinks',
          label: 'Enable',
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
              name: 'enableBuy',
              label: 'Enable Buy',
              type: 'checkbox',
              defaultValue: false,
            },

            {
              name: 'makeworldLink',
              type: 'text',
              label: 'Makerworld Link',
              admin: {
                placeholder: 'Paste the MakerWorld URL here',
                condition: (data, siblingData, { user }) => {
                  if (data.enableMakerworld) {
                    return true
                  } else {
                    return false
                  }
                },
              },
            },
            {
              name: 'purchaseLink',
              type: 'text',
              label: 'Purchase Link',
              admin: {
                placeholder: 'Paste the Etsy URL here',
                condition: (data, siblingData, { user }) => {
                  if (data.enableBuy) {
                    return true
                  } else {
                    return false
                  }
                },
              },
            },
            {
              name: 'downloadLink',
              type: 'text',
              label: 'Download Link',
              admin: {
                placeholder: 'Paste the Download URL here',
                condition: (data, siblingData, { user }) => {
                  if (data.enableDownload) {
                    return true
                  } else {
                    return false
                  }
                },
              },
            },
          ],
        },
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'mainImage',
      label: 'Main Image',
      type: 'upload',
      relationTo: 'media', // Adjust based on your media collection slug
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
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
  upload: true,
}

export default ProductDesigns
