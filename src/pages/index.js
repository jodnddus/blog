import * as React from "react";
import styled from "styled-components";
import {graphql} from "gatsby";
import {container} from "../styles/material.module.css";

import Post from "../models/post";

import PostItem from "../components/PostItem";
import ProfileImage from "../components/ProfileImage";

const IndexPage = ({data}) => {
    const posts = data.allMarkdownRemark.edges.map(({node}) => new Post(node));

    return (
        <main className={container}>
            <title>조웅연 개발 블로그</title>
            <PageHeaderSection>
                <BlogTitle>
                    조웅연 개발 블로그
                </BlogTitle>
                <PageMoveLink href="/posts">글 목록</PageMoveLink>
            </PageHeaderSection>
            <Joke>🔥🏃😍🌈🏄🌊</Joke>
            <PostSection>
                {posts.map((post) => (
                    <PostItem post={post} key={post.id}/>
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
          excerpt(pruneLength: 150, format: PLAIN, truncate: true)
        }
      }
    } 
  }
`;

const PageHeaderSection = styled.section`
  display: flex;
  justify-content: space-between; 
  padding: 1rem 0.5rem;
  gap: 1rem;
`;
const Joke = styled.span`
  font-size: 6rem;
  display: block;
  text-align: center;
`;
const PageMoveLink = styled.a`
  text-decoration: none;
  color: black;
  padding: 0.2rem;
  &:hover {
    text-decoration: underline;
  }
`;
const BlogTitle = styled.h1`
  margin: 0;
  
`;
const ProfileSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;
const PostSection = styled.section``;

export default IndexPage;
