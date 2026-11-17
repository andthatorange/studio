import SectionLink from "@/components/SectionLink";
﻿import { process as steps } from "@/lib/content";

export default function Process() {
  return <section id="process" className="section">
    <div className="wrap">
      <h2 className="text-3xl md:text-4xl">How we work together</h2>
      <ol className="mt-10 grid gap-8 md:grid-cols-4">
        {steps.map((step, i) => <li key={step.title}>
          <span className="text-sm text-muted">Step {i + 1}</span>
          <h3 className="mt-1 text-xl">{step.title}</h3>
          <p className="mt-2 text-muted">{step.text}</p>
          {step.time && <p className="mt-3 text-sm text-muted">{step.time}</p>}
        </li>)}
      </ol>
    </div>
  <SectionLink href="/enquire" label="Tell me about your project" />
    </section>;
}
