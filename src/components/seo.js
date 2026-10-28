import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

export default function Seo({ title, description, path = '/', type = 'website', image }) {
  const { site } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `);
  const meta = site.siteMetadata;
  const fullTitle = title ? `${title} | ${meta.title}` : meta.title;
  const desc = description || meta.description;
  const url = meta.siteUrl + path;
  const ogImage = image ? (image.startsWith('http') ? image : meta.siteUrl + image) : 'https://logesht.dev/img/og.png';

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#0b0f17" />
      <link rel="canonical" href={url} />
      <link rel="alternate" type="application/rss+xml" title={meta.title} href="/feed.xml" />
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='7' fill='%230b0f17'/><text x='6' y='22' font-family='monospace' font-size='16' font-weight='700' fill='%2334d399'>&gt;_</text></svg>"
      />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage} />
    </>
  );
}
