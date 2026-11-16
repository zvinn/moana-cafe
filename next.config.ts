/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-c97c93ec20e446cb8a9390261b5ff4d1.r2.dev",
        pathname: "/**",
      },
    ],
  },
  allowedDevOrigins: ["192.168.8.167", "192.168.100.44"],
  async redirects() {
    return [
      {
        source: "/media/files/Moana_Menu.pdf",
        destination: "/files/moana-menu-2026.pdf",
        permanent: false,
      },
    ];
  },
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
