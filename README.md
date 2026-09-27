# Terraforge Engineering — Next.js Migration

This project has been migrated from Vite + React Router to Next.js App Router.

## Visual/design preservation

The existing UI, Tailwind classes, CSS animations, images, component markup, responsive breakpoints, colors, typography, and page content were intentionally preserved. The migration focuses on framework infrastructure rather than redesign.

## Routes

- `/`
- `/about`
- `/services`
- `/services/[id]`
- `/work`
- `/work/[slug]`
- `/contact`
- `/admin`
- `/admin/gallery`
- `/admin/work`
- `/admin/enquiries`
- `/dashboard` redirects to `/admin`

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm start
```

Node.js 20.9+ is recommended for the selected Next.js version.
