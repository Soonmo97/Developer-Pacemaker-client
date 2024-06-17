import React from "react";
import styled from "styled-components";

import Memo from "./Memo";
import UserTodoList from "./UserTodoList";

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
  padding: 3rem;
  border-radius: 10px;
  height: 50%;
  width: 45%;
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

const UserCalendarModal = ({ onClose, children, titleDate, selectedDate }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h2>{titleDate}</h2>
          <ModalTitle>{children}</ModalTitle>
          <CloseButton onClick={onClose}>X</CloseButton>
        </ModalHeader>
        <ModalBody>
          <TodoListSection>
            <SectionTitle>TodoList</SectionTitle>
            <UserTodoList></UserTodoList>
          </TodoListSection>
          <StudyDiarySection>
            <SectionTitle style={{ color: "#1e90ff" }}>학습일지</SectionTitle>
            <Memo selectedDate={selectedDate}></Memo>
          </StudyDiarySection>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default UserCalendarModal;
