import React from "react";
import "./main/Navbar.css";
import "./main/Sidebar.css";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledButton = styled.button`
  text-decoration: none;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 800;
`;

const StyledLink = styled(Link)`
  font-weight: 800;
  text-decoration: none;
  color: black;
`;

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">로고</div>
        <ul className="navbar-menu">
          <StyledLink to="/main">
            <li>홈</li>
          </StyledLink>
          <li>마이페이지</li>
          <li>로그아웃</li>
          <li>알림</li>
        </ul>
      </nav>

      <div className="sidebar">
        <div className="sideBtn">
          <StyledLink to="/main/studygroupboard">
            <StyledButton>스터디 그룹 게시판</StyledButton>
          </StyledLink>
          <StyledLink to="/main/mystudygroup">
            <StyledButton>내 스터디 그룹</StyledButton>
          </StyledLink>
          <StyledLink to="/main/myplanner">
            <StyledButton>내 학습일지</StyledButton>
          </StyledLink>
          <StyledButton>내 정보</StyledButton>
        </div>
      </div>
    </>
  );
};

export default Navbar;
