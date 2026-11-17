"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const TURN_MS = 700;

function ReviewLeaf({ review, number, total, decorative = false }) {
  return <div className="review-leaf-content">
    <div className="review-leaf-header"><span>A note from {review.name}</span><span aria-hidden="true">✳</span></div>
    <figure className="review-book-quote">
      <span className="review-book-quote-mark" aria-hidden="true">“</span>
      <blockquote>{review.quote}</blockquote>
      <figcaption>
        {review.avatar && <img src={review.avatar} alt="" width="44" height="44" loading="lazy" />}
        <div><p>{review.name}</p>{review.role && <span>{review.role}</span>}</div>
      </figcaption>
    </figure>
    <div className="review-leaf-footer">
      {review.project && !decorative ? <Link href={`/work/${review.project.slug}`}>Explore {review.project.title} ↗</Link> : <span>{review.project?.title || "From the studio"}</span>}
      <span>{String(number).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
    </div>
  </div>;
}

export default function ReviewBook({ items }) {
  const [page, setPage] = useState(0);
  const [turn, setTurn] = useState(null);
  const stage = useRef(null);
  const current = useRef(0);
  const busy = useRef(false);
  const timer = useRef(null);
  const cooldown = useRef(0);
  const touch = useRef(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);
  const turnTo = useCallback((requested) => {
    const target = Math.max(0, Math.min(items.length - 1, requested));
    if (busy.current || target === current.current) return;
    const from = current.current;
    cooldown.current = performance.now() + 1000;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      current.current = target;
      setPage(target);
      return;
    }
    busy.current = true;
    setTurn({ from, to: target, direction: target > from ? "forward" : "back" });
    timer.current = window.setTimeout(() => {
      current.current = target;
      setPage(target);
      setTurn(null);
      busy.current = false;
    }, TURN_MS);
  }, [items.length]);

  useEffect(() => {
    const element = stage.current;
    if (!element || items.length < 2) return;
    let amount = 0;
    let previousTime = 0;
    const wheel = (event) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const direction = event.deltaY > 0 ? 1 : -1;
      if (!event.deltaY) return;
      const target = current.current + direction;
      // At the first/last page, scrolling continues down the website normally.
      if (!busy.current && (target < 0 || target >= items.length)) return;
      event.preventDefault();
      if (busy.current || performance.now() < cooldown.current) return;
      const now = performance.now();
      if (now - previousTime > 180 || Math.sign(amount) !== direction) amount = 0;
      previousTime = now;
      amount += event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? element.clientHeight : 1);
      if (Math.abs(amount) >= 55) { amount = 0; turnTo(target); }
    };
    element.addEventListener("wheel", wheel, { passive: false });
    return () => element.removeEventListener("wheel", wheel);
  }, [turnTo, items.length]);

  if (!items.length) return null;
  const safePage = Math.min(page, items.length - 1);
  const baseIndex = turn ? (turn.direction === "forward" ? turn.to : turn.from) : safePage;
  const flippingIndex = turn ? (turn.direction === "forward" ? turn.from : turn.to) : 0;
  const last = safePage === items.length - 1;

  return <div className="review-book-reader">
    <div className="review-book" role="group" aria-label="Client review book">
      <div className="review-book-inside-cover">
        <p className="review-book-edition">The studio guestbook</p>
        <svg className="review-book-heart" viewBox="0 0 100 90" fill="none" aria-hidden="true"><path d="M50 79C39 68 7 48 9 26 11 3 39 1 50 23 65 0 94 9 92 31 90 51 62 70 50 79Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
        <p className="review-book-cover-title">Good things<br />are made<br /><em>together.</em></p>
        <p className="review-book-cover-note">A few kind words from<br />the people behind the projects.</p>
        <nav className="review-book-index" aria-label="Choose a client review">
          {items.map((item, i) => <button key={item.id || i} type="button" aria-current={i === safePage ? "page" : undefined} disabled={Boolean(turn)} onClick={() => turnTo(i)}><span>{String(i + 1).padStart(2, "0")}</span>{item.name}</button>)}
        </nav>
      </div>
      <div ref={stage} className="review-book-stage" tabIndex={0} role="group" aria-label="Review page. Click to turn, scroll over the page, or use left and right arrow keys." onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); turnTo(current.current + (event.key === "ArrowRight" ? 1 : -1)); }
      }} onClick={(event) => {
        if (event.target.closest("a, button") || window.getSelection()?.toString()) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        const backwards = event.clientX - bounds.left < bounds.width * .22;
        turnTo(current.current + (backwards || last ? -1 : 1));
      }} onTouchStart={(event) => { if (event.touches.length === 1) touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }} onTouchEnd={(event) => {
        if (!touch.current) return;
        const dx = event.changedTouches[0].clientX - touch.current.x;
        const dy = event.changedTouches[0].clientY - touch.current.y;
        touch.current = null;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) turnTo(current.current + (dx < 0 ? 1 : -1));
      }}>
        <div className="review-book-page" aria-hidden={Boolean(turn)}><ReviewLeaf review={items[baseIndex]} number={baseIndex + 1} total={items.length} /></div>
        {turn && <div className={`review-book-turn review-book-turn--${turn.direction}`} aria-hidden="true"><ReviewLeaf review={items[flippingIndex]} number={flippingIndex + 1} total={items.length} decorative /></div>}
      </div>
    </div>
    <div className="review-book-controls">
      <button type="button" disabled={safePage === 0 || Boolean(turn)} onClick={() => turnTo(current.current - 1)} aria-label="Previous client review">← <span>Previous</span></button>
      <p aria-live="polite" aria-atomic="true">{items[safePage].name} · {safePage + 1} of {items.length}</p>
      <button type="button" disabled={last || Boolean(turn)} onClick={() => turnTo(current.current + 1)} aria-label="Next client review"><span>Next</span> →</button>
    </div>
    {items.length > 1 && <p className="review-book-help">Click a page or scroll over the book to turn it. On your phone, swipe.</p>}
  </div>;
}
