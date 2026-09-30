# Portfolio Apple-Design Overhaul — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate the portfolio's design and accessibility to Apple HIG standards — fix structural a11y failures, unify tokens/type/motion into one system, and recompose each section so the site reads as crafted, not templated — while keeping the existing palette (`#b74b4b` accent, near-black/light surfaces) and fonts (Outfit/Inter/JetBrains Mono) fixed.

**Architecture:** Single-page React app (`src/App.tsx` renders 6 anchor sections). All work is done in-place: `tailwind.config.js` becomes the single token source backed by the CSS custom properties in `src/index.css`; a new `Reveal` component replaces four ad-hoc scroll-reveal implementations; each `src/pages/*.tsx` section gets one distinct layout pattern; heading hierarchy becomes `h1 (hero) → h2 (section) → h3 (subsection/card) → h4 (item)`.

**Tech Stack:** React 19 + Vite + TypeScript (strict) + Tailwind v3 + Vitest/Testing Library/jsdom. No new dependencies — shadcn/21st.dev used for inspiration only (decided with user).

**Spec:** Design approved in chat on 2026-09-28 (brainstorming skill, "abordagem A — editorial de dev"). Design summary is embedded below; the plan argues from it.

**Verification command (run at every task gate):** `pnpm test` — full gate at Task 12: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`.

## Global Constraints

- **No new runtime or dev dependencies.** pnpm is the only package manager (`pnpm-workspace.yaml` present).
- **Preserve all facts:** URLs, e-mail `samuneveslopes@gmail.com`, WhatsApp `551158491828`, certificate PDFs/images, dates, skill levels, project descriptions. Copy may be rephrased only where a task says so; data fields are not invented or deleted except `rating` (explicitly removed in Task 9).
- **Palette is fixed.** Accent stays `#b74b4b`. Only additions: `--accent-cta: #a63e3e` (existing palette hex, role for solid buttons) and `--state-wash` (rgba overlay for hover/active states). No new hues.
- **Code style:** no comments in code; Tailwind/utility classes over inline styles; no `!important`/`!`-prefixed overrides (all `!min-h-[44px] !px-5 !text-sm` style overrides are removed, not propagated).
- **Do NOT "fix":** `main.tsx` importing `"./App.jsx"`, `package.json` name `"porifolio"`.
- **Do not commit** unless the user explicitly asks. No `git` state changes in any task.
- **Lint baseline:** exactly 2 pre-existing warnings (`react-hooks/exhaustive-deps`, `react-hooks/set-state-in-effect`) are acceptable; no new warnings may appear.
- **Accessibility floors (from HIG `accessibility.md › Vision/Mobility`, WCAG AA):** text ≥ 4.5:1 (12px+ text included), interactive targets ≥ 44×44px, visible keyboard focus, one `h1`, no skipped heading levels, nothing conveyed by color alone, `prefers-reduced-motion` respected (already global in `index.css:241-255` — must keep working).
- **Measured contrast facts used by this plan** (sRGB relative luminance, computed from the hex values in `src/index.css`):
  - `#f5f4f2` on `#08080a` ≈ 17.5:1 ✓ · `#a3a2a0` on `#08080a` ≈ 7.8:1 ✓ · `#6e6c69` on `#faf9f7` ≈ 4.8:1 ✓ · `#e08d8d` on `#08080a` ≈ 7.9:1 ✓ · `#8e3333` on `#faf9f7` ≈ 6.7:1 ✓
  - **FAIL (found in review):** white on `#b74b4b` = **4.47:1** (button text 0.95rem/600 is not "large text", needs 4.5:1). Fixed in Task 2 by giving `.btn-primary` the fill `--accent-cta: #a63e3e` → **5.4:1**, hover `--accent-active: #8e3333` → **7.0:1**. The `#b74b4b` brand color keeps its uses (logo mark, timeline dot, selection, scrollbar) — none are body text.

## Design summary (approved)

1. **Tokens:** one system — `tailwind.config.js` colors point at the CSS variables; semantic classes (`text-ink`, `bg-card`, `border-line`, …) replace every `[var(--…)]` arbitrary value; guard test prevents regressions.
2. **Type scale:** `.page-title` (h2 section), `.section-title` (h3 subsection), `.card-title` (h3/h4 card+item), `.meta` (mono 12px meta line — the signature element), `.tag` bumped to 12px, `.field` for form inputs with a real focus ring.
3. **A11y:** single `h1`; heading levels no longer skip; focus trap + `aria-describedby` in the modal; `aria-controls` on the menu button; skip link → `#main-content`; certificate cards have one link per card.
4. **Motion:** one `Reveal` component (`up | left | fade | scale`, capped stagger 0.3s, `duration-500`), replacing 4 different implementations; still gated by the global reduced-motion override.
5. **Section identity (structure encodes meaning, `layout.md › Visual hierarchy`):**
   - Hero: typographic `h1` + mono meta lines (keeps data).
   - Serviços: hairline-separated rows (icon + `h3` | description + tags) — no card grid.
   - Skills: card grid of 5-dot meters (kept — this is the signature), equal heights.
   - Projetos: featured project first and wider; rating removed; full-size buttons.
   - Experiência: timeline rail (kept) + certificate cards, one CTA each.
   - Contato: actionable rows are cards with hover; static info is a plain row.
6. **Restraint:** no glassmorphism added (nav glass stays — it is the floating functional layer per `liquid-glass.md`); accent reserved for primary actions, status dots and the meta line (`branding.md › Best practices`: "Apply your app's accent color judiciously").

---

### Task 1: Tokens — single source of truth (config + sweep + guard test)

