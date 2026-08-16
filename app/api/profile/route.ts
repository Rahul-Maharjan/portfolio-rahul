import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { defaultProfile } from "@/lib/portfolio-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const profile = await prisma.siteProfile.findUnique({ where: { id: 1 } });
    return NextResponse.json(profile ?? defaultProfile);
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return NextResponse.json(defaultProfile);
  }
}