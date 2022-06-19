import * as React from "react";

const PostContent = ({ html }) => {
  return (
    <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
  );
};

export default PostContent;