**Files:**
- Modify: `tailwind.config.js` (colors + remove dead animation block)
- Modify: `src/index.css` (add `--state-wash` dark/light)
- Modify: `src/App.tsx`, `src/components/Navbar.tsx`, `src/components/Footer.tsx`, `src/pages/ContactPage.tsx`, `src/pages/ExperiencesPage.tsx`, `src/pages/HomePage.tsx`, `src/pages/ProjectsPage.tsx`, `src/pages/ServicesPage.tsx`, `src/pages/SkillsPage.tsx`
- Create: `src/test/tokens.test.ts`

**Interfaces:**
- Produces (used by every later task): color classes `text-ink` / `text-ink-soft` / `text-ink-mute`, `bg-canvas`, `bg-card`, `bg-card2`, `border-line`, `border-line-strong`, `text-accent-text`, `bg-accent-wash`, `bg-accent`, `bg-success`, `bg-scrim`, `ring-canvas`, `bg-wash`, `hover:bg-wash`.

- [ ] **Step 1: Write the failing guard test**

Create `src/test/tokens.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const walk = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]
  );

const sourceFiles = walk(join(process.cwd(), "src")).filter(
  (file) => /\.(tsx|ts)$/.test(file) && !file.includes("test")
);

describe("design tokens", () => {
  it("uses semantic Tailwind classes instead of arbitrary CSS variables", () => {
    const offenders = sourceFiles.filter((file) =>
      /\[var\(--(text|surface|line|background|accent|scrim|success|nav-bg)/.test(
        readFileSync(file, "utf8")
      )
    );
    expect(offenders).toEqual([]);
  });

  it("does not hardcode the white overlay hack for hover states", () => {
    const offenders = sourceFiles.filter((file) =>
      /bg-white\/\[0\./.test(readFileSync(file, "utf8"))
    );
    expect(offenders).toEqual([]);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm test -- src/test/tokens.test.ts`
Expected: FAIL — both tests list files containing `[var(--…)]` / `bg-white/[0.…]`.

- [ ] **Step 3: Point the Tailwind palette at the CSS variables**

In `tailwind.config.js`, replace the whole `colors` block with:

```js
      colors: {
        accent: {
          DEFAULT: 'var(--accent)',
          light: '#d67c7c',
          dark: '#8e3333',
          text: 'var(--accent-text)',
          50: '#fdf2f2',
          100: '#fce4e4',
          200: '#fbd0d0',
          300: '#f5a3a3',
          400: '#d67c7c',
          500: '#b74b4b',
          600: '#9e3a3a',
          700: '#8e3333',
          800: '#6d2828',
          900: '#5a2424',
        },
        ink: {
          DEFAULT: 'var(--text-1)',
          soft: 'var(--text-2)',
          mute: 'var(--text-3)',
        },
        canvas: 'var(--background)',
        card: 'var(--surface-1)',
        card2: 'var(--surface-2)',
        line: {
          DEFAULT: 'var(--line)',
          strong: 'var(--line-strong)',
        },
        success: 'var(--success)',
        scrim: 'var(--scrim)',
        wash: 'var(--state-wash)',
      },
```

Also delete the `animation` and `keyframes` blocks from `tailwind.config.js` (`slide-up` and the config copy of `fadeIn` are dead/duplicated — `.animate-fade-up`, `.animate-fade-in`, `.animate-scale-in` live in `src/index.css` and are the ones in use).

- [ ] **Step 4: Add the wash token to `src/index.css`**

In the `:root` block (after `--scrim`, line ~29) add:

```css
  --state-wash: rgba(255, 255, 255, 0.06);
```

In the `@media (prefers-color-scheme: light)` `:root` block (after `--scrim`, line ~45) add:

```css
    --state-wash: rgba(22, 20, 18, 0.05);
```

- [ ] **Step 5: Sweep the arbitrary values out of the TSX sources**

Run (order matters — `--line-strong` before `--line`, `--accent-text`/`--accent-wash` before `--accent`):

```bash
perl -pi -e '
  s/\[var\(--text-1\)\]/ink/g;
  s/\[var\(--text-2\)\]/ink-soft/g;
  s/\[var\(--text-3\)\]/ink-mute/g;
  s/\[var\(--surface-1\)\]/card/g;
  s/\[var\(--surface-2\)\]/card2/g;
  s/\[var\(--line-strong\)\]/line-strong/g;
  s/\[var\(--line\)\]/line/g;
  s/\[var\(--accent-text\)\]/accent-text/g;
  s/\[var\(--accent-wash\)\]/accent-wash/g;
  s/\[var\(--accent\)\]/accent/g;
  s/\[var\(--success\)\]/success/g;
  s/\[var\(--background\)\]/canvas/g;
  s/\[var\(--scrim\)\]/scrim/g;
  s/bg-white\/\[0\.06\]/bg-wash/g;
  s/hover:bg-white\/\[0\.04\]/hover:bg-wash/g;
' $(grep -rl '\[var(--\|bg-white/\[' src --include='*.tsx')
```

Then verify nothing was missed:

Run: `grep -rn "\[var(--\|bg-white/\[" src --include="*.tsx"`
Expected: no output.

Sanity-check two known sites after the sweep:
- `src/pages/ExperiencesPage.tsx:163` → `bg-accent ring-4 ring-canvas`
- `src/components/Navbar.tsx:93-94` → `text-ink bg-wash` / `text-ink-mute hover:text-ink hover:bg-wash`

- [ ] **Step 6: Run the guard test to verify it passes**

