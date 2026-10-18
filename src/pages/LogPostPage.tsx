import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { ArrowLeft } from "lucide-react";
import PageTransition from "../components/PageTransition";
import { formatLogDate, logPostBySlug, logPosts } from "../content/logs";

type LogPostPageProps = {
  slug: string;
};

const BASE_TITLE = "Samuel | Desenvolvedor Full-Stack";

const markdownComponents = {
  h2: ({ children }: React.ComponentProps<"h2">) => (
    <h2 className="section-title mt-10 mb-3 pb-2 border-b border-line">{children}</h2>
  ),
  h3: ({ children }: React.ComponentProps<"h3">) => (
    <h3 className="font-sans font-semibold text-ink text-base mt-8 mb-2">{children}</h3>
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
};

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

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} — Samuel`;
    const meta = document.querySelector('meta[name="description"]');
    meta?.setAttribute("content", post.description);
    return () => {
      document.title = BASE_TITLE;
    };
  }, [post]);

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
          <header className="flex items-center justify-between border-b border-line px-4 sm:px-6 py-3">
            <a
              href="/#devlogs"
              className="group inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-ink-mute hover:text-accent-text transition-colors"
            >
              <ArrowLeft
                size={14}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-x-0.5"
              />
              todos os logs
            </a>
            {post.date && <span className="meta">{formatLogDate(post.date)}</span>}
          </header>

          <article className="max-w-3xl px-4 sm:px-6 py-10 pb-16">
            <h1 className="page-title mb-4">{post.title}</h1>
            <p className="text-ink-soft text-base leading-relaxed mb-5">{post.description}</p>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-8 pb-8 border-b border-line">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {post.image && (
              <figure className="mb-8 border border-line rounded-lg overflow-hidden bg-card2">
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
