import React, { useState } from "react";
import "./main/Navbar.css";
import "./main/Sidebar.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaSignOutAlt, FaClipboardList } from "react-icons/fa";

const StyledButton = styled.button`
  text-decoration: none;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 800;

  @media (max-width: 600px) {
    font-size: 2em;
  }
`;

const StyledLink = styled(Link)`
  font-weight: 800;
  text-decoration: none;
  color: black;
`;
const Icon = styled.span`
  display: none;

  @media (max-width: 650px) {
    display: inline;
    font-size: 1.5em;
  }

  @media (max-width: 500px) {
    display: inline;
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
    display: none;
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
      localStorage.removeItem("accessToken");
    } else {
    }
    navigate("/");
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