Run: `pnpm test -- src/test/tokens.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 7: Run the whole suite + build**

Run: `pnpm test && pnpm build`
Expected: all tests PASS; build succeeds. (All existing tests use text/roles, not class strings, so the sweep must not break them.)

---

### Task 2: Type scale, focus styles, and CSS cleanup

**Files:**
- Modify: `src/index.css`

**Interfaces:**
- Produces (used by Tasks 4–11): classes `.section-title`, `.card-title`, `.meta`, `.field`; button fill `--accent-cta`.
- Removes: `.in-view` / `.in-view.visible` (dead), the ambiguity of two `animate-fade-in` definitions (config copy removed in Task 1).

- [ ] **Step 1: Add the role token for solid buttons**

In `src/index.css` `:root`, after `--accent-active` (line ~24):

```css
  --accent-cta: #a63e3e;
```

(White on `#a63e3e` = 5.4:1; the brand `#b74b4b` stays for marks/dots, where it carries no text.)

- [ ] **Step 2: Fix the primary button contrast**

In the `.btn-primary` rule (`src/index.css:144-164`):
- `background: var(--accent);` → `background: var(--accent-cta);`
- `.btn-primary:hover { background: var(--accent-hover); }` → `background: var(--accent-active);`
- `.btn-primary:active { background: var(--accent-active); … }` → keep `background: var(--accent-active);`

- [ ] **Step 3: Raise the smallest text to 12px**

In `.tag` (`src/index.css:133`): `font-size: 0.72rem;` → `font-size: 0.75rem;`
(The project badge `text-[0.7rem]` is fixed in Task 9.)

- [ ] **Step 4: Remove dead reveal CSS**

Delete from `src/index.css`:

```css
.in-view {
  opacity: 0;
}
.in-view.visible {
  animation: fadeUp 0.6s ease-out both;
}
```

Keep `@keyframes fadeUp` (used by `.animate-fade-up`) and `.page-section`, `.page-title`, `.page-subtitle` untouched.

- [ ] **Step 5: Add the new component classes**

Append a components layer to `src/index.css` (after the existing `@layer utilities { … }` block):

```css
@layer components {
  .section-title {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(1.375rem, 2vw, 1.75rem);
    font-weight: 700;
    letter-spacing: -0.015em;
    line-height: 1.15;
    color: var(--text-1);
  }

  .card-title {
    font-family: 'Outfit', sans-serif;
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.3;
    color: var(--text-1);
  }

  .meta {
    font-family: 'JetBrains Mono', ui-monospace, monospace;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    color: var(--text-3);
  }

  .field {
    width: 100%;
    min-height: 44px;
    padding: 0.7rem 1rem;
    border-radius: 12px;
    background: var(--surface-1);
    border: 1px solid var(--line);
    color: var(--text-1);
    font-size: 0.875rem;
    line-height: 1.5;
    transition: border-color 0.2s ease;
  }

  .field::placeholder {
    color: var(--text-3);
  }

  .field:focus-visible {
    outline: 2px solid var(--accent-text);
    outline-offset: 2px;
    border-color: var(--accent-text);
  }
}
```

(`@layer components` so Tailwind utilities can still override — e.g. `resize-none` on the textarea.)

- [ ] **Step 6: Verify CSS compiles and the suite is green**

Run: `pnpm test && pnpm build`
Expected: PASS; build succeeds with the new layer.

---

### Task 3: `Reveal` component — one motion system

**Files:**
- Create: `src/components/Reveal.tsx`
- Create: `src/test/Reveal.test.tsx`

**Interfaces:**
- Consumes: `useInView` from `src/hooks/useInView.ts` (signature unchanged: returns `{ ref, inView }`).
- Produces (used by Tasks 6–11): `Reveal({ children, variant?, delay?, className? })` where `variant` is `"up" | "left" | "fade" | "scale"` (default `"up"`), `delay` is the item index (stagger = `min(delay * 0.1, 0.3)` seconds).

- [ ] **Step 1: Write the failing tests**

Create `src/test/Reveal.test.tsx`:

```tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import Reveal from "../components/Reveal";

let observerCallback: IntersectionObserverCallback | null = null;
const observe = vi.fn();
const unobserve = vi.fn();
const disconnect = vi.fn();

class ControllableObserver {
  constructor(cb: IntersectionObserverCallback) {
    observerCallback = cb;
  }
  observe = observe;
  unobserve = unobserve;
  disconnect = disconnect;
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

const trigger = (isIntersecting: boolean) => {
  act(() => {
    observerCallback?.(
      [{ isIntersecting } as IntersectionObserverEntry],
      {} as IntersectionObserver
    );
  });
};

beforeEach(() => {
  observerCallback = null;
  vi.clearAllMocks();
  vi.stubGlobal("IntersectionObserver", ControllableObserver);
});

describe("Reveal", () => {
  it("keeps content hidden until the element intersects", () => {
    render(
      <Reveal>
        <p>conteúdo</p>
      </Reveal>
    );
    const box = screen.getByText("conteúdo").parentElement;
    expect(box?.className).toContain("opacity-0");
    expect(box?.className).toContain("translate-y-6");
  });

  it("reveals content on intersection and caps the stagger delay", () => {
    render(
      <Reveal delay={2}>
        <p>conteúdo</p>
      </Reveal>
    );
    const box = screen.getByText("conteúdo").parentElement;
    expect(box?.style.transitionDelay).toBe("0.2s");
    trigger(true);
    expect(box?.className).toContain("opacity-100");
    expect(box?.className).not.toContain("opacity-0");
  });

  it("caps the stagger at 0.3s", () => {
    render(
      <Reveal delay={9}>
        <p>conteúdo</p>
      </Reveal>
    );
    expect(screen.getByText("conteúdo").parentElement?.style.transitionDelay).toBe("0.3s");
  });

  it("supports the left and scale variants", () => {
    render(
      <>
        <Reveal variant="left">
          <p>esquerda</p>
        </Reveal>
        <Reveal variant="scale">
          <p>escala</p>
        </Reveal>
      </>
    );
    expect(screen.getByText("esquerda").parentElement?.className).toContain("-translate-x-6");
    expect(screen.getByText("escala").parentElement?.className).toContain("scale-95");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test -- src/test/Reveal.test.tsx`
