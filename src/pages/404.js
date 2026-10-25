import * as React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import Seo from '../components/seo';

export default function NotFound() {
  return (
    <Layout>
      <header className="blog-hero">
        <p className="eyebrow">
          <span className="status-dot" />
          HTTP 404
        </p>
        <h1>This post was never deployed.</h1>
        <p className="hero__lead">
          It might have moved, or it's still a draft. <Link to="/">Browse all posts</Link> instead.
        </p>
      </header>
    </Layout>
  );
}

export const Head = () => <Seo title="Not found" />;
