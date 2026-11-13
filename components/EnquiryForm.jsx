"use client";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { packages, formOptions, enquire } from "@/lib/content";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Defined outside the form so inputs keep their values when errors appear
function Field({ name, label, error, children }) {
  return (
    <div>
      <label htmlFor={name} className="label">{label}</label>
      {children}
      {error && <p className="mt-1 text-sm text-red-700">{error}</p>}
    </div>
  );
}

function Select({ name, options, value, onChange }) {
  const props = value === undefined ? { defaultValue: "" } : { value, onChange };
  return (
    <select id={name} name={name} className="field" {...props}>
      <option value="" disabled>Choose one</option>
      {options.map((o) => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
    </select>
  );
}

export default function EnquiryForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [pkg, setPkg] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("package");
    if (p) setPkg(p);
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("sending"); setErrors({}); setMessage("");
    const data = Object.fromEntries(new FormData(formRef.current));
    data.packageName = packages.find((p) => p.id === data.package)?.name || "";
    try {
      const res = await fetch(`${API_URL}/api/enquire`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok) { setStatus("sent"); formRef.current.reset(); return; }
      setErrors(json.errors || {});
      setMessage(json.message || "Something went wrong. Please try again or email me directly.");
      setStatus("error");
      window.turnstile?.reset();
    } catch {
      setMessage("Could not reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="border border-line p-8">
        <h3 className="text-2xl">{enquire.successHeading}</h3>
        <p className="mt-2 text-muted">{enquire.afterSubmit}</p>
      </div>
    );
  }

  return (
    <>
      {SITE_KEY && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />}
      <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5 md:grid-cols-2">
        <Field name="name" error={errors.name} label="Your name"><input id="name" name="name" className="field" autoComplete="name" required /></Field>
        <Field name="email" error={errors.email} label="Email"><input id="email" name="email" type="email" className="field" autoComplete="email" required /></Field>
        <Field name="business" error={errors.business} label="Business or brand name"><input id="business" name="business" className="field" /></Field>
        <Field name="website" error={errors.website} label="Current website or Instagram (optional)"><input id="website" name="website" className="field" /></Field>
        <Field name="need" error={errors.need} label="What do you need?"><Select name="need" options={formOptions.need} /></Field>
        <Field name="package" error={errors.package} label="Package you're interested in">
          <Select name="package" value={pkg} onChange={(e) => setPkg(e.target.value)}
            options={[...packages.map((p) => ({ value: p.id, label: p.name })), { value: "unsure", label: "Not sure yet" }]} />
        </Field>
        <Field name="timeline" error={errors.timeline} label="When do you want to launch?"><Select name="timeline" options={formOptions.timeline} /></Field>
        <Field name="budget" error={errors.budget} label="Budget range"><Select name="budget" options={formOptions.budget} /></Field>
        <div className="md:col-span-2">
          <Field name="vibe" error={errors.vibe} label="How should your brand feel? Link a Pinterest board if you have one.">
            <textarea id="vibe" name="vibe" rows={3} className="field" />
          </Field>
        </div>
        <div className="md:col-span-2">
          <Field name="details" error={errors.details} label="Anything else I should know?"><textarea id="details" name="details" rows={4} className="field" /></Field>
        </div>

        {/* Honeypot: hidden from people, bots fill it in */}
        <div aria-hidden="true" className="absolute left-[-9999px]">
          <label>Leave this empty<input name="company_url" tabIndex={-1} autoComplete="off" /></label>
        </div>

        {SITE_KEY && <div className="cf-turnstile md:col-span-2" data-sitekey={SITE_KEY} />}

        <div className="md:col-span-2">
          <button type="submit" className="btn" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send enquiry"}
          </button>
          {message && <p role="alert" className="mt-3 text-red-700">{message}</p>}
        </div>
      </form>
    </>
  );
}
