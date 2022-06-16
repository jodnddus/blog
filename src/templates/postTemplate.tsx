import * as React from "react";
import { graphql } from "gatsby";
import { container } from "../styles/material.module.css";
import PostHeader from "../components/PostHeader";
import PostContent from "../components/PostContent";

const PostTemplate = ({ data }) => {
  return (
    <div className={container}>
      <section>
        <PostHeader post={data.markdownRemark.frontmatter} />
      </section>
      <section>
        <PostContent html={data.markdownRemark.html} />
      </section>
    </div>
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
