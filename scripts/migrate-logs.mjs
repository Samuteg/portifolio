import { JSDOM } from "jsdom";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const BLOG_ORIGIN = "https://samuteg-dev.vercel.app";
const OUT_DIR = "content/logs";
const FEED_PATH = "/tmp/opencode/blog-rss.xml";
const REPORT_ONLY = process.argv.includes("--report");
const slugFilter = process.argv.find((a) => a.startsWith("--slug="))?.slice(7)?.split(",");

const decode = (s) =>
  s
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");

const abs = (src) => (src?.startsWith("/") ? `${BLOG_ORIGIN}${src}` : src ?? "");

const fetchWithRetry = async (url, tries = 5) => {
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return res;
      lastErr = new Error(`HTTP ${res.status}`);
    } catch (e) {
      lastErr = e;
    }
    await new Promise((r) => setTimeout(r, 2000 * (i + 1)));
  }
  throw lastErr;
};

const inline = (node) => {
  let out = "";
  for (const child of node.childNodes) {
    if (child.nodeType === 3) {
      out += child.textContent.replace(/\s+/g, " ");
    } else if (child.nodeType === 1) {
      const tag = child.tagName.toLowerCase();
      if (tag === "code") out += "`" + child.textContent + "`";
      else if (tag === "strong" || tag === "b") out += `**${inline(child)}**`;
      else if (tag === "em" || tag === "i") out += `*${inline(child)}*`;
      else if (tag === "a") out += `[${inline(child)}](${child.getAttribute("href")})`;
      else if (tag === "br") out += " ";
      else if (tag === "img") out += `![${child.getAttribute("alt") ?? ""}](${abs(child.getAttribute("src"))})`;
      else out += inline(child);
    }
  }
  return out.replace(/\s+([.,;:!?)\]])/g, "$1").replace(/([(\[]) /g, "$1");
};

const domToMarkdown = (root) => {
  const lines = [];
  for (const el of root.children) {
    const tag = el.tagName.toLowerCase();
    if (tag === "p") {
      const text = inline(el).trim();
      if (text) lines.push(text, "");
    } else if (tag === "h2" || tag === "h3" || tag === "h4") {
      lines.push(`${"#".repeat(Number(tag[1]))} ${inline(el).trim()}`, "");
    } else if (tag === "ul") {
      for (const li of el.children) lines.push(`- ${inline(li).trim()}`);
      lines.push("");
    } else if (tag === "ol") {
      let i = 1;
      for (const li of el.children) lines.push(`${i++}. ${inline(li).trim()}`);
      lines.push("");
    } else if (tag === "pre") {
      const code = el.querySelector("code");
      const lang = el.getAttribute("data-language") ?? "";
      lines.push("```" + lang, (code ?? el).textContent.trimEnd(), "```", "");
    } else if (tag === "blockquote") {
      const paras = [...el.querySelectorAll("p")];
      if (paras.length) for (const p of paras) lines.push(`> ${inline(p).trim()}`);
      else lines.push(`> ${inline(el).trim()}`);
      lines.push("");
    } else if (tag === "hr") {
      lines.push("---", "");
    } else if (tag === "table") {
      for (const tr of el.querySelectorAll("tr")) {
        lines.push(
          "| " + [...tr.querySelectorAll("th,td")].map((c) => inline(c).trim()).join(" | ") + " |"
        );
      }
      lines.push("");
    } else if (tag === "div" || tag === "figure") {
      const inner = domToMarkdown(el);
      if (inner.trim()) lines.push(inner, "");
    }
  }
  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
};

const xml = readFileSync(FEED_PATH, "utf8");
const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
  .map((m) => ({
    title: decode(m[1].match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "").trim(),
    link: (m[1].match(/<link>([\s\S]*?)<\/link>/)?.[1] ?? "").trim(),
    description: decode(m[1].match(/<description>([\s\S]*?)<\/description>/)?.[1] ?? "").trim(),
    pubDate: (m[1].match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] ?? "").trim(),
  }))
  .filter((i) => i.title && i.link)
  .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

if (!REPORT_ONLY) mkdirSync(OUT_DIR, { recursive: true });

const report = [];
for (const item of items) {
  const slug = new URL(item.link).pathname.replace(/\/+$/, "").split("/").pop();
  if (slugFilter && !slugFilter.includes(slug)) continue;
  try {
    if (!REPORT_ONLY && existsSync(join(OUT_DIR, `${slug}.md`))) {
      report.push(`SKIP    ${slug} (ja migrado)`);
      continue;
    }
    const fetchUrl = `${BLOG_ORIGIN}${new URL(item.link).pathname}`;
    const res = await fetchWithRetry(fetchUrl);
    const html = await res.text();
    const doc = new JSDOM(html).window.document;
    const prose = doc.querySelector("#prose-content");
    if (!prose) {
      report.push(`NO PROSE  ${slug}`);
      continue;
    }
    const tags = [...doc.querySelectorAll('a[href^="/blog?tag="]')]
      .map((a) => a.textContent.trim().toLowerCase())
      .filter(Boolean);
    const imgs = [...prose.querySelectorAll("img")].map((i) => abs(i.getAttribute("src")));

    const hero = doc.querySelector("article img");
    let imagePath = "";
    let heroAlt = "";
    if (hero) {
      const heroSrc = abs(hero.getAttribute("src"));
      heroAlt = (hero.getAttribute("alt") ?? "").trim();
      const ext = heroSrc.split(".").pop()?.replace(/\?.*$/, "") || "webp";
      const imgRes = await fetchWithRetry(heroSrc);
      const buf = Buffer.from(await imgRes.arrayBuffer());
      mkdirSync("public/log-images", { recursive: true });
      imagePath = `/log-images/${slug}.${ext}`;
      writeFileSync(`public${imagePath}`, buf);
    }

    const date = new Date(item.pubDate).toISOString().slice(0, 10);
    const md = domToMarkdown(prose);

    if (REPORT_ONLY) {
      report.push(
        `${md.length.toString().padStart(6)}B  img:${imgs.length}  ${date}  ${slug}  [${tags.join(", ")}]`
      );
      continue;
    }

    const front = [
      "---",
      `title: "${item.title.replace(/"/g, '\\"')}"`,
      `date: ${date}`,
      `description: "${item.description.replace(/"/g, '\\"').replace(/\n/g, " ")}"`,
      ...(imagePath
        ? [
            `image: ${imagePath}`,
            `imageAlt: "${heroAlt.replace(/"/g, '\\"')}"`,
          ]
        : []),
      `tags: [${tags.join(", ")}]`,
      "---",
      "",
    ].join("\n");
    writeFileSync(join(OUT_DIR, `${slug}.md`), `${front}${md}\n`);
    report.push(`WROTE ${slug} (${md.length}B, ${imgs.length} inline, hero: ${imagePath || "nenhuma"})`);
  } catch (err) {
    report.push(`ERROR ${slug}: ${err.message}`);
  }
  await new Promise((r) => setTimeout(r, 600));
}
console.log(report.join("\n"));