Expected: FAIL — module `../components/Reveal` not found.

- [ ] **Step 3: Implement `Reveal`**

Create `src/components/Reveal.tsx`:

```tsx
import type { ReactNode } from "react";
import { useInView } from "../hooks/useInView";

type Variant = "up" | "left" | "fade" | "scale";

const hidden: Record<Variant, string> = {
  up: "opacity-0 translate-y-6",
  left: "opacity-0 -translate-x-6",
  fade: "opacity-0",
  scale: "opacity-0 scale-95",
};

const shown: Record<Variant, string> = {
  up: "opacity-100 translate-y-0",
  left: "opacity-100 translate-x-0",
  fade: "opacity-100",
  scale: "opacity-100 scale-100",
};

type RevealProps = {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
};

export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${
        inView ? shown[variant] : hidden[variant]
      } ${className}`}
      style={{ transitionDelay: `${Math.min(delay * 0.1, 0.3)}s` }}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test -- src/test/Reveal.test.tsx`
Expected: PASS (4 tests).

- [ ] **Step 5: Run the whole suite**

Run: `pnpm test`
Expected: PASS. (Nothing consumes `Reveal` yet.)

---

### Task 4: Heading hierarchy foundation — `SectionHeader` becomes `h2`

**Files:**
- Modify: `src/components/SectionHeader.tsx:20`
- Create: `src/test/headings.test.tsx`

**Interfaces:**
- Consumes: `.page-title` (unchanged, `src/index.css:224`).
- Produces: `SectionHeader` renders `<h2 class="page-title mb-4">`; `src/test/headings.test.tsx` is extended by Tasks 7–11.

- [ ] **Step 1: Write the failing test**

Create `src/test/headings.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";

describe("heading hierarchy", () => {
  it("renders exactly one h1 — the hero", async () => {
    render(<App />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { level: 2, name: "Serviços" })
      ).toBeInTheDocument();
    });
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent("Olá, eu sou Samuel");
  });

  it("marks every section title as h2", async () => {
    render(<App />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { level: 2, name: "Contato" })
      ).toBeInTheDocument();
    });
    for (const title of ["Serviços", "Skills", "Projetos", "Experiência", "Contato"]) {
      expect(screen.getByRole("heading", { level: 2, name: title })).toBeInTheDocument();
    }
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm test -- src/test/headings.test.tsx`
Expected: FAIL — there are 6 `h1` elements (one per `SectionHeader`).

- [ ] **Step 3: Change the section title to `h2`**

`src/components/SectionHeader.tsx:20`:

```tsx
      <h2 className="page-title mb-4">{title}</h2>
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test -- src/test/headings.test.tsx && pnpm test`
Expected: PASS.

---

### Task 5: Skip link target + `aria-controls` on the menu

**Files:**
- Modify: `src/App.tsx:30-40`
- Modify: `src/components/Navbar.tsx:108-126`
- Modify: `src/test/App.test.tsx`, `src/test/Navbar.test.tsx`

**Interfaces:**
- Produces: `<main id="main-content">`; mobile panel `<nav id="mobile-nav">` referenced by the toggle's `aria-controls`.

- [ ] **Step 1: Write the failing tests**

Append to `src/test/App.test.tsx` inside `describe("App", …)`:

```tsx
  it("offers a skip link that targets the main content", () => {
    render(<App />);
    const skip = screen.getByRole("link", { name: /pular para o conteúdo/i });
    expect(skip).toHaveAttribute("href", "#main-content");
    expect(document.getElementById("main-content")).toBeInTheDocument();
  });
```

Append to `src/test/Navbar.test.tsx` inside `describe("Navbar", …)` (mirror the existing imports — `render`/`screen` are already imported there):

```tsx
  it("associates the menu button with the mobile panel", () => {
    render(<Navbar />);
    const button = screen.getByRole("button", { name: /abrir menu/i });
    expect(button).toHaveAttribute("aria-controls", "mobile-nav");
    expect(document.getElementById("mobile-nav")).toBeInTheDocument();
  });
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `pnpm test -- src/test/App.test.tsx src/test/Navbar.test.tsx`
Expected: FAIL — href is `#home`, no `aria-controls`/`#mobile-nav`.

- [ ] **Step 3: Implement both changes**

`src/App.tsx`:

```tsx
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-xl focus:bg-accent focus:text-white focus:text-sm focus:font-medium"
      >
        Pular para o conteúdo
      </a>
```

```tsx
      <main id="main-content" className="relative z-10 pt-20">
```

`src/components/Navbar.tsx` — on the toggle button add `aria-controls="mobile-nav"`; on the panel's `<nav>` (line 125) add `id="mobile-nav"`.

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test`
Expected: PASS.

---

### Task 6: HomePage — modal focus trap, real focus styles, hero on `Reveal`

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/test/HomePage.test.tsx`

