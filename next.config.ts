import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Add this to handle OpenSSL compatibility issues
    serverComponentsExternalPackages: ['googleapis'],
  },
  // Add webpack configuration to handle Node.js modules
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('googleapis');
    }
    return config;
  },
};

export default nextConfig;
