import * as React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import Seo from '../components/seo';

export default function BlogIndex({ data }) {
  const posts = data.allMarkdownRemark.nodes;
  const tags = [...new Set(posts.flatMap((p) => p.frontmatter.tags || []))].sort();
  const [active, setActive] = React.useState('');
  const shown = active ? posts.filter((p) => (p.frontmatter.tags || []).includes(active)) : posts;

  return (
    <Layout>
      <header className="blog-hero">
        <p className="eyebrow">
          <span className="status-dot" />
          ~/blog
        </p>
        <h1>
          Notes from the <span className="shimmer">full stack</span>
        </h1>
        <p className="hero__lead">
          Writing about building products end to end: frontends, APIs, AI and everything that breaks in between.
        </p>
      </header>

      {tags.length > 0 && (
        <div className="stack-filter" role="group" aria-label="Filter posts">
          {['', ...tags].map((tag) => (
            <button
              key={tag || 'all'}
              type="button"
              className={`chip${active === tag ? ' is-active' : ''}`}
              onClick={() => setActive(tag)}
            >
              {tag || 'all'}
            </button>
          ))}
        </div>
      )}

      <div className="post-list">
        {shown.length === 0 && <p className="muted">First posts are on their way.</p>}
        {shown.map((post, i) => (
          <Link key={post.fields.slug} className="post-card" to={post.fields.slug} style={{ '--i': i }}>
            <p className="post-card__meta">
              <time dateTime={post.frontmatter.isoDate}>{post.frontmatter.date}</time> &middot; {post.timeToRead} min read
            </p>
            <h2>{post.frontmatter.title}</h2>
            <p className="post-card__desc">{post.frontmatter.description || post.excerpt}</p>
            {post.frontmatter.tags && (
              <p className="tags">
                {post.frontmatter.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </p>
            )}
            <span className="post-card__arrow" aria-hidden="true">
              &rarr;
            </span>
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export const Head = () => <Seo />;

export const query = graphql`
  {
    allMarkdownRemark(filter: { frontmatter: { draft: { ne: true } } }, sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt(pruneLength: 160)
        timeToRead
        fields {
          slug
        }
        frontmatter {
          title
          description
          tags
          date(formatString: "MMM D, YYYY")
          isoDate: date
        }
      }
    }
  }
`;
