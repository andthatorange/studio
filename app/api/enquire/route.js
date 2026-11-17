import { packages } from "@/lib/content";
import { MongoClient } from "mongodb";

export const runtime = "nodejs";
export const maxDuration = 60;

let dbClient;
const limits = { name: 100, email: 200, business: 150, website: 300, need: 100, package: 60, timeline: 100, budget: 100, vibe: 2000, details: 3000, company_url: 200, "cf-turnstile-response": 2000 };
const reply = (body, status = 200) => Response.json(body, { status });
const escapeHtml = (value) => value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

async function sendEmail(body) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error(`Email provider returned ${response.status}`);
}

export async function POST(request) {
  // Browser submissions must come from this website.
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return reply({ message: "Submission origin is not allowed." }, 403);

  let input;
  try {
    const body = await request.text();
    if (Buffer.byteLength(body) > 20000) return reply({ message: "Your enquiry is too long." }, 413);
    input = JSON.parse(body);
    if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("Invalid body");
  } catch {
    return reply({ message: "Please send a valid enquiry." }, 400);
  }

  const fields = {};
  const errors = {};
  for (const [key, limit] of Object.entries(limits)) {
    if (input[key] != null && typeof input[key] !== "string") errors[key] = "Please enter text.";
    fields[key] = typeof input[key] === "string" ? input[key].trim() : "";
    if (fields[key].length > limit) errors[key] = `Please use ${limit} characters or fewer.`;
  }
  if (!fields.name) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = "Please enter a valid email.";
  if (Object.keys(errors).length) return reply({ errors }, 400);
  if (fields.company_url) return reply({ ok: true });

  if (!process.env.RESEND_API_KEY || !process.env.STUDIO_EMAIL || !process.env.FROM_EMAIL) {
    console.error("Enquiry email configuration is missing.");
    return reply({ message: "Enquiries are not set up yet. Please email me directly." }, 503);
  }

  try {
    if (process.env.TURNSTILE_SECRET_KEY) {
      const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        body: new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY, response: fields["cf-turnstile-response"] }),
        signal: AbortSignal.timeout(10000),
      });
      if (!verification.ok || !(await verification.json()).success) {
        return reply({ message: "Spam check failed. Please refresh and try again." }, 400);
      }
    }

    const { company_url, "cf-turnstile-response": token, ...data } = fields;
    data.packageName = packages.find((p) => p.id === data.package)?.name || data.package || "Not specified";
    if (process.env.MONGODB_URI) {
      try {
        dbClient ??= new MongoClient(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
        await dbClient.db().collection("enquiries").insertOne({ ...data, createdAt: new Date() });
      } catch (error) {
        console.error("Enquiry database save failed:", error.name);
      }
    }

    const rows = [["Name", data.name], ["Email", data.email], ["Business", data.business], ["Current site", data.website], ["Need", data.need], ["Package", data.packageName], ["Timeline", data.timeline], ["Budget", data.budget], ["Brand feel", data.vibe], ["Details", data.details]];
    await sendEmail({
      from: process.env.FROM_EMAIL, to: process.env.STUDIO_EMAIL, reply_to: data.email,
      subject: `New enquiry: ${data.name}${data.business ? ` (${data.business})` : ""}`,
      html: rows.filter(([, value]) => value).map(([label, value]) => `<p><strong>${label}:</strong><br>${escapeHtml(value).replace(/\n/g, "<br>")}</p>`).join(""),
    });

    // Await delivery before the function ends; a failed auto-reply must not reject a received enquiry.
    try {
      await sendEmail({
        from: process.env.FROM_EMAIL, to: data.email, reply_to: process.env.STUDIO_EMAIL,
        subject: "Thanks for your enquiry",
        html: `<p>Hi ${escapeHtml(data.name.split(" ")[0])},</p><p>Thank you for telling me about your project. I read every enquiry myself and will reply within 2 working days.</p><p>WebsitesbyKhaula Studio</p>`,
      });
    } catch (error) { console.error("Enquiry auto-reply failed:", error.message); }
    return reply({ ok: true });
  } catch (error) {
    console.error("Enquiry delivery failed:", error.message);
    return reply({ message: "Could not send your enquiry. Please try again or email me directly." }, 502);
  }
}
