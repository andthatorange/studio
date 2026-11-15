import InstagramEmbed from "@/components/InstagramEmbed";
import { instagram, site } from "@/lib/content";

function postUrl(value) {
  try {
    const url = new URL(value);
    const match = url.pathname.match(/^\/(p|reel|tv)\/([A-Za-z0-9_-]+)\/?$/);
    if (url.protocol !== "https:" || !["instagram.com", "www.instagram.com"].includes(url.hostname) || !match || match[2].startsWith("YOUR_")) return null;
    const permalink = new URL(`https://www.instagram.com/${match[1]}/${match[2]}/`);
    if (/^\d+$/.test(url.searchParams.get("img_index") || "")) permalink.searchParams.set("img_index", url.searchParams.get("img_index"));
    return permalink.href;
  } catch { return null; }
}
export default function InstagramPosts({ projectSlug }) {
  const posts = instagram.posts
    .map((post) => typeof post === "string" ? { url: post } : post)
    .filter((post) => !projectSlug ? post.showOnHome !== false : post.projectSlug === projectSlug)
    .map((post) => ({ ...post, href: postUrl(post.url) }))
    .filter((post) => post.href);
  return (
    <section id={projectSlug ? "project-instagram" : "instagram"} className={projectSlug ? "case-extras" : "section studio-social"} aria-labelledby={projectSlug ? "project-instagram-heading" : "instagram-heading"}>
      <div className={projectSlug ? "" : "wrap"}>
        <div className="extras-heading">
          <div>
            <p className="extras-eyebrow">From the studio journal</p>
            <h2 id={projectSlug ? "project-instagram-heading" : "instagram-heading"}>{projectSlug ? "A little more of this story." : instagram.heading}</h2>
            <p className="extras-description">{projectSlug ? "Related posts, details, and moments from the process." : instagram.sub}</p>
          </div>
          <a className="extras-text-link" href={site.instagram} target="_blank" rel="noopener noreferrer">Visit Instagram <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
        </div>
        {posts.length > 0 ? (
          <div className="social-post-grid social-embed-grid">
            {posts.map((post) => (
              <article key={post.id || post.href} className="social-post-card">
                <InstagramEmbed url={post.href} title={post.title || "A moment from the studio"} />
                {post.title && <h3>{post.title}</h3>}
                {post.caption && <p>{post.caption}</p>}
              </article>
            ))}
          </div>        ) : <p className="extras-empty">{projectSlug ? "More moments from this project will find their way here soon." : "Little moments, work in progress, and new ideas. Find the latest on Instagram."}</p>}
      </div>
    </section>
  );
}

