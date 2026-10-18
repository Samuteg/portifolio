import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import PageTransition from "../components/PageTransition";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";
import { formatLogDate, logPosts } from "../content/logs";

const PREVIEW_COUNT = 4;

const cellDivider = (i: number) =>
  [
    "border-line",
    i % 2 === 0 && "md:border-r",
    i !== 0 && "border-t md:border-t-0",
    i >= 2 && "md:border-t",
  ]
    .filter(Boolean)
    .join(" ");

const DevLogsPage = () => {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? logPosts : logPosts.slice(0, PREVIEW_COUNT);

  return (
    <PageTransition>
      <section className="page-section">
        <div className="frame border-b border-line">
          <SectionHeader
            eyebrow="arquivos"
            title="Dev Logs"
            description="Artigos e registros sobre o que estou construindo e aprendendo — escritos aqui mesmo, no blog do portfólio."
            action={
              <button
                type="button"
                onClick={() => setShowAll((prev) => !prev)}
                aria-expanded={showAll}
                className="group inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-ink-mute hover:text-accent-text transition-colors"
              >
                {showAll ? "ver menos" : `ver todos (${logPosts.length})`}
                <ChevronDown
                  size={13}
                  aria-hidden="true"
                  className={`transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
                />
              </button>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-line">
            {visible.map((post, i) => (
              <div key={post.slug} className={cellDivider(i)}>
                <Reveal delay={Math.min(i, 3)} className="h-full">
                  <a
                    href={`/log/${post.slug}`}
                    className="group flex h-full w-full flex-col px-4 sm:px-6 py-6 hover:bg-wash transition-colors"
                  >
                    {post.date && <p className="meta mb-2.5">{formatLogDate(post.date)}</p>}
                    <h3 className="section-title mb-2 group-hover:text-accent-text transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-ink-soft text-sm leading-relaxed line-clamp-2 mb-4">
                      {post.description}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-ink-mute group-hover:text-accent-text transition-colors">
                      ler artigo
                      <ArrowUpRight
                        size={12}
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </a>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default DevLogsPage;
