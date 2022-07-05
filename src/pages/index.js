import * as React from "react";
import {graphql} from "gatsby";

import Post from "../models/post";

import PostItem from "../components/PostItem";
import {MainLayout} from "../components/Layout";

const IndexPage = ({data}) => {
    const posts = data.allMarkdownRemark.edges.map(({node}) => new Post(node));

    return (
        <MainLayout pageTitle={"조웅연 개발 블로그"}>
            <section>
                {posts.map((post) => (
                    <PostItem post={post} key={post.id}/>
                ))}
            </section>
        </MainLayout>
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

export default IndexPage;
