import SectionLink from "@/components/SectionLink";
﻿import { faq } from "@/lib/content";

export default function FAQ() {
  return <section id="faq" className="section bg-surface">
    <div className="wrap max-w-3xl">
      <h2 className="text-3xl md:text-4xl">Questions</h2>
      <div className="mt-8 divide-y divide-line border-y border-line">
        {faq.map((item) => <details key={item.q} className="py-4">
          <summary className="cursor-pointer text-lg">{item.q}</summary>
          <p className="mt-2 text-muted">{item.a}</p>
        </details>)}
      </div>
    </div>
  <SectionLink href="/enquire" label="Still have a question? Tell me about your project" />
    </section>;
}
