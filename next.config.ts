import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["nodemailer"],
  outputFileTracingIncludes: {
    "/*": ["./lib/generated/prisma/**/*"],
  },
  allowedDevOrigins: ['*','192.168.1.65'],
};

export default nextConfig;
