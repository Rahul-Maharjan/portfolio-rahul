import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { experiences as fallbackExperiences } from "@/lib/portfolio-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(experiences);
  } catch (error) {
    console.error("Failed to fetch experiences:", error);
    return NextResponse.json(
      fallbackExperiences.map((experience, index) => ({
        ...experience,
        sortOrder: index,
      })),
    );
  }
}