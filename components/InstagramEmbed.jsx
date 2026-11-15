"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

export default function InstagramEmbed({ url, title = "Instagram post" }) {
  const container = useRef(null);
  const processEmbeds = () => window.instgrm?.Embeds?.process();

  useEffect(() => {
    // Instagram replaces the blockquote. Keep its DOM separate from React's children.
    const host = container.current;
    if (!host) return;
    const quote = document.createElement("blockquote");
    quote.className = "instagram-media";
    quote.setAttribute("data-instgrm-permalink", url);
    quote.setAttribute("data-instgrm-version", "14");
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "View this post on Instagram ↗";
    quote.appendChild(link);
    host.replaceChildren(quote);
    processEmbeds();
    return () => host.replaceChildren();
  }, [url]);

  return (
    <div className="instagram-embed" role="group" aria-label={title}>
      <div ref={container} className="instagram-embed-host" />
      <Script id="instagram-embed-script" src="https://www.instagram.com/embed.js" strategy="afterInteractive" onReady={processEmbeds} />
      <a className="instagram-embed-link" href={url} target="_blank" rel="noopener noreferrer">View on Instagram <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
    </div>
  );
}
