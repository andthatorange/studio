import BookingPrompt from "@/components/BookingPrompt";
import InstagramPosts from "@/components/InstagramPosts";
import Reviews from "@/components/Reviews";
import ProjectGallery from "@/components/ProjectGallery";
﻿import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = projects.find((x) => x.slug === params.slug);
  return { title: p ? p.title : "Work" };
}

export default function CaseStudy({ params }) {
  const p = projects.find((x) => x.slug === params.slug);
  if (!p) notFound();
  const next = projects[(projects.indexOf(p) + 1) % projects.length];

  return (
    <article className="case-study section">
      <div className="wrap max-w-4xl">
        <Link href="/work" className="text-sm text-muted">
          Back to all projects
        </Link>
        <h1 className="mt-4 text-4xl md:text-6xl">{p.title}</h1>
        <p className="mt-3 text-lg text-muted">{p.tagline}</p>
        <p className="mt-2 text-sm text-muted">
          {[p.year, ...p.services].filter(Boolean).join(", ")}
        </p>

        <div className="mt-10 w-3/4 bg-surface">
          {p.video ? (
            <video
              src={p.video}
              poster={p.image || undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label={`${p.title} preview`}
              className="mt-10 w-full bg-surface"
            />
          ) : p.image ? (
            <img src={p.image} alt={`${p.title} website cover`} className="w-full" />
          ) : null}
        </div>

        {[
          ["The brief", p.brief],
          ["The approach", p.approach],
          ["The outcome", p.outcome],
        ].filter(([, text]) => text).map(([h, t]) => (
          <section key={h} className="mt-12">
            <h2 className="text-2xl">{h}</h2>
            <p className="mt-3 max-w-2xl text-muted">{t}</p>
          </section>
        ))}

        <ProjectGallery images={p.gallery} title={p.title} />
        <InstagramPosts projectSlug={p.slug} />
        <Reviews projectSlug={p.slug} />

        {p.quote && (
          <blockquote className="mt-12 border-l-2 border-ink pl-5 text-xl">
            {p.quote}
          </blockquote>
        )}
        {p.liveUrl && (
          <a href={p.liveUrl} className="btn mt-10">
            Visit the live site
          </a>
        )}

        <BookingPrompt />

        <div className="mt-16 border-t border-line pt-6">
          <Link href={`/work/${next.slug}`}>Next: {next.title}</Link>
        </div>
      </div>
    </article>
  );
}






