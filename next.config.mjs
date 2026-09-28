/** This file ensures that any request hitting /api/ gets redirected directly to your Python backend code.*/

/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'development'
          ? 'http://127.0.0*'
          : '/api/:path*',
      },
    ];
  },
};

export default nextConfig;
