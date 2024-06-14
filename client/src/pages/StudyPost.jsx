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
`;

const WriteButton = styled(Button)`
  && {
    margin-top: 1rem;
    float: right;
  }
`;

const StudyPost = () => {
  const [content, setContent] = useState("");

  useEffect(() => {});

  const handleContentChange = (content) => setContent(content);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const textCount = content.replace(/<[^>]*>?/gm, "").length; // HTML 태그 제거 후 글자수 계산

    if (textCount === 0) {
      alert("제목을 입력해주세요.");
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
          <form onSubmit={handleSubmit}>
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
