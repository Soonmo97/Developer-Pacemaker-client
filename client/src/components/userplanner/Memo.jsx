import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
`;

const Note = styled.textarea`
  width: 12vw;
  height: 10.4rem;
  padding: 1.5rem 4rem;
  margin: 20px 0;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  font-size: 16px;
  line-height: 1.5;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  resize: none;
  outline: none;
  font-family: "Arial", sans-serif;
  background: #ffffc1;
  background-image: -webkit-linear-gradient(#f6abca 1px, transparent 1px),
    -webkit-linear-gradient(#f6abca 1px, transparent 1px),
    -webkit-linear-gradient(#cfcfcf 1px, transparent 1px);
  background-image: -moz-linear-gradient(#f6abca 1px, transparent 1px),
    -moz-linear-gradient(#f6abca 1px, transparent 1px),
    -moz-linear-gradient(#cfcfcf 1px, transparent 1px);
  background-image: -o-linear-gradient(#f6abca 1px, transparent 1px),
    -o-linear-gradient(#f6abca 1px, transparent 1px),
    -o-linear-gradient(#cfcfcf 1px, transparent 1px);
  background-image: linear-gradient(#f6abca 1px, transparent 1px),
    linear-gradient(#f6abca 1px, transparent 1px),
    linear-gradient(#cfcfcf 1px, transparent 1px);
  background-size: 1px 1px, 1px 1px, 1.5rem 1.5rem;
  background-position: 50px 0, 54px 0, 0 70px;
  background-repeat: repeat-y, repeat-y, repeat;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  color: white;
  background-color: ${(props) =>
    props.className === "save" ? "#3598fc" : "#b0b0b0"};
  &:hover {
    background-color: ${(props) =>
      props.className === "save" ? "#0080ff" : "#909090"};
  }
`;

const Memo = ({ selectedDate, memo, pSeq, onMemoChange, onSubmit }) => {
  const [note, setNote] = useState(memo);
  const noteRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setNote(memo);
  }, [memo]);

  const formattedDate = moment(selectedDate).format("YYYY-MM-DD");

  const updateData = async () => {
    if (pSeq === null) {
      console.error("pSeq 값이 설정되지 않았습니다.");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      await axios.patch(
        `${process.env.REACT_APP_API_SERVER}/api/planner/patch/${pSeq}`,
        { memo: note },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("데이터가 성공적으로 업데이트되었습니다.");
      alert("데이터가 성공적으로 업데이트되었습니다.");
    } catch (error) {
      console.error("데이터를 업데이트하는 데 실패했습니다:", error);
      alert("데이터를 업데이트하는 데 실패했습니다.");
    }
  };

  const handleChange = (e) => {
    if (e && e.target) {
      const { value } = e.target;
      setNote(value);
      onMemoChange(value); // 부모 컴포넌트의 상태도 업데이트
    } else {
      console.error("Event or event target is undefined");
    }
  };

  const handleEdit = () => {
    noteRef.current.focus();
    updateData();
  };

  const handleSave = () => {
    onSubmit();
    setIsEditing(true);
  };

  return (
    <Wrapper>
      <Note
        ref={noteRef}
        value={note}
        onChange={handleChange}
        placeholder="학습 내용을 입력하세요."
      />
      <ButtonWrapper>
        {isEditing || pSeq ? (
          <Button onClick={handleEdit}>수정</Button>
        ) : (
          <Button className="save" onClick={handleSave}>
            작성
          </Button>
        )}
      </ButtonWrapper>
    </Wrapper>
  );
};

export default Memo;
