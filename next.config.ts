import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Fijamos el root del workspace para que Turbopack no lo infiera mal.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
