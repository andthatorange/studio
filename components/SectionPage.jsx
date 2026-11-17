import Link from "next/link";
import BookingPrompt from "@/components/BookingPrompt";

export const sectionPages = [
  { href: "/work", label: "See the work" },
  { href: "/packages", label: "Services & pricing" },
  { href: "/process", label: "How it works" },
  { href: "/about", label: "Meet Khaula" },
  { href: "/reviews", label: "Client experiences" },
  { href: "/faq", label: "Your questions" },
  { href: "/instagram", label: "Studio journal" },
];
const purpose = {
  "/packages": {
    question: "What can you help me with, and what will it cost?",
    title: "Not sure which starting point fits?",
    text: "Tell me about your business and what you need. We can work out the scope together.",
  },
  "/process": {
    question: "What happens when we work together?",
    title: "Ready for the first little hello?",
    text: "You do not need a complete brief. We can begin with your idea and a conversation.",
  },
  "/about": {
    question: "Who will I be working with?",
    title: "Does this feel like your kind of studio?",
    text: "Tell me a little about yourself and the website you have in mind.",
  },
  "/reviews": {
    question: "What is it like to work with Khaula?",
    title: "Let's find out if we are a good fit.",
    text: "Share your idea and we will talk through the next step together.",
  },
  "/faq": {
    question: "What do I need to know before I enquire?",
    title: "Still wondering about something?",
    text: "Add your question to your enquiry. I will read it myself and get back to you.",
  },
  "/instagram": {
    question: "What is happening in the studio?",
    title: "Something here sparked an idea?",
    text: "Bring your inspiration and tell me what you would love to make.",
  },
  "/before-after": {
    question: "What could a website change for my business?",
    title: "What would a little clarity look like for you?",
    text: "We can talk about where you are now and what your website needs to do.",
  },
  "/enquire": { question: "How do we begin?" },
};
export default function SectionPage({ title, intro, current, children }) {
  const page = purpose[current];
  return (
    <div className="section-page">
      <div className="section-page-content">{children}</div>
      {current !== "/enquire" && (
        <div className="wrap">
          <BookingPrompt title={page?.title} text={page?.text} />
        </div>
      )}
      <nav className="section-page-nav wrap" aria-label="Explore the studio">
        <p>
          {current === "/enquire"
            ? "Want to get a feel for the studio first?"
            : "Or explore a little more"}
        </p>
        <div>
          {sectionPages.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.href === current ? "page" : undefined}
            >
              {item.label}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
