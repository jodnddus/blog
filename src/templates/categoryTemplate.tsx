import React from "react";

import Post from "../models/post";

import {PostListLayout} from "../components/Layout";

import PostItem from "../components/PostItem";

function CategoryTemplate({pageContext}) {
    const {edges} = pageContext;

    const posts = edges.map(({node}) => new Post(node));

    return (
        <PostListLayout pageTitle={"글 목록"}>
            {posts.map((post) => (
                <PostItem post={post} key={post.id}/>
            ))}
        </PostListLayout>
    );
}

export default CategoryTemplate;
