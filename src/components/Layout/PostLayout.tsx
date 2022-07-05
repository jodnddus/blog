import React, {FC} from "react";
import {PostLayoutContainerStyle} from "./style";

interface PostLayoutPropTypes {
    pageTitle: string;
}

const PostLayout: FC<PostLayoutPropTypes> = ({pageTitle, children}) => {
    return (
        <PostLayoutContainerStyle>
            <title>{pageTitle}</title>
            {children}
        </PostLayoutContainerStyle>
    )
}

export default PostLayout;