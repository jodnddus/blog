import * as React from "react";
import { graphql, Link } from "gatsby";

const IndexPage = ({ data }) => {
  return (
    <main>
      <title>Home Page</title>
      {data.allMdx.nodes.map((node) => (
        <article key={node.id}>
          <Link to={`/${node.slug}`}>
            <h2>{node.frontmatter.title}</h2>
          </Link>
          <p>{node.frontmatter.date}</p>
          <p>{node.frontmatter.description}</p>
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
