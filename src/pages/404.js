import * as React from "react";
import {MainLayout} from "../components/Layout";

// markup
const NotFoundPage = () => {
  return (
    <MainLayout pageTitle={"찾을 수 없습니다!"}>
      <title>Not found</title>
      <h1>Page not found</h1>
    </MainLayout>
  );
};

export default NotFoundPage;
