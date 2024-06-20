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

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #d9e7f5;
  border-bottom: 1px solid #ccc;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
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

  @media (max-width: 768px) {
    padding: 0.25rem;
  }
`;

const BoardTd = styled.td`
  border-bottom: 1px solid #ccc;
  padding: 0.5rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 0.25rem;
  }
`;

const BoardTd2 = styled.td`
  border-bottom: 1px solid #ccc;
  text-align: center;
  font-weight: bold;
  border-radius: 20px;
  color: ${(props) => (props.recruiting ? "#007bff" : "#dc3545")};
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0 0.5rem;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 0.5rem;
    margin-left: -0.5rem;
  }
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

    @media (max-width: 768px) {
      width: 100%;
      margin-top: 0.5rem;
      float: none;
    }
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
    const dateTimeParts = dateString.split(".");
    const dateTime = dateTimeParts[0];
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
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
