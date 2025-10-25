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
      {
                // This pattern allows images from your specific Supabase project URL
                protocol: 'https',
                hostname: 'syinjziavwuilkopmlha.supabase.co',
                port: '', // Leave empty
                pathname: '/storage/v1/object/public/**', // Allow any path within the public storage bucket
            },
    ],
    
  },
  
};

module.exports = nextConfig;