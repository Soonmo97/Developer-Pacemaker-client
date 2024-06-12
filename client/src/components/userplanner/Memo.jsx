import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

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
  background-color: ${(props) => (props.save ? "#3598fc" : "#b0b0b0")};
  color: white;
  &:hover {
    background-color: ${(props) => (props.save ? "#0080ff" : "#909090")};
  }
`;

const Memo = () => {
  const [note, setNote] = useState("");
  const [isEditing, setIsEditing] = useState(true); // 처음에 작성 모드로 시작
  const noteRef = useRef(null);

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 작성 모드로 변경
    setIsEditing(true);
  }, [isEditing]);

  const handleChange = (e) => {
    setNote(e.target.value);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    noteRef.current.focus();
  };

  return (
    <Wrapper>
      <Note
        ref={noteRef}
        value={note}
        onChange={handleChange}
        disabled={!isEditing}
        placeholder="내용을 입력하세요..."
      />
      <ButtonWrapper>
        <Button save onClick={handleSave}>
          저장
        </Button>
        <Button onClick={handleEdit}>{note.trim() ? "수정" : "작성"}</Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default Memo;
