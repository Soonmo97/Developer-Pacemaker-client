import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import GroupTodoList from "./groupTodolist/GroupTodoList";

const InfoContainer = styled.div`
  padding: 1rem;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ddd;
`;

const GoalsContainer = styled.div`
  padding: 1rem;
  background-color: #e0e0e0;
  text-align: center;
  border-bottom: 1px solid #ddd;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f8f8f8;
  border-bottom: 1px solid #ddd;
`;

const Title = styled.h1`
  margin: 0;
`;

const SetBtns = styled.div`
  display: flex;
  gap: 1rem;
`;

const SettingsButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
`;

const ManagementModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: white;
  border: 1px solid #ddd;
  width: 40%;
  height: 50%;
  margin: 5rem auto;
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 2.5rem 0;
`;

const SectionHeader = styled.div`
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  width: 100%;
  text-align: center;
  padding: 0.5rem;
`;

const List = styled.div`
  width: 45%;
  border: 1px solid #ddd;
  padding: 1rem;
  max-height: 14rem;
  overflow-y: auto;
  overflow-x: hidden;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
`;

const InviteButton = styled.button`
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
`;

const RemoveButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
`;

const MemberDetailModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: white;
  border: 1px solid #ddd;
  width: 45%;
  height: 50%;
  margin: 5rem auto;
`;

const CloseSetButton = styled.button`
  align-self: flex-end;
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
`;

const DetailTitle = styled.h1`
  margin-top: 0;
  margin-bottom: 1rem;
`;

const DetailContent = styled.div`
  /* display: flex;
  align-items: center; */
  /* margin: 1rem 0; */
`;

const DetailContainer = styled.div`
  margin-right: 5rem;
`;

const DetailModalContainer = styled.div`
  display: flex;
  margin-left: 5rem;
`;

const ProfilePhoto = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #ccc;
  margin-right: 1rem;
`;

const ActionButton = styled.button`
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 0.5rem 0.7rem;
  border-radius: 25px;
  margin-left: 1rem;
  /* margin-right: 2rem; */
  cursor: pointer;
`;

const GroupInfo = () => <InfoContainer>그룹원 0/15명</InfoContainer>;

const GroupGoals = () => <GoalsContainer>공동 목표</GoalsContainer>;

const Header = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSetModalOpen, setIsSetModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openSetModal = () => setIsSetModalOpen(true);
  const closeSetModal = () => setIsSetModalOpen(false);

  return (
    <>
      <HeaderContainer>
        <Title>스터디 그룹 {id}</Title>
        <SetBtns>
          <SettingsButton onClick={openModal}>신청하기</SettingsButton>
          <SettingsButton onClick={openModal}>관리</SettingsButton>
          <SettingsButton onClick={openSetModal}>설정</SettingsButton>
        </SetBtns>
      </HeaderContainer>

      <ManagementModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Management Modal"
      >
        <CloseButton onClick={closeModal}>X</CloseButton>
        <h1>스터디그룹 관리</h1>
        <Section>
          <List>
            <SectionHeader>신청 현황 2</SectionHeader>
            <ListItem>
              <div>닉네임</div>
              <div>스터디 그룹 신청합니다!</div>
              <InviteButton>수락</InviteButton>
            </ListItem>
            <ListItem>
              <div>닉네임</div>
              <div>스터디 그룹 신청합니다!</div>
              <InviteButton>수락</InviteButton>
            </ListItem>
          </List>
          <List>
            <SectionHeader>그룹원 관리</SectionHeader>
            <ListItem>
              <div>그룹원 닉네임</div>
              <RemoveButton>강퇴</RemoveButton>
            </ListItem>
            <ListItem>
              <div>그룹원 닉네임</div>
              <RemoveButton>강퇴</RemoveButton>
            </ListItem>
            <ListItem>
              <div>그룹원 닉네임</div>
              <RemoveButton>강퇴</RemoveButton>
            </ListItem>
            <ListItem>
              <div>그룹원 닉네임</div>
              <RemoveButton>강퇴</RemoveButton>
            </ListItem>
          </List>
        </Section>
      </ManagementModal>

      <MemberDetailModal
        isOpen={isSetModalOpen}
        onRequestClose={closeSetModal}
        contentLabel="Member Detail Modal"
      >
        <CloseSetButton onClick={closeSetModal}>X</CloseSetButton>
        <DetailTitle>내 정보</DetailTitle>
        <DetailModalContainer>
          <DetailContainer>
            <DetailContent>
              <ProfilePhoto />
              프로필사진
              <ActionButton>변경</ActionButton>
            </DetailContent>
            가입일 : 2021-01-01
            <br />
            이메일 : sesac@trees.com
          </DetailContainer>
          <div>
            <h3>TodoList</h3>
            <GroupTodoList />
          </div>
        </DetailModalContainer>
      </MemberDetailModal>
      <GroupInfo />
      <GroupGoals />
    </>
  );
};

export default Header;
