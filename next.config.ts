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
  // Section URLs are anchors on the /en and /ar homepages, not pages.
  // Google indexed /location, /menu, ... (and /en/location, ...) — redirect
  // them to the homepage anchor so they land on the right section.
  async redirects() {
    const sections = [
      "home",
      "why-us",
      "menu",
      "gallery",
      "reviews",
      "location",
      "contact",
    ];
    const rules: { source: string; destination: string; permanent: boolean }[] =
      [];
    for (const section of sections) {
      rules.push(
        { source: `/${section}`, destination: `/en#${section}`, permanent: true },
        { source: `/en/${section}`, destination: `/en#${section}`, permanent: true },
        { source: `/ar/${section}`, destination: `/ar#${section}`, permanent: true },
      );
    }
    return rules;
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
