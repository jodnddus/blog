import React, {FC} from "react";
import PageHeader from "../Headers/PageHeader";
import {MainLayoutContainerStyle} from "./style";

interface MainLayoutPropTypes {
    pageTitle: string;
}

const MainLayout: FC<MainLayoutPropTypes> = ({pageTitle, children}) => {
    return (
        <MainLayoutContainerStyle>
            <title>{pageTitle}</title>
            <PageHeader
                currentPageTitle={"조웅연 개발 블로그"}
                moveToPage={{
                    title: "글 목록",
                    link: "/posts"
                }}
                isShowJoke
            />
            {children}
        </MainLayoutContainerStyle>
    )
}

export default MainLayout;