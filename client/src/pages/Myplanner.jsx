import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserCalendar from "../components/userplanner/UserCalendar";
import { ThemeProvider } from "styled-components";

const theme = {
  // gray_1: "#0260f8",
  red_1: "#FF0000",
  blue_1: "#0260f8",
  primary_2: "#fa9805",
  primary_3: "#ffaa0c",
  yellow_2: "#f9e8c3",
  br_2: "#666666",
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 72vh;
`;

const Content = styled.div`
  width: 70%;
  padding: 2vh;
  margin-bottom: 10vh;
`;

const Myplanner = () => {
  return (
    <>
      <Navbar />
      <MainContainer>
        <Content>
          <ThemeProvider theme={theme}>
            <UserCalendar />
          </ThemeProvider>
        </Content>
      </MainContainer>
      <Footer />
    </>
  );
};

export default Myplanner;
