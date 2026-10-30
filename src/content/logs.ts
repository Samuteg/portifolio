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

const MONTHS = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

export const formatLogDateLong = (date: Date) =>
  `${date.getUTCDate()} de ${MONTHS[date.getUTCMonth()]} de ${date.getUTCFullYear()}`;

export const logReadingTime = (body: string) => {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

export type LogHeading = {
  id: string;
  text: string;
  level: 2 | 3;
  line: number;
};

export const slugifyHeading = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const headingText = (raw: string) =>
  raw
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .replace(/<[^>]+>/g, "")
    .trim();

export const extractLogHeadings = (body: string): LogHeading[] => {
  const headings: LogHeading[] = [];
  const seen = new Map<string, number>();
  let inFence = false;

  body.split(/\r?\n/).forEach((line, index) => {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      return;
    }
    if (inFence) return;

    const match = line.match(/^(#{2,3})\s+(.+?)\s*#*\s*$/);
    if (!match) return;

    const text = headingText(match[2]);
    if (!text) return;

    const base = slugifyHeading(text) || `secao-${index + 1}`;
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);

    headings.push({
      id: count === 0 ? base : `${base}-${count + 1}`,
      text,
      level: match[1].length as 2 | 3,
      line: index + 1,
    });
  });

  return headings;
};
