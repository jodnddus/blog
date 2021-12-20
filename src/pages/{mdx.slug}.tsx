import * as React from "react";
import { graphql } from "gatsby";
import { container } from "../styles/material.module.css";
import PostHeader from "../components/PostHeader";
import PostContent from "../components/PostContent";

const BlogPost = ({ data }) => {
  return (
    <div className={container}>
      <section>
        <PostHeader post={data.mdx.frontmatter} />
      </section>
      <section>
        <PostContent body={data.mdx.body} />
      </section>
    </div>
  );
};

export const post = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
      }
      body
    }
  }
`;

export default BlogPost;
