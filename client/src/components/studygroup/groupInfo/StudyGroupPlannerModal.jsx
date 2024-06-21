import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GroupTodoList from "./groupTodolist/GroupTodoList";

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
  width: 80%;
  max-width: 600px;
  height: 80vh;
  max-height: 90%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 90%;
    padding: 1rem;
  }
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
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const TodoListSection = styled.div`
  padding: 10px;
`;

const SectionTitle = styled.h3`
  margin: 0 0 10px 0;
  color: red;
  text-align: center;
`;

const StudyGroupPlannerModal = ({
  onClose,
  children,
  formattedDate,
  response,
  sgSeq,
  initialGpSeq,
}) => {
  const [todos, setTodos] = useState(response);
  const [gpSeq, setGpSeq] = useState(initialGpSeq);

  const getGpSeq = async (gpSeq) => {
    setGpSeq(gpSeq);
  };

  useEffect(() => {
    console.log("StudyGroupPlannerModalresponse::", response);
    console.log("???/", gpSeq);
  }, []);

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{children}</ModalTitle>
          <CloseButton onClick={onClose}>X</CloseButton>
        </ModalHeader>

        <ModalBody>
          <TodoListSection>
            {/* <SectionTitle>TodoList</SectionTitle> */}
            <GroupTodoList
              response={todos}
              formattedDate={formattedDate}
              sgSeq={sgSeq}
              gpSeq={gpSeq}
              getGpSeq={getGpSeq}
            />
          </TodoListSection>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default StudyGroupPlannerModal;
