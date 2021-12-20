import * as React from "react";
import { Link } from "gatsby";
import "./styles.scss";

type PostType = {
  post: {
    id: string;
    fields: {
      slug: string;
    };
    frontmatter: {
      title: string;
      description: string;
      date: string;
    };
  };
};

const PostItem = ({ post }: PostType) => {
  return (
    <Link to={`${post.fields.slug}`} className="post-card-title-link">
      <article key={post.id} className="post-item-container">
        <h2 className="post-card-title">{post.frontmatter.title}</h2>
        <p className="post-description">{post.frontmatter.description}</p>
      </article>
    </Link>
  );
};

export default PostItem;
