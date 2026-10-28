import { store, json, sha, cleanSlug, rateLimited, REACTIONS } from '../lib/common.mjs';

// GET  /api/react?slug=x&client=id  -> { counts, mine }
// POST /api/react { slug, type, client } toggles one reaction for that client.
export default async (req, context) => {
  const s = store();

  if (req.method === 'GET') {
    const url = new URL(req.url);
    const slug = cleanSlug(url.searchParams.get('slug'));
    if (!slug) return json({ error: 'bad slug' }, 400);
    return json(await state(s, slug, url.searchParams.get('client')));
  }

  if (req.method !== 'POST') return json({ error: 'method not allowed' }, 405);

  let body;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'bad json' }, 400);
  }
  const slug = cleanSlug(body.slug);
  const client = String(body.client || '');
  if (!slug || !REACTIONS.includes(body.type) || client.length < 8 || client.length > 64) {
    return json({ error: 'bad request' }, 400);
  }
  if (await rateLimited(s, context.ip || 'unknown', 'react', 40, 600)) {
    return json({ error: 'too many requests' }, 429);
  }

  const counts = (await s.get(`reactions/${slug}`, { type: 'json' })) || {};
  const voterKey = `voters/${slug}/${sha(client)}`;
  const mine = (await s.get(voterKey, { type: 'json' })) || [];

  if (mine.includes(body.type)) {
    mine.splice(mine.indexOf(body.type), 1);
    counts[body.type] = Math.max(0, (counts[body.type] || 0) - 1);
  } else {
    mine.push(body.type);
    counts[body.type] = (counts[body.type] || 0) + 1;
  }
  await s.setJSON(voterKey, mine);
  await s.setJSON(`reactions/${slug}`, counts);
  return json({ counts: normalise(counts), mine });
};

const normalise = (counts) => Object.fromEntries(REACTIONS.map((r) => [r, counts[r] || 0]));

async function state(s, slug, client) {
  const counts = (await s.get(`reactions/${slug}`, { type: 'json' })) || {};
  const mine = client ? (await s.get(`voters/${slug}/${sha(client)}`, { type: 'json' })) || [] : [];
  return { counts: normalise(counts), mine };
}

export const config = { path: '/api/react' };
