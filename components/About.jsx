import Link from "next/link";
import { about } from "@/lib/content";
import DoodlePencil from "@/components/DoodlePencil";

export default function About() {
  const paragraphs = about.body.filter(
    (text) => text.trim() && !/^\[.*\]$/.test(text.trim()),
  );
  return (
    <section
      id="about"
      className="section about-studio border-t border-line"
      aria-labelledby="about-heading"
    >
      <div className="wrap about-layout">
        <div className="about-visual">
          {about.photo && (
            <figure className="about-photo-card">
              <div className="about-tape" aria-hidden="true" />
              <img
                src={about.photo}
                alt={about.photoAlt || "Khaula, the designer behind the studio"}
                loading="lazy"
                decoding="async"
                width="3120"
                height="4160"
              />
              <figcaption>
                {about.photoCaption || "The person behind the pixels."}
              </figcaption>
            </figure>
          )}
          <div className="about-personal-note">
            <p>{about.note || "A small studio. A personal kind of process."}</p>
          </div>
        </div>
        <div className="about-story">
          <p className="about-eyebrow">
            {about.eyebrow || "A little about the person behind the studio"}
          </p>
          <h2 id="about-heading">{about.heading}</h2>
          <div className="about-copy">
            {paragraphs.map((text, i) => (
              <p key={i} className={i === 0 ? "about-lead" : ""}>
                {text}
              </p>
            ))}
          </div>
          {about.principles?.length > 0 && (
            <div className="about-principles">
              <h3>What working together feels like</h3>
              <dl>
                {about.principles.map((item, i) => (
                  <div key={item.title}>
                    <dt>
                      <span aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.title}
                    </dt>
                    <dd>{item.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
          <div className="about-actions">
            <Link href="/#enquire" className="about-primary-link">
              Tell me about your project <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/work" className="about-secondary-link">
              Explore the work
            </Link>
          </div>
          <div className="about-signature-row">
            <p className="about-signature">
              A little imagination,
              <br />
              <span>Khaula</span>
            </p>
            <div className="about-pencil-discovery">
              <span className="about-pencil-hint">
                Ideas start with a little scribble.
              </span>
              <div className="about-pencil-slot">
                <DoodlePencil />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
