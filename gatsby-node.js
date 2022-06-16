const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `posts` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

const createBlogPages = ({ createPage, results }) => {
  const blogPostTemplate = require.resolve(`./src/templates/postTemplate.tsx`);

  results.data.allMarkdownRemark.edges.forEach(({ node, next, previous }) => {
    createPage({
      path: node.fields.slug,
      component: blogPostTemplate,
      context: {
        slug: node.fields.slug,
        nextSlug: next?.fields.slug ?? "",
        prevSlug: previous?.fields.slug ?? "",
      },
    });
  });
};

const createPostsPages = ({ createPage, results }) => {
  const categoryTemplate = require.resolve(
    `./src/templates/categoryTemplate.tsx`
  );
  const categorySet = new Set(["All"]);
  const { edges } = results.data.allMarkdownRemark;

  edges.forEach(({ node }) => {
    const postCategories = node.frontmatter.categories;
    postCategories.forEach((category) => categorySet.add(category));
  });

  const categories = [...categorySet];

  createPage({
    path: `/posts`,
    component: categoryTemplate,
    context: { currentCategory: "All", edges, categories },
  });

  categories.forEach((currentCategory) => {
    createPage({
      path: `/posts/${currentCategory}`,
      component: categoryTemplate,
      context: {
        currentCategory,
        categories,
        edges: edges.filter(({ node }) =>
          node.frontmatter.categories.includes(currentCategory)
        ),
      },
    });
  });
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const results = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            id
            excerpt(pruneLength: 150, format: PLAIN, truncate: true)
            fields {
              slug
            }
            frontmatter {
              categories
              title
              description
              date(formatString: "YYYY-MM-DD")
            }
          }
        }
      }
    }
  `);

  // Handle errors
  if (results.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  createBlogPages({ createPage, results });
  createPostsPages({ createPage, results });
};
