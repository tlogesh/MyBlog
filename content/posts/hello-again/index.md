---
title: Hello again, world
date: 2026-10-25
description: The blog is back on a fresh Gatsby 5 setup, with posts as plain Markdown files.
tags: [meta, web]
---

My old blog ran on Gatsby 2 and a CMS that eventually stopped building. This one is a fresh, deliberately small Gatsby 5 site: every post is a Markdown file in its own repository, separate from my portfolio.

## How it works

- Each post lives in `content/posts/<slug>/index.md`, with its images next to it.
- Pushing a post triggers a Netlify build of just the blog. The portfolio never changes.
- No database, no server: Gatsby turns the Markdown into static pages, an RSS feed and a sitemap.

```js
// the whole publishing pipeline, more or less
for (const post of posts) {
  createPage({ path: post.slug, component: postTemplate });
}
```

## What I'll write about

Building products end to end: frontends, APIs, AI features, and the things that break in between.

> Learning grows by sharing.
