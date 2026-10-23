# Editor Keystatic (modo local) para os dev logs — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Um editor visual Keystatic em modo local (`pnpm dev` → `/keystatic`) para criar/editar posts em `content/logs/*.md` com upload de imagens, seguindo a estrutura TaskNest — sem mudar a arquitetura de leitura/build e sem nada do Keystatic no bundle de produção.

**Architecture:** Keystatic storage `{ kind: 'local' }` escreve os mesmos arquivos `.md` que o loader já consome; o parser caseiro do loader é estendido para aceitar o subset YAML que o Keystatic emite (block lists, scalars sem aspas); um middleware dev-only no Vite expõe a API do Keystatic em `/api/keystatic/*`; a página admin `/keystatic` é lazy e guardada por `import.meta.env.DEV` para ficar fora do build de produção.

**Tech Stack:** React 19 + Vite 7 + TypeScript strict; `@keystatic/core` (devDependency) com `fields.markdoc({ extension: 'md' })`; Vitest para o parser.

**Spec:** `docs/superpowers/specs/2026-10-23-keystatic-devlogs-design.md` — o plano argumenta a partir da spec; leia os dois antes de executar.

## Global Constraints

- `pnpm` é o único package manager suportado.
- Verificação: `pnpm lint && pnpm typecheck && pnpm build` tudo passa + `pnpm test` passa. Lint tem 2 warnings pré-existentes (`react-hooks/exhaustive-deps`, `react-hooks/set-state-in-effect`) que são seguros de ignorar.
- `@keystatic/core` entra em **devDependencies** (não pode vazar para o bundle de produção).
- Storage `{ kind: 'local' }` — zero OAuth/secrets/serverless. Nada de `github`/`cloud` storage.
- Não "consertar": `main.tsx` importa `./App.jsx` (legacy, funciona), `package.json` name `"porifolio"` (typo intencional).
- Sem comentários em código, exceto se absolutamente necessário.
- TypeScript strict; estilo de código segue os arquivos existentes.
- Posts antigos NÃO são reabertos no editor (reabrir reescreve frontmatter/re-serializa corpo).
- Qualquer arquivo `content/logs/*.md` é publicado automaticamente (glob eager) — template e artefatos de smoke ficam FORA dessa pasta.

## File Structure

| Arquivo | Responsabilidade |
| --- | --- |
| `keystatic.config.ts` (novo, raiz) | Config Keystatic: storage local, brand, collection `posts` com schema dos dev logs |
| `content/logs-template.md` (novo) | Skeleton TaskNest para novos posts; fora do glob → não publicado |
| `src/content/logs.ts` (modifica) | Parser de frontmatter estendido (flow + block lists, unquote, normalização de image, fix do bug `imageAlt`) |
| `src/test/logs.test.ts` (novo) | Testes unitários do parser |
| `vite.config.ts` (modifica) | Plugin dev-only com middleware `/api/keystatic/*` |
| `src/pages/KeystaticPage.tsx` (novo) | Página admin (lazy, dev-only) que renderiza `<Keystatic />` |
| `src/App.tsx` (modifica) | Branch de rota `/keystatic` dev-only antes da árvore normal |
| `src/pages/KeystaticPage.tsx` + `AGENTS.md` (modifica) | Documentação do workflow no final |

---

### Task 1: Parser do loader estendido (TDD)

Estende `src/content/logs.ts` para aceitar o YAML que o Keystatic escreve, sem quebrar os 22 posts existentes. Também corrige um bug pré-existente: o parser guarda chaves lowercase (`imagealt`), mas `parsePost` lia `meta.imageAlt` (A maiúsculo) — `imageAlt` nunca era carregado.

**Files:**
- Modify: `src/content/logs.ts` (seção de parsing, linhas 18–48)
- Test: `src/test/logs.test.ts` (criar)

**Interfaces:**
- Consumes: formato dos arquivos existentes em `content/logs/*.md` (frontmatter legacy).
- Produces: `export const parsePost = (path: string, raw: string): LogPost` — exportado para testes; usos posteriores (`logPosts`, `logPostBySlug`, `formatLogDate`) inalterados. `LogPost` não muda de forma.

- [ ] **Step 1: Write the failing test**

Criar `src/test/logs.test.ts` (importa vitest explicitamente, como os testes existentes em `src/test/`):

