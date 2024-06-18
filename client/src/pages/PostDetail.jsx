import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@mui/material";
import axios from "axios";

const PostContainer = styled.div`
  width: 33%;
  margin: 2rem auto;
  min-height: 70vh;
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

const DeleteBtn = styled(Button)`
  && {
    height: 4rem;
    border-radius: 15px;
    margin-top: 1rem;
    margin-bottom: 1rem;
    width: 15rem;
    font-size: large;

    &:hover {
      background-color: #ff0202;
    }
  }
`;

const PostDetail = () => {
  const { rbSeq } = useParams();
  const [boardData, setBoardData] = useState(null);
  const [writer, setWriter] = useState(false);
  const [sgSeq, setSgSeq] = useState(null);
  const [join, setJoin] = useState(null);
  const [useq, setUseq] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/api/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUseq(response.data.useq);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserProfile();
  }, []);

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
        const filteredData = response.data.filter(
          (item) => item.rbSeq.toString() === rbSeq
        );
        if (filteredData.length > 0) {
          setBoardData(filteredData[0]);
          setSgSeq(filteredData[0].studyGroup.sgSeq);
        } else {
          setBoardData(null);
        }
      } catch (error) {
        console.error("Failed to fetch group list:", error);
      }
    };

    fetchGroupList();
  }, [rbSeq]);

  useEffect(() => {
    if (sgSeq) {
      const checkWriter = async () => {
        try {
          const token = localStorage.getItem("accessToken");
          const response = await axios.get(
            `${process.env.REACT_APP_API_SERVER}/api/study-group/check-uSeq-me/${sgSeq}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setWriter(response.data);
        } catch (error) {
          console.error("Failed to fetch writer status:", error);
        }
      };
      checkWriter();
    }
  }, [sgSeq]);

  useEffect(() => {
    if (sgSeq) {
      const checkRecruitmentStatus = async () => {
        try {
          const token = localStorage.getItem("accessToken");
          const response = await axios.get(
            `${process.env.REACT_APP_API_SERVER}/api/study-group/status/${sgSeq}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setJoin(response.data);
        } catch (error) {
          console.error("Failed to fetch recruitment status:", error);
        }
      };
      checkRecruitmentStatus();
    }
  }, [sgSeq]);

  const formatDate = (dateString) => {
    const dateTimeParts = dateString.split(".");
    const dateTime = dateTimeParts[0];
    return dateTime;
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_SERVER}/api/join`,
        {
          sgSeq: sgSeq,
          useq: useq,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      console.log("신청완료!");
    } catch (error) {
      console.error("신청하기에 실패했습니다:", error);
      alert("신청하기에 실패했습니다.");
    }
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
          <strong>{formatDate(boardData.registered)} </strong>| 모집여부:{" "}
          <strong style={{ color: join ? "#007bff" : "#dc3545" }}>
            {join ? "모집중" : "모집마감"}
          </strong>
        </PostMeta>
        <PostContent>{boardData.content}</PostContent>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {writer ? (
            <div style={{ display: "flex", gap: "1rem" }}>
              <ApplyBtn variant="contained" color="secondary">
                수정
              </ApplyBtn>
              <DeleteBtn style={{ backgroundColor: "#fb4d26", color: "white" }}>
                삭제
              </DeleteBtn>
            </div>
          ) : (
            <ApplyBtn variant="contained" color="primary" onClick={handleJoin}>
              신청하기
            </ApplyBtn>
          )}
        </div>
      </PostContainer>
      <Footer />
    </>
  );
};

export default PostDetail;
