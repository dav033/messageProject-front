/** @type {import('next').NextConfig} */
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['men.nyc3.digitaloceanspaces.com']
  },
  webpack: (config) => {
    if (!config.resolve.plugins) {
      config.resolve.plugins = []
    }
    config.resolve.plugins.push(new TsconfigPathsPlugin())

    return config
  }
}

module.exports = nextConfig
