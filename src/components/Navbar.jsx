import React, { useState } from "react";
import "./main/Navbar.css";
import "./main/Sidebar.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaSignOutAlt,
  FaBell,
  FaQuestion,
  FaClipboardList,
} from "react-icons/fa";

const StyledButton = styled.button`
  text-decoration: none;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 800;

  @media (max-width: 600px) {
    font-size: 2em; /* 이모티콘 크기를 키우기 위해 폰트 크기 조정 */
  }
`;

const StyledLink = styled(Link)`
  font-weight: 800;
  text-decoration: none;
  color: black;
`;
const Icon = styled.span`
  display: none; /* 기본적으로 숨기기 */

  @media (max-width: 650px) {
    display: inline; /* 작은 화면에서 이모티콘 보이기 */
    font-size: 1.5em;
  }

  @media (max-width: 500px) {
    display: inline; /* 작은 화면에서 이모티콘 보이기 */
    font-size: 1em;
  }
`;

const Strong = styled.h3`
  &:hover {
    color: #1e90ff;
  }

  &.selected {
    color: #1e90ff;
  }

  @media (max-width: 650px) {
    display: none; /* 작은 화면에서 텍스트 숨기기 */
  }
`;
const Logo = styled.div`
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-position: center;
  width: 3.5rem;
  height: 3.5rem;
`;

const HeaderBar = styled.div``;

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
    <HeaderBar>
      <nav className="navbar">
        <Link to="/main">
          <div>
            <Logo img="/images/logo.png" />
          </div>
        </Link>
        <ul className="navbar-menu">
          <StyledLink to="/main">
            <FaHome size={24} />
          </StyledLink>
          <li onClick={() => navigate("/mypage")} style={{ cursor: "pointer" }}>
            <FaUser size={24} />
          </li>
          <li onClick={() => navigate("/myplan")} style={{ cursor: "pointer" }}>
            <FaClipboardList size={24} />
          </li>
          <li onClick={handleLogout} style={{ cursor: "pointer" }}>
            <FaSignOutAlt size={24} />
          </li>
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
                <Icon>📚</Icon>
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
                <Icon>👥</Icon>
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
                  내 플래너
                </Strong>
                <Icon>📝</Icon>
              </StyledButton>
            </StyledLink>
            <StyledLink to="/main/Ai">
              <StyledButton>
                <Strong className={selectedItem === "myinfo" ? "selected" : ""}>
                  AI에게 질문하기
                </Strong>
                <Icon>🤖</Icon>
              </StyledButton>
            </StyledLink>
          </div>
        </div>
      </div>
    </HeaderBar>
  );
};

export default Navbar;
