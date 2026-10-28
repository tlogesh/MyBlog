const fs = require('fs');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

// Every post gets a /slug/ path from its folder or file name.
exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type !== 'MarkdownRemark') return;
  actions.createNodeField({ node, name: 'slug', value: createFilePath({ node, getNode }) });
};

// Declare front matter fields so builds work even before a post uses them.
exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }
    type Frontmatter {
      title: String!
      date: Date @dateformat
      description: String
      tags: [String]
      draft: Boolean
    }
    type Fields {
      slug: String
    }
  `);
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true } } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          id
          fields { slug }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('Could not load blog posts', result.errors);
    return;
  }

  const posts = result.data.allMarkdownRemark.nodes;
  posts.forEach((post, i) => {
    actions.createPage({
      path: post.fields.slug,
      component: path.resolve('src/templates/post.js'),
      context: {
        id: post.id,
        newerId: i > 0 ? posts[i - 1].id : null,
        olderId: i < posts.length - 1 ? posts[i + 1].id : null,
      },
    });
  });
};

// Machine-readable post list for the portfolio's "Latest writing" section.
exports.onPostBuild = async ({ graphql, reporter }) => {
  const result = await graphql(`
    {
      site { siteMetadata { siteUrl } }
      allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true } } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          excerpt(pruneLength: 160)
          fields { slug }
          frontmatter { title description date(formatString: "YYYY-MM-DD") tags }
        }
      }
    }
  `);
  if (result.errors) {
    reporter.warn('Could not write posts.json');
    return;
  }
  const { siteUrl } = result.data.site.siteMetadata;
  const posts = result.data.allMarkdownRemark.nodes.map((n) => ({
    title: n.frontmatter.title,
    description: n.frontmatter.description || n.excerpt,
    date: n.frontmatter.date,
    tags: n.frontmatter.tags || [],
    url: siteUrl + n.fields.slug,
  }));
  fs.writeFileSync(path.join('public', 'posts.json'), JSON.stringify({ posts }));
};
