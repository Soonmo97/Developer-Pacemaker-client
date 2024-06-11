// src/components/CreateStudyGroup.js
import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  background-color: #e0e0e0;
  padding: 2rem;
  border-radius: 8px;
  width: 26rem;
  margin: 2rem auto;
`;

const FormTitle = styled.h2`
  margin-bottom: 1.5rem;
  text-align: center;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  width: 100px;
  margin-right: 1rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const CheckButton = styled.button`
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #64b5f6;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #1695fc;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #64b5f6;
  color: white;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #1695fc;
  }
`;

const CreateStudyGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [groupGoal, setGroupGoal] = useState("");

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleGroupGoalChange = (e) => {
    setGroupGoal(e.target.value);
  };

  const handleCheckDuplicate = () => {
    alert("중복확인 기능을 구현하세요.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`그룹 이름: ${groupName}, 팀 공동목표: ${groupGoal}`);
  };

  return (
    <FormContainer>
      <FormTitle>스터디그룹 만들기</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>그룹 이름:</Label>
          <Input
            type="text"
            value={groupName}
            onChange={handleGroupNameChange}
          />
          <CheckButton type="button" onClick={handleCheckDuplicate}>
            중복확인
          </CheckButton>
        </FormGroup>
        <FormGroup>
          <Label>팀 공동목표:</Label>
          <Input
            type="text"
            value={groupGoal}
            onChange={handleGroupGoalChange}
          />
        </FormGroup>
        <SubmitButton type="submit">만들기</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default CreateStudyGroup;