```ts
import { describe, it, expect } from "vitest";
import { parsePost } from "../content/logs";

const raw = (frontmatter: string, body = "Corpo do post.") =>
  `---\n${frontmatter}\n---\n${body}`;

describe("parsePost — frontmatter", () => {
  it("parseia o formato legado: scalars com aspas e tags em flow style", () => {
    const post = parsePost(
      "content/logs/legado.md",
      raw(
        [
          'title: "Post legado"',
          "date: 2026-10-07",
          'description: "Descrição legada"',
          "image: /log-images/legado.webp",
          'imageAlt: "Alt legado"',
          "tags: [go, web]",
        ].join("\n")
      )
    );
    expect(post.slug).toBe("legado");
    expect(post.title).toBe("Post legado");
    expect(post.date?.toISOString()).toBe("2026-10-07T00:00:00.000Z");
    expect(post.description).toBe("Descrição legada");
    expect(post.image).toBe("/log-images/legado.webp");
    expect(post.imageAlt).toBe("Alt legado");
    expect(post.tags).toEqual(["go", "web"]);
    expect(post.body).toBe("Corpo do post.");
  });

  it("parseia o formato keystatic: scalars sem aspas e tags em block list", () => {
    const post = parsePost(
      "content/logs/keystatic.md",
      raw(
        [
          "title: Post keystatic",
          "date: 2026-10-23",
          "description: Descrição nova",
          "image: keystatic.webp",
          'imageAlt: "Alt novo"',
          "tags:",
          "  - keystatic",
          "  - editor",
        ].join("\n")
      )
    );
    expect(post.title).toBe("Post keystatic");
    expect(post.date?.toISOString()).toBe("2026-10-23T00:00:00.000Z");
    expect(post.description).toBe("Descrição nova");
    expect(post.tags).toEqual(["keystatic", "editor"]);
    expect(post.image).toBe("/log-images/keystatic.webp");
    expect(post.imageAlt).toBe("Alt novo");
  });

  it("normaliza image gravada com prefixo public/", () => {
    const post = parsePost(
      "c.md",
      raw(["title: C", 'image: "public/log-images/c.webp"'].join("\n"))
    );
    expect(post.image).toBe("/log-images/c.webp");
  });

  it("mantém image que já começa com /", () => {
    const post = parsePost(
      "d.md",
      raw(["title: D", 'image: "/log-images/d.webp"'].join("\n"))
    );
    expect(post.image).toBe("/log-images/d.webp");
  });

  it("arquivo sem frontmatter vira corpo puro", () => {
    const post = parsePost("e.md", "Só texto.");
    expect(post.body).toBe("Só texto.");
    expect(post.title).toBe("Sem título");
    expect(post.date).toBeNull();
    expect(post.tags).toEqual([]);
    expect(post.image).toBeUndefined();
  });

  it("tags vazias produzem lista vazia", () => {
    const post = parsePost("f.md", raw(["title: F", "tags: []"].join("\n")));
    expect(post.tags).toEqual([]);
  });

  it("itens de block list com aspas são unquoted", () => {
    const post = parsePost(
      "g.md",
      raw(["title: G", "tags:", '  - "react 19"'].join("\n"))
    );
    expect(post.tags).toEqual(["react 19"]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- src/test/logs.test.ts`
Expected: FAIL — `parsePost` não é exportado de `src/content/logs.ts` (erro de import "No matching export").

- [ ] **Step 3: Write minimal implementation**

Substituir as linhas 18–48 de `src/content/logs.ts` (de `const unquote` até o fim de `parsePost`) por:

