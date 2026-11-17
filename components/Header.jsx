import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";
import { site, nav } from "@/lib/content";

export default function Header() {
  return (
    <header id="page-top" className="site-header border-b border-line">
      <div className="wrap flex items-center justify-between py-4">
        <Link href="/" className="site-brand font-display text-xl">{site.name}</Link>
        <nav className="hidden gap-6 md:flex" aria-label="Main">
          {nav.map((n) => <Link key={n.href} href={n.href === "/#work" ? "/work" : n.href}>{n.label}</Link>)}
        </nav>
        <Link href="/enquire" className="header-enquire btn">Tell me about your project</Link>
        <MobileMenu />
      </div>
    </header>
  );
}


