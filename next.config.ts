/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep any other configs here, for example:
  // reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/desem7vhd/image/upload/**',
      },
    ],
  },
};

module.exports = nextConfig;