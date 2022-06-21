import * as React from "react";
import { Link } from "gatsby";

import Post from "../../models/post";

import styled from 'styled-components';

type PostItemPropsType = {
  post: Post;
};

const PostItem = ({ post }: PostItemPropsType) => {
  return (
    <PostCardTitleLink to={`${post.slug}`} className="post-card-title-link">
      <PostItemContainer key={post.id} className="post-item-container">
        <PostItemCardTitle className="post-item-card-title">{post.title}</PostItemCardTitle>
        <PostItemDate className="post-item-date">{post.date}</PostItemDate>
        <PostItemDescription className="post-item-description">{post.excerpt}</PostItemDescription>
      </PostItemContainer>
    </PostCardTitleLink>
  );
};

const PostCardTitleLink = styled(Link)`
    text-decoration: none;
`;
const PostItemContainer = styled.article`
    margin-top: 3rem;
    padding: 0.5rem;
    transition: background-color 0.3s;
    & h2:hover {
        text-decoration: underline;
    }
`;
const PostItemCardTitle = styled.h2`
    color: black;
    margin: 0;
    font-size: 2rem;
    margin-bottom: 0.5rem;
`;
const PostItemDate = styled.p`
    margin: 0;
    margin-bottom: 0.5rem;
    color: gray;
`;
const PostItemDescription = styled.p`
    color: black;
    margin: 0;
`;
export default PostItem;
