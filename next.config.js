const nextConfig = {
  productionBrowserSourceMaps: false,
  generateBuildFiles: false,
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["mongoose"],
  },

  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  async headers() {
    return [
      {
        source: "/(.*)", // Match all routes
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
