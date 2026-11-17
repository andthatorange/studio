import SectionLink from "@/components/SectionLink";
﻿import SocialPostImage from "@/components/SocialPostImage";
import { instagram, site } from "@/lib/content";

function postUrl(value) {
  try {
    const url = new URL(value);
    const match = url.pathname.match(/^\/(p|reel|tv)\/([A-Za-z0-9_-]+)\/?$/);
    if (
      url.protocol !== "https:" ||
      !["instagram.com", "www.instagram.com"].includes(url.hostname) ||
      !match ||
      match[2].startsWith("YOUR_")
    )
      return null;
    const permalink = new URL(
      `https://www.instagram.com/${match[1]}/${match[2]}/`,
    );
    if (/^\d+$/.test(url.searchParams.get("img_index") || ""))
      permalink.searchParams.set(
        "img_index",
        url.searchParams.get("img_index"),
      );
    return permalink.href;
  } catch {
    return null;
  }
}

// "reel" and "carousel" can be set per post in content.js. Otherwise we guess from the link.
function postType(post) {
  if (post.type) return post.type;
  if (post.href.includes("/reel/")) return "reel";
  if (post.href.includes("img_index=")) return "carousel";
  return "post";
}

const TYPE_LABEL = { reel: "Reel", carousel: "Carousel", post: "Post" };

