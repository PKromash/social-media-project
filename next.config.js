/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: {
    "Cache-Control": "no-store",
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
