/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ibb.co", port: "", pathname: "/**/**" },
    ],
  },
  reactStrictMode: true,
  trailingSlash: true,
};

module.exports = nextConfig;
