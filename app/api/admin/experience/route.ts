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
});

export async function POST(request: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = experienceSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid experience data", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const last = await prisma.experience.findFirst({
      orderBy: { sortOrder: "desc" },
    });
    const experience = await prisma.experience.create({
      data: { ...parsed.data, sortOrder: (last?.sortOrder ?? -1) + 1 },
    });

    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    console.error("Failed to create experience:", error);
    return NextResponse.json(
      { error: "Failed to create experience" },
      { status: 500 },
    );
  }
}