import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Modal from "react-modal";
import StudyGroupPlanner from "./StudyGroupPlanner";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserImg from "../../user/UserImg";

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
  min-height: 40vh;
`;

const MemberTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const MemberRow = styled.tr`
  height: 50px;
`;

const ProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MemberCell = styled.td`
  /* border: 1px solid #ddd; */
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
  const [members, setMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const { sgSeq } = useParams();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/api/group-members/${sgSeq}`
        );
        console.log("members", response.data);
        setMembers(response.data.slice(0, 15)); // 최대 15명으로 제한
      } catch (error) {
        console.error("Failed to fetch members", error);
      }
    };

    fetchMembers();
  }, [sgSeq]);

  const openModal = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMember(null);
    setIsModalOpen(false);
  };

  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < 3; i++) {
      const rowMembers = members.slice(i * 5, i * 5 + 5);
      rows.push(
        <MemberRow key={i}>
          {rowMembers.map((member) => (
            <MemberCell key={member.useq} onClick={() => openModal(member)}>
              <ProfileDiv>
                <UserImg userImg={member.img} />{" "}
                {/* UserImg 컴포넌트를 사용하여 이미지를 표시합니다. */}
                {member.nickname}
                <br />
                달성현황: {member.score}개
              </ProfileDiv>
            </MemberCell>
          ))}
          {rowMembers.length < 5 &&
            Array(5 - rowMembers.length)
              .fill(null)
              .map((_, index) => <MemberCell key={`empty-${index}`} />)}
        </MemberRow>
      );
    }
    return rows;
  };

  return (
    <>
      <StatusContainer>
        <MemberTable>
          <thead>
            <MemberRow>
              <MemberCell colSpan={5} style={{ backgroundColor: "#faf8f8" }}>
                그룹원
              </MemberCell>
            </MemberRow>
          </thead>
          <tbody>{renderRows()}</tbody>
        </MemberTable>
      </StatusContainer>

      <MemberDetailModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Member Detail Modal"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <CloseButton onClick={closeModal}>X</CloseButton>
        {selectedMember && (
          <>
            <DetailTitle>{selectedMember.nickname}</DetailTitle>
            <DetailModalContainer>
              <ThemeProvider theme={theme}>
                <StudyGroupPlanner member={selectedMember} sgSeq={sgSeq} uSeq={selectedMember.useq}/>
              </ThemeProvider>
            </DetailModalContainer>
          </>
        )}
      </MemberDetailModal>
    </>
  );
};

export default MemberStatus;
