/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: "/:category([a-z_-]+\\.txt)",
        destination: "/api/:category",
      },
    ];
  },
};

module.exports = nextConfig;
