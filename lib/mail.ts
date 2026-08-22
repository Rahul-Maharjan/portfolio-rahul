import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

let cachedTransporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (cachedTransporter) return cachedTransporter;

  cachedTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  return cachedTransporter;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export interface ContactMailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendAutoReply(data: ContactMailData): Promise<void> {
  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"${process.env.MAIL_FROM_NAME ?? "Portfolio"}" <${process.env.GMAIL_USER}>`,
    to: data.email,
    replyTo: process.env.GMAIL_USER,
    subject: `Thanks for reaching out — I'll get back to you soon`,
    text: `Hi ${data.name},

Thank you for contacting me. I have received your message and will get back to you as soon as possible.

Here's a copy of what you sent:

Subject: ${data.subject}
Message:
${data.message}

Best regards,
${process.env.MAIL_FROM_NAME ?? "Rahul"}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #111;">
        <p>Hi ${escapeHtml(data.name)},</p>
        <p>Thank you for contacting me. I have received your message and will get back to you as soon as possible.</p>
        <p>Here's a copy of what you sent:</p>
        <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="border-left: 3px solid #ccc; padding-left: 12px; color: #444;">
          ${escapeHtml(data.message).replace(/\n/g, "<br/>")}
        </blockquote>
        <p>Best regards,<br/>${escapeHtml(process.env.MAIL_FROM_NAME ?? "Rahul")}</p>
      </div>
    `,
  });
}

export async function sendOwnerNotification(data: ContactMailData): Promise<void> {
  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    replyTo: data.email,
    subject: `New contact message from ${data.name}`,
    text: `You received a new message from your portfolio contact form.

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #111;">
        <h2 style="margin-bottom: 8px;">New contact message</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
        <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="border-left: 3px solid #ccc; padding-left: 12px; color: #444;">
          ${escapeHtml(data.message).replace(/\n/g, "<br/>")}
        </blockquote>
      </div>
    `,
  });
}
