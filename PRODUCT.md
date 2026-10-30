# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two equally important audiences:

- **Freelance clients** — individuals and small companies, in Brazil and remote, evaluating Samuel to build a website, landing page, automation, or app. They arrive from 99freelas, GitHub, social profiles, or search and need to know whether he can deliver their project.
- **Recruiters and hiring managers** — evaluating Samuel for a full-time role, primarily on backend range and shipped work.

The dev logs are first-person technical writing by Samuel; they are not a separately prioritized audience.

## Product Purpose

Samuel's personal portfolio at https://samuteg.vercel.app. It presents his services, skills, projects, experience, certificates, and writing in one place. Success means a visitor starts a conversation — the primary path is the home-page quote modal that opens a prefilled WhatsApp message — or leaves with enough evidence to shortlist him for a role.

## Positioning

Backend range: Java/Spring alongside Node.js and Go, covering both enterprise and modern stacks, with frontend and UI/UX capability in the same person. A neighboring portfolio could not truthfully claim that combination.

## Operating Context

- Freelance development since 2023 (as stated on the Experience page), remote, based in Brazil.
- Client acquisition runs through the 99freelas profile, GitHub, LinkedIn, X, and Instagram; WhatsApp is the primary conversation channel.
- Work is scoped and delivered solo: landing pages, management systems with dashboards, automations and scripts, and API integrations.
- Certificates come from Rocketseat, Sololearning, Anthropic, Microsoft, and Instituto Federal.
- The site is a static React SPA on Vercel with no backend; the quote form composes a WhatsApp message client-side.

## Capabilities and Constraints

- Sections: Home, Services, Skills, Projects, Dev Logs, Experience, Contact; individual posts live at `/log/<slug>`.
- Services offered: web development, UI/UX design, automation and scripts, apps and mobile.
- Public projects: SamutegDev (Astro blog and portfolio), TaskNest (Kanban task management), DevBox CLI (Go developer CLI).
- Confirmed contact facts: samuneveslopes@gmail.com; WhatsApp +55 11 5849-1828; 99freelas /Samuteg10; GitHub @Samuteg; LinkedIn /in/samu-teg; X and Instagram @samuteg10.
- Site language is pt-BR today; an English version is planned.
- The numeric "2+ anos" experience claim must be removed. Describe experience without a year count; replacement copy is undecided.
- No backend, accounts, payments, or CMS. Content ships as code and markdown.
- No fabricated testimonials, client names, benchmarks, pricing, or deployment claims.

## Brand Commitments

- The product is Samuel's personal identity: the name "Samuel", the handles @Samuteg and @samuteg10, and the `~/dev` framing.
- Voice: first person, direct, technical, Portuguese; confident without sales hype.
- Real assets to preserve: the profile photo, project screenshots, and certificate PDFs with their preview images.

## Evidence on Hand

- Profile photo: `src/assets/profile.webp`.
- Project screenshots: `src/assets/blog_print.png`, `src/assets/taskprint.webp`, `src/assets/debox_print.webp`.
- Seven certificate PDFs with preview images in `src/assets/`: Java Fundamentals and Intermediate, Spring Boot Fundamentals and Mini-course, Claude 101, Microsoft AI, and Node.js.
- 22 first-person dev log posts in `content/logs/`.
- Live project URLs and public GitHub repositories for SamutegDev, TaskNest, and DevBox CLI.
- Absent: client testimonials, case studies with metrics, pricing, press coverage, and a downloadable CV. Future work must not invent them.

## Product Principles

1. **Two audiences, one credible surface.** Freelance clients and recruiters share the same evidence; never optimize one at the other's expense.
2. **Backend range is the differentiator.** Lead with Java/Spring, Node.js, and Go depth rather than generic full-stack claims.
3. **Every claim links to an artifact.** Projects, repositories, certificates, and posts are the proof; nothing is asserted without one.
4. **The shortest path is a conversation.** WhatsApp stays the obvious, low-friction next step wherever a visitor is ready.
5. **Writing is proof, not marketing.** Dev logs stay first-person records of building and learning.

## Open Decisions

- English version: planned, but routes, content coverage, and whether dev logs are translated are undecided.
- Experience claim: the number is removed, but the final replacement copy is undecided.
- Testimonials and case studies: no real material exists yet; adding them is undecided.
