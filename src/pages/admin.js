import * as React from 'react';
import Layout from '../components/layout';

// Private moderation screen. The token is checked server-side on every call.
export default function Admin() {
  const [token, setToken] = React.useState('');
  const [comments, setComments] = React.useState(null);
  const [error, setError] = React.useState('');

  const call = React.useCallback(async (tok, init) => {
    const res = await fetch('/api/admin', {
      ...init,
      headers: { authorization: `Bearer ${tok}`, 'content-type': 'application/json' },
    });
    if (!res.ok) throw new Error(res.status === 401 ? 'Wrong token' : 'Request failed');
    return res.json();
  }, []);

  const load = React.useCallback(
    (tok) =>
      call(tok, {})
        .then((d) => {
          setComments(d.comments);
          setError('');
          try {
            sessionStorage.setItem('admin-token', tok);
          } catch (e) {}
        })
        .catch((e) => {
          setComments(null);
          setError(e.message);
        }),
    [call]
  );

  React.useEffect(() => {
    try {
      const saved = sessionStorage.getItem('admin-token');
      if (saved) {
        setToken(saved);
        load(saved);
      }
    } catch (e) {}
  }, [load]);

  const act = (key, action) =>
    call(token, { method: 'POST', body: JSON.stringify({ key, action }) })
      .then(() => load(token))
      .catch((e) => setError(e.message));

  return (
    <Layout>
      <div className="post">
        <h1>Moderation</h1>
        <form
          className="comment-form"
          onSubmit={(e) => {
            e.preventDefault();
            load(token);
          }}
        >
          <label>
            Admin token
            <input type="password" value={token} onChange={(e) => setToken(e.target.value)} autoComplete="off" />
          </label>
          <div className="comment-form__row">
            <button className="chip is-active" type="submit">
              Load comments
            </button>
            {error && <p className="comment-form__status is-error">{error}</p>}
          </div>
        </form>

        {comments && comments.length === 0 && <p className="muted">No comments yet.</p>}
        <ul className="comment-list">
          {(comments || []).map((c) => (
            <li key={c.key} className="comment">
              <div className="comment__main">
              <p className="comment__meta">
                <strong>{c.name}</strong>
                <span className={`badge is-${c.status}`}>{c.status}</span>
                <span>{c.slug}</span>
                <time dateTime={c.createdAt}>{new Date(c.createdAt).toLocaleString()}</time>
              </p>
              <p className="comment__body">{c.message}</p>
              <p className="admin-actions">
                {c.status !== 'approved' && (
                  <button type="button" className="chip is-active" onClick={() => act(c.key, 'approve')}>
                    Approve
                  </button>
                )}
                <button type="button" className="chip" onClick={() => act(c.key, 'delete')}>
                  Delete
                </button>
              </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export const Head = () => (
  <>
    <title>Moderation</title>
    <meta name="robots" content="noindex, nofollow" />
  </>
);
