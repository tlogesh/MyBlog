import { getStore } from '@netlify/blobs';
import { createHash, timingSafeEqual } from 'node:crypto';

export const store = () => getStore({ name: 'engagement', consistency: 'strong' });

export const REACTIONS = ['like', 'love', 'fire', 'idea'];

export const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

export const sha = (value) =>
  createHash('sha256')
    .update(`${process.env.HASH_SALT || 'dev-salt'}:${value}`)
    .digest('hex')
    .slice(0, 32);

// Slugs come from Gatsby (/my-post/), so keep them to a safe key alphabet.
export const cleanSlug = (slug) => {
  const s = String(slug || '').toLowerCase().replace(/^\/+|\/+$/g, '');
  return /^[a-z0-9][a-z0-9-_/]{0,120}$/.test(s) ? s.replace(/\//g, '_') : null;
};

// Fixed-window limiter per hashed IP. Good enough to blunt spam without an account system.
export async function rateLimited(s, ip, bucket, max, windowSec) {
  const win = Math.floor(Date.now() / 1000 / windowSec);
  const key = `rl/${bucket}/${sha(ip)}/${win}`;
  const hit = await s.get(key, { type: 'json' });
  const count = hit?.count || 0;
  if (count >= max) return true;
  await s.setJSON(key, { count: count + 1 });
  return false;
}

export function isAdmin(req) {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return false;
  const given = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  const a = Buffer.from(given);
  const b = Buffer.from(token);
  return a.length === b.length && timingSafeEqual(a, b);
}