**Interfaces:**
- Consumes: `Reveal` (`variant="up"` default, `variant="scale"`), `.field`, `.section-title`, `.meta`, semantic colors from Task 1.
- Produces: dialog with `aria-describedby="hire-modal-hint"` + `id="hire-modal-hint"` paragraph; form fields using `.field`.

- [ ] **Step 1: Write the failing tests**

Append to `src/test/HomePage.test.tsx` inside `describe("HomePage budget modal", …)` (reuse the file's existing `render`, `screen`, `fireEvent` imports):

```tsx
  it("keeps keyboard focus inside the open dialog", async () => {
    render(<HomePage />);
    fireEvent.click(await screen.findByRole("button", { name: /me contrate/i }));
    const dialog = await screen.findByRole("dialog", { name: /solicitar orçamento/i });
    const focusables = Array.from(
      dialog.querySelectorAll<HTMLElement>("button, input, textarea")
    );
    const last = focusables[focusables.length - 1];
    last.focus();
    fireEvent.keyDown(window, { key: "Tab" });
    expect(document.activeElement).toBe(focusables[0]);
    fireEvent.keyDown(window, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(last);
  });

  it("describes the dialog with its instructions", async () => {
    render(<HomePage />);
    fireEvent.click(await screen.findByRole("button", { name: /me contrate/i }));
    const dialog = await screen.findByRole("dialog", { name: /solicitar orçamento/i });
    expect(dialog).toHaveAttribute("aria-describedby", "hire-modal-hint");
    expect(document.getElementById("hire-modal-hint")).toHaveTextContent(/whatsapp/i);
  });

  it("gives the fields the shared focus style instead of suppressing the outline", async () => {
    render(<HomePage />);
    fireEvent.click(await screen.findByRole("button", { name: /me contrate/i }));
    const input = await screen.findByLabelText("Seu nome");
    expect(input.className).toContain("field");
    expect(input.className).not.toContain("focus:outline-none");
  });
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test -- src/test/HomePage.test.tsx`
Expected: 3 new tests FAIL (no trap, no describedby, no `.field`).

- [ ] **Step 3: Implement the focus trap and dialog description**

In `src/pages/HomePage.tsx`:
- Add `const dialogRef = useRef<HTMLDivElement>(null);`
- Replace the modal `useEffect` (lines 25-37) with:

```tsx
  useEffect(() => {
    if (!isModalOpen) return;
    closeButtonRef.current?.focus();
    const trigger = hireButtonRef.current;
    const dialog = dialogRef.current;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
        return;
      }
      if (e.key !== "Tab" || !dialog) return;
      const focusables = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
        )
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !dialog.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !dialog.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      trigger?.focus();
    };
  }, [isModalOpen]);
```

- On the dialog `<div role="dialog" …>` add `ref={dialogRef}` and `aria-describedby="hire-modal-hint"`.
- On the instruction `<p>` (line 169) add `id="hire-modal-hint"`.

- [ ] **Step 4: Swap the form fields for `.field`**

Replace the three field `className` strings (lines 186, 202, 217):

- name/e-mail inputs → `className="field"`
- textarea → `className="field resize-none"`

Also bump the three `<label>` classes from `text-xs` to `text-[0.8125rem]`, and change the modal title (line 166) from `text-2xl font-display font-bold text-ink mb-2` to `section-title mb-2`.

- [ ] **Step 5: Move the hero reveals onto `Reveal`**

- Add `import Reveal from "../components/Reveal";`, remove the `useInView` import and both hook calls (`textRef`/`textInView`, `imageRef`/`imageInView`).
- Text block: the wrapper `<div ref={textRef} className={…}>` (line 58) becomes `<Reveal>` with the same children (it already sits inside `<div className="flex-1 text-center lg:text-left">`).
- Image block: `<div ref={imageRef} className={…}>` (line 120-123) becomes `<Reveal variant="scale">`.
- Badge (line 136): replace `font-mono text-xs text-ink-soft` with `meta`, keeping the layout classes: `className="meta absolute -bottom-2 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full bg-card2 border border-line whitespace-nowrap"`.

- [ ] **Step 6: Run tests to verify they pass**

Run: `pnpm test`
Expected: PASS — including the 3 pre-existing modal tests (Escape, click-outside, WhatsApp submit).

---

### Task 7: Serviços — hairline list instead of the repeated card grid

**Files:**
- Modify: `src/pages/ServicesPage.tsx`
- Modify: `src/test/headings.test.tsx`

**Interfaces:**
- Consumes: `Reveal`, `.card-title`, semantic colors.
- Produces: service titles as `h3` under the section `h2`.

- [ ] **Step 1: Write the failing test**

Append to `src/test/headings.test.tsx`:

```tsx
  it("renders each service as an h3 under the Serviços h2", async () => {
    render(<App />);
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { level: 2, name: "Serviços" })
      ).toBeInTheDocument();
    });
    for (const name of ["Desenvolvimento Web", "Design UI/UX", "Automação & Scripts", "Apps & Mobile"]) {
      expect(screen.getByRole("heading", { level: 3, name })).toBeInTheDocument();
    }
    expect(
      screen.queryByRole("heading", { level: 1, name: "Desenvolvimento Web" })
    ).not.toBeInTheDocument();
  });
```

- [ ] **Step 2: Run to verify failure**

Run: `pnpm test -- src/test/headings.test.tsx`
Expected: FAIL — service titles are currently `h3` already? They are (`ServicesPage:64`) — so this test passes today. It exists to lock the structure while the layout changes; if it passes, continue (it becomes the regression guard for Step 3).

- [ ] **Step 3: Recompose the section**

Rewrite `src/pages/ServicesPage.tsx` — data array `services` stays exactly as-is; component body becomes:

```tsx
const ServicesPage = () => {
  return (
    <PageTransition>
      <section className="page-section">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="o que eu faço"
            title="Serviços"
            description="Soluções completas para transformar suas ideias em produtos digitais de alta qualidade."
          />

          <ul className="border-t border-line">
            {services.map((service, i) => (
              <li key={service.title} className="border-b border-line">
                <Reveal
                  delay={i}
                  className="grid gap-3 py-7 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-10"
                >
                  <div className="flex items-center gap-3">
                    <service.icon size={20} className="text-accent-text" aria-hidden="true" />
                    <h3 className="card-title">{service.title}</h3>
                  </div>
                  <div>
                    <p className="text-ink-soft text-[0.95rem] leading-relaxed mb-3">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal className="mt-12">
            <div className="surface-card p-8 max-w-2xl mx-auto text-center">
              <h3 className="card-title mb-2">Tem um projeto em mente?</h3>
              <p className="text-ink-soft text-sm mb-6">
                Vamos conversar sobre como posso ajudar a transformar sua ideia
                em realidade.
              </p>
              <a
                href="https://www.99freelas.com.br/user/Samuteg10"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Solicitar orçamento
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
};
```

Update imports: drop `useInView`, add `Reveal`. The rows are non-interactive content, so they get **no** hover state (a hover affordance on non-links misleads — `color.md › Best practices`, "Avoid using the same color to mean different things").

- [ ] **Step 4: Run tests**

Run: `pnpm test`
Expected: PASS.

---

### Task 8: Skills — `h3` titles, `Reveal`, equal-height cards

**Files:**
- Modify: `src/pages/SkillsPage.tsx`
- Modify: `src/test/headings.test.tsx`

**Interfaces:**
- Consumes: `Reveal`, `.card-title`.
- Produces: stack titles as `h3`.

- [ ] **Step 1: Write the failing test**

Append to `src/test/headings.test.tsx`:

```tsx
  it("renders skill stacks as h3 under the Skills h2", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole("heading", { level: 2, name: "Skills" })).toBeInTheDocument();
    });
    for (const name of ["Frontend", "Backend", "DevOps & Tools"]) {
      expect(screen.getByRole("heading", { level: 3, name })).toBeInTheDocument();
    }
  });
```

- [ ] **Step 2: Run to verify failure**

Run: `pnpm test -- src/test/headings.test.tsx`
Expected: FAIL — stack titles are currently `h2` (`SkillsPage:71`).

- [ ] **Step 3: Implement**

In `src/pages/SkillsPage.tsx`:
- Remove the `useInView` import.
- `SkillItem` (lines 30-56) is unchanged.
- `StackCard` becomes a pure component:

```tsx
const StackCard = ({ title, icon, skills }: StackCardProps) => (
  <Reveal className="h-full">
    <div className="surface-card p-7 h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-card2 border border-line flex items-center justify-center text-ink">
          {icon}
        </div>
        <h3 className="card-title">{title}</h3>
      </div>

      <ul className="grid grid-cols-1 gap-2">
        {skills.map((skill) => (
          <SkillItem key={skill.label} {...skill} />
        ))}
      </ul>
    </div>
  </Reveal>
);
```

Add `import Reveal from "../components/Reveal";`. The grid markup in `SkillsPage` (line 94) stays unchanged — `Reveal` becomes the grid item and `h-full` keeps card heights equal.

- [ ] **Step 4: Run tests**

Run: `pnpm test`
Expected: PASS.

---

### Task 9: Projetos — featured first, no invented rating, honest button sizes

**Files:**
- Modify: `src/pages/ProjectsPage.tsx`
- Modify: `src/test/headings.test.tsx`

**Interfaces:**
- Consumes: `Reveal`, `.card-title`, semantic colors.
- Produces: project titles as `h3`; `projects` array reordered with the featured item first; no `rating` field anywhere.

- [ ] **Step 1: Write the failing test**

Append to `src/test/headings.test.tsx`:

```tsx
  it("lists the featured project first and shows no invented rating", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole("heading", { level: 3, name: "SamutegDev" })).toBeInTheDocument();
    });
    expect(screen.getByRole("heading", { level: 3, name: "TaskNest" })).toBeInTheDocument();
    const titles = screen
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);
    expect(titles.indexOf("SamutegDev")).toBeLessThan(titles.indexOf("TaskNest"));
    expect(screen.queryByText("4.8")).not.toBeInTheDocument();
    expect(screen.queryByText("4.9")).not.toBeInTheDocument();
    expect(screen.queryByText("4.1")).not.toBeInTheDocument();
  });
```

- [ ] **Step 2: Run to verify failure**

Run: `pnpm test -- src/test/headings.test.tsx`
Expected: FAIL — TaskNest is currently first and `4.8` is rendered.

- [ ] **Step 3: Reorder the data and drop the rating**

In the `projects` array (lines 9-45):
- Move the `SamutegDev` entry to the first position (array order = featured first).
- Delete the `rating` field from all three entries. Keep `title`, `description`, `image`, `tags`, `date`, `liveUrl`, `codeUrl`, `featured`.

- [ ] **Step 4: Rewrite `ProjectCard`**

```tsx
const ProjectCard = ({ project, index }: { project: (typeof projects)[number]; index: number }) => (
  <Reveal delay={index}>
    <article className="surface-card overflow-hidden">
      <div
        className={`grid grid-cols-1 ${
          project.featured ? "md:grid-cols-[420px_1fr]" : "md:grid-cols-[320px_1fr]"
        }`}
      >
        <div className="relative bg-card2 min-h-56 md:min-h-full">
          <img
            src={project.image}
            alt={`Preview do projeto ${project.title}`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center p-7">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="card-title">{project.title}</h3>
            {project.featured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent-wash border border-line text-accent-text font-mono text-[0.75rem]">
                <Star size={11} fill="currentColor" aria-hidden="true" />
                destaque
              </span>
            )}
          </div>

          <p className="text-ink-soft text-[0.95rem] leading-relaxed mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>

          <p className="flex items-center gap-4 meta mb-5">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={12} aria-hidden="true" />
              {project.date}
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <ExternalLink size={18} aria-hidden="true" />
                Ver projeto
              </a>
            )}
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-quiet"
              >
                <Github size={18} aria-hidden="true" />
                Código
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  </Reveal>
);
```

- Remove the `useInView` import; add `Reveal`.
- Container: `<div className="max-w-5xl mx-auto">` → `max-w-6xl` (line 137) for one container width across sections.
- The list wrapper `<div className="flex flex-col gap-6">` stays (children are now `Reveal` divs).

- [ ] **Step 5: Run tests**

Run: `pnpm test`
Expected: PASS.

---

### Task 10: Experiência — heading levels, unified motion, one link per certificate

**Files:**
- Modify: `src/pages/ExperiencesPage.tsx`
- Modify: `src/test/headings.test.tsx`

**Interfaces:**
- Consumes: `Reveal` (`left`/`fade`/`up`), `.section-title`, `.card-title`, semantic colors (swept in Task 1: `bg-accent ring-4 ring-canvas`).

- [ ] **Step 1: Write the failing test**

Append to `src/test/headings.test.tsx`:

```tsx
  it("keeps the experience hierarchy at h2 → h3 → h4", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole("heading", { level: 2, name: "Experiência" })).toBeInTheDocument();
    });
    expect(screen.getByRole("heading", { level: 3, name: "Experiência Profissional" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 4, name: "Desenvolvedor Freelancer" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Formação" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Certificados" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 4, name: "Java Fundamentos" })).toBeInTheDocument();
  });
```

- [ ] **Step 2: Run to verify failure**

Run: `pnpm test -- src/test/headings.test.tsx`
Expected: FAIL — subsections are `h2`, items are `h3`.

- [ ] **Step 3: Fix heading levels and section classes**

In `src/pages/ExperiencesPage.tsx`:
- Lines 146, 229, 258: `h2 className="text-xl font-display font-bold text-ink"` → `h2` stays `h2`? No — these are **subsections** of the section titled by `SectionHeader` (`h2`), so they must become `h3 className="section-title"`.
- Line 174 (job title), 236 (education title), 104 (certificate title): `h3 …` → `h4 className="card-title"`.

- [ ] **Step 4: Replace bespoke reveals with `Reveal`**

- Remove the `useInView` import; add `import Reveal from "../components/Reveal";`.
- `TimelineItem` becomes:

```tsx
const TimelineItem = ({ children, index = 0 }: { children: React.ReactNode; index?: number }) => (
  <Reveal variant="left" delay={index} className="relative pl-14 mb-8">
    {children}
  </Reveal>
);
```

- The timeline container (lines 151-156): `<div ref={expRef} className={…}>` → `<Reveal variant="fade" className="relative">` (keep the rail `<div aria-hidden …>` and the mapped `TimelineItem`s inside).
- The education header wrapper (lines 220-225): `<div ref={eduRef} className={…}>` → `<div className="flex items-center gap-3 mb-8">` (no reveal — the header is plain chrome; the card below carries the reveal via `Reveal` in Step 5).
- Remove `expRef`/`expInView`/`eduRef`/`eduInView` hook calls.

- [ ] **Step 5: Give certificates one link and a staggered reveal**

`CertCard` changes:
- Signature gains `index`:

```tsx
const CertCard = ({ pdf, image, alt, title, tech, org, index }: {
  pdf: string;
  image: string;
  alt: string;
  title: string;
  tech: string;
  org: string;
  index: number;
}) => (
```

- Root becomes `<Reveal delay={index}>` wrapping `<div className="surface-card p-6">`; the `useInView` hook call is removed.
- The image link `<a href={pdf} …>` becomes a plain container (one link per card):

```tsx
          <div className="overflow-hidden rounded-2xl border border-line bg-card2">
            <img
              src={image}
              alt={alt}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
```

- Certificate title: `h3` → `h4 className="card-title"` (Step 3).
- CTA anchor: `className="btn-quiet !min-h-[44px] self-start !px-5 !py-2.5 !text-sm"` → `className="btn-quiet self-start"`; text stays `Ver certificado`.
- In the map (line 264 onward), pass `index={i}`: `{certs.map((cert, i) => <CertCard key={cert.title} {...cert} index={i} />)}` — the seven hardcoded `<CertCard …/>` calls become a data array or each gains `index={0..6}`. Prefer a local `certificates` array of `{ pdf, image, alt, title, tech, org }` above the component and map it, to keep JSX flat.

- [ ] **Step 6: Run tests**

Run: `pnpm test`
Expected: PASS.

---

### Task 11: Contato — actionable rows are cards, static info is not

**Files:**
- Modify: `src/pages/ContactPage.tsx`
- Modify: `src/test/headings.test.tsx`

**Interfaces:**
- Consumes: `Reveal`, `.section-title`, `.meta`, semantic colors.

- [ ] **Step 1: Write the failing test**

Append to `src/test/headings.test.tsx`:

```tsx
  it("distinguishes static contact info from actionable links", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole("heading", { level: 2, name: "Contato" })).toBeInTheDocument();
    });
    expect(screen.getByRole("heading", { level: 3, name: "Informações" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 3, name: "Redes Sociais" })).toBeInTheDocument();
    const links = screen.getAllByRole("link");
    expect(links.some((link) => link.textContent?.includes("Brasil"))).toBe(false);
    const email = screen.getByRole("link", { name: /samuneveslopes@gmail\.com/i });
    expect(email).toHaveAttribute("href", "mailto:samuneveslopes@gmail.com");
  });
```

- [ ] **Step 2: Run to verify failure**

Run: `pnpm test -- src/test/headings.test.tsx`
Expected: FAIL — subsections are currently `h2`.

- [ ] **Step 3: Implement**

In `src/pages/ContactPage.tsx`:
- Remove the `useInView` import; add `Reveal`.
- Subsection headings (lines 70, 132): `h2 className="text-lg font-display font-bold text-ink mb-5 flex items-center gap-2"` → `h3 className="section-title mb-5 flex items-center gap-2"`.
- Column wrappers (lines 64-69, 126-131): `<div ref={infoRef} className={…}>` → `<Reveal className="space-y-3">`; same for the social column (`space-y-3` on the `Reveal`). Drop the hook calls.
- Row labels (`text-xs text-ink-mute block`, lines 86, 100, 149) → `className="meta block"`.
- **Static "Localização" row** (lines 95-107) loses the card treatment:

```tsx
                    <div className="flex items-center gap-4 py-4">
                      <span className="w-12 h-12 rounded-xl bg-card2 border border-line flex items-center justify-center text-ink">
                        <item.icon size={20} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="meta block">{item.label}</span>
                        <span className="text-sm font-medium text-ink">{item.value}</span>
                      </span>
                    </div>
```

- Link rows keep `surface-card … hover:border-line-strong transition-colors` (hover on links is correct; static content deliberately has no card and no hover).
- Bottom note card: `<div className="surface-card p-7">` (line 167) unchanged.

- [ ] **Step 4: Run tests**

Run: `pnpm test`
Expected: PASS.

---

### Task 12: Final gate — hierarchy walk, full verification, browser audit

**Files:**
- Modify: `src/test/headings.test.tsx`
- (No product code changes expected; fix anything the audit finds in the file it belongs to.)

- [ ] **Step 1: Add the full hierarchy walk test**

Append to `src/test/headings.test.tsx`:

```tsx
  it("never skips a heading level", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole("heading", { level: 2, name: "Contato" })).toBeInTheDocument();
    });
    const levels = screen
      .getAllByRole("heading")
      .map((heading) => Number(heading.tagName[1]));
    expect(levels[0]).toBe(1);
    for (let i = 1; i < levels.length; i++) {
      expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
    }
  });
```

- [ ] **Step 2: Run the full automated gate**

Run: `pnpm lint && pnpm typecheck && pnpm test && pnpm build`
Expected:
- lint: **exactly the 2 known pre-existing warnings**, no errors;
- typecheck: clean;
- all tests PASS;
- build succeeds (`dist/` regenerated, `stats.html` produced).

- [ ] **Step 3: Browser audit (dev server)**

Run: `pnpm dev` and open the site with the chrome-devtools tools:
1. `lighthouse_audit` (desktop, snapshot) → **no critical/serious accessibility issues**; note the score in the final report.
2. Keyboard pass: Tab from the skip link through nav → hero CTAs → open "Me contrate" and confirm Tab cycles only inside the dialog, Escape closes and focus returns to the button.
3. `emulate` with `prefers-reduced-motion: reduce` (or set `colorScheme`/media) → no content stuck invisible, no reveal animation.
4. Toggle `colorScheme: light` → verify contrast of `text-ink-mute`, `.meta`, `.tag`, and `btn-primary` still reads (all values listed in Global Constraints pass).
5. Resize to 375×812 → menu button opens the panel (`aria-controls`), no horizontal overflow, all tap targets ≥44px.

- [ ] **Step 4: Fix-and-repeat**

Any issue found maps back to its owning task's file (tokens → `tailwind.config.js`/`index.css`, headings → the page component, motion → `Reveal` or its consumer). Re-run Step 2 after each fix.

- [ ] **Step 5: Stop and report**

Report to the user: what changed per section, the Lighthouse accessibility score, the before/after of the two Critical findings (heading structure, focus ring), and the verification output. Do **not** commit — ask the user whether to commit.

---

## Self-review

- **Spec coverage:** tokens ✓ (T1), type scale + contrast fix ✓ (T2), motion unification ✓ (T3+T6-T11), heading hierarchy ✓ (T4, T7-T11, T12 walk), modal focus trap/describedby ✓ (T6), skip link + `aria-controls` ✓ (T5), 12px floor for `.tag`/badge ✓ (T2/T9), button `!`-overrides removed ✓ (T9/T10), per-section identity ✓ (T7-T11), containers unified to `max-w-6xl` ✓ (T9; Services/Skills/Home/Navbar/Footer already `6xl`, Experiences/Contact stay `4xl` because they are single-column text sections — intentional, not drift), browser/Lighthouse/reduced-motion/light-mode verification ✓ (T12).
- **Placeholders:** none — every step carries exact code, exact commands, exact expectations.
- **Type consistency:** `Reveal({children, variant, delay, className})` used identically in T6-T11; `.section-title`/`.card-title`/`.meta`/`.field` defined once in T2 and only consumed afterwards; `id="mobile-nav"`/`#main-content`/`hire-modal-hint` spelled identically in tests and components; `index` prop on `CertCard` matches the map call.
