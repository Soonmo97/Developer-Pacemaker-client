import React from "react";
import styled from "styled-components";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MyGroup from "../components/studygroup/MyGroup";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  width: 70%;
  padding: 2vh;
  margin-bottom: 10vh;
`;

const StudyGroup = () => {
  return (
    <>
      <Navbar />
      <MainContainer>
        <Content>
          <MyGroup />
        </Content>
      </MainContainer>
      <Footer />
    </>
  );
};

export default StudyGroup;
