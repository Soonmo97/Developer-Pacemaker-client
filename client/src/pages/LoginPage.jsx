import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import RegisterPage from "../components/user/RegisterPage";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const SubTitle = styled.h2`
  font-size: 1.5em;
  color: #333;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Text = styled.div`
  font-size: 1em;
  color: #666;
  line-height: 1.5;
  text-align: justify;
  margin: 0 20px;

  @media (max-width: 768px) {
    font-size: 0.8em;
  }

  @media (min-width: 1024px) {
    font-size: 1.2em;
  }
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
`;

const KakaoButton = styled.button`
  padding: 8px 10px;
  margin-left: 5px;
  cursor: pointer;
  background-color: #fee500;
  color: black;
  border: none;
  border-radius: 4px;
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
  clip-path: ${({ clipPath }) =>
    clipPath}; /* clip-path 값을 props로부터 받도록 설정 */
  transition: clip-path 2s ease-out; /* 2초 동안 clip-path에 변화가 일어나도록 설정 */
`;

const bounce = keyframes`
  0% {
    transform: translateY(0); // 초기 위치
  }
  50% {
    transform: translateY(-10px); // 위로 조금 이동
  }
  100% {
    transform: translateY(0); // 초기 위치로 돌아옴
  }
`;

const ImageContainer = styled.div`
  margin: 0 auto 20px;
  width: 100%;
  max-width: 500px; // 이미지의 최대 너비 설정
  position: relative; // 부모로부터 상대적 위치 설정
  animation: ${bounce} 1s infinite alternate; // bounce 애니메이션 적용
  display: flex; /* 내부 요소들을 가로로 배치합니다. */
  justify-content: center; /* 내부 요소들을 수평으로 가운데 정렬합니다. */
  align-items: center; /* 내부 요소들을 수직으로 가운데 정렬합니다. */
`;

function LoginPage() {
  const [clipPath, setClipPath] = useState("inset(62% 0 0 0)"); // 초기 clip-path 설정
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    inputEmail: "",
    inputPw: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // 1초마다 클립 경로 변경
      setClipPath((prevClipPath) => {
        switch (prevClipPath) {
          case "inset(62% 0 0 0)": // 현재 62% 보여줄 때
            return "inset(48% 0 0 0)"; // 1초 후에 82% 보이도록 변경
          case "inset(48% 0 0 0)": // 현재 82% 보여줄 때
            return "inset(0% 0 0 0)"; // 3초 후에 100% 보이도록 변경
          case "inset(0% 0 0 0)":
            return "inset(62% 0 0 0)";
          default:
          // return "inset(62% 0 0 0)"; // 나머지 경우에는 다시 62%로 변경
        }
      });
    }, 2000); // 1초 간격으로 클립 경로 변경

    // 컴포넌트 언마운트 시 인터벌 클리어
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      console.log("Received code:", code); // 디버깅 메시지 추가
      axios
        .get(
          `${process.env.REACT_APP_API_SERVER}/api/kakao/kakaoLogin?accessToken=${code}`
        )
        .then((response) => {
          console.log("Server response:", response); // 디버깅 메시지 추가
          if (response.data) {
            setShowModal(true);
            console.log(response.data);
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
        // 토큰이 존재할 때만 로컬 스토리지에 저장
        localStorage.setItem("accessToken", response.data.token);
        setShowModal(true);
        console.log(response.data);
      } else {
        const errorMessage = response.data.message
          ? response.data.message.message
          : "로그인 실패";
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("로그인 오류가 발생했습니다. 자세한 내용은 콘솔을 확인해주세요.");
    }
  };

  const handleSignup = () => {
    setShowRegister(true);
  };

  const handleKakaoLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: "http://localhost:3000/",
    });
  };

  const closeModalAndNavigate = () => {
    setShowModal(false);
    navigate("/main");
  };

  if (showRegister) {
    return <RegisterPage />;
  }

  return (
    <MainContainer>
      <Container1>
        <ImageContainer>
          <Image
            src="/images/logo.png"
            alt="Image"
            clipPath={clipPath} // clip-path 속성에 현재 clipPath 상태 적용
          />
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
        {showModal && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "20px",
              zIndex: 1000,
            }}
          >
            <p>로그인 성공!</p>
            <button onClick={closeModalAndNavigate}>확인</button>
          </div>
        )}
      </Container2>
    </MainContainer>
  );
}

export default LoginPage;