```ts
const unquote = (value: string) => value.replace(/^["'](.*)["']$/, "$1");

type MetaValue = string | string[];

const parseMeta = (raw: string): { meta: Record<string, MetaValue>; body: string } => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta: Record<string, MetaValue> = {};
  let listKey: string | null = null;
  for (const line of match[1].split(/\r?\n/)) {
    const item = line.match(/^\s+-\s*(.*)$/);
    if (item && listKey) {
      const current = meta[listKey];
      meta[listKey] = [
        ...(Array.isArray(current) ? current : []),
        unquote(item[1].trim()),
      ];
      continue;
    }
    const kv = line.match(/^([a-zA-Z-]+):\s*(.*)$/);
    if (kv) {
      const key = kv[1].toLowerCase();
      const value = kv[2].trim();
      listKey = key;
      if (value === "") {
        meta[key] = [];
      } else if (value.startsWith("[") && value.endsWith("]")) {
        meta[key] = value
          .slice(1, -1)
          .split(",")
          .map((entry) => unquote(entry.trim()))
          .filter(Boolean);
      } else {
        meta[key] = unquote(value);
      }
    } else {
      listKey = null;
    }
  }
  return { meta, body: match[2] };
};

const scalar = (meta: Record<string, MetaValue>, key: string) => {
  const value = meta[key];
  return typeof value === "string" ? value : "";
};

const list = (meta: Record<string, MetaValue>, key: string) => {
  const value = meta[key];
  return Array.isArray(value) ? value : [];
};

const normalizeImage = (image: string) => {
  if (!image) return undefined;
  if (image.startsWith("/")) return image;
  return `/log-images/${image.replace(/^public\//, "")}`;
};

export const parsePost = (path: string, raw: string): LogPost => {
  const { meta, body } = parseMeta(raw);
  const dateValue = scalar(meta, "date");
  const parsedDate = dateValue ? new Date(`${dateValue}T00:00:00Z`) : null;
  return {
    slug: (path.split("/").pop() ?? "").replace(/\.md$/, ""),
    title: scalar(meta, "title") || "Sem título",
    date: parsedDate && !Number.isNaN(parsedDate.getTime()) ? parsedDate : null,
    description: scalar(meta, "description"),
    image: normalizeImage(scalar(meta, "image")),
    imageAlt: scalar(meta, "imagealt") || undefined,
    tags: list(meta, "tags"),
    body: body.trim(),
  };
};
```

Notas de comportamento (todas cobertas pelos testes):
- Valores são unquoted no parse (`"..."` e `'...'`), não mais no `parsePost`.
- `tags: [a, b]` (flow) e `tags:` + `  - item` (block) viram `string[]`.
- `image` sem `/` inicial ganha prefixo `/log-images/`; prefixo `public/` é removido — cobre os formatos que o `fields.image` pode gravar e os paths legados.
- `imageAlt` agora lê a chave lowercase (bug fix).
- O resto do arquivo (`LogPost`, `modules`, `logPosts`, `logPostBySlug`, `formatLogDate`) permanece idêntico.

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test`
Expected: PASS — novo `logs.test.ts` e TODOS os testes existentes passam (a suíte renderiza posts reais via loader, então posts legados quebrariam se o parser regredisse).

- [ ] **Step 5: Lint + typecheck**

Run: `pnpm lint && pnpm typecheck`
Expected: sem novos erros (2 warnings pré-existentes podem aparecer).

- [ ] **Step 6: Commit**

```bash
git add src/content/logs.ts src/test/logs.test.ts
git commit -m "feat: parse keystatic-style yaml frontmatter in logs loader"
```

---

### Task 2: Dependência + keystatic.config.ts + template TaskNest

**Files:**
- Create: `keystatic.config.ts` (raiz do repo)
- Create: `content/logs-template.md`
- Modify: `package.json` (via `pnpm add -D`), `tsconfig.json` (include)

**Interfaces:**
- Consumes: schema de frontmatter documentado no AGENTS.md (`title`/`date`/`description`/`image`/`imageAlt`/`tags`).
- Produces: `export default config(...)` de `keystatic.config.ts` — consumido por Task 3 (middleware) e Task 4 (página admin). Collection `posts` com `format: { data: 'yaml', contentField: 'content' }` gravando `content/logs/<slug>.md`.

- [ ] **Step 1: Install the dev dependency**

Run: `pnpm add -D @keystatic/core`
Expected: instala `@keystatic/core` (0.5.x) em devDependencies. Peer deps react/react-dom já satisfeitas.

- [ ] **Step 2: Add keystatic.config.ts to tsconfig include**

Em `tsconfig.json`, trocar a linha:

```json
  "include": ["src", "vite-env.d.ts", "vite.config.ts"],
```

por:

```json
  "include": ["src", "vite-env.d.ts", "vite.config.ts", "keystatic.config.ts"],
```

- [ ] **Step 3: Create keystatic.config.ts**

```ts
import { collection, config, fields } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  ui: {
    brand: { name: "Samuteg" },
  },
  collections: {
    posts: collection({
      label: "Dev Logs",
      path: "content/logs/*",
      slugField: "title",
      entryLayout: "content",
      format: { data: "yaml", contentField: "content" },
      template: "content/logs-template.md",
      schema: {
        title: fields.slug({ name: { label: "Título" } }),
        date: fields.date({ label: "Data", validation: { isRequired: true } }),
        description: fields.text({
          label: "Descrição",
          validation: { isRequired: true },
        }),
        image: fields.image({
          label: "Imagem hero",
          directory: "public/log-images",
          publicPath: "/log-images",
        }),
        imageAlt: fields.text({ label: "Alt da imagem" }),
        tags: fields.array(fields.text({ label: "Tag" }), { label: "Tags" }),
        content: fields.markdoc({ label: "Conteúdo", extension: "md" }),
      },
    }),
  },
});
```

Pontos-chave: `fields.markdoc({ extension: "md" })` mantém os arquivos `.md` (não `.mdoc`); `template` aponta para fora do glob da collection — se o Keystatic rejeitar esse path, a validação acontece no smoke (Task 5) e o fallback é remover a linha `template` (skeleton fica só como referência no AGENTS.md).

- [ ] **Step 4: Create content/logs-template.md**

Arquivo completo (frontmatter + skeleton TaskNest). Os textos em itálico entre parênteses são orientações para apagar ao escrever:

````markdown
---
title: "Título do post"
date: 2026-10-23
description: "Uma frase: o que foi construído, migrado ou aprendido."
image: /log-images/titulo-do-post.webp
imageAlt: "Descrição curta da imagem para leitores de tela"
tags: []
---

O projeto começou como X e evoluiu para Y. *(Um parágrafo curto: o que é o projeto e no que ele se transformou.)*

A maior parte do desafio nunca foi A. *(Um parágrafo curto: qual era o problema real.)*

## O problema não era A

*(Reframe: a parte óbvia era simples; o desafio era outro. Liste as regras do domínio.)*

- Regra do domínio 1.
- Regra do domínio 2.
- Regra do domínio 3.

*(Princípio norteador do projeto e por que ele importa.)*

## A stack utilizada

*(Tecnologias escolhidas para resolver problemas específicos.)*

| Camada | Tecnologia | Motivo |
| --- | --- | --- |
| Runtime | ... | ... |
| Frontend | ... | ... |

*(Nota sobre versionamento/dependências, se fizer sentido.)*

## Arquitetura

*(Como o repositório/sistema está organizado.)*

```plaintext
caminho → de → uma → requisição
```

*(Rotas ou padrões principais.)*

## [Deep dive 1 — um tópico técnico por seção]

*(Explique o mecanismo e mostre o código que importa.)*

```ts
// código-chave
```

## [Deep dive 2]

*(Repita para cada tópico técnico relevante.)*

## Três decisões técnicas importantes

## 1. [Decisão]

*(Problema → abordagem ingênua e sua armadilha → solução escolhida.)*

## 2. [Decisão]

*(Problema → abordagem ingênua e sua armadilha → solução escolhida.)*

## 3. [Decisão]

*(Problema → abordagem ingênua e sua armadilha → solução escolhida.)*

## Os números do projeto

*(Métricas honestas do estado atual.)*

- N linhas de TypeScript/Go/….
- N arquivos.
- N commits ao longo de N dias/semanas.

## Como executar localmente

```bash
comando de instalação
comando de setup
comando de dev
```

- Serviço A em `localhost:porta`.

*(Notas de produção, se houver.)*

## O que ainda falta

- Pendência 1.
- Pendência 2.

Os próximos passos incluem:

- Próximo passo 1.
- Próximo passo 2.

## Conclusão

*(Reflexão: o que o projeto ensinou além do código.)*

O código está disponível no [GitHub](https://github.com/Samuteg).
````

- [ ] **Step 5: Verify typecheck + lint**

Run: `pnpm typecheck && pnpm lint`
Expected: ambos passam — `keystatic.config.ts` agora está no include do tsc; eslint cobre o arquivo novo sem novos erros.

- [ ] **Step 6: Commit**

```bash
git add package.json pnpm-lock.yaml tsconfig.json keystatic.config.ts content/logs-template.md
git commit -m "feat: add keystatic local config with tasknest post template"
```

---

### Task 3: Middleware dev-only `/api/keystatic/*` no Vite

Middleware no dev server que traduz `req/res` do Connect para `Request/Response` e delega ao `makeGenericAPIRouteHandler`. Em produção este código não existe (`apply: 'serve'`).

**Files:**
- Modify: `vite.config.ts`
- Modify: `package.json` (via `pnpm add -D @types/node`)

**Interfaces:**
- Consumes: `export default config` de `keystatic.config.ts` (Task 2).
- Produces: rotas `/api/keystatic/*` no dev server (tree/update/blob do Keystatic) — consumidas pela UI do Keystatic (Task 4/5). Handler: `makeGenericAPIRouteHandler({ config: keystaticConfig })` de `@keystatic/core/api/generic`.

- [ ] **Step 1: Install Node types**

Run: `pnpm add -D @types/node`
Expected: devDependency adicionada (necessária para `Buffer`/streams no glue do middleware; `vite.config.ts` está no include do tsc).

- [ ] **Step 2: Add the plugin to vite.config.ts**

Adicionar imports no topo (o arquivo já tem `import { defineConfig } from "vite";` — as linhas abaixo são adicionais):

```ts
import type { Plugin } from "vite";
import { makeGenericAPIRouteHandler } from "@keystatic/core/api/generic";
import keystaticConfig from "./keystatic.config";
```

Adicionar o plugin abaixo dos imports (antes do `export default defineConfig`):

```ts
const keystaticDevApi = (): Plugin => ({
  name: "keystatic-local-api",
  apply: "serve",
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (!req.url?.startsWith("/api/keystatic")) {
        next();
        return;
      }
      try {
        const handler = makeGenericAPIRouteHandler({
          config: keystaticConfig,
        });
        const chunks: Buffer[] = [];
        for await (const chunk of req) chunks.push(chunk as Buffer);
        const body = Buffer.concat(chunks);
        const request = new Request(
          new URL(req.url, `http://${req.headers.host ?? "localhost:5173"}`),
          {
            method: req.method,
            headers: req.headers as unknown as HeadersInit,
            body:
              req.method === "GET" || req.method === "HEAD"
                ? undefined
                : new Uint8Array(body),
          }
        );
        const response = await handler(request);
        res.statusCode = response.status;
        response.headers.forEach((value, key) => res.setHeader(key, value));
        res.end(Buffer.from(await response.arrayBuffer()));
      } catch (error) {
        next(error);
      }
    });
  },
});
```

Tipos: `Plugin` vem de `vite`; `req`/`res` são inferidos dos tipos de Connect que o Vite expõe; `Buffer` vem de `@types/node` (Step 1).

E adicionar `keystaticDevApi(),` ao array `plugins` do `defineConfig` (última posição):

```ts
  plugins: [
    react(),
    viteCompression({ algorithm: "brotliCompress", threshold: 1024 }),
    viteCompression({ algorithm: "gzip", threshold: 1024 }),
    visualizer({ open: false, filename: "dist/stats.html" }),
    keystaticDevApi(),
  ],
