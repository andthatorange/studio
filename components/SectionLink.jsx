import Link from "next/link";

export default function SectionLink({ href, label }) {
  return <div className="section-route-link wrap"><Link href={href}>{label}<span aria-hidden="true">↗</span></Link></div>;
}
