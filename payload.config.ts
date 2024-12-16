// import { Categories } from './collections/Categories'
// storage-adapter-import-placeholder
// import { postgresAdapter } from '@payloadcms/db-postgres'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { Users } from './collections/Users'
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { ProductDesigns } from './collections/ProductDesigns'

import { ThreeDFiles } from './collections/ThreeDFiles'
import { Lists } from './collections/Lists'
import { Pages } from './collections/Pages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    ProductDesigns,
    ThreeDFiles,
    Lists,
    Categories,
    Pages,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    // Mongoose-specific arguments go here.
    // URL is required.
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    seoPlugin({
      collections: ['lists'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `Jordan Lambrecht — ${doc.title}`,
      generateDescription: ({ doc }) => doc.excerpt,
    }),
    redirectsPlugin({
      collections: ['pages'],
    }),
    // storage-adapter-placeholder
  ],
})