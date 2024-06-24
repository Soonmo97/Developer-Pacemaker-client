import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";

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
  padding: 5%;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 3rem;
  border-radius: 10px;
  height: 80%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 90%;
    padding: 2rem;
    height: 70%;
  }

  @media (max-width: 480px) {
    width: 95%;
    padding: 1.5rem;
    height: 60%;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const ModalTitle = styled.h2`
  margin: 0;

  @media (max-width: 480px) {
    margin-bottom: 10px;
    font-size: 1.25rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

const ModalBody = styled.div`
  display: flex;
  justify-content: space-between;
  overflow-y: auto;
  flex: 1;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const TodoListSection = styled.div`
  flex: 1;
  padding: 10px;

  @media (max-width: 480px) {
    padding: 5px;
  }
`;

const SectionTitle = styled.h3`
  margin: 0 0 10px 0;
  color: red;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const StudyDiarySection = styled.div`
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    padding: 5px;
  }
`;

const UserCalendarModal = ({
  onClose,
  children,
  titleDate,
  selectedDate,
  response,
}) => {
  const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
  const [memo, setMemo] = useState(response.memo);
  const [todo, setTodo] = useState(response.todoDTOList);
  const [pSeq, setPSeq] = useState(response.pseq);
  const [newMemo, setNewMemo] = useState("");
  const [newTodo, setNewTodo] = useState("");

  const handleTodosChange = (newTodos) => {
    setNewTodo(newTodos);
  };

  const handleMemoChange = (newMemo) => {
    setNewMemo(newMemo);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const payload = {
        memo: newMemo,
        ...(newTodo ? { todoCreateDTOList: [{ content: newTodo }] } : {}),
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_SERVER}/api/planner?date=${formattedDate}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("플래너 생성이 완료되었습니다.");
      setPSeq(response.data.pseq);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

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
            <UserTodoList
              pSeq={pSeq}
              todo={todo}
              onTodosChange={handleTodosChange}
            ></UserTodoList>
          </TodoListSection>
          <StudyDiarySection>
            <SectionTitle style={{ color: "#1e90ff" }}>메모</SectionTitle>
            <Memo
              selectedDate={selectedDate}
              memo={memo}
              pSeq={pSeq}
              onMemoChange={handleMemoChange}
              onSubmit={handleSubmit}
            ></Memo>
          </StudyDiarySection>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default UserCalendarModal;
