import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import RegisterPage from "../components/user/RegisterPage";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EmailModal from "../components/user/EmailModal";

const responsiveWidth = css`
  width: 100%;
  @media (max-width: 768px) {
    width: 70%;
  }
  @media (min-width: 1024px) {
    width: 1000px;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
`;

const Container1 = styled.div`
  margin: 0 auto 20px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  ${responsiveWidth}
`;

const Container2 = styled.div`
  margin: 0 auto 20px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  ${responsiveWidth}
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const ModalContent = styled.div`
  margin-top: 20px;
`;

const IdContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const DivId = styled.div`
  width: 50%;
  padding: 8px;
  display: flex;
  justify-content: flex-start;
`;

const Inputid = styled.input`
  width: 100%;
  padding: 8px;
  margin-left: 10px;
`;

const PwContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const DivPw = styled.div`
  width: 50%;
  padding: 8px;
  display: flex;
  justify-content: flex-start;
`;

const Inputpw = styled.input`
  width: 100%;
  padding: 8px;
  margin-left: 10px;
`;

const Title = styled.h1`
  text-align: center;
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 50px;
  padding-left: 40px;
`;

const CheckButton = styled.button`
  padding: 8px 10px;
  margin-left: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;

  @media (max-width: 768px) {
    font-size: 0.6em;
    padding: 6px 8px;
  }
`;
const SuccessModal = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -20%);
  width: 60%;
  max-width: 400px;
  margin: 0 auto;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  z-index: 1000;

  @media (max-width: 768px) {
    width: 90%;
    max-width: 300px;
  }

  @media (min-width: 1024px) {
    width: 50%;
    max-width: 500px;
  }
`;

const ErrorModal = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -20%);
  width: 60%;
  max-width: 400px;
  margin: 0 auto;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  z-index: 1000;

  @media (max-width: 768px) {
    width: 90%;
    max-width: 300px;
  }

  @media (min-width: 1024px) {
    width: 50%;
    max-width: 500px;
  }
`;

const ErrorModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const ErrorMessageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const SuccessMessageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  color: #666;
`;
const KakaoButton = styled.button`
  padding: 8px 10px;
  margin-left: 5px;
  cursor: pointer;
  background-color: #fee500;
  color: black;
  border: none;
  border-radius: 4px;

  @media (max-width: 768px) {
    font-size: 0.6em;
    padding: 6px 8px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const Image = styled.img`
  width: 50%;
  height: auto;
  clip-path: ${({ clipPath }) => clipPath};
  transition: clip-path 2s ease-out;
`;

const bounce = keyframes`
  0% {
    transform: translateY(0); 
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0); 
  }
`;

const TextButton = styled.button`
  background: none;
  border: none;
  color: black;
  cursor: pointer;
  padding: 0;
  font-size: 12px;
  text-decoration: none;
  margin-right: 2%;

  &:hover {
    text-decoration: none;
  }
