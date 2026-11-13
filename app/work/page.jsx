import Link from "next/link";
import { projects } from "@/lib/content";

export const metadata = {
  title: "All projects | WebsitesbyKhaula Studio",
  description: "A collection of websites made for the people, ideas, and little dreams behind them. Explore the work of WebsitesbyKhaula Studio.",
};

export default function AllProjects() {
  return (
    <div className="work-archive">
      <section className="archive-intro">
        <div className="wrap">
          <Link href="/#work" className="archive-back">← Back to the studio</Link>
          <div className="archive-heading">
            <div>
              <p className="archive-eyebrow">A little collection of</p>
              <h1>Websites with <span>personality.</span></h1>
            </div>
            <p className="archive-intro-note">Different dreams, different worlds.<br />A home on the web for each one.</p>
          </div>
          <div className="archive-index">
            <h2>All projects <span>({String(projects.length).padStart(2, "0")})</span></h2>
            <span className="archive-handnote">Made with a little imagination ↘</span>
          </div>
        </div>
      </section>

      <section className="archive-gallery wrap" aria-label="All project case studies">
        <div className="archive-grid">
          {projects.map((project, index) => (
            <article key={project.slug} className="archive-card">
              <Link href={`/work/${project.slug}`} className="archive-project-link" aria-label={`Explore ${project.title}`}>
                <div className="archive-cover">
                  <div className="archive-browser" aria-hidden="true"><i /><i /><i /><span>{project.title}</span></div>
                  {project.image ? (
                    <img src={project.image} alt={`${project.title} website cover`} loading={index < 2 ? "eager" : "lazy"} decoding="async" width="1200" height="900" />
                  ) : (
                    <div className="archive-cover-fallback">{project.title}</div>
                  )}
                  <span className="archive-open" aria-hidden="true">↗</span>
                </div>
                <div className="archive-caption">
                  <span className="archive-number">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{project.title}</h3>
                    {project.tagline && <p>{project.tagline}</p>}
                  </div>
                  <span className="archive-year">{project.year || "↗"}</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="archive-invitation">
        <div className="wrap">
          <p className="archive-eyebrow">Room for one more story</p>
          <h2>What does your<br /><span>little world look like?</span></h2>
          <p>Let's make a website that feels like you.</p>
          <Link href="/#enquire" className="archive-enquire">Tell me about it <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </div>
  );
}
