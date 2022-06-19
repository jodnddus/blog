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
            <PageHeader />
            {children}
        </MainLayoutContainerStyle>
    )
}

export default MainLayout;