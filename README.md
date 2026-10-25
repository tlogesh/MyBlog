<a href="https://blog.logesht.dev" target="_blank">
<img src="https://logesht.dev/img/blog_image.png" alt="Logesh Thulasiraman Writes!" />
</a>

# Logesh Thulasiraman Writes

The blog at [blog.logesht.dev](https://blog.logesht.dev). A small Gatsby 5 site: posts are Markdown files, there's no database and no CMS server. It's a separate repo from the portfolio, so publishing a post never touches [logesht.dev](https://logesht.dev).

## Run locally

```bash
npm install
npm run develop
```

Then open http://localhost:8000.

## Write a post

1. Copy `content/posts/_template.md` to `content/posts/<slug>/index.md`.
2. Fill in the front matter (`title`, `date`, `description`, `tags`) and write in Markdown.
3. Put images in the same folder and reference them as `./image.png`.
4. Remove `draft: true`, commit and push. Netlify builds and publishes the blog.

Posts with `draft: true` are never published.

## What's inside

- `src/pages/index.js` – post list with tag filters
- `src/templates/post.js` – post page with code highlighting, copy buttons and newer/older links
- `src/styles/global.css` – same design tokens as the portfolio, light and dark
- `gatsby-plugin-feed` and `gatsby-plugin-sitemap` – `/feed.xml` and `/sitemap-index.xml`
