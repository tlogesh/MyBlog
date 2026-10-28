import * as React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import Seo from '../components/seo';
import Engagement from '../components/engagement';

// Adds a copy button to every code block in the post.
function useCopyButtons(ref) {
  React.useEffect(() => {
    if (!ref.current) return undefined;
    const buttons = [];
    ref.current.querySelectorAll('pre').forEach((pre) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-code';
      btn.textContent = 'copy';
      btn.addEventListener('click', () => {
        if (!navigator.clipboard) return;
        navigator.clipboard.writeText(pre.innerText.replace(/copy$/, '').trimEnd()).then(() => {
          btn.textContent = 'copied';
          setTimeout(() => (btn.textContent = 'copy'), 1500);
        });
      });
      pre.appendChild(btn);
      buttons.push(btn);
    });
    return () => buttons.forEach((b) => b.remove());
  }, [ref]);
}

export default function Post({ data }) {
  const { post, newer, older } = data;
  const body = React.useRef(null);
  useCopyButtons(body);

  return (
    <Layout>
      <article className="post">
        <Link className="post__back" to="/">
          &larr; all posts
        </Link>
        <header className="post__head">
          <p className="post-card__meta">
            <time dateTime={post.frontmatter.isoDate}>{post.frontmatter.date}</time> &middot; {post.timeToRead} min read
          </p>
          <h1>{post.frontmatter.title}</h1>
          {post.frontmatter.description && <p className="hero__lead">{post.frontmatter.description}</p>}
          {post.frontmatter.tags && (
            <p className="tags">
              {post.frontmatter.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </p>
          )}
        </header>

        <div className="prose" ref={body} dangerouslySetInnerHTML={{ __html: post.html }} />

        <aside className="post__author">
          <img src="/img/author.jpg" alt="Logesh Thulasiraman" width="56" height="56" />
          <div>
            <strong>Logesh Thulasiraman</strong>
            <p className="muted">
              Principal engineer. Tech enthusiast. Forever tinkering. <a href="https://logesht.dev">logesht.dev</a>
            </p>
          </div>
        </aside>

        <Engagement slug={post.fields.slug} title={post.frontmatter.title} />

        <nav className="post-nav" aria-label="More posts">
          {newer ? (
            <Link to={newer.fields.slug}>
              <small>&larr; Newer</small>
              {newer.frontmatter.title}
            </Link>
          ) : (
            <span />
          )}
          {older ? (
            <Link className="post-nav__older" to={older.fields.slug}>
              <small>Older &rarr;</small>
              {older.frontmatter.title}
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>
    </Layout>
  );
}

export const Head = ({ data: { post } }) => (
  <Seo
    title={post.frontmatter.title}
    description={post.frontmatter.description || post.excerpt}
    path={post.fields.slug}
    type="article"
    image={post.frontmatter.ogImage || post.frontmatter.cover}
  />
);

export const query = graphql`
  query Post($id: String!, $newerId: String, $olderId: String) {
    post: markdownRemark(id: { eq: $id }) {
      html
      excerpt(pruneLength: 160)
      timeToRead
      fields {
        slug
      }
      frontmatter {
        title
        description
        tags
        cover
        ogImage
        date(formatString: "MMM D, YYYY")
        isoDate: date
      }
    }
    newer: markdownRemark(id: { eq: $newerId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    older: markdownRemark(id: { eq: $olderId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
