import * as React from "react";
import { graphql, Link } from "gatsby";
import { container, postTitle } from "../styles/material.module.css";

const IndexPage = ({ data }) => {
  return (
    <main className={container}>
      <title>조웅연 개발 블로그</title>
      <h1>조웅연 개발 블로그</h1>
      {data.allMdx.nodes.map((node) => (
        <article key={node.id}>
          <Link to={`/${node.slug}`} className={postTitle}>
            <h2>{node.frontmatter.title}</h2>
          </Link>
          <p>{node.frontmatter.description}</p>
          <p>{node.frontmatter.date}</p>
        </article>
      ))}
    </main>
  );
};

export const posts = graphql`
  query {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      nodes {
        frontmatter {
          date(formatString: "MMMM D, YYYY")
          title
          description
        }
        id
        slug
      }
    }
  }
`;

export default IndexPage;
