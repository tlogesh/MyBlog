import * as React from 'react';

const REACTIONS = [
  { type: 'like', emoji: '👍', label: 'Like' },
  { type: 'love', emoji: '❤️', label: 'Love' },
  { type: 'fire', emoji: '🔥', label: 'Fire' },
  { type: 'idea', emoji: '💡', label: 'Insightful' },
];

const SITE = 'https://blog.logesht.dev';

const FILL = {
  X: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  LinkedIn:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  WhatsApp:
    'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z',
};

function Icon({ name }) {
  if (FILL[name]) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d={FILL[name]} />
      </svg>
    );
  }
  const stroke = {
    link: <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />,
    check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
    share: <path d="M12 3v12M7.5 7.5L12 3l4.5 4.5M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />,
  }[name];
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {stroke}
    </svg>
  );
}

const AVATAR_HUES = [158, 215, 265, 330, 28, 190];

function Avatar({ name }) {
  const hue = AVATAR_HUES[[...name].reduce((n, ch) => n + ch.charCodeAt(0), 0) % AVATAR_HUES.length];
  return (
    <span className="avatar" style={{ '--hue': hue }} aria-hidden="true">
      {(name.trim()[0] || '?').toUpperCase()}
    </span>
  );
}

function ago(iso) {
  const sec = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  const units = [['year', 31536000], ['month', 2592000], ['day', 86400], ['hour', 3600], ['minute', 60]];
  for (const [unit, size] of units) {
    if (sec >= size) {
      const n = Math.floor(sec / size);
      return `${n} ${unit}${n > 1 ? 's' : ''} ago`;
    }
  }
  return 'just now';
}

function clientId() {
  try {
    let id = localStorage.getItem('client-id');
    if (!id) {
      id = (crypto.randomUUID && crypto.randomUUID()) || String(Math.random()).slice(2) + Date.now();
      localStorage.setItem('client-id', id);
    }
    return id;
  } catch (e) {
    return 'anon-' + Math.random().toString(36).slice(2, 12);
  }
}

