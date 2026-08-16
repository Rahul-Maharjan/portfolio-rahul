import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { defaultProfile } from "@/lib/portfolio-data";

export const dynamic = "force-dynamic";

const profileSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(254),
  phone: z.string().max(100),
  location: z.string().max(200),
  githubUrl: z.string().max(1000),
  linkedinUrl: z.string().max(1000),
  cvUrl: z.string().max(1000).nullable().optional(),
});

export async function GET() {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const profile = await prisma.siteProfile.findUnique({ where: { id: 1 } });
    return NextResponse.json(profile ?? defaultProfile);
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = profileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid profile data", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const profile = await prisma.siteProfile.upsert({
      where: { id: 1 },
      create: { id: 1, ...parsed.data, cvUrl: parsed.data.cvUrl ?? null },
      update: { ...parsed.data, cvUrl: parsed.data.cvUrl ?? null },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Failed to update profile:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}