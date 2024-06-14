import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, Button } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

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

const data = [
  {
    id: 1,
    title: "게시글 1",
    author: "작성자 1",
    date: "2024-06-01",
    status: "모집중",
    content: "이것은 게시글 1의 내용입니다.",
  },
  {
    id: 2,
    title: "게시글 2",
    author: "작성자 2",
    date: "2024-06-02",
    status: "모집마감",
    content: "이것은 게시글 2의 내용입니다.",
  },
];

const Board = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <tr key={item.id}>
                <BoardTd>{item.id}</BoardTd>
                <BoardTd>
                  <Link to={`/main/studygroupboard/post/${item.id}`}>
                    {item.title}
                  </Link>
                </BoardTd>
                <BoardTd>{item.author}</BoardTd>
                <BoardTd>{item.date}</BoardTd>
                <BoardTd>{item.status}</BoardTd>
              </tr>
            ))}
          </tbody>
        </BoardTable>
        <Link to="/main/studygroupboard/writePost">
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
