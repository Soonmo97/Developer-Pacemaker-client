import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 400px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  color: #666;
`;

const InputField = styled.input`
  width: 70%;
  padding: 8px;
  margin: 10px 0;
`;

const SubmitButton = styled.button`
  margin-left: 2%;
  padding: 8px 10px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
`;

const PasswordResetModal = ({ email, closeModal, setIsRegistered }) => {
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_SERVER}/api/user/reset-password`,
        {
          email: email,
          pw: newPassword,
        }
      );
      alert(response.data);
      closeModal();
      setIsRegistered(true);
      navigate("/");
    } catch (error) {
      alert("비밀번호 재설정 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <>
      <ModalOverlay onClick={closeModal} />
      <ModalContainer>
        <ModalHeader>
          <h3>비밀번호 재설정</h3>
          <CloseButton onClick={closeModal}>×</CloseButton>
        </ModalHeader>
        <form onSubmit={handlePasswordReset}>
          <InputField
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="새로운 비밀번호를 입력하세요"
            required
          />
          <SubmitButton type="submit">재설정</SubmitButton>
        </form>
      </ModalContainer>
    </>
  );
};

const EmailModal = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/api/user/check-email`,
        {
          params: { email: email },
        }
      );
      if (response.data) {
        setShowPasswordModal(true);
      } else {
        alert("존재하지 않는 이메일입니다.");
      }
    } catch (error) {
      console.error("Error checking email:", error);
    }
  };

  if (isRegistered) {
    closeModal();
    return null;
  }

  return (
    <>
      <ModalOverlay onClick={closeModal} />
      <ModalContainer>
        <ModalHeader>
          <h3>이메일 입력</h3>
          <CloseButton onClick={closeModal}>×</CloseButton>
        </ModalHeader>
        <form onSubmit={handleEmailSubmit}>
          <InputField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
            required
          />
          <SubmitButton type="submit">확인</SubmitButton>
        </form>
        {showPasswordModal && (
          <PasswordResetModal
            email={email}
            closeModal={() => setShowPasswordModal(false)}
            setIsRegistered={setIsRegistered}
          />
        )}
      </ModalContainer>
    </>
  );
};

export default EmailModal;
