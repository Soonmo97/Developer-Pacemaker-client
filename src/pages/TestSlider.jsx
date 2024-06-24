import React from "react";
import styled from "styled-components";
import StudyList from "../test/StudyList";

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchBar = styled.input`
  width: 300px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FilterButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #28a745;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

function TestSlider() {
  return (
    <AppContainer>
      <Header>
        <SearchBar placeholder="관심 스터디를 검색해보세요!" />
        <FilterButton>초기화</FilterButton>
      </Header>
      <StudyList />
    </AppContainer>
  );
}

export default TestSlider;
