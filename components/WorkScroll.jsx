"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const FEATURED = 3; // projects shown in the scroll stack
const PEEK_COUNT = 4; // thumbnails shown in the banner
const PER = 80; // scroll distance per project, in svh (bigger = slower)
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const pad = (n) => String(n).padStart(2, "0");

export default function WorkScroll({ projects: all }) {
  const projects = all.slice(0, FEATURED);
  const rest = all.slice(FEATURED);
  const n = projects.length;
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const [pos, setPos] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    if (n < 2) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = sectionRef.current.getBoundingClientRect();
      const total = r.height - stickyRef.current.offsetHeight;
      setPos(total > 0 ? clamp(-r.top / total, 0, 1) * (n - 1) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [n]);

  const goTo = useCallback(
    (i) => {
      if (n < 2) return;
      const r = sectionRef.current.getBoundingClientRect();
      const total = r.height - stickyRef.current.offsetHeight;
      window.scrollTo({
        top: window.scrollY + r.top + (clamp(i, 0, n - 1) / (n - 1)) * total,
        behavior: reduce ? "auto" : "smooth",
      });
    },
    [n, reduce],
  );

  const active = Math.round(pos);

  return (
    <>
      <section
        id="work"
        ref={sectionRef}
        className="featured-work relative border-t border-line"
        style={{ height: `calc(100svh + ${Math.max(n - 1, 0) * PER}svh)` }}
      >
        <div
          ref={stickyRef}
          className="featured-sticky sticky top-0 flex h-[100svh] flex-col overflow-hidden"
        >
          <div className="wrap flex w-full items-center justify-between pt-6 pb-4">
            <h2 className="text-2xl md:text-3xl">Selected work</h2>
            {n > 1 && !mobile && (
              <div className="flex items-center gap-2">
                {projects.map((p, i) => (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to project ${i + 1}`}
                    aria-current={i === active}
                    className={`h-2.5 w-2.5 rounded-full border border-ink ${i === active ? "bg-ink" : ""}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* full-width stage: cards slide in from the right and cover each other */}
          <div className="featured-stage relative w-full flex-1 overflow-hidden">
            {projects.map((p, i) => {
              const d = i - pos; // >0 still off to the right, <=0 in place
              const isActive = i === active;
              const meta = [p.year, ...(p.services || [])]
                .filter(Boolean)
                .join(", ");

              const style = reduce
                ? {
                    visibility: Math.abs(d) < 0.5 ? "visible" : "hidden",
                    zIndex: i,
                  }
                : {
                    // incoming card moves in from the right; earlier cards stay still
                    transform: `translateX(${clamp(d, 0, 1) * 100}%)`,
                    // hide only once fully covered by the next card, or not yet entered
                    visibility: d >= 1 || d <= -1 ? "hidden" : "visible",
                    zIndex: i,
                  };

              return (
                <Link
                  key={p.slug}
                  href={`/work/${p.slug}`}
                  aria-label={`View ${p.title} case study`}
                  aria-hidden={mobile ? undefined : !isActive}
                  tabIndex={mobile || isActive ? 0 : -1}
                  className="featured-project absolute inset-0 bg-bg shadow-[-1px_0_0_0_rgba(0,0,0,0.06),-24px_0_40px_-24px_rgba(0,0,0,0.14)] will-change-transform"
                  style={{
                    ...(mobile ? {} : style),
                    pointerEvents: mobile || isActive ? "auto" : "none",
                  }}
                >
                  <div className="wrap flex h-full flex-col justify-center gap-6 md:grid md:grid-cols-[1fr_1.2fr] md:items-center md:gap-12">
                    <div>
                      <p className="text-sm text-muted">
                        {pad(i + 1)} / {pad(n)}
                      </p>
                      <h3 className="mt-2 text-4xl md:text-6xl">{p.title}</h3>
                      <p className="mt-3 max-w-md text-lg text-muted">
                        {p.tagline}
                      </p>
                      {meta && (
                        <p className="mt-2 text-sm text-muted">{meta}</p>
                      )}
                      <span className="mt-5 inline-block underline underline-offset-4">
                        View project &rarr;
                      </span>
                    </div>

                    <div className="border border-line bg-bg shadow-xl">
                      <div
                        className="flex gap-1.5 border-b border-line px-3 py-2"
                        aria-hidden="true"
                      >
                        <span className="h-2.5 w-2.5 rounded-full bg-line" />
                        <span className="h-2.5 w-2.5 rounded-full bg-line" />
                        <span className="h-2.5 w-2.5 rounded-full bg-line" />
                      </div>
                      <div className="aspect-[4/3] max-h-[34svh] w-full overflow-hidden bg-surface md:max-h-[50svh]">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={`${p.title} website`}
                            className="h-full w-full object-cover object-top"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center font-display text-6xl text-muted">
                            {i + 1}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* sneak peek banner for the remaining projects */}
      {rest.length > 0 && (
        <div className="border-t border-line bg-surface">
          <div className="wrap flex flex-col gap-5 py-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3" aria-hidden="true">
                {rest.slice(0, PEEK_COUNT).map((p) => (
                  <div
                    key={p.slug}
                    className="h-12 w-16 overflow-hidden rounded-sm border-2 border-surface bg-bg"
                  >
                    {p.image && (
                      <img
                        src={p.image}
                        alt=""
                        className="h-full w-full object-cover object-top"
                      />
                    )}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted md:text-base">
                Wanna browse more projects?
              </p>
            </div>

            <Link
              href="/work"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-base font-medium text-bg transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              View all projects
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

