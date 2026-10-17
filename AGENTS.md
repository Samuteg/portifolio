# AGENTS.md

Personal portfolio site for Samuel (https://samuteg.vercel.app). React 19 + Vite + TypeScript, deployed to Vercel.

## Commands

```bash
pnpm install          # install deps (pnpm is the only supported package manager — pnpm-workspace.yaml present)
pnpm dev              # dev server
pnpm build            # production build (Vite) — also generates stats.html via rollup-plugin-visualizer
pnpm preview          # preview the production build
pnpm lint             # ESLint (flat config)
pnpm typecheck        # tsc --noEmit
pnpm test             # Vitest (jsdom), run once
pnpm test -- --watch  # Vitest watch mode
```

## Verification order

`pnpm lint && pnpm typecheck && pnpm build` — all must pass. Lint has 2 pre-existing warnings (react-hooks/exhaustive-deps, react-hooks/set-state-in-effect) that are safe to ignore.

## Architecture

- **Entry**: `src/main.tsx` — renders `<BrowserRouter>` + `<Analytics>` + `<SpeedInsights>` (Vercel) into `#root`.
- **App**: `src/App.tsx` — lazy-loads every page via `React.lazy` + `<Suspense>`, wraps with `<Navbar>` / `<Footer>`.
- **Routes**: `/` Home, `/services`, `/skills`, `/projects`, `/experiences`, `/contact`, `*` NotFound.
- **Pages**: `src/pages/*.tsx` — each page is a default-exported component wrapped in `<PageTransition>`.
- **Shared**: `src/components/` (Navbar, Footer, PageTransition), `src/hooks/useInView.ts`, `src/icons/SocialIcons.tsx`.
- **Assets**: `src/assets/` — images are `.webp`, imported directly in components (Vite handles them).

## Gotchas

- **`main.tsx` imports `"./App.jsx"`** but the actual file is `App.tsx`. Vite resolves this correctly — do NOT "fix" the extension.
- **`index.html`** is the single HTML entry (Vite SPA). It contains static `<meta>`, `<link>` tags, and JSON-LD schema. Favicon is a custom SVG at `public/favicon.svg`.
- **`tsconfig.json` has `"allowImportingTsExtensions": true`** so `.tsx`/`.ts` extensions are allowed in imports, but `main.tsx` uses `.jsx` (legacy) and it still works.
- **No CI workflows exist** — verification is manual via the commands above.
- **`package.json` name is `"porifolio"`** (typo) — leave it; don't "fix" it.

## Static files

- `public/robots.txt` — allows all crawlers, references sitemap.
- `public/sitemap.xml` — lists all 6 routes. If a route is added/removed, update the sitemap too.
- `public/favicon.svg` — custom "S" monogram favicon.

## Conventions

- TypeScript + strict mode.
- Tailwind for styling (`tailwind.config.js`) — accent color is `#FCA311` (amber); background is `#0a0a0a` (warm near-black); hairline borders are `rgba(255,255,255,0.07)`. Use Tailwind classes over inline styles.
- Font families: `Playfair Display` (display/serif headings), `Outfit` (sans), `DM Mono` (microtext/pills), loaded via Google Fonts in `index.html`.
- Design language: sections sit inside a centered `.frame` (max-w-6xl with `border-x` hairlines); section headers are rows with `border-b`; grids use hairline dividers (no gaps); microcopy is mono uppercase; pills use the `.tag` class.
- No comments in code unless absolutely necessary.
- `MemoryRouter` wrapping is required in tests that render `<App>` or use routing (see `src/test/App.test.tsx`).

## Testing

- Vitest + Testing Library + jsdom. Setup file: `src/test/setup.ts` (imports `@testing-library/jest-dom`).
- Config is in `vite.config.ts` under `test:` key — `globals: true` means `describe`/`it`/`expect` are available without import.
