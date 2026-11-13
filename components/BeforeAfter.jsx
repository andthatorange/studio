import { beforeAfter } from "@/lib/content";

export default function BeforeAfter() {
  const { heading, beforeLabel, afterLabel, rows } = beforeAfter;
  return (
    <section id="before-after" className="section border-t border-line comparison" aria-labelledby="comparison-heading">
      <div className="wrap max-w-4xl">
        <p className="comparison-eyebrow">A little clarity goes a long way</p>
        <h2 id="comparison-heading" className="comparison-heading">{heading}</h2>
        <div className="comparison-panels">
          <div className="comparison-before" aria-labelledby="before-label">
            <h3 id="before-label" className="comparison-label">{beforeLabel}<span>Sound familiar?</span></h3>
            <ol className="comparison-notes">
              {rows.map((row, i) => (
                <li key={i}>
                  <span className="comparison-note-number">{String(i + 1).padStart(2, "0")}</span>
                  <span className="comparison-note-text">{row.before}</span>
                </li>
              ))}
            </ol>
            <span className="comparison-scribble" aria-hidden="true">
              <svg viewBox="0 0 130 32" fill="none"><path d="M4 18C27-3 69 37 98 13S58 3 66 20s41-8 60-6M103 6l23 8-17 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </div>
          <div className="comparison-after" aria-labelledby="after-label">
            <h3 id="after-label" className="comparison-label">{afterLabel}<span>A little more room to grow.</span></h3>
            <ol className="comparison-organized">
              {rows.map((row, i) => (
                <li key={i}>
                  <span className="comparison-order" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <p>{row.after}</p>
                </li>
              ))}
            </ol>
            <p className="comparison-signoff">Same dream. A clearer direction.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

