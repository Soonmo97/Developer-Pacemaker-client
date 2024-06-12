// src/components/PostDetail.js
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@mui/material";

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

const data = [
  {
    id: 1,
    title: "게시글 1",
    author: "작성자 1",
    date: "2024-06-01",
    views: 100,
    content: "게시글1 내용",
  },
  {
    id: 2,
    title: "게시글 2",
    author: "작성자 2",
    date: "2024-06-02",
    views: 200,
    content: "게시글2 내용",
  },
];

const PostDetail = () => {
  const { id } = useParams();
  const post = data.find((item) => item.id.toString() === id);

  if (!post) {
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
        <PostTitle>{post.title}</PostTitle>
        <PostMeta>
          작성자: {post.author} | 작성일: {post.date} | 조회수: {post.views}
        </PostMeta>
        <PostContent>{post.content}</PostContent>
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
