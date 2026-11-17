import Link from "next/link";
import { servicesOverview } from "@/lib/content";

export default function ServicesOverview() {
  return (
    <section id="packages" className="section services-overview" aria-labelledby="services-overview-heading">
      <div className="wrap">
        <p className="extras-eyebrow">A home for what you do</p>
        <h2 id="services-overview-heading">{servicesOverview.heading}</h2>
        <p className="services-overview-intro">{servicesOverview.intro}</p>
        <div className="services-overview-grid">
          {servicesOverview.items.map((item, i) => <article key={item.title}>
            <span className="service-number" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <Link href={item.href}>See what’s included <span aria-hidden="true">↗</span></Link>
          </article>)}
        </div>
        <div className="services-overview-next">
          <div><h3>Not sure what you need yet?</h3><p>Tell me where you are now, and we can find a starting point together.</p></div>
          <div><Link href="/enquire" className="journey-primary-link">Tell me about your project <span aria-hidden="true">↗</span></Link><Link href="/packages" className="journey-secondary-link">Explore services & pricing</Link></div>
        </div>
      </div>
    </section>
  );
}
