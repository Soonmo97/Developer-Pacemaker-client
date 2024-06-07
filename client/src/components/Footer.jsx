import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  width: 100%;
  background-color: #f0f0f0;
  padding: 1vh 1vw;
  text-align: center;
  margin-bottom: 0;
  display: flex;
  justify-content: center;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <p>내 손을 JAVA</p>
      <p>조장: 이형석 / 조원: 권오진 권순모 권태현 김화영</p>
    </StyledFooter>
  );
};

export default Footer;
