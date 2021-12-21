import * as React from "react";
import styled from "styled-components";

type CategoryButtonPropsType = {
  index: number;
  selected: boolean;
  onCategoryIndexChange: (value: number) => void;
  children: string;
};

const CategoryButton = ({
  index,
  selected,
  onCategoryIndexChange,
  children,
}: CategoryButtonPropsType) => {
  return (
    <Button
      selected={selected}
      onClick={() => onCategoryIndexChange(index)}
    >
      {children}
    </Button>
  );
};

const Button = styled.button<{ selected: boolean }>`
  background-color: ${(props) => (props.selected ? "#edf2f7" : "white")};
  border: 1px solid ${(props) => (props.selected ? "white" : "#dbdbdb")};
  border-radius: 5px;
  font-size: 1.5rem;
  transition: background-color 0.3s;
  trantision: border 0.3s;
`;

export default CategoryButton;
