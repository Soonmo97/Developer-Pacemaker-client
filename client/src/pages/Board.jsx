import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, Button } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const BoardContainer = styled.div`
  width: 70%;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 5rem;
  min-height: 65vh;
`;

const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #d9e7f5;
  border-bottom: 1px solid #ccc;
`;

const BoardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const BoardTh = styled.th`
  border-bottom: 1px solid #ccc;
  padding: 0.5rem;
  background-color: #bcdbf9;
`;

const BoardTd = styled.td`
  border-bottom: 1px solid #ccc;
  padding: 0.5rem;
  text-align: center;
`;

const BoardTd2 = styled.td`
  border-bottom: 1px solid #ccc;
  text-align: center;
  font-weight: bold;
  border-radius: 20px;
  color: ${(props) => (props.recruiting ? "#007bff" : "#dc3545")};
  /* color: white; */
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0 0.5rem;
`;

const StyledTextField = styled(TextField)`
  && {
    margin: 0.5rem 0;
    flex: 1;
  }
`;

const WriteButton = styled(Button)`
  && {
    margin-top: 1rem;
    float: right;
  }
`;

const Board = () => {
  const { rbSeq } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [boardData, setBoardData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sgSeq, setSgSeq] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/api/recruitmentBoard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBoardData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Failed to fetch board data:", error);
      }
    };

    fetchData();
  }, []);

  console.log("boardData", boardData);

  const formatDate = (dateString) => {
    // 문자열에서 밀리초 제외하고 날짜와 시간 부분 추출
    const dateTimeParts = dateString.split(".");
    const dateTime = dateTimeParts[0];

    return dateTime;
  };

  useEffect(() => {
    const filtered = boardData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, boardData]);

  return (
    <>
      <Navbar />
      <BoardContainer>
        <BoardHeader>
          <h2>팀원 모집 게시판</h2>
          <SearchWrapper>
            <StyledTextField
              placeholder="검색"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon />
          </SearchWrapper>
        </BoardHeader>
        <BoardTable>
          <thead>
            <tr>
              <BoardTh>번호</BoardTh>
              <BoardTh>제목</BoardTh>
              <BoardTh>글쓴이</BoardTh>
              <BoardTh>작성일</BoardTh>
              <BoardTh>모집여부</BoardTh>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.rbSeq}>
                <BoardTd>{item.rbSeq}</BoardTd>
                <BoardTd>
                  <Link to={`/main/studygroupboard/${item.rbSeq}`}>
                    {item.name}
                  </Link>
                </BoardTd>
                <BoardTd>{item.nickname}</BoardTd>
                <BoardTd>{formatDate(item.registered)}</BoardTd>
                <BoardTd2 recruiting={item.studyGroup.status.toString()}>
                  {item.studyGroup.status ? "모집중" : "모집마감"}
                </BoardTd2>
              </tr>
            ))}
          </tbody>
        </BoardTable>
        <Link to="/main/studygroupboard/write">
          <WriteButton variant="contained" color="primary">
            글쓰기
          </WriteButton>
        </Link>
      </BoardContainer>
      <Footer />
    </>
  );
};

export default Board;
