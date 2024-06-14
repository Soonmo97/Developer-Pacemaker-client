import React, { useEffect, useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import lang from "suneditor/src/lang/ko";
import plugins from "suneditor/src/plugins";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import { Button } from "@mui/material";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  min-height: 90vh;
`;

const WriteButton = styled(Button)`
  && {
    margin-top: 1rem;
    float: right;
  }
`;

const SelectBar = styled.select`
  width: 15vw;
  padding: 0.5rem;
  margin: 20px 0;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 50px;
  padding: 10px;
  font-size: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  margin-bottom: 1rem;
`;

const StudyPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");

  const groups = ["Group 1", "Group 2", "Group 3"]; // Example groups

  useEffect(() => {});

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (content) => setContent(content);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const titleVal = title.trim();
    const textCount = content.replace(/<[^>]*>?/gm, "").length; // HTML 태그 제거 후 글자수 계산

    if (titleVal === 0) {
      alert("제목을 입력해주세요.");
      return;
    } else if (textCount === 0) {
      alert("내용을 입력해주세요.");
      return;
    } else if (textCount > 1000) {
      alert("입력 가능한 글자수를 초과하였습니다. (최대 1000자)");
      return;
    }

    const token = localStorage.getItem("accessToken");
    try {
      await axios.post(
        `${process.env.REACT_APP_API_SERVER}/api/recruitmentBoard`,
        {
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("글이 성공적으로 작성되었습니다.");
      // 작성 완료 후 필요한 추가 작업 수행
    } catch (error) {
      console.error("글 작성에 실패했습니다:", error);
      alert("글 작성에 실패했습니다.");
    }
  };

  return (
    <>
      <Navbar />
      <MainContainer>
        <div>
          <h1>팀원 모집 게시판</h1>
          <SelectBar
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            <option value="" disabled>
              스터디 그룹을 선택하세요.
            </option>
            {groups.map((group, index) => (
              <option key={index} value={group}>
                {group}
              </option>
            ))}
          </SelectBar>
          <div>
            <TitleInput
              type="text"
              className="title"
              name="title"
              maxLength="32"
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <SunEditor
                lang={lang}
                setOptions={{
                  width: "100%",
                  height: "400px",
                  charCounter: true,
                  placeholder: "내용",
                  popupDisplay: "local",
                  buttonList: [
                    ["formatBlock", "fontSize"],
                    ["bold", "underline", "italic", "strike", "removeFormat"],
                    [
                      "fontColor",
                      "hiliteColor",
                      "indent",
                      "outdent",
                      "align",
                      "list",
                      "table",
                      "link",
                    ],
                    ["undo", "redo"],
                  ],
                  plugins: plugins,
                }}
                defaultValue={content}
                onChange={handleContentChange}
              />
            </div>
            <div>
              <WriteButton
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSubmit}
              >
                작성
              </WriteButton>
            </div>
          </form>
        </div>
      </MainContainer>
      <Footer />
    </>
  );
};

export default StudyPost;
