import * as React from "react";
import { Link } from "gatsby";
import {
  postItemContainer,
  postTitleLink,
  postTitle,
  postDate,
  postDescription,
} from "./styles.module.css";

type PostType = {
  post: {
    id: string;
    slug: string;
    frontmatter: {
      title: string;
      description: string;
      date: string;
    };
  };
};

const PostItem = ({ post }: PostType) => {
  return (
    <Link to={`/${post.slug}`} className={postTitleLink}>
      <article key={post.id} className={postItemContainer}>
        <h2 className={postTitle}>{post.frontmatter.title}</h2>
        <p className={postDescription}>{post.frontmatter.description}</p>
      </article>
    </Link>
  );
};

export default PostItem;
