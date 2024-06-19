// src/components/StudyList.js
import React from "react";
import styled from "styled-components";
import StudyItem from "./StudyItem";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StudyList = () => {
  // 예시 데이터
  const studies = [
    {
      id: 1,
      title: "코딩테스트 스터디 모집합니다!",
      description:
        "코딩테스트 문제 풀이 (언어는 python이 주이지만 다른 언어도 가능 합니다.)",
      author: "김영현",
      time: "22분 전",
      tags: ["모집중"],
      views: 9,
      comments: 13,
      likes: 0,
    },
    {
      id: 2,
      title: "자바 알고리즘 인터뷰 with 코틀린 스터디",
      description: "자바 알고리즘 인터뷰 책을 읽고 리뷰 스터디",
      author: "마이티",
      time: "1시간 전",
      tags: ["모집중"],
      views: 12,
      comments: 6,
      likes: 0,
    },
    // 더 많은 예시 데이터 추가 가능
  ];

  return (
    <ListContainer>
      {studies.map((study) => (
        <StudyItem key={study.id} study={study} />
      ))}
    </ListContainer>
  );
};

export default StudyList;
