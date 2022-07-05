import React from "react";
import { graphql } from "gatsby";

import {PostHeader} from "../components/Headers";
import {PostLayout} from "../components/Layout";

import PostContent from "../components/PostContent";

const PostTemplate = ({ data }) => {
  return (
    <PostLayout pageTitle={data.markdownRemark.frontmatter.title}>
      <section>
        <PostHeader post={data.markdownRemark.frontmatter} />
      </section>
      <section>
        <PostContent html={data.markdownRemark.html} />
      </section>
    </PostLayout>
  );
};

export const post = graphql`
  query ($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      excerpt(pruneLength: 150, format: PLAIN, truncate: true)
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        title
        categories
      }
      fields {
        slug
      }
    }
  }
`;

export default PostTemplate;
