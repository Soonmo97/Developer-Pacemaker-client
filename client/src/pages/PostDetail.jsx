import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@mui/material";
import axios from "axios";

const PostContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 1.5rem;
  background-color: #f9f9f9;
  margin-bottom: 1rem;
  margin: 2rem auto;
`;

const Title = styled.h1`
  font-size: 1.7rem;
  margin: 0;
  display: flex;
  align-items: center;
`;

const Icon = styled.span`
  font-size: 1.5rem;
  margin-right: 1rem;
`;

const MetaData = styled.div`
  color: #777;
  font-size: 0.95rem;
  margin-top: 10px;
`;

const Content = styled.div`
  margin-top: 1rem;
`;

const Section = styled.div`
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  margin: 0 0 1rem;
`;

const List = styled.ul`
  padding-left: 1.3rem;
`;

const ListItem = styled.li`
  margin-bottom: 1rem;
`;

const ApplyBtn = styled(Button)`
  && {
    height: 2.5rem;
    border-radius: 15px;
    width: 5rem;
  }
`;

const DeleteBtn = styled(Button)`
  && {
    height: 2.5rem;
    border-radius: 15px;
    width: 5rem;
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
  const navigate = useNavigate();

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
      alert("신청완료");
    } catch (error) {
      console.error("신청하기에 실패했습니다:", error);
      alert("신청하기에 실패했습니다.");
    }
  };

  const handleEdit = async () => {
    navigate(`/main/studygroupboard/edit/${rbSeq}`);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(
        `${process.env.REACT_APP_API_SERVER}/api/recruitmentBoard/${rbSeq}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("삭제완료!");
      navigate("/main/studygroupboard");
    } catch (error) {
      console.error("삭제에 실패했습니다:", error);
      alert("삭제에 실패했습니다.");
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
      <div
        style={{ display: "flex", justifyContent: "center", minHeight: "77vh" }}
      >
        <PostContainer style={{ width: "35%", minHeight: "30vh" }}>
          <Title>
            <Icon>📅</Icon>
            {boardData.name}
          </Title>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <MetaData>
              {boardData.nickname} · 작성일 {formatDate(boardData.registered)} ·{" "}
              {/* <strong style={{ color: join ? "#007bff" : "#dc3545" }}>
                {join ? "모집중" : "모집마감"}
              </strong>{" "} */}
            </MetaData>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {writer ? (
                <div style={{ display: "flex", gap: "1rem" }}>
                  <ApplyBtn
                    variant="contained"
                    color="secondary"
                    onClick={handleEdit}
                  >
                    수정
                  </ApplyBtn>
                  <DeleteBtn
                    style={{ backgroundColor: "#fb4d26", color: "white" }}
                    onClick={handleDelete}
                  >
                    삭제
                  </DeleteBtn>
                </div>
              ) : (
                <ApplyBtn
                  variant="contained"
                  color="primary"
                  onClick={handleJoin}
                >
                  신청하기
                </ApplyBtn>
              )}
            </div>
          </div>
          <br />
          <div style={{ borderBottom: "1px solid #ccc" }}></div>
          <Content>
            <Section>
              <SectionTitle> 그룹명 : {boardData.studyGroup.name}</SectionTitle>
              <List>
                <ListItem>{boardData.content}</ListItem>
              </List>
            </Section>
          </Content>
        </PostContainer>
      </div>
      <Footer />
    </>
  );
};

export default PostDetail;
