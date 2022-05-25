import * as React from "react";
import styled from "styled-components";
import { graphql } from "gatsby";
import { container } from "../styles/material.module.css";

import Post from "../models/post";

import PostItem from "../components/PostItem";
import ProfileImage from "../components/ProfileImage";
import CategorySelector from "../components/CategorySelector";

import getAllCategories from "../utils/getAllCategories";

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges.map(({ node }) => new Post(node));

  const [selectCategoryIndex, setSelectCategoryIndex] = React.useState(0);
  const categories = ["all", ...getAllCategories(posts)];
  const onCategoryIndexChange = React.useCallback(
    (value) => setSelectCategoryIndex(value),
    []
  );

  const filteredPosts = React.useMemo(() => {
    if (categories[selectCategoryIndex] === "all") return posts;
    return posts.filter((post) =>
      post.categories.includes(categories[selectCategoryIndex])
    );
  }, [posts, categories, selectCategoryIndex]);

  return (
    <main className={container}>
      <title>조웅연 개발 블로그</title>
      <PageHeaderSection>
        <PageMoveLink
          href="https://jodnddus.notion.site/0c156a26538742da8ea5e7fbdf3cc510"
          target={"_blank"}
        >
          이력서
        </PageMoveLink>
        <PageMoveLink href="/posts">글 목록</PageMoveLink>
      </PageHeaderSection>
      <ProfileSection>
        <div>
          <BlogTitle>
            조웅연
            <br />
            개발 블로그 ✍
          </BlogTitle>
          <BlogDescription>
            안녕하세요, 프론트엔드 개발자
            <br />
            조웅연입니다.
          </BlogDescription>
        </div>
        <ProfileImage />
      </ProfileSection>
      <CategorySection>
        <CategorySelector
          categories={categories}
          selectCategoryIndex={selectCategoryIndex}
          onCategoryIndexChange={onCategoryIndexChange}
        />
      </CategorySection>
      <PostSection>
        {filteredPosts.map((post) => (
          <PostItem post={post} key={post.id} />
        ))}
      </PostSection>
    </main>
  );
};

export const posts = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
    ) {
      edges {
        node {
          id
          html
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            title
            description
            categories
          }
        }
      }
    }
  }
`;

const PageHeaderSection = styled.section`
  padding: 0 1rem;
  height: 5rem;
  align-items: center;
  display: flex;
  flex-direction: row-reverse;
  gap: 1rem;
`;
const PageMoveLink = styled.a`
  font-size: 1.5rem;
  text-decoration: none;
  color: black;
  &:hover {
    text-decoration: underline;
  }
`;
const BlogTitle = styled.h1`
  margin: 0;
  font-size: 3rem;
`;
const BlogDescription = styled.h1`
  margin: 0;
  font-size: 1.5rem;
`;
const ProfileSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;
const CategorySection = styled.section`
  padding: 0 1rem;
  margin-top: 3rem;
`;
const PostSection = styled.section`
  padding: 0 1rem;
`;

export default IndexPage;
