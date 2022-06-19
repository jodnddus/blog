import React, {FC} from "react";
import {PostLayoutContainerStyle} from "./style";
import PageHeader from "../Headers/PageHeader";

interface PostListLayoutPropTypes {
    pageTitle: string;
}

const PostListLayout: FC<PostListLayoutPropTypes> = ({pageTitle, children}) => {
    return (
        <PostLayoutContainerStyle>
            <title>{pageTitle}</title>
            <PageHeader
                currentPageTitle={"글 목록"}
                moveToPage={{
                    title: "조웅연 개발 블로그",
                    link: "/"
                }}
                isShowJoke={false}
            />
            {children}
        </PostLayoutContainerStyle>
    )
}

export default PostListLayout;