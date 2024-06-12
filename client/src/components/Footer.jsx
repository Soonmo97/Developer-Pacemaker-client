import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #d7e8f8;
  font-size: 1rem;
  color: #333;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const RightSection = styled.div`
  text-align: right;
`;

const Title = styled.h1`
  color: #1e90ff;
  margin: 0;
`;

const Strong = styled.strong`
  color: #1e90ff;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <LeftSection>
          <Title>내 손을 JAVA </Title>
          <div> © 2024 SeSAC. All rights reserved.</div>
        </LeftSection>
        <RightSection style={{ display: "flex", gap: "3rem" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <Strong>조장: </Strong> &nbsp;권순모
            </div>
            <div>
              <Strong>조원:</Strong> 김화영 권오진 권태현 이형석
            </div>
          </div>
          {/* <div>
            <div style={{ display: "flex" }}>
              <Strong>Front: </Strong> &nbsp; 권오진 권태현
            </div>
            <div>
              <Strong>Back:</Strong> &nbsp; 김화영 권순모 이형석
            </div>
          </div> */}
        </RightSection>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer;
