import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/bot",
        permanent: true, // Set to false if the redirect is temporary
      },
    ];
  },
};

export default nextConfig;
