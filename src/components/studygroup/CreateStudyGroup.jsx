import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  background-color: #e5f2ff;
  padding: 0 2rem 2rem 2rem;
  border-radius: 8px;
  width: 26rem;
  margin: auto;

  @media (max-width: 768px) {
    width: 90%;
    padding: 1rem;
  }

  @media (max-width: 480px) {
    width: 95%;
    padding: 0.5rem;
  }
`;

const FormTitle = styled.h2`
  margin-bottom: 3rem;
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Label = styled.label`
  width: 100px;
  margin-right: 1rem;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media (max-width: 768px) {
    width: 90%;
  }
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

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 0.5rem;
    width: 100%;
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

  @media (max-width: 768px) {
    padding: 0.5rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    margin-top: -1rem;
    margin-bottom: 2rem;
  }
`;

const CreateStudyGroup = ({ setModalIsOpen, modalIsOpen }) => {
  const [groupName, setGroupName] = useState("");
  const [groupGoal, setGroupGoal] = useState("");
  const [isDuplicated, setIsDuplicated] = useState(false);
  const [myStudyGroupId, setMyStudyGroupId] = useState([]);

  const groupNameVal = groupName.trim();
  const groupGoalVal = groupGoal.trim();

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleGroupGoalChange = (e) => {
    setGroupGoal(e.target.value);
  };

  const handleCheckDuplicate = async () => {
    if (groupNameVal === "") {
      alert("그룹명을 입력해주세요.");
    } else {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/api/study-group/check-name`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              name: groupName,
            },
          }
        );
        console.log(groupName);
        console.log(response.data);

        if (response.data) {
          alert("중복된 그룹 이름입니다.");
        } else {
          alert("사용 가능한 그룹 이름입니다.");
          setIsDuplicated(true);
        }
      } catch (error) {
        console.error("중복 확인 요청 실패:", error);
        alert("중복 확인 요청에 실패했습니다.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (groupNameVal === "") {
      alert("그룹명을 입력해주세요.");
      return;
    } else if (groupGoalVal === "") {
      alert("팀 목표를 입력해주세요.");
      return;
    } else if (groupNameVal.length >= 20 || groupGoalVal.length >= 20) {
      alert("입력 가능한 글자수를 초과하였습니다. (최대 20자)");
      return;
    } else if (!isDuplicated) {
      alert("중복확인을 해주세요");
      return;
    }
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${process.env.REACT_APP_API_SERVER}/api/study-group`,
        {
          name: groupName,
          goal: groupGoal,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("스터디 그룹 생성 성공:", response.data);
      alert("스터디 그룹이 생성되었습니다");
      setModalIsOpen(false);
      setMyStudyGroupId(response.data.sgSeq);
      window.location.href = `/main/mystudygroup/${response.data.sgSeq}`;
    } catch (error) {
      console.error("스터디 그룹 생성 실패:", error);
    }
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
