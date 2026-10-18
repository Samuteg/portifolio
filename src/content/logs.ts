export type LogPost = {
  slug: string;
  title: string;
  date: Date | null;
  description: string;
  image?: string;
  imageAlt?: string;
  tags: string[];
  body: string;
};

const modules = import.meta.glob("../../content/logs/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const unquote = (value: string) => value.replace(/^"(.*)"$/, "$1");

const parseMeta = (raw: string): { meta: Record<string, string>; body: string } => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([a-zA-Z-]+):\s*(.*)$/);
    if (kv) meta[kv[1].toLowerCase()] = kv[2].trim();
  }
  return { meta, body: match[2] };
};

const parsePost = (path: string, raw: string): LogPost => {
  const { meta, body } = parseMeta(raw);
  const parsedDate = meta.date ? new Date(`${meta.date}T00:00:00Z`) : null;
  return {
    slug: (path.split("/").pop() ?? "").replace(/\.md$/, ""),
    title: unquote(meta.title ?? "Sem título"),
    date: parsedDate && !Number.isNaN(parsedDate.getTime()) ? parsedDate : null,
    description: unquote(meta.description ?? ""),
    image: meta.image || undefined,
    imageAlt: meta.imageAlt ? unquote(meta.imageAlt) : undefined,
    tags: (meta.tags ?? "")
      .replace(/^\[|\]$/g, "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    body: body.trim(),
  };
};

export const logPosts: LogPost[] = Object.entries(modules)
  .map(([path, raw]) => parsePost(path, raw))
  .sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0));

export const logPostBySlug = (slug: string) =>
  logPosts.find((post) => post.slug === slug);

export const formatLogDate = (date: Date) =>
  date
    .toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })
    .replace(/de\s/g, "")
    .replace(/\./g, "");