function TypeIcon({ type }) {
  if (type === "reel") {
    return (
      <svg
        viewBox="0 0 24 24"
        width="12"
        height="12"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M8 5v14l11-7z" fill="currentColor" />
      </svg>
    );
  }
  if (type === "carousel") {
    return (
      <svg
        viewBox="0 0 24 24"
        width="12"
        height="12"
        aria-hidden="true"
        focusable="false"
      >
        <rect
          x="7"
          y="7"
          width="13"
          height="13"
          rx="2.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M4 16V6a2 2 0 0 1 2-2h10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return null;
}

const css = `
.social-strip {
  list-style: none;
  margin: 2rem 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}

.social-tile {
  display: block;
  color: inherit;
  text-decoration: none;
  border-radius: 20px;
  background: #fffaf3;
  border: 1px solid rgba(204, 125, 124, 0.25);
  overflow: hidden;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.social-tile:hover,
.social-tile:focus-visible {
  transform: translateY(-5px) rotate(-0.6deg);
  box-shadow: 0 18px 36px -18px rgba(204, 125, 124, 0.55);
}

.social-tile:focus-visible {
  outline: 2px solid #cc7d7c;
  outline-offset: 3px;
}

/* Every cover is the same shape, so the row stays even. Export covers at 1080x1350 (4:5). */
.social-tile-media {
  position: relative;
  display: block;
  aspect-ratio: 4 / 5;
  background: #ffc7c7;
  overflow: hidden;
}

.social-tile-media img {
  object-fit: cover;
  transition: transform 0.6s ease;
}

.social-tile:hover .social-tile-media img {
  transform: scale(1.04);
}

.social-tile-fallback {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 2rem 1.5rem 3rem;
  text-align: center;
  color: #a85f5e;
  background: linear-gradient(160deg, #f5efe6 0%, #ffc7c7 100%);
}

.social-tile-fallback-title {
  font-size: 1.5rem;
  line-height: 1.25;
}

.social-tile-fallback-label {
  position: absolute;
  bottom: 1.1rem;
  left: 0;
  right: 0;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.7;
}

/* Text-only tiles rotate through your three brand colours so they never look identical. */
.social-strip-item:nth-child(3n + 2) .social-tile-fallback {
  color: #f5efe6;
  background: linear-gradient(160deg, #cc7d7c 0%, #a85f5e 100%);
}

.social-strip-item:nth-child(3n + 3) .social-tile-fallback {
  color: #a85f5e;
  background: #ffc7c7;
}

.social-tile-badge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  background: rgba(245, 239, 230, 0.92);
  color: #a85f5e;
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.social-tile-body {
  display: grid;
  gap: 0.3rem;
  padding: 1rem 1.15rem 1.15rem;
}

.social-tile-title {
  font-size: 1.05rem;
  line-height: 1.3;
}

.social-tile-caption {
  font-size: 0.9rem;
  opacity: 0.75;
  line-height: 1.45;
}

.social-tile-cta {
  margin-top: 0.35rem;
  font-size: 0.85rem;
  color: #a85f5e;
}

/* On phones the strip swipes sideways instead of stacking into a long column. */
@media (max-width: 700px) {
  .social-strip {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding: 0.25rem 1.25rem 1rem;
    margin-inline: -1.25rem;
    scrollbar-width: none;
  }
  .social-strip::-webkit-scrollbar {
    display: none;
  }
  .social-strip-item {
    flex: 0 0 78%;
    scroll-snap-align: center;
  }
}

@media (min-width: 701px) and (max-width: 1100px) {
  .social-strip {
    gap: 1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .social-tile,
  .social-tile-media img {
    transition: none;
  }
  .social-tile:hover,
  .social-tile:focus-visible {
    transform: none;
  }
  .social-tile:hover .social-tile-media img {
    transform: none;
  }
}
`;

export default function InstagramPosts({ projectSlug }) {
  const posts = instagram.posts
    .map((post) => (typeof post === "string" ? { url: post } : post))
    .filter((post) =>
      !projectSlug
        ? post.showOnHome !== false
        : post.projectSlug === projectSlug,
    )
    .map((post) => ({
      ...post,
      href: postUrl(post.url),
      image: post.image,
    }))
    .filter((post) => post.href);

  const headingId = projectSlug
    ? "project-instagram-heading"
    : "instagram-heading";

  return (
    <section
      id={projectSlug ? "project-instagram" : "instagram"}
      className={projectSlug ? "case-extras" : "section studio-social"}
      aria-labelledby={headingId}
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className={projectSlug ? "" : "wrap"}>
        <div className="extras-heading">
          <div>
            <p className="extras-eyebrow">From the studio journal</p>
            <h2 id={headingId}>
              {projectSlug ? "A little more of this story." : instagram.heading}
            </h2>
            <p className="extras-description">
              {projectSlug
                ? "Related posts, details, and moments from the process."
                : instagram.sub}
            </p>
          </div>
          <a
            className="extras-text-link"
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Instagram <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        {posts.length > 0 ? (
          <ul className="social-strip">
            {posts.map((post, i) => {
              const type = postType(post);
              const title = post.title || "A moment from the studio";
              return (
                <li key={post.id || post.href} className="social-strip-item">
                  <a
                    className="social-tile"
                    href={post.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="social-tile-media">
                      {post.image ? (
                        <SocialPostImage src={post.image} alt={post.alt || title} title={title} />
                      ) : (
                        <span className="social-tile-fallback">
                          <span className="social-tile-fallback-title">
                            {title}
                          </span>
                          <span className="social-tile-fallback-label">
                            websitesbykhaula
                          </span>
                        </span>
                      )}
                      {type !== "post" && (
                        <span className="social-tile-badge">
                          <TypeIcon type={type} />
                          {TYPE_LABEL[type]}
                        </span>
                      )}
                    </span>
                    <span className="social-tile-body">
                      <span className="social-tile-title">{title}</span>
                      {post.caption && (
                        <span className="social-tile-caption">
                          {post.caption}
                        </span>
                      )}
                      <span className="social-tile-cta">
                        View on Instagram <span aria-hidden="true">↗</span>
                      </span>
                    </span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="extras-empty">
            {projectSlug
              ? "More moments from this project will find their way here soon."
              : "Little moments, work in progress, and new ideas. Find the latest on Instagram."}
          </p>
        )}
      </div>
    {!projectSlug && <SectionLink href="/instagram" label="Explore the studio journal" />}
    </section>
  );
}

