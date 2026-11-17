"use client";
import { useState } from "react";

export default function SocialPostImage({ src, alt, title }) {
  const [failed, setFailed] = useState(false);
  return failed ? <span className="social-tile-fallback"><span className="social-tile-fallback-title">{title}</span><span className="social-tile-fallback-label">Open on Instagram ↗</span></span> : <img src={src} alt={alt} className="social-post-cover" loading="lazy" decoding="async" onError={() => setFailed(true)} />;
}
