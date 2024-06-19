import React from "react";
import MainPage from "./pages/MainPage";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Board from "./pages/Board";
import LoginPage from "./pages/LoginPage";
import StudyPost from "./pages/StudyPost";
import StudyGroup from "./pages/StudyGroup";
import StudyGroupInfo from "./pages/StudyGroupInfo";
import Myplanner from "./pages/Myplanner";
import PostDetail from "./pages/PostDetail";
import CreateStudyGroup from "./components/studygroup/CreateStudyGroup";
import TestSlider from "./pages/TestSlider";
import MyPage from "./pages/MyPage";
import GptPage from "./pages/GptPage";
import TestPost from "./test/TestPost";
import StudyForm from "./test/StudyForm";

// import MainSet from "./pages/MainSet";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/mypage" element={<MyPage />} />

        <Route path="/main/studygroupboard" element={<Board />} />
        <Route path="/main/studygroupboard/:rbSeq" element={<PostDetail />} />
        <Route path="/main/studygroupboard/write" element={<StudyPost />} />
        <Route
          path="/main/studygroupboard/edit/:rbSeq"
          element={<StudyPost />}
        />

        <Route path="/main/mystudygroup" element={<StudyGroup />} />
        <Route
          path="/main/mystudygroup/createStudyGroup"
          element={<CreateStudyGroup />}
        />
        <Route path="/main/mystudygroup/:sgSeq" element={<StudyGroupInfo />} />

        <Route
          path="/main/studygroupinfo/:sgSeq"
          element={<StudyGroupInfo />}
        />

        <Route path="/main/studygroupinfo/:id" element={<StudyGroupInfo />} />
        <Route path="/main/Ai" element={<GptPage />} />

        <Route path="/main/myplanner" element={<Myplanner />} />
        <Route path="/test" element={<TestSlider />} />
        <Route path="/test1" element={<TestPost />} />
        <Route path="/test2" element={<StudyForm />} />
      </Routes>
    </>
  );
};

export default App;
