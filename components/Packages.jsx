import { packages, packagesIntro } from "@/lib/content";

export default function Packages() {
  return (
    <section id="packages" className="section bg-surface">
      <div className="wrap">
        <h2 className="text-3xl md:text-4xl">Packages</h2>
        <p className="mt-3 max-w-xl text-muted">{packagesIntro}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {packages.map((p) => (
            <article key={p.id} className={`flex flex-col border bg-bg p-6 ${p.featured ? "border-ink" : "border-line"}`}>
              <h3 className="text-2xl">{p.name}</h3>
              <p className="mt-1 text-lg">{p.price}</p>
              <p className="mt-3 text-muted">{p.tagline}</p>
              <dl className="mt-5 space-y-2 text-sm">
                <div><dt className="inline font-medium">Best for: </dt><dd className="inline">{p.forWho}</dd></div>
                <div><dt className="inline font-medium">Timeline: </dt><dd className="inline">{p.timeline}</dd></div>
                <div><dt className="inline font-medium">Size: </dt><dd className="inline">{p.pages}</dd></div>
              </dl>
              <h4 className="mt-5 font-medium">Included</h4>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{p.includes.map((i) => <li key={i}>{i}</li>)}</ul>
              {p.notIncluded?.length > 0 && (<>
                <h4 className="mt-5 font-medium">Not included</h4>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">{p.notIncluded.map((i) => <li key={i}>{i}</li>)}</ul>
              </>)}
              {p.addOns?.length > 0 && (<>
                <h4 className="mt-5 font-medium">Add-ons</h4>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{p.addOns.map((i) => <li key={i}>{i}</li>)}</ul>
              </>)}
              <a href={`/?package=${p.id}#enquire`} className="btn mt-auto self-start">Enquire about this</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
