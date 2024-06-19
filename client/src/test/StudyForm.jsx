// src/App.js
import React from "react";
import styled from "styled-components";
import StudyForm2 from "./StudyForm2";

const AppContainer = styled.div`
  /* font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f4f4f4;
  min-height: 100vh; */
`;

function StudyForm() {
  return (
    <AppContainer>
      <StudyForm2 />
    </AppContainer>
  );
}

export default StudyForm;
