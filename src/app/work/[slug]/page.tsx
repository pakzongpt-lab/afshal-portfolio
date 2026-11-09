import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/site";
import ProjectCover from "@/components/ProjectCover";
import { FadeUp, MaskImage, SplitLines } from "@/components/Reveal";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: `${p.name} — case study`, description: p.summary, alternates: { canonical: `/work/${p.slug}` } };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  const url = `https://${p.domain}`;

  return (
    <>
      <main id="main" className="px-5 pt-32 md:px-10 md:pt-40">
        <Link href="/#websites" className="label inline-flex items-center gap-2 transition-colors hover:text-ink">← All projects</Link>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.accent, boxShadow: `0 0 20px ${p.accent}` }} />
          <span className="label">{p.industry}{p.place ? ` · ${p.place}` : ""}</span>
        </div>
        <SplitLines as="h1" className="display mt-6 text-[14vw] md:text-[9vw]" lines={p.name.split(" & ").length > 1 ? [p.name.split(" & ")[0] + " &", p.name.split(" & ")[1]] : [p.name]} />

        <div className="mt-12 grid gap-8 border-y border-line py-8 md:grid-cols-4">
          <Meta k="Role" v={p.role.join(", ")} />
          <Meta k="Industry" v={p.industry} />
          <Meta k="Built with" v={p.tech.join(", ")} />
          <div>
            <div className="label">Live site</div>
            <a href={url} target="_blank" rel="noopener noreferrer" className="group mt-2 inline-flex items-center gap-2 text-lg">
              <span className="border-b border-white/30 transition-colors group-hover:border-accent group-hover:text-accent">{p.domain}</span> ↗
            </a>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-[28px] border border-line">
          {p.cover && !p.cover.includes("/logo-") ? (
            <MaskImage src={p.cover} alt={`${p.name} website`} className="aspect-[16/9] md:aspect-[21/9]" imgClass="object-top" />
          ) : (
            <div className="aspect-[16/9] md:aspect-[21/9]"><ProjectCover p={p} /></div>
          )}
        </div>

        <section className="mt-24 grid gap-10 md:mt-32 md:grid-cols-12">
          <div className="label md:col-span-3">Overview</div>
          <FadeUp className="space-y-6 md:col-span-8">
            {p.overview.map((o, k) => (
              <p key={k} className={k === 0 ? "text-[clamp(1.5rem,3vw,2.6rem)] leading-[1.15] tracking-tight" : "text-lg leading-relaxed text-mute md:text-xl"}>{o}</p>
            ))}
          </FadeUp>
        </section>

        {p.approach.length > 0 && (
          <section className="mt-24 grid gap-10 md:grid-cols-12">
            <div className="label md:col-span-3">Approach</div>
            <ol className="grid gap-px overflow-hidden rounded-[24px] border border-line bg-line md:col-span-9 md:grid-cols-3">
              {p.approach.map((a, k) => (
                <FadeUp key={k} delay={k * 0.06} className="bg-bg p-6 md:p-8">
                  <li>
                    <span className="display text-5xl" style={{ color: p.accent }}>0{k + 1}</span>
                    <p className="mt-6 leading-relaxed text-ink/85">{a}</p>
                  </li>
                </FadeUp>
              ))}
            </ol>
          </section>
        )}

        {p.features.length > 0 && (
          <section className="mt-24 grid gap-10 md:grid-cols-12">
            <div className="label md:col-span-3">Features</div>
            <ul className="md:col-span-9">
              {p.features.map((f, k) => (
                <FadeUp key={k} delay={k * 0.03}>
                  <li className="flex gap-6 border-b border-line py-5 text-lg md:text-xl">
                    <span className="label pt-1.5">{String(k + 1).padStart(2, "0")}</span>
                    {f}
                  </li>
                </FadeUp>
              ))}
            </ul>
          </section>
        )}

        {p.gallery.length > 0 && (
          <section className="mt-24 space-y-4 md:mt-32">
            {p.gallery.map((g) => (
              <MaskImage key={g.src} src={g.src} alt={g.alt} className="rounded-[24px] border border-line bg-white" imgClass="!h-auto" />
            ))}
          </section>
        )}

        <Link href={`/work/${next.slug}`} data-cursor="Next" className="group mt-32 block border-t border-line py-16 md:py-24">
          <div className="label">Next project</div>
          <div className="display mt-6 text-[13vw] transition-colors duration-500 group-hover:text-accent md:text-[8vw]">{next.name} →</div>
        </Link>
      </main>
      <Footer />
    </>
  );
}

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="label">{k}</div>
      <div className="mt-2 text-lg">{v}</div>
    </div>
  );
}