```

Detalhes que importam:
- **Match manual do path, sem mount por prefixo**: `server.middlewares.use(fn)` sem primeiro argumento de path — mount por prefixo (`use("/api/keystatic", fn)`) reescreve `req.url` removendo o prefixo e quebraria as rotas internas do handler.
- O handler genérico do Keystatic é `async (request: Request) => Promise<Response>` — framework-agnostic.
- `localBaseDirectory` padrão é `process.cwd()` (raiz do repo no dev server) → `content/logs/*` e `public/log-images` resolvem certos.
- Não é preciso import condition extra: no contexto Node do vite.config, o export condition `#api-handler` resolve para a implementação real.

- [ ] **Step 3: Typecheck + lint**

Run: `pnpm typecheck && pnpm lint`
Expected: passam. Se o tsc reclamar de tipos Node que faltam (ex.: `Buffer`), confirme que `pnpm add -D @types/node` rodou.

- [ ] **Step 4: Smoke do middleware**

```bash
pnpm dev
```

Em background; aguardar a linha `Local:` (porta padrão 5173). Então:

```bash
curl -s -o /dev/null -w '%{http_code} %{content_type}\n' -X POST http://localhost:5173/api/keystatic/tree
```

Expected: resposta com `content_type` contendo `application/json` (status pode ser 200 ou 4xx JSON do próprio Keystatic) — o que prova que o middleware atende a rota. Se vier `text/html` (404 do Vite), o middleware não pegou a rota — revise o match. Encerrar o dev server depois (`job_kill`).

- [ ] **Step 5: Commit**

```bash
git add vite.config.ts package.json pnpm-lock.yaml
git commit -m "feat: dev-only keystatic api middleware in vite dev server"
```

---

### Task 4: Página admin `/keystatic` (dev-only)

**Files:**
- Create: `src/pages/KeystaticPage.tsx`
- Modify: `src/App.tsx` (linhas 12, 30, 33)

**Interfaces:**
- Consumes: `export default config` de `keystatic.config.ts`; `<Keystatic config={...} />` de `@keystatic/core/ui` (componente client-side que traz o próprio router interno; funciona sem react-router).
- Produces: branch dev-only que renderiza a página admin para paths `/keystatic*` — sem Navbar/Footer (early return antes da árvore normal). Em build de produção, `import.meta.env.DEV` vira `false` constante e o dynamic import é eliminado (nenhum chunk do Keystatic em `dist/`).

- [ ] **Step 1: Create src/pages/KeystaticPage.tsx**

```tsx
import { Keystatic } from "@keystatic/core/ui";
import keystaticConfig from "../../keystatic.config";

export default function KeystaticPage() {
  return <Keystatic config={keystaticConfig} />;
}
```

- [ ] **Step 2: Add the dev-only branch to src/App.tsx**

Após a linha do `LogPostPage` lazy (linha 12), adicionar:

```tsx
const KeystaticPage = import.meta.env.DEV
  ? lazy(() => import("./pages/KeystaticPage"))
  : undefined;
```

Após `const LOG_ROUTE = ...` (linha 30), adicionar:

```tsx
const KEYSTATIC_ROUTE = /^\/keystatic(?:\/|$)/;
```

No topo do corpo de `App()` (antes do `const logSlug = ...`, linha 33), adicionar:

```tsx
  const isKeystatic =
    import.meta.env.DEV && KEYSTATIC_ROUTE.test(window.location.pathname);

  if (isKeystatic && KeystaticPage) {
    return (
      <Suspense fallback={<PageLoader />}>
        <KeystaticPage />
      </Suspense>
    );
  }
```

O resto do componente fica idêntico. Notas:
- Em `pnpm test` (vitest), `import.meta.env.DEV` é `true`, mas `window.location.pathname` é `/` em jsdom → branch nunca renderiza; os testes existentes de `App` não mudam.
- Em `pnpm build`, `import.meta.env.DEV` → `false`; o ternário vira `undefined` e o Rollup elimina o `import()` dinâmico.

- [ ] **Step 3: Lint + typecheck + tests**

Run: `pnpm lint && pnpm typecheck && pnpm test`
Expected: tudo passa (mesmos 2 warnings pré-existentes tolerados).

- [ ] **Step 4: Production build excludes keystatic**

Run: `pnpm build`
Expected: build passa. Verificar:

```bash
ls dist/assets | grep -i keystatic; echo "exit: $?"
```

Expected: nenhuma ocorrência (`grep` retorna exit 1). Se aparecer chunk do Keystatic, o guard `import.meta.env.DEV` não está morto — investigar antes de prosseguir.

- [ ] **Step 5: Commit**

```bash
git add src/pages/KeystaticPage.tsx src/App.tsx
git commit -m "feat: dev-only keystatic admin page at /keystatic"
```

---

### Task 5: Smoke end-to-end no navegador + AGENTS.md + verificação final

**Files:**
- Modify: `AGENTS.md` (seção "Blog (dev logs)" + linha desatualizada da seção "Testing")
- Nenhum arquivo de código.

**Interfaces:**
- Consumes: tudo das Tasks 1–4 (editor em `/keystatic`, middleware, parser estendido, template).
- Produces: workflow documentado no AGENTS.md; validação real do formato YAML escrito pelo Keystatic contra o parser.

- [ ] **Step 1: Start the dev server**

```bash
pnpm dev
```

Em background job; aguardar `Local: http://localhost:5173/`.

- [ ] **Step 2: Open the admin UI**

Abrir `http://localhost:5173/keystatic` no navegador (ferramentas chrome-devtools: `new_page` + `take_snapshot`).
Expected: UI do Keystatic com brand "Samuteg" e a collection "Dev Logs". Se a UI reclamar do `template` apontando para fora do glob, remover a linha `template: 'content/logs-template.md'` de `keystatic.config.ts` (fallback aprovado na spec) e recarregar.

- [ ] **Step 3: Create a smoke post**

Na UI: Dev Logs → Create → preencher:
- Título: `Smoke Test Keystatic` — slug ajustado para `smoke-test-keystatic`
- Data: hoje; Descrição: `Post de smoke do editor local`
- Imagem: upload de arquivo (copiar um `.webp` existente: `cp public/log-images/primeiro-post.webp /tmp/smoke-hero.webp` e usar esse caminho no `upload_file`)
- Alt: `imagem de smoke`; Tag: `smoke`
- Conteúdo: `## Smoke test` + um parágrafo curto.

Registrar: o form veio pré-preenchido com o skeleton do template? (define se `template` fica).

- [ ] **Step 4: Verify the written file against the parser**

```bash
cat content/logs/smoke-test-keystatic.md
```

Expected: frontmatter YAML (provável block list para tags, scalars com/sem aspas) + corpo markdown. Conferir contra o subset do parser (Task 1):
- Chaves: `title`, `date`, `description`, `image`, `imageAlt`, `tags`, `content`? — o corpo é o content, não uma chave.
- Se o YAML emitido tiver algo fora do subset (ex.: folded scalars `>-`), aplicar o fallback aprovado: `pnpm add yaml` e usar no parser (apenas para o bloco de frontmatter; mantém o fallback documentado na spec).
- Anotar o formato real gravado em `image:` (relativo ou `public/...`) — a normalização cobre ambos.

- [ ] **Step 5: Verify the post renders**

Abrir `http://localhost:5173/log/smoke-test-keystatic` (novo `navigate_page`).
Expected: post renderiza (HMR pega o arquivo novo via glob eager), hero image carrega de `/log-images/<arquivo>`, título/data/tags corretos, code block `## Smoke test` como heading. Abrir também a home/DevLogs e confirmar que o post aparece na lista.

- [ ] **Step 6: Remove the smoke post**

Deletar a entrada "Smoke Test Keystatic" pela própria UI do Keystatic. Confirmar:

```bash
ls content/logs/ | grep smoke
```

Expected: vazio (exit 1). `git status` limpo de artefatos de smoke (a imagem enviada em `public/log-images/` também deve ser removida pela UI; se sobrar, deletar manualmente). Não commitar nada do smoke.

- [ ] **Step 7: Update AGENTS.md**

Ler o `AGENTS.md` atual antes de editar. Na seção **Blog (dev logs)**, substituir a linha `To publish a post: create ...` por:

```markdown
- To create/edit posts: `pnpm dev` → open `http://localhost:5173/keystatic` (Keystatic editor, local mode only — never ships to production). It writes `content/logs/<slug>.md` + hero images into `public/log-images/`. Publishing = commit + push, as before.
- Manual alternative: create `content/logs/<slug>.md` by hand. The loader (`src/content/logs.ts`) accepts both legacy frontmatter (`tags: [a, b]`, quoted strings) and Keystatic-style YAML (block lists, unquoted scalars) — see `src/test/logs.test.ts`.
- New posts follow the TaskNest structure (abertura → problema real → stack → arquitetura → deep dives → decisões técnicas → números → como executar → o que falta → conclusão). Skeleton: `content/logs-template.md` (lives in `content/`, NOT `content/logs/` — anything inside `content/logs/*.md` is auto-published).
```

Na seção **Testing**, corrigir a linha desatualizada `Config is in `vite.config.ts` under `test:` key ...` para:

```markdown
- Config is in `vitest.config.ts` (separate file from `vite.config.ts`). Tests import `describe`/`it`/`expect` from `vitest` explicitly.
```

- [ ] **Step 8: Full verification**

Run: `pnpm lint && pnpm typecheck && pnpm build && pnpm test`
Expected: tudo passa. Reconfirmar exclusão do Keystatic do bundle:

```bash
ls dist/assets | grep -i keystatic; echo "exit: $?"
```

Expected: exit 1 (nada encontrado).

- [ ] **Step 9: Commit**

```bash
git add AGENTS.md keystatic.config.ts
git commit -m "docs: document keystatic dev logs workflow in AGENTS.md"
```

(`keystatic.config.ts` incluído apenas se a linha `template` foi removida no Step 2.)

---

## Out of scope (não fazer)

- Reabrir/reformatar posts antigos no editor (reescrita de frontmatter + re-serialização Markdoc).
- Storage `github`/`cloud`, OAuth, secrets, endpoints serverless.
- CI com GitHub Actions; mudanças em `sitemap.xml`/`robots.txt` (a rota `/keystatic` é dev-only, não é pública).
- Adicionar link para `/keystatic` na Navbar (acesso é por URL durante o dev).
