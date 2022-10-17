/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["imagedelivery.net", "videodelivery.net"], //imagedelivery.net은 CloudFlare 이미지 도메인이다.
  },
};

module.exports = nextConfig;
