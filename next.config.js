const { withPayload } = require('@payloadcms/next/withPayload')
/** @type {import('next').NextConfig} */

const nextConfig = {
  staticPageGenerationTimeout: 300,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
}

module.exports = withPayload(nextConfig)
