import Link from "next/link";
import { hero, site } from "@/lib/content";

export default function Hero() {
  return (
    <section className="section hero">
      <div className="wrap hero-content hero-stages">
        <div className="hero-stage hero-opener" aria-hidden="true">
          <p className="headline hero-title">{hero.headline}</p>
          <p className="hero-attribution">{hero.subheadline}</p>
        </div>
        <div className="hero-stage hero-main">
          <h1 className="headline hero-title">{hero.sub}</h1>
          <div className="hero-actions">
            <Link href="/enquire" className="btn hero-cta">
              {hero.cta}
            </Link>
            <p className="hero-availability">
              <span aria-hidden="true" />
              {site.bookingStatus}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
