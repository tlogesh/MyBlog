import * as React from 'react';
import { Link } from 'gatsby';

const PORTFOLIO = 'https://logesht.dev';

function currentTheme() {
  const set = document.documentElement.getAttribute('data-theme');
  if (set) return set;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function ThemeToggle() {
  const toggle = () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {}
  };
  return (
    <button className="theme-toggle" type="button" aria-label="Toggle colour theme" onClick={toggle}>
      <svg className="icon-sun" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 1.5v3M12 19.5v3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M1.5 12h3M19.5 12h3M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1" />
      </svg>
      <svg className="icon-moon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z" />
      </svg>
    </button>
  );
}

// Thin bar at the top that fills as the reader scrolls.
function ReadingProgress() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (ref.current) ref.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="progress" ref={ref} aria-hidden="true" />;
}

export default function Layout({ children }) {
  return (
    <>
      <ReadingProgress />
      <nav className="nav" aria-label="Primary">
        <Link className="nav__brand" to="/">
          <span className="prompt">~/</span>blog
        </Link>
        <div className="nav__links">
          <a href={`${PORTFOLIO}/#about`}>about</a>
          <a href={`${PORTFOLIO}/#experience`}>experience</a>
          <a href={`${PORTFOLIO}/#work`}>work</a>
          <a href={`${PORTFOLIO}/#contact`}>contact</a>
        </div>
        <a className="nav__tab" href={PORTFOLIO}>
          portfolio
        </a>
        <ThemeToggle />
      </nav>
      <main className="blog-main">{children}</main>
      <footer className="footer">
        <p>
          Written by <a href={PORTFOLIO}>Logesh Thulasiraman</a> &middot; <a href="/feed.xml">RSS</a>
        </p>
        <p className="muted">
          <a href={PORTFOLIO}>&larr; logesht.dev</a>
        </p>
      </footer>
    </>
  );
}
