import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
  // output: 'export',
};

export default nextConfig;
