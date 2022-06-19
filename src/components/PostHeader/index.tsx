import * as React from "react";
import styled from 'styled-components';

type PostHeaderType = {
  post: {
    title: string;
    date: string;
  };
};

const PostHeader = ({ post }: PostHeaderType) => {
  return (
    <>
      <PostTitle>{post.title}</PostTitle>
      <PostDate className="post-date">{post.date}</PostDate>
    </>
  );
};

const PostTitle = styled.h1`
  color: #3d3d3f;
  font-size: 32px;
  margin-bottom: 0.5rem;
  margin-top: 16px;
`;

const PostDate = styled.p`
  margin: 0;
  margin-bottom: 0.5rem;
  color: gray;
`;

export default PostHeader;
