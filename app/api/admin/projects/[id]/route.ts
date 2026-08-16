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
  sortOrder: z.number().int().optional(),
});

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = projectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid project data", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...parsed.data,
        image: parsed.data.image ?? null,
        github: parsed.data.github ?? null,
        demo: parsed.data.demo ?? null,
        featured: parsed.data.featured ?? false,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Failed to update project:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete project:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}