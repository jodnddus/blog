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
      <ProfileSection>
        <div>
          <BlogTitle>
            조웅연
            <br />
            개발 블로그
          </BlogTitle>
          <BlogDescription>
            안녕하세요, 프론트엔드 개발자
            <br />
            조웅연입니다.
          </BlogDescription>
        </div>
        <ProfileImage />
      </ProfileSection>
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
        {filteredPosts.map((post) => (
          <PostItem post={post} key={post.id} />
        ))}
      </PostSection>
    </main>
  );
};

export const posts = graphql`
  query {
    allMarkdownRemark {
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

export default IndexPage;
