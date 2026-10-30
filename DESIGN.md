---
name: Samuel — Portfolio
description: Personal portfolio for Samuel, a full-stack developer working in Brazil.
colors:
  canvas: "#0a0a0a"
  surface-1: "#121212"
  surface-2: "#181818"
  text-1: "#f0ece8"
  text-2: "#bcb8b4"
  text-3: "#888480"
  line: "rgba(255, 255, 255, 0.07)"
  line-strong: "rgba(255, 255, 255, 0.14)"
  signal-amber: "#fca311"
  amber-hover: "#ffb43c"
  amber-active: "#e08f0b"
  amber-wash: "rgba(252, 163, 17, 0.09)"
  success: "#6fce8f"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(3rem, 7vw, 5.25rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2rem, 4.5vw, 3rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(1.25rem, 2vw, 1.625rem)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  card-title:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: "Outfit, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "DM Mono, ui-monospace, monospace"
    fontSize: "0.625rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "12px"
  full: "999px"
spacing:
  gutter-sm: "16px"
  gutter: "24px"
  row: "14px"
  block: "28px"
  band: "48px"
components:
  button-primary:
    backgroundColor: "{colors.signal-amber}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.md}"
    padding: "12px 22px"
  button-primary-hover:
    backgroundColor: "{colors.amber-hover}"
  button-primary-active:
    backgroundColor: "{colors.amber-active}"
  button-quiet:
    textColor: "{colors.text-1}"
    rounded: "{rounded.md}"
    padding: "12px 22px"
  tag:
    textColor: "{colors.text-2}"
    backgroundColor: "{colors.amber-wash}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  field:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.text-1}"
    rounded: "{rounded.md}"
    padding: "11px 16px"
    height: "44px"
  card:
    backgroundColor: "{colors.surface-1}"
    rounded: "{rounded.lg}"
---

# Design System: Samuel — Portfolio

## Overview

**Creative North Star: "The Terminal Broadsheet"**

Two registers held in one surface: the ruled, columned composure of a printed broadsheet, and the clipped monospaced shorthand of a shell session. Every section is a band inside a bordered frame, separated by a hairline instead of a gap, so the page reads as one continuous printed sheet. Against that structure the microcopy speaks in `~/home`, `$ exp`, and `#` — the site's only technical flourish, and a deliberately small one.

The personality is quiet, warm, and confident. Warmth comes from the near-black canvas and the cream-leaning ink, not from hue; the single amber accent behaves like an instrument light on a dark panel. There are no gradients, no decorative glows, and no box-shadows anywhere in the system.

Density is editorial. Header rows are 14px tall, card blocks 28px, and the generous space lives *between* bands rather than inside them. Type carries the hierarchy: a serif display voice for the claim, a geometric sans for the argument, and monospace for the metadata.

**Key Characteristics:**
- Hairline-ruled frame; grids are divided by 1px lines, never by gaps.
- Warm near-black canvas, cream text, one amber signal.
- Playfair Display for claims, Outfit for prose, DM Mono for metadata.
- Flat by default — zero box-shadows in the entire system.
- Shell framing (`~/`, `$`, `#`) as the only technical ornament.

## Colors

A warm dark room lit by a single amber lamp.

### Primary

- **Signal Amber** (#fca311): the only saturated color. Fills the primary CTA, marks the active nav item, tints icons and inline links, and lights the timeline dot. It behaves as a state color first and a brand color second.

### Neutral

- **Warm Near-Black** (#0a0a0a): the page canvas, and the text color *on* amber buttons.
- **Panel** (#121212): cards, fields, code blocks, and the modal surface.
- **Panel Raised** (#181818): icon tiles and image placeholders that need to sit one step above a panel.
- **Cream Ink** (#f0ece8): primary text. Never pure white.
- **Soft Ink** (#bcb8b4): descriptions, body copy, secondary text.
- **Muted Ink** (#888480): metadata, labels, placeholders, inactive nav.
- **Hairline** (rgba(255,255,255,0.07)): every divider, card border, and frame rail.
- **Hairline Strong** (rgba(255,255,255,0.14)): borders that must be visible as affordances — quiet buttons, social buttons, the modal edge.
- **Success** (#6fce8f): the availability dot, and nothing else.

### Named Rules

**The One Lamp Rule.** Amber is a signal, not a surface. It fills the primary CTA, the timeline marker, and hover/active states; it never becomes a background band, a gradient, or a section tint. The only permitted wash is the 9% `--accent-wash` behind small pills.

**The Warm Neutral Rule.** No pure black and no pure white. Every neutral carries a trace of warmth; `#000` and `#fff` do not appear in the system.

## Typography

**Display Font:** Playfair Display (with Georgia, serif)
**Body Font:** Outfit (with system-ui, sans-serif)
**Label/Mono Font:** DM Mono (with ui-monospace, monospace)

**Character:** an editorial serif that would be at home in print, set against a geometric sans that keeps the argument plain, with a monospace reserved for the shell frame and metadata. The contrast is serif-claim / sans-argument / mono-label.

### Hierarchy

- **Display** (500, `clamp(3rem, 7vw, 5.25rem)`, 1.02, -0.02em): the hero name only; `Samuel` is set in italic on its own line.
- **Headline** (500, `clamp(2rem, 4.5vw, 3rem)`, 1.08, -0.02em): page titles such as "Serviços" and "Experiência".
- **Title** (500, `clamp(1.25rem, 2vw, 1.625rem)`, 1.2, -0.01em): section headings inside a band.
- **Card title** (Outfit 600, 0.95rem, 1.35): names of cards, services, and certificates — sans, so the serif stays structural.
- **Body** (400, 0.95rem, 1.7): descriptions and prose, capped at 42rem (roughly 65ch).
- **Label** (DM Mono 500, 0.625rem, 0.08–0.14em, uppercase): eyebrows, metadata, tags, and nav links.

### Named Rules

**The Serif-Is-Structure Rule.** Playfair appears only on display, page, and section headings. Card titles, body copy, buttons, tags, and labels are Outfit or DM Mono. Never set a paragraph or a control in the serif.

**The Mono-Is-Metadata Rule.** DM Mono is reserved for measurement and system voice: routes, dates, tags, counts, nav labels. It is never used for body copy.

## Layout

A single centered `.frame` at max-width 72rem (1152px) carries two 1px vertical rails and a bottom hairline that closes each band. The navbar reuses the same frame with its rails suppressed, so its contents align to the page's inner columns.

Inside the frame, everything is a band: a header row (title left, `~/ label` or an action right) closed by a hairline, an optional description row closed by a hairline, then content. Multi-column grids are built from hairline dividers rather than gaps — `md:border-r` on even cells, `md:border-t` on the second row — so a 2×2 grid reads as one ruled table rather than four floating cards.

Gutters are 16px on mobile and 24px from 640px up. Band padding is 14px for header rows, 28px for card blocks, and 32–48px for section bodies. The hero fills `calc(100vh - 4rem)` and splits at 1024px into `1.15fr 0.85fr`.

Responsive behavior: one column below 640px, two columns at 768px, the hero split at 1024px. The desktop nav collapses at 768px into a 44px icon button and a full-width sheet that animates max-height and opacity.

## Elevation & Depth

There are no shadows in this system. Depth is tonal and linear: canvas → panel → raised panel, separated by 1px hairlines instead of blur. The only translucent surfaces are functional — the navbar's 92%-opaque background with an 18px backdrop blur, and the modal scrim. The modal itself is flat: a panel with a 1px strong border and a short scale-in entrance. Under `prefers-reduced-transparency` the blur is dropped and the navbar becomes opaque.

### Named Rules

**The Flat-By-Default Rule.** No box-shadow, ever. If something must separate from its neighbour, add a hairline or step the surface tone — never a shadow, never a glow. A `ring-4` in the canvas color is allowed only to punch a timeline dot out of a dashed line.

## Shapes

Two form families, deliberately contrasted. **Structural elements are square**: bands, grids, image frames, and dividers all meet at right angles and close with 1px lines. **Interactive objects are softly rounded**: 10px for buttons and fields, 12px for cards and the modal, 6px for icon tiles and the logo mark, and fully round (999px) for tags, status pills, and social icon buttons.

The recurring silhouette is the ruled table: full-bleed 1px lines meeting at right angles, with rounded objects floating inside the cells. Circles are reserved for status dots, social buttons, and the timeline marker.

## Components

### Buttons

- **Shape:** softly rounded (10px), 44px minimum height, 12px × 22px padding, 0.9rem label at weight 600.
- **Primary:** amber fill with canvas-colored text. This is the only filled button in the system.
- **Hover / Focus:** hover steps to #ffb43c; active steps to #e08f0b and scales to 0.99. Focus is a 2px amber outline at 3px offset, inherited globally.
- **Quiet:** transparent with a 1px strong hairline and primary-ink text; hover raises the border to muted ink and adds a 4% white wash. Used beside the primary when a second path exists.

### Chips

- **Style:** fully round, 4px × 10px, 1px hairline border, 0.625rem DM Mono uppercase at 0.06em, soft-ink text on a 4% white wash.
- **State:** static. Tags describe, they do not filter; the one variant is the "destaque" badge, which swaps the wash for a 9% amber tint and the text for amber.

### Cards / Containers

- **Corner Style:** 12px.
- **Background:** panel (#121212); raised panel (#181818) for media wells and icon tiles.
- **Shadow Strategy:** none — see Elevation & Depth.
- **Border:** 1px hairline, always.
- **Internal Padding:** 16–24px on mobile, 24–32px on desktop.

### Inputs / Fields

- **Style:** panel background, 1px hairline border, 10px radius, 44px minimum height, 1rem text on mobile to prevent iOS zoom.
- **Focus:** the global 2px amber outline plus an amber border shift; no glow.
- **Error / Disabled:** none implemented; native validation only.

### Navigation

- **Style:** fixed, transparent at the top of the page, switching to the glass treatment after 20px of scroll. Left: a 32px amber rounded-square monogram, the wordmark, and a `~/dev` mono suffix. Center: seven DM Mono uppercase links at 0.65rem. Right: a pill-shaped "Contatar" link with a diagonal arrow.
- **States:** the active link is amber; inactive links are muted ink and step to primary ink on hover. The active item is also marked `aria-current="page"`.
- **Mobile:** a 44px bordered icon button opens a full-width sheet whose rows are 44px, separated by hairlines, each ending in `#` or `//` to mark the current section.

### Section Header (signature)

A two-row band: the first row pairs the section title with a right-aligned `~/ eyebrow` (or an action), the second holds a single-sentence description at 42rem. Both rows are closed by a hairline and share the same 14px vertical padding. This component, more than any other, is what makes the site read as a broadsheet.

## Do's and Don'ts

### Do:

- **Do** separate regions with a 1px hairline in `rgba(255,255,255,0.07)` instead of with spacing alone.
- **Do** keep grids gapless and draw the dividers per cell (`md:border-r`, `md:border-t`).
- **Do** reserve amber for state and the single primary CTA; keep it under roughly 10% of any screen.
- **Do** use `clamp()` for every heading so the broadsheet holds from 360px to 1440px.
- **Do** give every interactive element a 44px minimum touch target, even when the visual is smaller.
- **Do** keep the mono label uppercase and tracked; it is the system's voice, not decoration.

### Don't:

- **Don't** add a box-shadow, glow, or gradient to create depth — step the surface tone or add a hairline.
- **Don't** introduce a second accent hue; success green is a status dot, not a palette.
- **Don't** set body copy, buttons, or tags in Playfair Display.
- **Don't** use pure black or pure white; the warm neutrals are load-bearing.
- **Don't** put rounded corners on structural bands or dividers, and don't square off the interactive objects.
- **Don't** animate anything beyond opacity and small transforms; motion is a reveal, not a performance.
