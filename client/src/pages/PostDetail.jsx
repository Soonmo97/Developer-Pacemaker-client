import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@mui/material";
import axios from "axios";

const PostContainer = styled.div`
  width: 30%;
  margin: 2rem auto;
`;

const PostTitle = styled.h2`
  margin-bottom: 1rem;
`;

const PostMeta = styled.div`
  margin-bottom: 1rem;
  color: #777;
`;

const PostContent = styled.div`
  line-height: 1.6;
  min-height: 20rem;
  border: 1px solid black;
`;

const ApplyBtn = styled(Button)`
  && {
    height: 4rem;
    border-radius: 15px;
    margin-top: 1rem;
    margin-bottom: 1rem;
    width: 15rem;
    font-size: large;
  }
`;

const PostDetail = () => {
  const { rbSeq } = useParams();
  const [boardData, setBoardData] = useState(null); // 초기 값을 null로 설정

  useEffect(() => {
    const fetchGroupList = async () => {
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
        console.log("response.data:", response.data);
        const filteredData = response.data.filter(
          (item) => item.rbSeq.toString() === rbSeq
        );
        console.log(">>", filteredData);
        if (filteredData.length > 0) {
          setBoardData(filteredData[0]);
        } else {
          setBoardData(null); // 데이터가 없으면 null로 설정
        }
      } catch (error) {
        console.error("Failed to fetch group list:", error);
      }
    };

    fetchGroupList();
  }, [rbSeq]); // rbSeq가 변경될 때마다 useEffect 재실행

  console.log("boardData:", boardData);

  const formatDate = (dateString) => {
    const dateTimeParts = dateString.split(".");
    const dateTime = dateTimeParts[0];

    return dateTime;
  };

  if (!boardData) {
    return (
      <>
        <Navbar />
        <PostContainer>
          <h2>게시글을 찾을 수 없습니다.</h2>
        </PostContainer>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <PostContainer>
        <PostTitle>{boardData.name}</PostTitle>
        <PostMeta>
          그룹명 : <strong>{boardData.studyGroup.name}</strong>
        </PostMeta>
        <PostMeta>
          작성자: <strong>{boardData.nickname}</strong> | 작성일:{" "}
          <strong>{formatDate(boardData.registered)} </strong>| 모집여부: {}
        </PostMeta>
        <PostContent>{boardData.content}</PostContent>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ApplyBtn variant="contained" color="primary">
            신청하기
          </ApplyBtn>
          <ApplyBtn variant="contained" color="secondary">
            모집 마감
          </ApplyBtn>
        </div>
      </PostContainer>

      <Footer />
    </>
  );
};

export default PostDetail;
