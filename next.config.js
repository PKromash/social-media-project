/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  webpack(config, {isServer}) {
    if (!isServer) {
      // Exclude mongoose from the client-side bundle
      config.externals.push("mongoose");
    }
    return config;
  },
};

module.exports = nextConfig;
