import type { NextConfig } from "next";

// Extract the hostname from the Supabase URL
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseDomain = new URL(supabaseUrl).hostname;

const nextConfig: NextConfig = {
  images: {
    domains: [
      supabaseDomain,
      // Add more domains as needed
    ],
  },
};

export default nextConfig;
