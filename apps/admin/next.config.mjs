/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  transpilePackages: [
    '@quickbasket/types',
    '@quickbasket/utils',
    '@quickbasket/validation',
    '@quickbasket/config',
    '@quickbasket/mocks',
    '@quickbasket/api-client',
  ],
};

export default nextConfig;
