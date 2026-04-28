import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xfkinawxoqjymudexuoa.supabase.co",
        pathname: "/storage/v1/object/public/myshillong-media/**",
      },
    ],
  },
};

export default nextConfig;