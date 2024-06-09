import React from "react";
import MainPage from "./pages/MainPage";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Board from "./pages/Board";
import StudyPost from "./pages/StudyPost";
import PostDetail from "./pages/PostDetail";

// import MainSet from "./pages/MainSet";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/main/studygroupboard" element={<Board />} />
        <Route path="/main/studygroupboard/post/:id" element={<PostDetail />} />
        <Route path="/main/studygroupboard/writePost" element={<StudyPost />} />
      </Routes>
    </>
  );
};

export default App;
