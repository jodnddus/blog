import React, {FC} from "react";
import styled from "styled-components";

import {BlogTitle} from "../Titles";
import {Joke, Link} from "../Materials";

interface PageHeaderPropTypes {}

const PageHeader: FC<PageHeaderPropTypes> = () => {
    return (
        <PageHeaderContainer>
            <div className={"top"}>
                <BlogTitle>조웅연 개발 블로그</BlogTitle>
                <Link href="/posts">글 목록</Link>
            </div>
            <Joke />
        </PageHeaderContainer>
    )
}

const PageHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  .top {
    display: flex;
    justify-content: space-between;
  }
`;

export default PageHeader;