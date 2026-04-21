# 0x156.com

Personal site — anonymous research on AI and Web3. Built with [Astro](https://astro.build), deployed to GitHub Pages at [0x156.com](https://0x156.com).

## Stack

- Astro 6 with MDX content collections
- Self-hosted fonts (Atkinson Hyperlegible)
- Pagefind static search
- Dynamic OG image generation (Satori + Resvg, no network calls at build time)
- RSS 2.0 feed, auto-generated sitemap, `robots.txt`
- Zero third-party trackers, zero CDN dependencies at runtime

## Local dev

```bash
npm install
npm run dev
```

Dev server runs at http://localhost:4321.

## Build

```bash
npm run build
# outputs dist/ and runs pagefind indexing
```

Preview the production build:

```bash
npm run preview
```

## Project layout

```
src/
  components/       Reusable Astro components
  content/blog/     Markdown posts (content collection)
  layouts/          Post layout with JSON-LD
  pages/            Route files
  styles/           Global CSS (purple theme tokens)
  utils/            Path helpers, OG image generator
  consts.ts         Site-wide constants — edit for branding
public/
  fonts/            Self-hosted woff fonts
  favicon.svg       Site favicon
  pgp.txt           REPLACE with your real ASCII-armored PGP public key
  CNAME             Custom domain for GitHub Pages
.github/workflows/
  website-deploy.yml   Builds and deploys to GitHub Pages on push to main
```

## Customizing

Key files to edit when branding changes:

- `src/consts.ts` — title, tagline, description, contact, PGP fingerprint, social links.
- `src/styles/global.css` — purple color tokens (light + dark variants).
- `public/favicon.svg` — brand mark.
- `public/pgp.txt` — your actual ASCII-armored public key.
- `src/content/blog/*.md` — add notes. Frontmatter fields: `title`, `description`, `pubDate`, `tags`, `heroImage`, `draft` (optional).

## Images

All hero images ship as SVG placeholders with keyword-rich filenames (e.g. `zero-knowledge-ml-proofs-hero.svg`). To swap in richer imagery generated with Nano Banana Pro (or any other tool):

1. Export as `.webp` using the same descriptive filename pattern.
2. Drop the file into `src/assets/`.
3. Update the `heroImage` path in the relevant post's frontmatter.

The content-collection schema accepts both SVG and raster images.

## Deploying to GitHub Pages

1. Push this repo to GitHub.
2. In the repo settings, go to **Pages → Build and deployment → Source** and select **GitHub Actions**.
3. The workflow in `.github/workflows/website-deploy.yml` runs on every push to `main`.
4. Point `0x156.com` DNS at GitHub Pages:
   - For the apex domain, add four A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   - Optionally add a CNAME for `www` pointing at `<your-gh-user>.github.io`.
5. `public/CNAME` is already set — GitHub Pages will pick it up.
6. Enable HTTPS in the Pages settings once DNS propagates.

## Privacy posture

The site makes zero third-party HTTP requests at runtime:

- No Google Fonts (Atkinson is self-hosted).
- No analytics, no trackers.
- No external CDN for CSS or JS.
- OG images are generated at build time from local font files — no fetch from Google Fonts, no network access required during build.

If you add anything that phones home, you are breaking the privacy posture.

## License

No license. This is an anonymous personal project. Feel free to be inspired; do not copy wholesale.
