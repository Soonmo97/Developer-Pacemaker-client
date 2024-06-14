import React from "react";
import styled from "styled-components";

import Carousel from "../components/main/Carousel";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Content = styled.div`
  width: 70%;
  padding: 2vh;
  margin-bottom: 7vh;
`;

const MainPage = () => {
  return (
    <>
      <Navbar />
      <MainContainer>
        <Content>
          <Carousel />
        </Content>
      </MainContainer>
      <Footer />
    </>
  );
};

export default MainPage;
