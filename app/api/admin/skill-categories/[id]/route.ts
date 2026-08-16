import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

const categorySchema = z.object({
  title: z.string().min(1).max(100),
  icon: z.string().min(1).max(20),
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
    const parsed = categorySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid category data", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const category = await prisma.skillCategory.update({
      where: { id },
      data: parsed.data,
      include: { skills: true },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("Failed to update skill category:", error);
    return NextResponse.json(
      { error: "Failed to update skill category" },
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
    await prisma.skillCategory.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete skill category:", error);
    return NextResponse.json(
      { error: "Failed to delete skill category" },
      { status: 500 },
    );
  }
}