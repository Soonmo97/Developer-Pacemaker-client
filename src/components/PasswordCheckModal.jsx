import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 1em;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  margin-right: 3%;
  font-size: 1em;
  color: #fff;
  background-color: #2b3115;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #2b3115;
  }
`;

const PasswordCheckModal = ({ isOpen, onClose, onSuccess }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${process.env.REACT_APP_API_SERVER}/api/user/comparePw`,
        { pw: password }, // 요청 본문에 비밀번호를 담아 보냄
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        onSuccess();
        setPassword(""); // Clear the input field
      } else {
        setError("비밀번호가 일치하지 않습니다.");
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        setError("비밀번호가 일치하지 않습니다.");
      } else {
        setError(
          "비밀번호 확인 오류가 발생했습니다. 자세한 내용은 콘솔을 확인해주세요."
        );
      }
    }
  };

  const handleClose = () => {
    setPassword(""); // Clear the input field
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setPassword(""); // Clear the input field when modal is closed
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ModalBackground>
      <ModalContainer>
        <h2>비밀번호 확인</h2>
        <form onSubmit={handleSubmit}>
          <Label>비밀번호:</Label>
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {error && <div style={{ color: "red" }}>{error}</div>}
          <Button type="submit">확인</Button>
          <Button type="button" onClick={handleClose}>
            취소
          </Button>
        </form>
      </ModalContainer>
    </ModalBackground>
  );
};

export default PasswordCheckModal;
