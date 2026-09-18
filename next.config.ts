import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/f8ttkftm/image/upload/**",
      },
    ],
  },
};

export default nextConfig;