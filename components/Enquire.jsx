import { enquire } from "@/lib/content";
import EnquiryForm from "@/components/EnquiryForm";

export default function Enquire() {
  return <section id="enquire" className="section">
    <div className="wrap max-w-3xl">
      <p className="extras-eyebrow">How do we begin?</p>
      <h2 className="text-3xl md:text-4xl">{enquire.heading}</h2>
      <p className="mt-3 text-muted">{enquire.sub}</p>
      {enquire.nextSteps && <ol className="enquiry-next-steps">{enquire.nextSteps.map((step, i) => <li key={step.title}><span aria-hidden="true">{i + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol>}
      <EnquiryForm />
    </div>
  </section>;
}