function Reactions({ slug }) {
  const [state, setState] = React.useState({ counts: {}, mine: [] });
  const client = React.useRef('');

  React.useEffect(() => {
    client.current = clientId();
    fetch(`/api/react?slug=${encodeURIComponent(slug)}&client=${encodeURIComponent(client.current)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((s) => s && setState(s))
      .catch(() => {});
  }, [slug]);

  const toggle = (type) => {
    // Optimistic update, then settle on the server's answer.
    setState((s) => {
      const on = s.mine.includes(type);
      return {
        counts: { ...s.counts, [type]: Math.max(0, (s.counts[type] || 0) + (on ? -1 : 1)) },
        mine: on ? s.mine.filter((t) => t !== type) : [...s.mine, type],
      };
    });
    fetch('/api/react', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ slug, type, client: client.current }),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((s) => s && setState(s))
      .catch(() => {});
  };

  return (
    <div className="reactions" role="group" aria-label="React to this post">
      {REACTIONS.map((r) => (
        <button
          key={r.type}
          type="button"
          className={`reaction${state.mine.includes(r.type) ? ' is-on' : ''}`}
          aria-pressed={state.mine.includes(r.type)}
          aria-label={r.label}
          onClick={() => toggle(r.type)}
        >
          <span aria-hidden="true">{r.emoji}</span>
          <span className="reaction__n">{state.counts[r.type] || 0}</span>
        </button>
      ))}
    </div>
  );
}

function Share({ slug, title }) {
  const [copied, setCopied] = React.useState(false);
  const [canNative, setCanNative] = React.useState(false);
  React.useEffect(() => setCanNative(typeof navigator !== 'undefined' && !!navigator.share), []);

  const url = `${SITE}/${slug.replace(/^\/|\/$/g, '')}/`;
  const enc = encodeURIComponent;
  const links = [
    ['X', `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`],
    ['LinkedIn', `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`],
    ['WhatsApp', `https://wa.me/?text=${enc(`${title} ${url}`)}`],
  ];

  const copy = () => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="share">
      <span className="share__label">Share</span>
      {canNative && (
        <button
          type="button"
          className="share__btn"
          aria-label="Share"
          title="Share"
          onClick={() => navigator.share({ title, url }).catch(() => {})}
        >
          <Icon name="share" />
        </button>
      )}
      {links.map(([name, href]) => (
        <a
          key={name}
          className="share__btn"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${name}`}
          title={`Share on ${name}`}
        >
          <Icon name={name} />
        </a>
      ))}
      <button
        type="button"
        className={`share__btn${copied ? ' is-on' : ''}`}
        aria-label={copied ? 'Link copied' : 'Copy link'}
        title={copied ? 'Link copied' : 'Copy link'}
        onClick={copy}
      >
        <Icon name={copied ? 'check' : 'link'} />
      </button>
    </div>
  );
}

function Comments({ slug }) {
  const [comments, setComments] = React.useState(null);
  const [form, setForm] = React.useState({ name: '', message: '', website: '' });
  const [status, setStatus] = React.useState({ kind: 'idle', text: '' });
  const shownAt = React.useRef(Date.now());

  React.useEffect(() => {
    fetch(`/api/comments?slug=${encodeURIComponent(slug)}`)
      .then((r) => (r.ok ? r.json() : { comments: [] }))
      .then((d) => setComments(d.comments))
      .catch(() => setComments([]));
    try {
      setForm((f) => ({ ...f, name: localStorage.getItem('comment-name') || '' }));
    } catch (e) {}
  }, [slug]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ kind: 'busy', text: 'Sending…' });
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ slug, ...form, elapsed: Date.now() - shownAt.current }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ kind: 'error', text: data.error || 'Something went wrong.' });
        return;
      }
      try {
        localStorage.setItem('comment-name', form.name);
      } catch (err) {}
      setForm((f) => ({ ...f, message: '' }));
      shownAt.current = Date.now();
      setStatus({ kind: 'ok', text: 'Thanks! Your comment will appear once it has been approved.' });
    } catch (err) {
      setStatus({ kind: 'error', text: 'Could not reach the server. Please try again.' });
    }
  };

  return (
    <section className="comments" aria-labelledby="comments-h">
      <h2 id="comments-h">
        Discussion
        {comments && comments.length > 0 && <span className="comments__count">{comments.length}</span>}
      </h2>

      {comments && comments.length === 0 && (
        <p className="comments__empty">No comments yet. Start the conversation below.</p>
      )}
      <ul className="comment-list">
        {(comments || []).map((c) => (
          <li key={c.id} className="comment">
            <Avatar name={c.name} />
            <div className="comment__main">
              <p className="comment__meta">
                <strong>{c.name}</strong>
                <time dateTime={c.createdAt} title={new Date(c.createdAt).toLocaleString()}>
                  {ago(c.createdAt)}
                </time>
              </p>
              <p className="comment__body">{c.message}</p>
            </div>
          </li>
        ))}
      </ul>

      <form className="comment-form" onSubmit={submit}>
        <h3>Leave a comment</h3>
        <label>
          Name
          <input value={form.name} onChange={set('name')} maxLength={60} required autoComplete="name" placeholder="Your name" />
        </label>
        <label>
          Comment
          <textarea
            value={form.message}
            onChange={set('message')}
            maxLength={2000}
            rows={4}
            required
            placeholder="What did you think?"
          />
          <span className="comment-form__count">{form.message.length}/2000</span>
        </label>
        {/* Honeypot: hidden from people, irresistible to bots. */}
        <label className="hp" aria-hidden="true">
          Website
          <input value={form.website} onChange={set('website')} tabIndex={-1} autoComplete="off" />
        </label>
        <div className="comment-form__row">
          <button className="btn" type="submit" disabled={status.kind === 'busy'}>
            {status.kind === 'busy' ? 'Sending…' : 'Post comment'}
          </button>
          <p className="muted comment-form__hint">No sign-in needed. Comments are reviewed before they appear.</p>
        </div>
        {status.text && status.kind !== 'busy' && (
          <p className={`comment-form__status is-${status.kind}`} role="status">
            {status.text}
          </p>
        )}
      </form>
    </section>
  );
}

export default function Engagement({ slug, title }) {
  return (
    <div className="engagement">
      <Reactions slug={slug} />
      <Share slug={slug} title={title} />
      <Comments slug={slug} />
    </div>
  );
}
