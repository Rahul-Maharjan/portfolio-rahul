import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

const projectSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  image: z.string().max(1000).nullable().optional(),
  technologies: z.array(z.string().min(1).max(100)).max(50),
  github: z.string().max(1000).nullable().optional(),
  demo: z.string().max(1000).nullable().optional(),
  category: z.enum(["development", "design"]),
  featured: z.boolean().optional(),
});

export async function POST(request: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = projectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid project data", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const last = await prisma.project.findFirst({
      orderBy: { sortOrder: "desc" },
    });
    const project = await prisma.project.create({
      data: {
        ...parsed.data,
        image: parsed.data.image ?? null,
        github: parsed.data.github ?? null,
        demo: parsed.data.demo ?? null,
        featured: parsed.data.featured ?? false,
        sortOrder: (last?.sortOrder ?? -1) + 1,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Failed to create project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}