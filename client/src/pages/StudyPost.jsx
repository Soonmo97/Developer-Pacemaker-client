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
import { useNavigate, useParams } from "react-router-dom";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  min-height: 90vh;
  padding: 0 1rem;

  @media screen and (min-width: 768px) {
    padding: 0 2rem;
  }

  @media screen and (min-width: 1024px) {
    padding: 0 4rem;
  }
`;

const WriteButton = styled(Button)`
  && {
    margin-top: 1rem;
    float: right;
  }
`;

const SelectBar = styled.select`
  width: 100%;
  max-width: 15rem;
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
  const { rbSeq } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedGroupSeq, setSelectedGroupSeq] = useState(null);
  const [groupList, setGroupList] = useState([]);
  const [boardData, setBoardData] = useState(null);
  const [sgSeq, setSgSeq] = useState(null);

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
        setGroupList(response.data);
      } catch (error) {}
    };

    fetchGroupList();
  }, []);

  useEffect(() => {
    if (rbSeq) {
      const fetchPostData = async () => {
        try {
          const token = localStorage.getItem("accessToken");
          const response = await axios.get(
            `${process.env.REACT_APP_API_SERVER}/api/recruitmentBoard`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const filteredData = response.data.filter(
            (item) => item.rbSeq.toString() === rbSeq
          );
          if (filteredData.length > 0) {
            const postData = filteredData[0];
            setBoardData(postData);
            setSgSeq(postData.studyGroup.sgSeq);
            setContent(postData.content);
            setTitle(postData.name);
          } else {
            setBoardData(null);
          }
        } catch (error) {}
      };

      fetchPostData();
    }
  }, [rbSeq]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (content) => {
    const textContent = content.replace(/<[^>]*>?/gm, ""); // HTML 태그 제거
    setContent(textContent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const titleVal = title.trim();
    const textCount = content.length;

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

    if (!selectedGroupSeq && !rbSeq) {
      alert("그룹을 선택해주세요.");
      return;
    }

    const token = localStorage.getItem("accessToken");

    try {
      if (rbSeq) {
        await axios.patch(
          `${process.env.REACT_APP_API_SERVER}/api/recruitmentBoard/${rbSeq}`,
          {
            name: title,
            content: content,
            sgSeq: sgSeq,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("수정이 완료되었습니다.");
        navigate("/main/studygroupboard");
      } else {
        await axios.post(
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
        alert("글이 성공적으로 작성되었습니다.");
      }
      navigate("/main/studygroupboard");
    } catch (error) {
      alert("글 작성/수정에 실패했습니다.");
    }
  };

  return (
    <>
      <Navbar />
      <MainContainer>
        <div style={{ width: "100%", maxWidth: "800px" }}>
          <h1>팀원 모집 게시판</h1>
          {!rbSeq ? (
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
          ) : (
            <div>그룹명: {boardData?.studyGroup?.name || "로딩 중..."}</div>
          )}
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
                  placeholder: "내용을 입력하세요...",
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
                  cleanHTMLRules: "no_tag",
                }}
                setContents={content}
                onChange={handleContentChange}
              />
            </div>
            <div>
              <WriteButton variant="contained" color="primary" type="submit">
                {rbSeq ? "수정" : "작성"}
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
