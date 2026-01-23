import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '10.10.20.77',
        port: '8057',
        pathname: '/assets/**',
      },
    ],
  },
};

export default nextConfig;
