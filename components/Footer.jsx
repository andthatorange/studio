import Link from "next/link";
import { site, nav } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="studio-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-intro">
            <p className="footer-kicker">
              A little imagination goes a long way.
            </p>
            <h2>
              Let's make something
              <br />
              that feels like you.
            </h2>
            <p>
              Thoughtful websites for the people, passions, and small businesses
              behind them.
            </p>
            <Link href="/#enquire" className="footer-contact">
              Tell me what you're dreaming of <span aria-hidden="true">↗</span>
            </Link>
            <a className="footer-email" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <h3>Explore</h3>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href === "/#work" ? "/work" : item.href}
              >
                {item.label === "Work" ? "All projects" : item.label}
              </Link>
            ))}
          </nav>
          <div className="footer-links">
            <h3>Elsewhere</h3>
            <a href={site.instagram}>
              Instagram <span aria-hidden="true">↗</span>
            </a>
            <a href={site.pinterest}>
              Pinterest <span aria-hidden="true">↗</span>
            </a>
            <a href={`mailto:${site.email}`}>
              Email me <span aria-hidden="true">↗</span>
            </a>
            <p className="footer-availability">
              <span aria-hidden="true" />
              {site.bookingStatus}
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p>Made with care & a little curiosity.</p>
          <a href="#page-top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
