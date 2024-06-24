import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/studygroup/groupInfo/Header";

import MemberStatus from "../components/studygroup/groupInfo/MemberStatus";

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

const StudyGroupInfo = () => {
  return (
    <>
      <Navbar />
      <MainContainer>
        <Content>
          <Header />
          <MemberStatus />
        </Content>
      </MainContainer>
      <Footer />
    </>
  );
};

export default StudyGroupInfo;
