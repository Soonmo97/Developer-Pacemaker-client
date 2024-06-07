import React from "react";
import "./main/Navbar.css";
import "./main/Sidebar.css";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">로고</div>
        <ul className="navbar-menu">
          <li>홈</li>
          <li>마이페이지</li>
          <li>로그아웃</li>
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
