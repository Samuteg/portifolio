import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import PageTransition from "../components/PageTransition";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";

const BLOG_URL = "https://samuteg-dev.vercel.app/";
const FEED_PATH = "/blog-feed.xml";

type Post = {
  title: string;
  url: string;
  description: string;
  date: Date | null;
};

const fallbackPosts: Post[] = [
  {
    title: "Menos brilho, mais tipografia: o redesign editorial do SamutegDev",
    url: "https://samuteg-dev.vercel.app/blog/menos-brilho-mais-tipografia-o-redesign-editorial-do-samuteg-dev/",
    description: "Você está lendo este post dentro do próprio redesign. Essa é a melhor forma de mostrar a mudança.",
    date: new Date("2026-10-12T00:00:00Z"),
  },
  {
    title: "TaskNest: refatorando um SaaS de gestão de tarefas com type-safety de ponta a ponta",
    url: "https://samuteg-dev.vercel.app/blog/task-nest-refatorando-um-saa-s-de-gestao-de-tarefas-com-type-safety-de-ponta-a-ponta/",
    description: "Recentemente refatorei o TaskNest, minha plataforma SaaS de gestão de tarefas.",
    date: new Date("2026-10-07T00:00:00Z"),
  },
  {
    title: "Exercício em Go: calculando médias de uma turma",
    url: "https://samuteg-dev.vercel.app/blog/exercicio-em-go-calculando-medias-de-uma-turma/",
    description: "Neste exercício, desenvolvi um pequeno sistema em Go para representar alunos, disciplinas e notas.",
    date: new Date("2026-09-28T00:00:00Z"),
  },
  {
    title: "Structs em Go: organizando dados de forma clara",
    url: "https://samuteg-dev.vercel.app/blog/structs-em-go-organizando-dados-de-forma-clara/",
    description: "Structs são uma das principais ferramentas de Go para representar entidades e agrupar diferentes tipos de dados em uma única estrutura.",
    date: new Date("2026-09-25T00:00:00Z"),
  },
];

const toBlogUrl = (raw: string): string => {
  try {
    return new URL(new URL(raw).pathname, BLOG_URL).toString();
  } catch {
    return raw;
  }
};

const parseFeed = (xml: string): Post[] =>
  Array.from(new DOMParser().parseFromString(xml, "text/xml").querySelectorAll("item"))
    .map((item) => {
      const rawDate = item.querySelector("pubDate")?.textContent?.trim() ?? "";
      const parsedDate = rawDate ? new Date(rawDate) : null;
      return {
        title: item.querySelector("title")?.textContent?.trim() ?? "",
        url: toBlogUrl(item.querySelector("link")?.textContent?.trim() ?? ""),
        description: item.querySelector("description")?.textContent?.trim() ?? "",
        date: parsedDate && !Number.isNaN(parsedDate.getTime()) ? parsedDate : null,
      };
    })
    .filter((post) => post.title && post.url)
    .sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0))
    .slice(0, 4);

const formatDate = (date: Date) =>
  date
    .toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })
    .replace(/de\s/g, "")
    .replace(/\./g, "");

const cellDivider = (i: number) =>
  [
    "border-line",
    i % 2 === 0 && "md:border-r",
    i !== 0 && "border-t md:border-t-0",
    i >= 2 && "md:border-t",
  ]
    .filter(Boolean)
    .join(" ");

const SkeletonCell = ({ i }: { i: number }) => (
  <div className={cellDivider(i)}>
    <div className="px-4 sm:px-6 py-6" aria-hidden="true">
      <div className="h-2.5 w-20 rounded-full bg-line mb-4 animate-pulse" />
      <div className="h-4 w-3/4 rounded bg-line mb-3 animate-pulse" />
      <div className="h-3 w-full rounded bg-line mb-2 animate-pulse" />
      <div className="h-3 w-2/3 rounded bg-line animate-pulse" />
    </div>
  </div>
);

const DevLogsPage = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 6000);
    let settled = false;

    const settle = (value: Post[] | null) => {
      if (settled) return;
      settled = true;
      setPosts((prev) => prev ?? value ?? fallbackPosts);
    };

    try {
      fetch(FEED_PATH, { signal: controller.signal })
        .then((res) => (res.ok ? res.text() : Promise.reject(new Error("feed indisponível"))))
        .then((xml) => settle(parseFeed(xml)))
        .catch(() => settle(null))
        .finally(() => window.clearTimeout(timeout));
    } catch {
      settle(null);
      window.clearTimeout(timeout);
    }

    return () => {
      settled = true;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  return (
    <PageTransition>
      <section className="page-section">
        <div className="frame border-b border-line">
          <SectionHeader
            eyebrow="direto do blog"
            title="Dev Logs"
            description="Artigos e registros sobre o que estou construindo e aprendendo — os textos mais recentes do meu blog."
            action={
              <a
                href={BLOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-ink-mute hover:text-accent-text transition-colors"
              >
                ver todos
                <ArrowUpRight
                  size={13}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            }
          />

          {posts === null ? (
            <div className="grid grid-cols-1 md:grid-cols-2 border-b border-line">
              {[0, 1, 2, 3].map((i) => (
                <SkeletonCell key={i} i={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 border-b border-line">
              {posts.map((post, i) => (
                <div key={post.url} className={cellDivider(i)}>
                  <Reveal delay={Math.min(i, 3)} className="h-full">
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full flex-col px-4 sm:px-6 py-6 hover:bg-wash transition-colors"
                    >
                      {post.date && <p className="meta mb-2.5">{formatDate(post.date)}</p>}
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
          )}
        </div>
      </section>
    </PageTransition>
  );
};

export default DevLogsPage;
