import * as React from "react";
import styled from "styled-components";
import { graphql } from "gatsby";
import { container } from "../styles/material.module.css";

import Post from "../models/post";

import PostItem from "../components/PostItem";
import ProfileImage from "../components/ProfileImage";

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges.map(({ node }) => new Post(node));

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
      <PostSection>
        {posts.map((post) => (
          <PostItem post={post} key={post.id} />
        ))}
      </PostSection>
    </main>
  );
};

export const posts = graphql`
  query {
    allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, limit: 10) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
            categories
          }
          excerpt(format: PLAIN, pruneLength: 200)
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
const PostSection = styled.section`
  margin-top: 10rem;
  padding: 0 1rem;
`;

export default IndexPage;
