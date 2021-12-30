import React, { useMemo, useCallback } from "react";
import styled from "styled-components";
import { navigate } from "gatsby";

import { container } from "../styles/material.module.css";
import Post from "../models/post";
import PostItem from "../components/PostItem";
import CategorySelector from "../components/CategorySelector";

function CategoryTemplate({ pageContext }) {
  const { edges, currentCategory } = pageContext;
  const { categories } = pageContext;
  const selectCategoryIndex = useMemo(
    () => categories.findIndex((category) => category === currentCategory),
    [categories, currentCategory]
  );
  const posts = edges.map(({ node }) => new Post(node));

  const onCategoryIndexChange = useCallback(
    (value) => {
      if (value === 0) return navigate(`/posts`);
      navigate(`/posts/${categories[value]}`);
    },
    [categories]
  );

  return (
    <main className={container}>
      <ArticleListHeader>글 목록</ArticleListHeader>
      <PostCountSection>
        <WritingEmoji>{posts.map(() => ".")}✍️</WritingEmoji>
      </PostCountSection>
      <CategorySection>
        <CategorySelector
          categories={categories}
          selectCategoryIndex={selectCategoryIndex}
          onCategoryIndexChange={onCategoryIndexChange}
        />
      </CategorySection>
      <PostSection>
        {posts.map((post) => (
          <PostItem post={post} key={post.id} />
        ))}
      </PostSection>
    </main>
  );
}

const ArticleListHeader = styled.h1`
  padding: 0 1rem;
`;
const PostCountSection = styled.section`
  padding: 0 1rem;
  text-align: center;
`;
const CategorySection = styled.section`
  padding: 0 1rem;
  margin-top: 3rem;
`;
const PostSection = styled.section`
  padding: 0 1rem;
`;
const WritingEmoji = styled.span`
  font-size: 3rem;
`;

export default CategoryTemplate;
