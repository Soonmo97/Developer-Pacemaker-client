import React, { useState } from "react";
import styled from "styled-components";
import GroupTodoList from "../studygroup/groupInfo/groupTodolist/GroupTodoList";
import Memo from "./Memo";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  height: 50%;
  width: 50%;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ModalTitle = styled.h2`
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ModalBody = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5rem;
`;

const TodoListSection = styled.div`
  flex: 1;
  padding: 10px;
`;

const SectionTitle = styled.h3`
  margin: 0 0 10px 0;
  color: red;
`;

const StudyDiarySection = styled.div`
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const UserCalendarModal = ({ onClose, children }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{children}</ModalTitle>
          <CloseButton onClick={onClose}>X</CloseButton>
        </ModalHeader>
        <ModalBody>
          <TodoListSection>
            <SectionTitle>TodoList</SectionTitle>
            <GroupTodoList></GroupTodoList>
          </TodoListSection>
          <StudyDiarySection>
            <SectionTitle style={{ color: "#1e90ff" }}>학습일지</SectionTitle>
            <Memo></Memo>
          </StudyDiarySection>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default UserCalendarModal;
