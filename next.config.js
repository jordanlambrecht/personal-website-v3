/** @type {import('next').NextConfig} */

const nextConfig = {
  staticPageGenerationTimeout: 300,
  images: {
    domains: ['unsplash.it', 'jordanlambrecht.com'], // Add Unsplash's domain here
  },
}

module.exports = nextConfig
