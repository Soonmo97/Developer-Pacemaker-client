import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./main/Navbar.css";
import "./main/Sidebar.css";

const Logo = styled.div`
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-position: center;
  width: 50px;
  height: 50px;
`;

const Navbar = () => {
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
        <Logo img="/images/logo.png" />
        <ul className="navbar-menu">
          <li>홈</li>
          <li onClick={() => navigate("/mypage")} style={{ cursor: "pointer" }}>
            마이페이지
          </li>
          <li onClick={handleLogout} style={{ cursor: "pointer" }}>
            로그아웃
          </li>
          <li>알림</li>
        </ul>
      </nav>

      <div className="sidebar">
        <div className="sideBtn">
          <button>스터디 그룹</button>
          <button>내 학습일지</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
