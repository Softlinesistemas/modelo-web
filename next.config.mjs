import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      net: false,
      os: false,
      oracledb: false,
      'pg-query-stream': false,
      fs: false,
      tls: false,
      dns: false,
      child_process: false
    };
    
    config.module = config.module || {};
    config.module.exprContextCritical = false;
    
    return config;
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "gogroups.s3.us-east-005.backblazeb2.com" },
    ],
  },
};

const withPWAConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

export default withPWAConfig(nextConfig);