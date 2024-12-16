import type { CollectionConfig } from 'payload'

export const ThreeDFiles: CollectionConfig = {
  slug: '3d-files',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
