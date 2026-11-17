"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { nav } from "@/lib/content";

export default function MobileMenu() {
  const ref = useRef(null);
  useEffect(() => {
    const closeOutside = (event) => {
      if (!ref.current?.contains(event.target)) ref.current?.removeAttribute("open");
    };
    const escape = (event) => {
      if (event.key === "Escape" && ref.current?.open) {
        ref.current.removeAttribute("open");
        ref.current.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", escape);
    };
  }, []);
  return (
    <details ref={ref} className="mobile-menu">
      <summary aria-label="Open navigation menu"><span>Menu</span><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 8h16M4 16h16" /></svg></summary>
      <nav aria-label="Mobile navigation">
        {nav.map((item) => <Link key={item.href} href={item.href === "/#work" ? "/work" : item.href} onClick={() => ref.current?.removeAttribute("open")}>{item.label}<span aria-hidden="true">↗</span></Link>)}
        <Link href="/enquire" onClick={() => ref.current?.removeAttribute("open")}>Tell me about your project <span aria-hidden="true">↗</span></Link>
      </nav>
    </details>
  );
}
