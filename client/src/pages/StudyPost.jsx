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
  const [selectedGroupSeq, setSelectedGroupSeq] = useState(null);
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    const fetchGroupList = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/api/recruitmentBoard/myStudyGroups`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setGroupList(response.data);
      } catch (error) {
        console.error("Failed to fetch group list:", error);
      }
    };

    fetchGroupList();
  }, []);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (content) => setContent(content);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const titleVal = title.trim();
    const textCount = content.replace(/<[^>]*>?/gm, "").length;

    if (titleVal.length === 0) {
      alert("제목을 입력해주세요.");
      return;
    } else if (textCount === 0) {
      alert("내용을 입력해주세요.");
      return;
    } else if (textCount > 1000) {
      alert("입력 가능한 글자수를 초과하였습니다. (최대 1000자)");
      return;
    }

    if (!selectedGroupSeq) {
      alert("그룹을 선택해주세요.");
      return;
    }
    console.log(selectedGroupSeq);

    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_SERVER}/api/recruitmentBoard`,
        {
          name: title,
          content: content,
          sgSeq: selectedGroupSeq,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("글이 성공적으로 작성되었습니다.", response.data);
      alert("글이 성공적으로 작성되었습니다.");
      window.location.href = "/main/studygroupboard";
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
            value={selectedGroupSeq || ""}
            onChange={(e) => {
              setSelectedGroupSeq(e.target.value);
            }}
          >
            <option value="" disabled>
              스터디 그룹을 선택하세요.
            </option>
            {groupList.map((group) => (
              <option key={group.sgSeq} value={group.sgSeq}>
                {group.name}
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
                  placeholder: "내용을 입력하세요...",
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
