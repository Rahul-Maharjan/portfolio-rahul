import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["nodemailer"],
  outputFileTracingIncludes: {
    "/*": ["./lib/generated/prisma/**/*"],
  },
};

export default nextConfig;
