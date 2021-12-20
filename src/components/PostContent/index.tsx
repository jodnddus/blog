import * as React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import "./styles.scss";

const PostContent = ({ html }) => {
  return (
    <div className="markdown">
      <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default PostContent;
