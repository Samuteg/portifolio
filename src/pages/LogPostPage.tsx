import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { ArrowLeft } from "lucide-react";
import PageTransition from "../components/PageTransition";
import {
  extractLogHeadings,
  formatLogDateLong,
  logPostBySlug,
  logPosts,
  logReadingTime,
  type LogHeading,
} from "../content/logs";

type LogPostPageProps = {
  slug: string;
};

type HeadingProps = React.ComponentProps<"h2"> & {
  node?: { position?: { start: { line: number } } };
};

const BASE_TITLE = "Samuel | Desenvolvedor Full-Stack";

const createMarkdownComponents = (ids: Map<number, string>) => ({
  h2: ({ children, node }: HeadingProps) => (
    <h2
      id={node?.position ? ids.get(node.position.start.line) : undefined}
      className="section-title mt-10 mb-3 pb-2 border-b border-line scroll-mt-24"
    >
      {children}
    </h2>
  ),
  h3: ({ children, node }: HeadingProps) => (
    <h3
      id={node?.position ? ids.get(node.position.start.line) : undefined}
      className="font-sans font-semibold text-ink text-base mt-8 mb-2 scroll-mt-24"
    >
      {children}
    </h3>
  ),
  p: ({ children }: React.ComponentProps<"p">) => (
    <p className="text-ink-soft text-[0.95rem] leading-relaxed mb-4">{children}</p>
  ),
  strong: ({ children }: React.ComponentProps<"strong">) => (
    <strong className="text-ink font-semibold">{children}</strong>
  ),
  a: ({ children, href }: React.ComponentProps<"a">) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent-text underline underline-offset-4"
    >
      {children}
    </a>
  ),
  ul: ({ children }: React.ComponentProps<"ul">) => (
    <ul className="list-disc pl-5 mb-4 space-y-1.5 text-ink-soft text-[0.95rem] leading-relaxed">
      {children}
    </ul>
  ),
  ol: ({ children }: React.ComponentProps<"ol">) => (
    <ol className="list-decimal pl-5 mb-4 space-y-1.5 text-ink-soft text-[0.95rem] leading-relaxed">
      {children}
    </ol>
  ),
  blockquote: ({ children }: React.ComponentProps<"blockquote">) => (
    <blockquote className="border-l border-dashed border-line-strong pl-4 my-5 text-ink-soft">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-line my-8" />,
  img: ({ alt, src }: React.ComponentProps<"img">) => (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="rounded-lg border border-line my-6 max-w-full h-auto"
    />
  ),
  pre: ({ children }: React.ComponentProps<"pre">) => (
    <pre className="blog-pre mb-5">{children}</pre>
  ),
  code: ({ className, children }: React.ComponentProps<"code">) =>
    className?.includes("language-") ? (
      <code className={className}>{children}</code>
    ) : (
      <code className="font-mono text-[0.85em] bg-wash border border-line rounded px-1.5 py-0.5 text-accent-text">
        {children}
      </code>
    ),
});

const TableOfContents = ({ headings, activeId }: { headings: LogHeading[]; activeId: string }) => (
  <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto px-6 py-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    <p className="meta mb-4">Neste artigo</p>
    <nav aria-label="Neste artigo" className="flex flex-col gap-1">
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          aria-current={activeId === heading.id ? "true" : undefined}
          className={`block py-1 text-[0.875rem] leading-snug transition-colors ${
            activeId === heading.id
              ? "text-accent-text"
              : "text-ink-soft hover:text-ink"
          }`}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  </div>
);

const PostNav = ({ post, direction }: { post: { slug: string; title: string }; direction: "older" | "newer" }) => (
  <a
    href={`/log/${post.slug}`}
    className="group flex flex-col gap-1.5 px-4 sm:px-6 py-5 hover:bg-wash transition-colors"
  >
    <span className="meta text-accent-text">{direction === "older" ? "← anterior" : "próximo →"}</span>
    <span className="card-title group-hover:text-accent-text transition-colors">{post.title}</span>
  </a>
);

const LogPostPage = ({ slug }: LogPostPageProps) => {
  const post = logPostBySlug(slug);
  const index = post ? logPosts.findIndex((p) => p.slug === slug) : -1;
  const newer = index > 0 ? logPosts[index - 1] : null;
  const older = post && index >= 0 && index < logPosts.length - 1 ? logPosts[index + 1] : null;

  const headings = useMemo(() => (post ? extractLogHeadings(post.body) : []), [post]);
  const headingIds = useMemo(
    () => new Map(headings.map((heading) => [heading.line, heading.id])),
    [headings]
  );
  const markdownComponents = useMemo(
    () => createMarkdownComponents(headingIds),
    [headingIds]
  );

  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} — Samuel`;
    const meta = document.querySelector('meta[name="description"]');
    meta?.setAttribute("content", post.description);
    return () => {
      document.title = BASE_TITLE;
    };
  }, [post]);

  useEffect(() => {
    if (headings.length === 0 || typeof IntersectionObserver === "undefined") return;
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [headings]);

  if (!post) {
    return (
      <PageTransition>
        <section className="page-section">
          <div className="frame border-x border-b border-line px-4 sm:px-6 py-20 text-center">
            <h1 className="page-title mb-3">Post não encontrado</h1>
            <p className="text-ink-soft text-sm mb-6">Esse dev log não existe ou foi removido.</p>
            <a href="/#devlogs" className="btn-primary">
              <ArrowLeft size={16} aria-hidden="true" />
              Voltar para os logs
            </a>
          </div>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <section className="page-section">
        <div className="frame border-x border-b border-line">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_19rem]">
            <article className="min-w-0 px-4 sm:px-8 py-8 pb-16">
              <a
                href="/#devlogs"
                className="group inline-flex items-center gap-2 rounded-lg border border-line-strong px-4 py-2.5 text-sm font-medium text-ink hover:border-ink-mute hover:bg-wash transition-colors"
              >
                <ArrowLeft
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-x-0.5"
                />
                Voltar
              </a>

              <p className="meta mt-10 mb-4 flex flex-wrap items-center gap-2">
                {post.date && <span>{formatLogDateLong(post.date)}</span>}
                {post.date && <span aria-hidden="true">•</span>}
                <span>{logReadingTime(post.body)} min de leitura</span>
              </p>

              <h1 className="page-title mb-5">{post.title}</h1>

              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {post.image && (
                <figure className="mt-8 mb-10 border border-line rounded-xl overflow-hidden bg-card2">
                  <img
                    src={post.image}
                    alt={post.imageAlt ?? post.title}
                    fetchPriority="high"
                    className="block mx-auto max-w-full h-auto"
                  />
                </figure>
              )}

              <div className="blog-prose">
                <ReactMarkdown rehypePlugins={[rehypeHighlight]} components={markdownComponents}>
                  {post.body}
                </ReactMarkdown>
              </div>
            </article>

            {headings.length > 0 && (
              <aside className="hidden lg:block border-l border-line">
                <TableOfContents headings={headings} activeId={activeId} />
              </aside>
            )}
          </div>

          {(older || newer) && (
            <nav aria-label="Navegação entre posts" className="border-t border-line grid grid-cols-1 sm:grid-cols-2">
              {older ? (
                <PostNav post={older} direction="older" />
              ) : (
                <div className="hidden sm:block border-r border-line" aria-hidden="true" />
              )}
              {newer && <PostNav post={newer} direction="newer" />}
            </nav>
          )}
        </div>
      </section>
    </PageTransition>
  );
};

export default LogPostPage;
