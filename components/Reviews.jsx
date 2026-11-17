import Link from "next/link";
import SectionLink from "@/components/SectionLink";
import ReviewBook from "@/components/ReviewBook";
import { reviews, projects } from "@/lib/content";

export default function Reviews({ projectSlug }) {
  const items = reviews.items
    .filter((review) => review.quote?.trim() && review.name?.trim() && (projectSlug ? review.projectSlug === projectSlug : review.showOnHome !== false))
    .map((review) => { const project = projects.find((item) => item.slug === review.projectSlug); return { ...review, project: project ? { slug: project.slug, title: project.title } : null }; });
  const headingId = projectSlug ? "project-reviews-heading" : "reviews-heading";
  return <section id={projectSlug ? "project-reviews" : "reviews"} className={projectSlug ? "case-extras review-book-section" : "section studio-reviews review-book-section"} aria-labelledby={headingId}>
    <div className={projectSlug ? "" : "wrap"}>
      <div className="extras-heading"><div>
        <p className="extras-eyebrow">From the people behind the projects</p>
        <h2 id={headingId}>{projectSlug ? "A word from the client." : reviews.heading}</h2>
        <p className="extras-description">{projectSlug ? "Their experience, in their own words." : reviews.sub}</p>
      </div></div>
      {items.length ? <ReviewBook items={items} /> : <p className="extras-empty">Client stories are on their way. In the meantime, <Link href="/work">explore the work</Link>.</p>}
    </div>
    {!projectSlug && <SectionLink href="/enquire" label="Tell me about your project" />}
  </section>;
}
