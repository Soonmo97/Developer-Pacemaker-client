import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`

  width: 100%;
  /* height: 15%; */
  background-color: #f0f0f0;

  text-align: center;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  /* padding: 10px 0; 추가된 패딩 */
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); /* 그림자 추가 */

  p {
    margin: 2px 0; /* 위아래 간격을 줄임 */
    font-size: 16px; /* 글씨 크기를 줄임 */
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <p>내 손을 JAVA</p>
      <p>조장: 권순모 / 조원: 권오진 권태현 김화영 이형석</p>
    </StyledFooter>
  );
};

export default Footer;
