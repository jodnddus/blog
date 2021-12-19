import * as React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { container } from "../styles/material.module.css";

const BlogPost = ({ data }) => {
  return (
    <div className={container}>
      <h1>{data.mdx.frontmatter.title}</h1>
      <p>{data.mdx.frontmatter.date}</p>
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
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
