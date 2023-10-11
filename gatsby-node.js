const path = require('path');
const _ = require('lodash');
const { create } = require('domain'); // Import the EventEmitter module

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  try {
    // Create a new EventEmitter instance and increase the listener limit
    const myEmitter = new create();
    myEmitter.setMaxListeners(15);

    const result = await graphql(`
      {
        postsRemark: allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/content/posts/" } }
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                slug
              }
            }
          }
        }
        tagsGroup: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
      }
    `);

    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query: ${result.errors}`);
      return;
    }

    // Create post detail pages
    const postTemplate = path.resolve(`src/templates/post.js`);
    const tagTemplate = path.resolve('src/templates/tag.js');
    const posts = result.data.postsRemark.edges;

    posts.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.slug,
        component: postTemplate,
        context: {},
      });
    });

    // Extract tag data from query
    const tags = result.data.tagsGroup.group;
    // Make tag pages
    tags.forEach(tag => {
      createPage({
        path: `/pensieve/tags/${_.kebabCase(tag.fieldValue)}/`,
        component: tagTemplate,
        context: {
          tag: tag.fieldValue,
        },
      });
    });
  } catch (error) {
    reporter.panicOnBuild(`Error while creating pages: ${error}`);
  }
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /scrollreveal/,
            use: loaders.null(),
          },
          {
            test: /animejs/,
            use: loaders.null(),
          },
          {
            test: /miniraf/,
            use: loaders.null(),
          },
        ],
      },
    });
  }

  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@config': path.resolve(__dirname, 'src/config'),
        '@fonts': path.resolve(__dirname, 'src/fonts'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@images': path.resolve(__dirname, 'src/images'),
        '@pages': path.resolve(__dirname, 'src.pages'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
  });
};
