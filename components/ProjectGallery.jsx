export default function ProjectGallery({ images = [], title }) {
  const entries = images.filter((image) => image.src);
  return (
    <section className="case-extras" aria-labelledby="project-gallery-heading">
      <div className="extras-heading"><div>
        <p className="extras-eyebrow">The bits between the beginning and the launch</p>
        <h2 id="project-gallery-heading">Behind the scenes.</h2>
        <p className="extras-description">Moodboards, conversations, and the little details that shaped {title}.</p>
      </div></div>
      {entries.length > 0 ? <div className="project-process-gallery">
        {entries.map((image, i) => <figure key={image.id || `${image.src}-${i}`}>
          <a href={image.src} target="_blank" rel="noopener noreferrer" aria-label={`Open ${image.alt || image.caption || `${title} process image ${i + 1}`} in a new tab`}>
            <img src={image.src} alt={image.alt || image.caption || `${title} process image ${i + 1}`} loading="lazy" decoding="async" />
          </a>
          {(image.label || image.caption) && <figcaption>{image.label && <span>{image.label}</span>}{image.caption && <p>{image.caption}</p>}</figcaption>}
        </figure>)}
      </div> : <p className="extras-empty">A closer look at the creative process is coming soon.</p>}
    </section>
  );
}
