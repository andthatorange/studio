// Run after Next has compiled the route: node scripts/check-enquiry.cjs
const assert = require("node:assert/strict");
const { POST } = require("../.next/server/app/api/enquire/route.js").routeModule.userland;
const request = (body, origin = "https://studio.example") => new Request("https://studio.example/api/enquire", {
  method: "POST", headers: { origin, "Content-Type": "application/json" }, body: JSON.stringify(body),
});

(async () => {
  for (const name of ["RESEND_API_KEY", "STUDIO_EMAIL", "FROM_EMAIL", "TURNSTILE_SECRET_KEY", "MONGODB_URI"]) delete process.env[name];
  assert.equal((await POST(request({}))).status, 400);
  assert.equal((await POST(request({ name: "A", email: "invalid" }))).status, 400);
  const valid = { name: "Alex <test>", email: "alex@example.com", details: "Hello <script>" };
  assert.equal((await POST(request(valid, "https://other.example"))).status, 403);
  assert.equal((await POST(request({ ...valid, company_url: "bot" }))).status, 200);
  assert.equal((await POST(request(valid))).status, 503);
  process.env.RESEND_API_KEY = "test-only";
  process.env.STUDIO_EMAIL = "studio@example.com";
  process.env.FROM_EMAIL = "Studio <hello@example.com>";
  const sent = [];
  global.fetch = async (url, options) => {
    assert.equal(url, "https://api.resend.com/emails");
    sent.push(JSON.parse(options.body));
    return Response.json({ id: "mock" });
  };
  assert.equal((await POST(request(valid))).status, 200);
  assert.equal(sent.length, 2);
  assert.equal(sent[0].to, "studio@example.com");
  assert.equal(sent[0].reply_to, valid.email);
  assert.ok(sent[0].html.includes("&lt;script&gt;"));
  assert.equal(sent[1].to, valid.email);
  global.fetch = async () => Response.json({ error: "mock" }, { status: 500 });
  assert.equal((await POST(request(valid))).status, 502);
  process.env.TURNSTILE_SECRET_KEY = "test-only";
  global.fetch = async () => Response.json({ success: false });
  assert.equal((await POST(request(valid))).status, 400);
  console.log("Enquiry checks passed: validation, origin, honeypot, configuration, email delivery, escaping, provider failure, spam rejection.");
})().catch((error) => { console.error(error); process.exitCode = 1; });
