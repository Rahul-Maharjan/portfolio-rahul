import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

const experienceSchema = z.object({
  title: z.string().min(1).max(200),
  company: z.string().min(1).max(200),
  period: z.string().min(1).max(100),
  description: z.string().min(1).max(5000),
  technologies: z.array(z.string().min(1).max(100)).max(50),
  achievements: z.array(z.string().min(1).max(1000)).max(50),
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
    const parsed = experienceSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid experience data", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const experience = await prisma.experience.update({
      where: { id },
      data: parsed.data,
    });

    return NextResponse.json(experience);
  } catch (error) {
    console.error("Failed to update experience:", error);
    return NextResponse.json(
      { error: "Failed to update experience" },
      { status: 500 },
    );
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
    await prisma.experience.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete experience:", error);
    return NextResponse.json(
      { error: "Failed to delete experience" },
      { status: 500 },
    );
  }
}