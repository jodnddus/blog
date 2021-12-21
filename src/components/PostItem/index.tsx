import * as React from "react";
import { Link } from "gatsby";

import Post from "../../models/post";

import "./styles.scss";

type PostItemPropsType = {
  post: Post;
};

const PostItem = ({ post }: PostItemPropsType) => {
  return (
    <Link to={`${post.slug}`} className="post-card-title-link">
      <article key={post.id} className="post-item-container">
        <h2 className="post-card-title">{post.title}</h2>
        <p className="post-description">{post.description}</p>
      </article>
    </Link>
  );
};

export default PostItem;
