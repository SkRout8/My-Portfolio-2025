/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [], // Add any image domains you need here
  },
  typescript:{
    ignoreBuildErrors:true,
  }
}

module.exports = nextConfig 
