import Link from "next/link";

export default function BookingPrompt({ title = "Could we make something like this for you?", text = "Tell me about your idea, even if it is still taking shape." }) {
  return <aside className="booking-prompt" aria-label="Start your project">
    <div><h2>{title}</h2><p>{text}</p></div>
    <Link href="/enquire" className="journey-primary-link">Tell me about your project <span aria-hidden="true">↗</span></Link>
  </aside>;
}
