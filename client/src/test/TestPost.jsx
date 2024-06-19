// src/components/StudyPost.js
import React from "react";
import styled from "styled-components";

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f4f4f4;
  min-height: 100vh;
`;

const PostContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  background-color: #f9f9f9;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
  display: flex;
  align-items: center;
`;

const Icon = styled.span`
  font-size: 24px;
  margin-right: 10px;
`;

const MetaData = styled.div`
  color: #777;
  font-size: 14px;
  margin-top: 10px;
`;

const Content = styled.div`
  margin-top: 20px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  margin: 0 0 10px;
`;

const List = styled.ul`
  padding-left: 20px;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
`;

const Highlight = styled.span`
  font-weight: bold;
  color: #007bff;
`;

const Link = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const TestPost = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <PostContainer style={{ width: "40%" }}>
        <Title>
          <Icon>📅</Icon>
          코딩테스트 스터디 모집합니다!
        </Title>
        <MetaData>김영현 · 작성일 24.06.18 21:01 · 조회수 17</MetaData>
        <br />
        <div style={{ borderBottom: "1px solid #ccc" }}></div>
        <Content>
          <Section>
            <SectionTitle>[개발 스터디 모집]</SectionTitle>
            <List>
              <ListItem>
                스터디 주제: 코딩테스트 문제 풀이 (언어는 python이 주이지만 다른
                언어도 가능 합니다.)
              </ListItem>
              <ListItem>
                스터디 목표: <Highlight>매주 정해진 문제 6-7문제를</Highlight>{" "}
                각자 풀어오고 오프라인으로 만나 각자 풀이 발표 및 피드백
              </ListItem>
              <ListItem>
                예상 스터디 일정(횟수):{" "}
                <Highlight>격주 1회 오프라인, 1회 온라인</Highlight> (화요일
                오후 7시 쯤 청량리역 청년오랑 스터디룸에서 하고 있는데 이 부분에
                관해서는 다같이 얘기해보고 스케줄 및 장소 변동도 가능합니다!)
              </ListItem>
              <ListItem>
                예상 커리큘럼: 프로그래머스 기업 기출 문제 Lv1, Lv2, Lv.3 문제
                섞어서 풀고여기에 매주 알고리즘 하나 씩 선택해서 그 알고리즘에
                해당하는 문제를 백준에서 선정하여 2문제씩 추가로 풀고 있습니다.
              </ListItem>
              <ListItem>예상 모집인원: 1 - 2 명</ListItem>
              <ListItem>
                스터디 소개와 개설 이유: 같이 스터디 하다보니 분개서 사정이 생겨
                나가게 되어 현재 3명에서 스터디 진행중입니다. 4 - 5명에서
                스터디를 진행하면 좋을 것 같아 추가로 모집하려 합니다! 자가주도
                학습이 잘 되지 않는 분들... 스터디를 통해서 강제력으로라도
                꾸준히 코테 문제 같이 풀어요 😌
              </ListItem>
              <ListItem>
                꾸준히, 성실하게 스터디에 참여하실 수 있으신 분만
                연락부탁드립니다!
              </ListItem>
              <ListItem>
                스터디에 지원할 수 있는 방법:{" "}
                <Link href="https://open.kakao.com/o/sycnl4xg" target="_blank">
                  https://open.kakao.com/o/sycnl4xg
                </Link>
              </ListItem>
            </List>
          </Section>
        </Content>
      </PostContainer>
    </div>
  );
};

export default TestPost;
