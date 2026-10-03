/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    return [
      {
        source: '/api/express/:path*',
        destination: 'http://localhost:5001/api/:path*',
      },
    ];
  },
};

export default nextConfig;
