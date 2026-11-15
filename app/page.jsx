import InstagramPosts from "@/components/InstagramPosts";
import Reviews from "@/components/Reviews";
﻿import Link from "next/link";
import Packages from "@/components/Packages";
import EnquiryForm from "@/components/EnquiryForm";
import Hero from "@/components/Hero";
import {
  site,
  hero,
  projects,
  process,
  about,
  faq,
  enquire,
} from "@/lib/content";
import BeforeAfter from "@/components/BeforeAfter";
import DoodlePencil from "@/components/DoodlePencil";
import WorkScroll from "@/components/WorkScroll";
// ...
export default function Home() {
  return (
    <div className="home-sections">
      {/* HERO */}
      <Hero />
      <BeforeAfter />
      {/* WORK */}
      <WorkScroll projects={projects} />
      <Packages />
      {/* PROCESS: genuinely sequential, so numbering is fine */}
      <section id="process" className="section">
        <div className="wrap">
          <h2 className="text-3xl md:text-4xl">How we work together</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-4">
            {process.map((s, i) => (
              <li key={s.title}>
                <span className="text-sm text-muted">Step {i + 1}</span>
                <h3 className="mt-1 text-xl">{s.title}</h3>
                <p className="mt-2 text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      {/* ABOUT */}
      <section id="about" className="section border-t border-line relative">
        <DoodlePencil />
        <div className="wrap grid gap-10 md:grid-cols-2">
          <div className="aspect-[4/5] bg-surface">
            {about.photo && (
              <img
                src={about.photo}
                alt=""
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl">{about.heading}</h2>
            {about.body.map((t, i) => (
              <p key={i} className="mt-4 text-muted">
                {t}
              </p>
            ))}
          </div>
        </div>
      </section>
      <InstagramPosts />
      <Reviews />
      {/* FAQ: native details/summary, no JS needed */}
      <section id="faq" className="section bg-surface">
        <div className="wrap max-w-3xl">
          <h2 className="text-3xl md:text-4xl">Questions</h2>
          <div className="mt-8 divide-y divide-line border-y border-line">
            {faq.map((f) => (
              <details key={f.q} className="py-4">
                <summary className="cursor-pointer text-lg">{f.q}</summary>
                <p className="mt-2 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      {/* ENQUIRE */}
      <section id="enquire" className="section">
        <div className="wrap max-w-3xl">
          <h2 className="text-3xl md:text-4xl">{enquire.heading}</h2>
          <p className="mt-3 mb-8 text-muted">
            {enquire.sub}
          </p>
          <EnquiryForm />
        </div>
      </section>
    </div>
  );
}

