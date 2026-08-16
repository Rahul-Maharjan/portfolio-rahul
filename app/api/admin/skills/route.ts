import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

const skillSchema = z.object({
  name: z.string().min(1).max(100),
  level: z.number().int().min(0).max(100),
  categoryId: z.string().min(1),
});

export async function POST(request: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
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

    const last = await prisma.skill.findFirst({
      where: { categoryId: parsed.data.categoryId },
      orderBy: { sortOrder: "desc" },
    });
    const skill = await prisma.skill.create({
      data: { ...parsed.data, sortOrder: (last?.sortOrder ?? -1) + 1 },
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error("Failed to create skill:", error);
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 });
  }
}