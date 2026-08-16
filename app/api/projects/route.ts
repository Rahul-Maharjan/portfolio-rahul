import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { projects as fallbackProjects } from "@/lib/portfolio-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json(
      fallbackProjects.map((project, index) => ({ ...project, sortOrder: index })),
    );
  }
}