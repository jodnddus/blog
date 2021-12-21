import * as React from "react";
import styled from "styled-components";

import CategoryButton from "../CategoryButton";

type CategorySelectorType = {
  categories: string[];
  selectCategoryIndex: number;
  onCategoryIndexChange: (value: number) => void;
};

const CategorySelector = ({
  categories,
  selectCategoryIndex,
  onCategoryIndexChange,
}: CategorySelectorType) => {
  return (
    <CategorySelectorContainer>
      {categories.map((item, index) => (
        <CategoryButton
          index={index}
          selected={index === selectCategoryIndex}
          onCategoryIndexChange={onCategoryIndexChange}
        >
          {item}
        </CategoryButton>
      ))}
    </CategorySelectorContainer>
  );
};

const CategorySelectorContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export default CategorySelector;