`;

const ImageContainer = styled.div`
  margin: 0 auto 20px;
  width: 100%;
  max-width: 500px;
  position: relative;
  animation: ${bounce} 1s infinite alternate;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function LoginPage() {
  const [clipPath, setClipPath] = useState("inset(62% 0 0 0)");
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [formData, setFormData] = useState({
    inputEmail: "test@test.com",
    inputPw: "1234",
  });
  const [showHelpModal, setShowHelpModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setClipPath((prevClipPath) => {
        switch (prevClipPath) {
          case "inset(62% 0 0 0)":
            return "inset(48% 0 0 0)";
          case "inset(48% 0 0 0)":
            return "inset(0% 0 0 0)";
          case "inset(0% 0 0 0)":
            return "inset(62% 0 0 0)";
          default:
        }
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      axios
        .get(
          `${process.env.REACT_APP_API_SERVER}/api/kakao/kakaoLogin?code=${code}`
        )
        .then((response) => {
          if (response.data.token) {
            localStorage.setItem("accessToken", response.data.token);
            setShowModal(true);
            navigate("/");
          } else {
            alert("카카오 로그인 실패");
          }
        })
        .catch((error) => {
          console.error("Kakao login error:", error);
          alert(
            "카카오 로그인 오류가 발생했습니다. 자세한 내용은 콘솔을 확인해주세요."
          );
        });
    }
  }, [navigate]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && showModal) {
        closeModalAndNavigate();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showModal]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_SERVER}/api/user/login`,
        {
          email: formData.inputEmail,
          pw: formData.inputPw,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.token) {
        localStorage.setItem("accessToken", response.data.token);
        setShowModal(true);
        navigate("/");
      } else {
        const errorMessage = response.data.message
          ? response.data.message.message
          : "로그인 실패";
        setErrorMessage(errorMessage);
        setShowErrorModal(true);
      }
    } catch (error) {
      setErrorMessage("로그인 오류가 발생했습니다.");
      setShowErrorModal(true);
    }
  };

  const closeHelpModal = () => {
    setShowHelpModal(false);
  };

  const handleSignup = () => {
    setShowRegister(true);
  };
  const handleForgetPassword = () => {
    setShowEmailModal(true);
  };

  const handleKakaoLogin = () => {
    const kakaoId = process.env.REACT_APP_API_KAKAO_ID;
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoId}&redirect_uri=http://localhost:3000/&response_type=code`;
  };

  const closeModalAndNavigate = () => {
    setShowModal(false);
    navigate("/main");
  };

  const handleEmailSubmit = (email) => {
    setUserEmail(email);
    setShowEmailModal(false);
    setShowPasswordModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowErrorModal(false);
    setShowEmailModal(false);
    setShowPasswordModal(false);
    setFormData({
      inputEmail: "",
      inputPw: "",
    });
  };
  const HelpModal = ({ closeModal }) => {
    return (
      <ModalContainer>
        <CloseButton onClick={closeModal}>×</CloseButton>
        <ModalContent>
          <h2>도움말</h2>
          <p>테스트 계정 아이디: test@test.com</p>
          <p>테스트 계정 비밀번호: 1234</p>
        </ModalContent>
      </ModalContainer>
    );
  };
  const closeErrorModal = () => {
    setShowErrorModal(false);
  };

  if (showRegister) {
    return <RegisterPage />;
  }

  return (
    <MainContainer>
      <Container1>
        <ImageContainer>
          <Image src="/images/logo.png" alt="Image" clipPath={clipPath} />
        </ImageContainer>
      </Container1>
      <Container2>
        <form onSubmit={handleSubmit}>
          <Title>로그인</Title>
          <IdContainer>
            <DivId>
              <label>이메일:</label>
            </DivId>
            <Inputid
              type="text"
              name="inputEmail"
              value={formData.inputEmail}
              onChange={handleChange}
              required
            />
          </IdContainer>
          <PwContainer>
            <DivPw>
              <label>비밀번호:</label>
            </DivPw>
            <Inputpw
              type="password"
              name="inputPw"
              value={formData.inputPw}
              onChange={handleChange}
              required
            />
          </PwContainer>
          <ButtonContainer>
            <CheckButton type="submit">로그인</CheckButton>
            <CheckButton type="button" onClick={handleSignup}>
              회원가입
            </CheckButton>
            <KakaoButton type="button" onClick={handleKakaoLogin}>
              카카오로 로그인
            </KakaoButton>
          </ButtonContainer>
        </form>
        {showHelpModal && <HelpModal closeModal={closeHelpModal} />}
        {showModal && (
          <SuccessModal>
            <ModalHeader>
              <p></p>
              <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
            </ModalHeader>
            <SuccessMessageContainer>
              <p>로그인 성공!</p>
              <CheckButton onClick={closeModalAndNavigate}>확인</CheckButton>
            </SuccessMessageContainer>
          </SuccessModal>
        )}
        {showErrorModal && (
          <ErrorModal>
            <ErrorModalHeader>
              <p></p>
              <CloseButton onClick={closeErrorModal}>×</CloseButton>
            </ErrorModalHeader>
            <ErrorMessageContainer>
              <p>{errorMessage}</p>
              <CheckButton onClick={closeErrorModal}>확인</CheckButton>
            </ErrorMessageContainer>
            <div>
              <TextButton onClick={handleForgetPassword}>
                비밀번호를 잊으셨나요?
              </TextButton>
              <TextButton onClick={handleSignup}>첫방문이신가요?</TextButton>

              {showEmailModal && (
                <EmailModal
                  closeModal={closeModal}
                  handleSubmit={handleEmailSubmit}
                />
              )}
            </div>
          </ErrorModal>
        )}
      </Container2>
    </MainContainer>
  );
}

export default LoginPage;
