import { store, json, isAdmin } from '../lib/common.mjs';

// Moderation, guarded by the ADMIN_TOKEN environment variable.
// GET  /api/admin            -> all comments (pending first)
// POST /api/admin { key, action: 'approve' | 'delete' }
export default async (req) => {
  if (!isAdmin(req)) return json({ error: 'unauthorised' }, 401);
  const s = store();

  if (req.method === 'GET') {
    const { blobs } = await s.list({ prefix: 'comments/' });
    const all = (await Promise.all(blobs.map(async (b) => ({ key: b.key, ...(await s.get(b.key, { type: 'json' })) }))))
      .filter((c) => c.id)
      .sort((a, b) => (a.status === b.status ? b.createdAt.localeCompare(a.createdAt) : a.status === 'pending' ? -1 : 1));
    return json({ comments: all });
  }

  if (req.method !== 'POST') return json({ error: 'method not allowed' }, 405);

  let body;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'bad json' }, 400);
  }
  const key = String(body.key || '');
  if (!/^comments\/[a-z0-9-_]+\/[0-9a-f-]{36}$/.test(key)) return json({ error: 'bad key' }, 400);

  if (body.action === 'delete') {
    await s.delete(key);
    return json({ ok: true });
  }
  if (body.action === 'approve') {
    const c = await s.get(key, { type: 'json' });
    if (!c) return json({ error: 'not found' }, 404);
    await s.setJSON(key, { ...c, status: 'approved' });
    return json({ ok: true });
  }
  return json({ error: 'bad action' }, 400);
};

export const config = { path: '/api/admin' };
