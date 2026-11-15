import Link from "next/link";
import { reviews, projects } from "@/lib/content";

export default function Reviews({ projectSlug }) {
  const items = reviews.items.filter((review) => review.quote?.trim() && review.name?.trim() && (projectSlug ? review.projectSlug === projectSlug : review.showOnHome !== false));
  return (
    <section id={projectSlug ? "project-reviews" : "reviews"} className={projectSlug ? "case-extras" : "section studio-reviews"} aria-labelledby={projectSlug ? "project-reviews-heading" : "reviews-heading"}>
      <div className={projectSlug ? "" : "wrap"}>
        <div className="extras-heading">
          <div>
            <p className="extras-eyebrow">From the people behind the projects</p>
            <h2 id={projectSlug ? "project-reviews-heading" : "reviews-heading"}>{projectSlug ? "A word from the client." : reviews.heading}</h2>
            <p className="extras-description">{projectSlug ? "Their experience, in their own words." : reviews.sub}</p>
          </div>
        </div>
        {items.length > 0 ? <div className="studio-review-grid">
          {items.map((review) => {
            const project = projects.find((item) => item.slug === review.projectSlug);
            return (
              <figure key={review.id || `${review.projectSlug}-${review.name}`} className="studio-review-card">
                <span className="review-quotation" aria-hidden="true">“</span>
                <blockquote>{review.quote}</blockquote>
                <figcaption>
                  {review.avatar && <img src={review.avatar} alt="" loading="lazy" width="44" height="44" />}
                  <div><p className="review-author">{review.name}</p>{review.role && <p className="review-role">{review.role}</p>}
                    {project && (projectSlug ? <span className="review-project">{project.title}</span> : <Link className="review-project" href={`/work/${project.slug}`}>Explore {project.title} ↗</Link>)}
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div> : <p className="extras-empty">Client stories are on their way. In the meantime, <Link href="/work">explore the work</Link>.</p>}
      </div>
    </section>
  );
}
