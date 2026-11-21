import "server-only";
import { siteConfig } from "@/lib/config";

/**
 * Optional email notification for new enquiries, sent through Resend's HTTP
 * API (no extra dependency). Enabled only when all three variables are set:
 *   RESEND_API_KEY, NOTIFY_EMAIL_TO, NOTIFY_EMAIL_FROM
 * Notification is best-effort: a failure never fails the customer's submission.
 */

export function isNotifyConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY &&
      process.env.NOTIFY_EMAIL_TO &&
      process.env.NOTIFY_EMAIL_FROM,
  );
}

export async function sendNotification(opts: {
  subject: string;
  lines: string[];
  replyTo?: string;
}): Promise<boolean> {
  if (!isNotifyConfigured()) return false;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${siteConfig.name} <${process.env.NOTIFY_EMAIL_FROM}>`,
        to: (process.env.NOTIFY_EMAIL_TO as string)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        subject: opts.subject,
        // Plain text only, so customer-supplied content can never inject markup.
        text: opts.lines.join("\n"),
        ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
