// collections/ProductFiles.ts

import type { CollectionConfig } from 'payload'

export const ProductFiles: CollectionConfig = {
  slug: 'product-files',
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'updatedAt'],
  },
  upload: {
    staticDir: 'files',
    // mimeTypes: [
    //   'application/zip',
    //   'application/pdf',
    //   'application/octet-stream',
    //   'model/3mf', // 3D Manufacturing Format
    //   'model/stl', // Stereolithography (STL)
    //   'model/obj', // Wavefront OBJ
    // ],
  },
  fields: [
    {
      name: 'filename',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'File Description',
    },
    {
      name: 'linkedProduct',
      type: 'relationship',
      label: 'Linked Product Design',
      relationTo: 'product-design', // This links the ProductFiles to ProductDesigns
      hasMany: false,
    },
  ],
}

export default ProductFiles
