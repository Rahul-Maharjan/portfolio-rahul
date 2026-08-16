import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

const reorderSchema = z.object({
  ids: z.array(z.string().min(1)).min(1),
});

export async function PUT(request: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = reorderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    await prisma.$transaction(
      parsed.data.ids.map((id, index) =>
        prisma.experience.update({
          where: { id },
          data: { sortOrder: index },
        }),
      ),
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to reorder experiences:", error);
    return NextResponse.json(
      { error: "Failed to reorder experiences" },
      { status: 500 },
    );
  }
}