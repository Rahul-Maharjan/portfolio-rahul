import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  sendAutoReply,
  sendOwnerNotification,
} from "@/lib/mail";

export const dynamic = "force-dynamic";

const contactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(254),
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(5000),
});

export async function GET() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Failed to fetch contact messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact messages" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid contact form data", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const message = await prisma.contactMessage.create({
      data: parsed.data,
    });

    const mailConfigured = !!(
      process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD
    );

    if (mailConfigured) {
      try {
        await Promise.all([
          sendAutoReply(parsed.data),
          sendOwnerNotification(parsed.data),
        ]);
      } catch (mailError) {
        console.error("Failed to send notification emails:", mailError);
      }
    }

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error("Failed to save contact message:", error);
    return NextResponse.json(
      { error: "Failed to save contact message" },
      { status: 500 },
    );
  }
}