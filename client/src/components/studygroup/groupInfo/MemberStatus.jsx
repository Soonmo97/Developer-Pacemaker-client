import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Modal from "react-modal";
import StudyGroupPlanner from "./StudyGroupPlanner";

const theme = {
  red_1: "#FF0000",
  blue_1: "#0260f8",
  primary_2: "#fa9805",
  primary_3: "#ffaa0c",
  yellow_2: "#f9e8c3",
  br_2: "#666666",
};

const StatusContainer = styled.div`
  padding: 1rem;
  text-align: center;
`;

const MemberTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const MemberRow = styled.tr`
  height: 50px;
`;

const MemberCell = styled.td`
  border: 1px solid #ddd;
  width: 20%;
  text-align: center;
`;

const ProfileImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ccc;
  margin: 0 auto;
  cursor: pointer;
`;

const MemberDetailModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: white;
  border: 1px solid #ddd;
  width: 35%;
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

const DetailTitle = styled.h2`
  margin-top: 0;
`;

const DetailModalContainer = styled.div`
  display: flex;
`;

const MemberStatus = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const openModal = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMember(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <StatusContainer>
        <MemberTable>
          <thead>
            <MemberRow>
              <MemberCell onClick={() => openModal("Member 1")}>
                <ProfileImage />
              </MemberCell>
              <MemberCell onClick={() => openModal("Member 2")}>
                <ProfileImage />
              </MemberCell>
              <MemberCell onClick={() => openModal("Member 3")}>
                <ProfileImage />
              </MemberCell>
              <MemberCell onClick={() => openModal("Member 4")}>
                <ProfileImage />
              </MemberCell>
              <MemberCell onClick={() => openModal("Member 5")}>
                <ProfileImage />
              </MemberCell>
            </MemberRow>
          </thead>
          <tbody>
            <MemberRow>
              <MemberCell>이름, 달성현황</MemberCell>
              <MemberCell>이름, 달성현황</MemberCell>
              <MemberCell>이름, 달성현황</MemberCell>
              <MemberCell>이름, 달성현황</MemberCell>
              <MemberCell>이름, 달성현황</MemberCell>
            </MemberRow>
          </tbody>
        </MemberTable>
      </StatusContainer>

      <MemberDetailModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Member Detail Modal"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <CloseButton onClick={closeModal}>X</CloseButton>
        <DetailTitle>{selectedMember}</DetailTitle>
        <DetailModalContainer>
          <ThemeProvider theme={theme}>
            <StudyGroupPlanner />
          </ThemeProvider>
        </DetailModalContainer>
      </MemberDetailModal>
    </>
  );
};

export default MemberStatus;
