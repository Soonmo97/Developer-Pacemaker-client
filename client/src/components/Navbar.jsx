import React, { useState } from "react";
import "./main/Navbar.css";
import "./main/Sidebar.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

const Strong = styled.h3`
  &:hover {
    color: #1e90ff;
  }

  &.selected {
    color: #1e90ff;
  }
`;
const Logo = styled.div`
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-position: center;
  width: 3.5rem;
  height: 3.5rem;
`;

const Navbar = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (itemName) => {
    setSelectedItem(itemName);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      console.log("Deleting token:", token); // 삭제할 토큰 출력
      localStorage.removeItem("accessToken"); // 토큰 삭제
    } else {
      console.log("No token found"); // 토큰이 없을 때 메시지 출력
    }
    navigate("/"); // 로그인 페이지로 리디렉션
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/main">
          <div>
            <Logo img="/images/logo.png" />
          </div>
        </Link>
        <ul className="navbar-menu">
          <StyledLink to="/main">
            <li>홈</li>
          </StyledLink>
          <li onClick={() => navigate("/mypage")} style={{ cursor: "pointer" }}>
            마이페이지
          </li>
          <li onClick={handleLogout} style={{ cursor: "pointer" }}>
            로그아웃
          </li>
          <li>알림</li>
        </ul>
      </nav>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="sidebar">
          <div className="sideBtn">
            <StyledLink
              to="/main/studygroupboard"
              onClick={() => handleClick("studygroupboard")}
            >
              <StyledButton>
                <Strong
                  className={
                    selectedItem === "studygroupboard" ? "selected" : ""
                  }
                >
                  스터디 그룹 게시판
                </Strong>
              </StyledButton>
            </StyledLink>
            <StyledLink
              to="/main/mystudygroup"
              onClick={() => handleClick("mystudygroup")}
            >
              <StyledButton>
                <Strong
                  className={selectedItem === "mystudygroup" ? "selected" : ""}
                >
                  내 스터디 그룹
                </Strong>
              </StyledButton>
            </StyledLink>
            <StyledLink
              to="/main/myplanner"
              onClick={() => handleClick("myplanner")}
            >
              <StyledButton>
                <Strong
                  className={selectedItem === "myplanner" ? "selected" : ""}
                >
                  내 학습일지
                </Strong>
              </StyledButton>
            </StyledLink>
            <StyledLink to="/main/myinfo">
              <StyledButton onClick={() => handleClick("myinfo")}>
                <Strong className={selectedItem === "myinfo" ? "selected" : ""}>
                  내 정보
                </Strong>
              </StyledButton>
            </StyledLink>
            <StyledLink to="/main/Ai">
              <StyledButton>
                <Strong className={selectedItem === "myinfo" ? "selected" : ""}>
                  AI 에게 질문하기
                </Strong>
              </StyledButton>
            </StyledLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
