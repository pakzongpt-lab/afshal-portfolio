import { FadeUp, SplitLines } from "../Reveal";
import Icon from "../ui/Icon";
import { results, testimonials } from "@/data/v2";

/** Client quotes and results. Renders nothing until real entries exist in data/v2.ts. */
export default function Proof() {
  if (!testimonials.length && !results.length) return null;
  return (
    <section id="clients-say" className="relative px-5 py-24 md:px-10 md:py-32">
      <SplitLines className="display text-[12vw] md:text-[5.6vw]" lines={["What clients say"]} />
      {results.length > 0 && (
        <div className="mt-12 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {results.map((r) => (
            <FadeUp key={r.client + r.metric} className="bg-bg p-6 md:p-8">
              <div className="display text-4xl text-accent md:text-5xl">{r.metric}</div>
              <div className="mt-3 text-lg">{r.client}</div>
              <p className="mt-1 text-mute">{r.detail}</p>
            </FadeUp>
          ))}
        </div>
      )}
      {testimonials.length > 0 && (
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <FadeUp key={t.name} delay={i * 0.06}>
              <figure className="h-full rounded-[24px] border border-line p-6 md:p-8">
                <Icon name="Quote" className="h-6 w-6 text-accent" />
                <blockquote className="mt-4 text-lg leading-relaxed">{t.quote}</blockquote>
                <figcaption className="mt-6 text-sm text-mute"><span className="text-ink">{t.name}</span> · {t.role}, {t.company}</figcaption>
              </figure>
            </FadeUp>
          ))}
        </div>
      )}
    </section>
  );
}
