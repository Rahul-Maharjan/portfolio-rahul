import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

const categorySchema = z.object({
  title: z.string().min(1).max(100),
  icon: z.string().min(1).max(20),
});

export async function POST(request: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = categorySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid category data", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const last = await prisma.skillCategory.findFirst({
      orderBy: { sortOrder: "desc" },
    });
    const category = await prisma.skillCategory.create({
      data: { ...parsed.data, sortOrder: (last?.sortOrder ?? -1) + 1 },
      include: { skills: true },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Failed to create skill category:", error);
    return NextResponse.json(
      { error: "Failed to create skill category" },
      { status: 500 },
    );
  }
}