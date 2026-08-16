import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

const techSchema = z.object({
  name: z.string().min(1).max(100),
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
    const parsed = techSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid technology data", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const tech = await prisma.otherTechnology.update({
      where: { id },
      data: parsed.data,
    });

    return NextResponse.json(tech);
  } catch (error) {
    console.error("Failed to update technology:", error);
    return NextResponse.json(
      { error: "Failed to update technology" },
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
    await prisma.otherTechnology.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete technology:", error);
    return NextResponse.json(
      { error: "Failed to delete technology" },
      { status: 500 },
    );
  }
}