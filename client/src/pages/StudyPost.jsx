import React, { useState } from "react";
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
`;

const WriteButton = styled(Button)`
  && {
    margin-top: 1rem;
    float: right;
  }
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

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (content) => setContent(content);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const titleVal = title.trim();
    const textCount = content.replace(/<[^>]*>?/gm, "").length; // HTML 태그 제거 후 글자수 계산

    if (titleVal === "") {
      alert("제목을 입력해주세요.");
      return;
    } else if (textCount === 0) {
      alert("본문을 입력해주세요.");
      return;
    } else if (textCount > 1000) {
      alert("입력 가능한 글자수를 초과하였습니다. (최대 1000자)");
      return;
    }

    const url = "/studygroupboard/writePost";
    const data = { title, content };

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert("성공적으로 작성되었습니다.");
      } else {
        alert("Error");
      }
    } catch (error) {
      alert("Error : " + error.message);
    }
  };

  return (
    <>
      <Navbar />
      <MainContainer>
        <div>
          <h1>팀원 모집 게시판</h1>
          <form onSubmit={handleSubmit}>
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
            <div>
              <SunEditor
                lang={lang}
                setOptions={{
                  width: "100%",
                  height: "500px",
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
              <WriteButton variant="contained" color="primary" type="submit">
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
