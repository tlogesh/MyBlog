import { randomUUID } from 'node:crypto';
import { store, json, cleanSlug, rateLimited } from '../lib/common.mjs';

const MIN_FILL_MS = 3000;

// GET  /api/comments?slug=x -> approved comments, oldest first
// POST /api/comments { slug, name, message, website (honeypot), elapsed } -> stored as pending
export default async (req, context) => {
  const s = store();

  if (req.method === 'GET') {
    const slug = cleanSlug(new URL(req.url).searchParams.get('slug'));
    if (!slug) return json({ error: 'bad slug' }, 400);
    const { blobs } = await s.list({ prefix: `comments/${slug}/` });
    const all = await Promise.all(blobs.map((b) => s.get(b.key, { type: 'json' })));
    const comments = all
      .filter((c) => c && c.status === 'approved')
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
      .map(({ id, name, message, createdAt }) => ({ id, name, message, createdAt }));
    return json({ comments });
  }

  if (req.method !== 'POST') return json({ error: 'method not allowed' }, 405);

  let body;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'bad json' }, 400);
  }

  const slug = cleanSlug(body.slug);
  const name = String(body.name || '').trim().slice(0, 60);
  const message = String(body.message || '').trim();

  if (!slug) return json({ error: 'bad slug' }, 400);
  if (!name || message.length < 2 || message.length > 2000) {
    return json({ error: 'Please add your name and a comment (up to 2000 characters).' }, 400);
  }

  // Bots fill the hidden field or submit instantly; pretend it worked so they do not retry.
  if (body.website || Number(body.elapsed) < MIN_FILL_MS) return json({ ok: true, pending: true });

  if ((message.match(/https?:\/\//gi) || []).length > 2) {
    return json({ error: 'Too many links in one comment.' }, 400);
  }
  if (await rateLimited(s, context.ip || 'unknown', 'comment', 3, 600)) {
    return json({ error: 'You are commenting too fast. Please try again in a few minutes.' }, 429);
  }

  const id = randomUUID();
  await s.setJSON(`comments/${slug}/${id}`, {
    id,
    slug,
    name,
    message,
    status: 'pending',
    createdAt: new Date().toISOString(),
  });
  return json({ ok: true, pending: true });
};

export const config = { path: '/api/comments' };
