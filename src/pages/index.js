import * as React from "react";
import { graphql } from "gatsby";
import {
  container,
  profileSection,
  profileInfoContainer,
  middleSection,
  writingEmoji,
  postSection,
  blogTitle,
  blogDescription,
} from "../styles/material.module.css";

import PostItem from "../components/PostItem";
import ProfileImage from "../components/ProfileImage";

const IndexPage = ({ data }) => {
  return (
    <main className={container}>
      <title>조웅연 개발 블로그</title>
      <section className={profileSection}>
        <div className={profileInfoContainer}>
          <h1 className={blogTitle}>
            조웅연
            <br />
            개발 블로그
          </h1>
          <p className={blogDescription}>
            안녕하세요, 프론트엔드 개발자
            <br />
            조웅연입니다.
          </p>
        </div>
        <ProfileImage />
      </section>
      <section className={middleSection}>
        <span className={writingEmoji}>
          {data.allMarkdownRemark.edges.map(() => ".")}✍️
        </span>
      </section>
      <section className={postSection}>
        {data.allMarkdownRemark.edges.map((node) => (
          <PostItem post={node.node} key={node.node.id}/>
        ))}
      </section>
    </main>
  );
};

export const posts = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;

export default IndexPage;
