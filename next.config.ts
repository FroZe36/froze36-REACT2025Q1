import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  distDir: './dist',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/starships/1',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
