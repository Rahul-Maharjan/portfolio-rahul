import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

const skillSchema = z.object({
  name: z.string().min(1).max(100),
  level: z.number().int().min(0).max(100),
  categoryId: z.string().min(1),
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
    const parsed = skillSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid skill data", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const category = await prisma.skillCategory.findUnique({
      where: { id: parsed.data.categoryId },
    });
    if (!category) {
      return NextResponse.json(
        { error: "Skill category not found" },
        { status: 404 },
      );
    }

    const skill = await prisma.skill.update({
      where: { id },
      data: parsed.data,
    });

    return NextResponse.json(skill);
  } catch (error) {
    console.error("Failed to update skill:", error);
    return NextResponse.json({ error: "Failed to update skill" }, { status: 500 });
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
    await prisma.skill.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete skill:", error);
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 });
  }
}