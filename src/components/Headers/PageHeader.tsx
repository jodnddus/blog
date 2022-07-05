import React, {FC} from "react";
import styled from "styled-components";

import {BlogTitle} from "../Titles";
import {Joke, Link} from "../Materials";

interface PageHeaderPropTypes {
    currentPageTitle: string;
    moveToPage: {
        title: string;
        link: string;
    }
    isShowJoke: boolean;
}

const PageHeader: FC<PageHeaderPropTypes> = ({currentPageTitle, moveToPage, isShowJoke}) => {
    return (
        <PageHeaderContainer>
            <div className={"top"}>
                <BlogTitle>{currentPageTitle}</BlogTitle>
                <Link href={moveToPage.link}>{moveToPage.title}</Link>
            </div>
            {isShowJoke && <Joke />}
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