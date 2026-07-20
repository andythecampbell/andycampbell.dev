# andycampbell.dev

Personal site for Andy Campbell — senior full-stack developer working in
manufacturing software.

Angular, prerendered to static HTML. No server runtime.

## Stack

- **Angular 21** — standalone components, signals, zoneless
- **Tailwind CSS v4** — CSS-first `@theme` configuration, no `tailwind.config.js`
- **Static prerendering** — `outputMode: "static"`, builds to plain HTML/CSS/JS
- **Hosting** — Cloudflare Tunnel to a self-hosted Proxmox container

## Commands

```bash
npm start        # dev server at http://localhost:4200
npm run build    # prerender to dist/andycampbell-dev/browser
npm test         # unit tests (Vitest)
```

The build output is static files. Serve the `browser/` directory with any web
server; there is no Node process to run.

## Design notes

The spec lives in [`SPEC.md`](./SPEC.md) — audience, non-goals, design tokens,
section-by-section content direction, and the open items list. Read it before
making design or copy changes; several decisions in there are deliberate and
look arbitrary without the reasoning.

Two that are easy to undo by accident:

- **`@theme inline` in `src/styles.css`** is load-bearing. It makes utilities emit
  `var(--token)` instead of baking in hex at build time. Drop `inline` and the
  light/dark swap silently stops working.
- **The inline script in `src/index.html`** applies the theme class before first
  paint. Without it, returning dark-mode visitors get a white flash on load. It
  deliberately does *not* read `prefers-color-scheme` — see SPEC.md §7.

## Source material

Working material (resume, profile notes, original screen captures) lives in
`_source/`, which is gitignored and local-only.
