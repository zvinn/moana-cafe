/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["192.168.8.167", "192.168.100.44"],
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/media/:path*",
          destination: `https://pub-c97c93ec20e446cb8a9390261b5ff4d1.r2.dev/:path*`,
        },
      ],
    };
  },
};

module.exports = nextConfig;
