import * as React from "react";
import "./styles.scss";

type PostHeaderType = {
  post: {
    title: string;
    date: string;
  };
};

const PostHeader = ({ post }: PostHeaderType) => {
  return (
    <>
      <h1 className="post-title">{post.title}</h1>
      <p className="post-date">{post.date}</p>
    </>
  );
};

export default PostHeader;
