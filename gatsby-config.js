const siteUrl = 'https://blog.logesht.dev';

module.exports = {
  siteMetadata: {
    title: 'Logesh Thulasiraman Writes',
    description: 'Notes on full-stack engineering, APIs and AI by Logesh Thulasiraman.',
    author: 'Logesh Thulasiraman',
    siteUrl,
    portfolioUrl: 'https://logesht.dev',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: { name: 'posts', path: `${__dirname}/content/posts` },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-prismjs',
            options: { noInlineHighlight: true },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: { excludes: ['/404/', '/404.html', '/admin/'] },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        feeds: [
          {
            title: 'Logesh Thulasiraman Writes',
            output: '/feed.xml',
            query: `{
              allMarkdownRemark(
                filter: { frontmatter: { draft: { ne: true } } }
                sort: { frontmatter: { date: DESC } }
              ) {
                nodes {
                  excerpt
                  html
                  fields { slug }
                  frontmatter { title date description }
                }
              }
            }`,
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.nodes.map((node) => ({
                title: node.frontmatter.title,
                description: node.frontmatter.description || node.excerpt,
                date: node.frontmatter.date,
                url: site.siteMetadata.siteUrl + node.fields.slug,
                guid: site.siteMetadata.siteUrl + node.fields.slug,
                custom_elements: [{ 'content:encoded': node.html }],
              })),
          },
        ],
      },
    },
  ],
};
