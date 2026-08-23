/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@quickbasket/types',
    '@quickbasket/utils',
    '@quickbasket/validation',
    '@quickbasket/config',
    '@quickbasket/mocks',
    '@quickbasket/api-client',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
