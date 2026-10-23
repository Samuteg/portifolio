# Design: Editor Keystatic (modo local) para os dev logs

Data: 2026-10-23 · Status: aprovado (Abordagem 1)

## Contexto

O portfólio (React 19 + Vite SPA, deploy Vercel) publica dev logs como arquivos markdown em
`content/logs/*.md`, com frontmatter `title`/`date`/`description`/`image`/`imageAlt`/`tags` e corpo
renderizado por `react-markdown` + `rehype-highlight` em `src/pages/LogPostPage.tsx`. O loader
(`src/content/logs.ts`) usa `import.meta.glob` com `?raw` eager e um parser de frontmatter caseiro
(linhas `key: value`, strings com aspas, `tags: [a, b]` em flow style).

O usuário quer uma forma mais fácil de criar posts usando Keystatic — editor visual, validação de
schema e upload de imagens — **apenas em modo local** (durante `pnpm dev`). Além disso, novos posts
devem seguir a estrutura do post TaskNest (abertura → problema real → stack → arquitetura →
deep dives → decisões técnicas → números → como executar → o que falta → conclusão).

## Decisões

| Decisão | Por quê |
| --- | --- |
| Storage `{ kind: 'local' }` | Editor só no dev; zero OAuth, secrets ou serverless. Escolha explícita do usuário. |
| Arquivos continuam `.md` + frontmatter YAML | `fields.markdoc({ extension: 'md' })` + `format: { data: 'yaml', contentField: 'content' }`. Posts existentes continuam válidos; o pipeline de leitura/build não muda de arquitetura. |
| Parser caseiro estendido (sem dep nova) | O subset YAML que o Keystatic escreve (kv, listas flow/block, strings quoted) cabe em ~30 linhas. Fallback documentado: dep `yaml` (~30KB gzip no client) se um edge case aparecer. |
| Admin excluído do bundle de produção | Guard `import.meta.env.DEV` corta o dynamic import no build — o chunk do Keystatic não é gerado e `/keystatic` não existe em produção. |
| Template de novo post fora do glob | `content/logs-template.md` (na pasta `content/`, não em `content/logs/`) — não é publicado; ligado via opção `template` da collection. |

## Componentes

1. **`keystatic.config.ts`** (novo, raiz do repo) — `storage: { kind: 'local' }`, brand "Samuteg",
   collection `posts`:
   - `path: 'content/logs/*'`, `slugField: 'title'`, `entryLayout: 'content'`,
     `format: { data: 'yaml', contentField: 'content' }`, `template: 'content/logs-template.md'`.
   - Schema: `title` (`fields.slug({ name: { label: 'Título' } })` — slug editável na criação,
     hífens sem acento como hoje), `date` (`fields.date`), `description` (`fields.text` single-line),
     `image` (`fields.image({ directory: 'public/log-images', publicPath: '/log-images' })` —
     upload arrasta-e-solta), `imageAlt` (`fields.text`), `tags` (`fields.array(fields.text())`),
     `content` (`fields.markdoc({ extension: 'md' })`).
2. **`vite.config.ts`** — plugin dev-only (`apply: 'serve'`) montando middleware em
   `/api/keystatic/*` via `makeGenericAPIRouteHandler({ config })` (import de
   `@keystatic/core/api/generic`). Glue `req → Request → Response → res` (~40 linhas).
3. **`src/App.tsx`** — branch `KEYSTATIC_ROUTE = /^\/keystatic/` antes das sections; renderiza
   página lazy **apenas se** `import.meta.env.DEV` (senão segue fluxo normal; em produção o branch
   não existe no bundle).
4. **`src/pages/KeystaticPage.tsx`** (novo, lazy, dev-only) — renderiza
   `<Keystatic config={keystaticConfig} />` de `@keystatic/core/ui` (componente client-side, traz
   o próprio router baseado em `/keystatic`).
5. **`src/content/logs.ts`** — parser de frontmatter estendido: `key: valor`,
   `key: [a, b]` (flow), `key:` + blocos `  - item` (block list), unquote de strings; normalização
   de `image` (prefixar `/log-images/` quando o valor não começar com `/` — cobre o valor escrito
   por `fields.image` e os paths legados `/log-images/...`). Tipo `LogPost` inalterado.
6. **`content/logs-template.md`** (novo) — skeleton TaskNest para novos posts, com orientações
   curtas por seção.
7. **`AGENTS.md`** — seção Blog atualizada: workflow (`pnpm dev` → `/keystatic` → criar/editar →
   commit/push), compatibilidade do loader e localização do template. Nota: a config de testes
   fica em `vitest.config.ts` separado (o AGENTS.md alega que está em `vite.config.ts` na chave
   `test:` — desatualizado; corrigir essa linha ao editar o AGENTS.md).

Dependência: `@keystatic/core` em **devDependencies** (não vaza para o bundle de produção).

## Fluxo de dados

1. Usuário abre `http://localhost:5173/keystatic` durante `pnpm dev`.
2. Cria post → UI faz POST em `/api/keystatic/*` → handler local escreve
   `content/logs/<slug>.md` (frontmatter YAML + corpo markdown) e imagens em `public/log-images/`.
3. `import.meta.glob` do Vite detecta o arquivo novo via HMR → lista e página do post atualizam
   no mesmo dev server, sem rebuild manual.
4. Publicar = commit + push (como hoje); Vercel faz o deploy do estático.

## Compatibilidade e riscos

- **Posts antigos intocados**: frontmatter flow-style (`tags: [a, b]`) continua parseando no
  parser novo. Posts antigos só mudam se forem reabertos no editor — e aí o Keystatic reescreve o
  frontmatter (block style) e re-serializa o corpo (Markdoc), podendo reformatar trechos (ex.:
  tabelas). Mitigação: conferir `git diff` antes de commitar; preferir não reabrir posts antigos.
- **`template` fora do glob**: semântica ("path of a template data file") deve aceitar
  `content/logs-template.md`; se a implementação restringir ao path da collection, fallback =
  manter skeleton documentado apenas no AGENTS.md (sem template automático).
- **Valor de `image` gravado**: verificar na implementação o formato que `fields.image` escreve
  (relativo ao `directory` ou path completo); a normalização no loader cobre ambos.
- **Subset do parser**: se o Keystatic emitir YAML fora do subset (ex.: folded scalars `>-`),
  upgrade pontual para a dep `yaml` — já aprovado como fallback.

## Verificação

1. `pnpm lint && pnpm typecheck && pnpm build` — tudo passa.
2. `pnpm test` — suíte existente passa.
3. Build de produção **não** contém chunk do Keystatic (`dist/` sem `keystatic` nos assets) e
   `/keystatic` não renderiza admin em produção.
4. Smoke manual: `pnpm dev` → `/keystatic` → criar post de teste (com imagem) → arquivo gerado em
   `content/logs/` com frontmatter correto → post renderiza em `/log/<slug>` e aparece no DevLogs
   → remover post de teste antes do commit.
