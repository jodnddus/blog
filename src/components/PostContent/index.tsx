import * as React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import "./styles.scss";

const PostContent = ({ body }) => {
  return (
    <div className="markdown">
      <MDXRenderer>{body}</MDXRenderer>
    </div>
  );
};

export default PostContent;
