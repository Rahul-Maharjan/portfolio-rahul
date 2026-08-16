import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

const techSchema = z.object({
  name: z.string().min(1).max(100),
});

export async function POST(request: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = techSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid technology data", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const last = await prisma.otherTechnology.findFirst({
      orderBy: { sortOrder: "desc" },
    });
    const tech = await prisma.otherTechnology.create({
      data: { name: parsed.data.name, sortOrder: (last?.sortOrder ?? -1) + 1 },
    });

    return NextResponse.json(tech, { status: 201 });
  } catch (error) {
    console.error("Failed to create technology:", error);
    return NextResponse.json(
      { error: "Failed to create technology" },
      { status: 500 },
    );
  }
}