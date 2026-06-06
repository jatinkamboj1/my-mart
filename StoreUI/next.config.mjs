/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: '34.13.37.33'
          },
          {
            protocol: 'https',
            hostname: '34.13.37.33'
          },
          {
            protocol: 'http',
            hostname: 'test.akhbaarwaala.com'
          },
          {
            protocol: 'https',
            hostname: 'test.akhbaarwaala.com'
          },
            {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080', 
      },
        ],
      },
      env: {
        SERVER_URL: process.env.SERVER_URL,
        UPLOAD_URL: process.env.UPLOAD_URL,
        PLACEHOLDER_IMAGE: process.env.PLACEHOLDER_IMAGE,
        STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      },
      compress: true,
};

export default nextConfig;
