import React, { useState } from "react";
import styled, { css } from "styled-components";
import LoginPage from "../../pages/LoginPage";
import axios from "axios";

const responsiveWidth = css`
  width: 100%;
  @media (max-width: 768px) {
    width: 90%;
  }
  @media (min-width: 1024px) {
    width: 80%;
  }
`;
const Container1 = styled.div`
  margin: 0 auto 20px;
  padding: 20px;
  align-items: center; /* 가운데 정렬 추가 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  ${responsiveWidth}
`;
const responsiveContainer = css`
  width: 100%;
  @media (max-width: 768px) {
    width: 80%;
  }
  @media (min-width: 1024px) {
    width: 1000px;
  }
`;

const Label = styled.label`
  @media (max-width: 768px) {
    font-size: 0.8em;
  }

  @media (min-width: 1024px) {
    font-size: 1em;
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

const Container = styled.div`
  margin: 0 auto 20px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  ${responsiveWidth}
  justify-content: center;
  align-items: center;
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
  text-align: center;
  justify-content: center;
  margin: 0 20px;

  @media (max-width: 768px) {
    font-size: 0.7em;
  }

  @media (min-width: 1024px) {
    font-size: 1em;
  }
`;

const Text1 = styled.div`
  font-size: 1em;
  color: #666;
  line-height: 1.5;
  text-align: justify;
  margin: 0 20px;

  @media (max-width: 768px) {
    font-size: 0.3em;
  }

  @media (min-width: 1024px) {
    font-size: 1em;
  }
`;
const IdContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const DivId = styled.div`
  width: 10%;
  padding: 8px;
  display: flex;
  justify-content: flex-end;
`;

const Inputid = styled.input`
  width: 50%;
  padding: 8px;
  margin-left: 10px;
`;

const CheckButton = styled.button`
  padding: 8px 10px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;

  @media (max-width: 768px) {
    padding: 6px 8px;
    font-size: 0.8em;
  }

  @media (min-width: 1024px) {
    padding: 10px 12px;
    font-size: 1em;
  }
`;
const PwContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const DivPw = styled.div`
  width: 10%;
  padding: 8px;
  display: flex;
  justify-content: flex-end;
`;

const Inputpw = styled.input`
  width: 50%;
  padding: 8px;
  margin-left: 10px;

  @media (max-width: 768px) {
    width: 35%;
  }
`;
const Title = styled.h1`
  text-align: center;
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 50px;
  padding-left: 40px;

  @media (max-width: 768px) {
    font-size: 1.5em;
  }
`;

const NmContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const DivNm = styled.div`
  width: 10%;
  padding: 8px;
  display: flex;
  justify-content: flex-end;
`;

const Inputnm = styled.input`
  width: 50%;
  padding: 8px;
  margin-left: 10px;
  @media (max-width: 768px) {
    width: 35%;
  }
`;

const EmContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const DivEm = styled.div`
  width: 10%;
  padding: 8px;
  display: flex;
  justify-content: flex-end;
`;
const Inputem = styled.input`
  width: 50%;
  padding: 8px;
  margin-left: 10px;

  @media (max-width: 768px) {
    width: 35%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const ErrorSpan = styled.span`
  color: red;
  margin: 5px;
  @media (max-width: 768px) {
    font-size: 0.4em;
  }

  @media (min-width: 1024px) {
    font-size: 1em;
  }
`;

const Span = styled.span`
  margin: 5px;
  @media (max-width: 768px) {
    font-size: 0.5em;
  }

  @media (min-width: 1024px) {
    font-size: 1em;
  }
`;
function RegisterPage() {
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    pw: "",
    // img: "",
  });
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});
  const [showRegister, setShowRegister] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [availabilityMessages, setAvailabilityMessages] = useState({
    nickname: "",
    email: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "nickname" || name === "email") {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/api/user/check-${name}?${name}=${value}`
        );
        const isDuplicate = response.data; // 서버에서 반환한 중복 여부 값 사용

        console.log("aaaaa", isDuplicate);

        if (isDuplicate) {
          if (name === "nickname") {
            setAvailabilityMessages({
              ...availabilityMessages,
              [name]: `이미 사용 중인 닉네임 입니다.`,
            });
          } else {
            setAvailabilityMessages({
              ...availabilityMessages,
              [name]: `이미 사용 중인 이메일 입니다.`,
            });
          }
        } else {
          if (name === "nickname") {
            setAvailabilityMessages({
              ...availabilityMessages,
              [name]: `사용가능한 닉네임 입니다.`,
            });
          } else {
            setAvailabilityMessages({
              ...availabilityMessages,
              [name]: `사용가능한 이메일 입니다.`,
            });
          }
        }
      } catch (error) {
        console.error(`Error checking ${name} availability:`, error);
      }
    }
  };

  if (!showRegister) {
    return <LoginPage />;
  }

  if (isRegistered) {
    return <LoginPage />;
  }

  const handleBack = () => {
    setShowRegister(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_SERVER}/api/user`,
        formData
      );
      console.log(response);
      console.log("------");
      console.log(response.data);
      if (response.data.email) {
        alert("회원가입이 성공적으로 완료 되었습니다.");
        setIsRegistered(true);
      } else if (response.data.errors) {
      } else {
        setServerError("오류가 발생했습니다. 다시 실행해주세요.");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <MainContainer>
      <Container1>
        <Title>회원가입을 위한 절차</Title>
        <SubTitle>회원가입 주의사항</SubTitle>
        <Text>
          <div>회원가입 시 다음 사항을 유의해 주세요:</div>
        </Text>
        <Text1>
          {" "}
          <div>
            <ul>
              <li>모든 입력 필드는 반드시 작성해야 합니다.</li>
              <li>
                이메일 주소는 회원가입 확인 및 비밀번호 재설정에 사용됩니다.
              </li>
              <li>반드시 이메일 형태로 입력해주세요.</li>
              <li>닉네임은 3글자 이상 입력해주세요.</li>
              <li>이메일은 형식을 지켜서 작성해주시기 바립니다.</li>
            </ul>
          </div>
        </Text1>
      </Container1>
      <Container>
        {/* 양식 내용 */}
        <form onSubmit={handleSubmit}>
          {/* 입력 필드 */}
          <EmContainer>
            <DivEm>
              <Label htmlFor="email">Email:</Label>
            </DivEm>
            <Inputem
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Span>{availabilityMessages.email}</Span>
          </EmContainer>
          <NmContainer>
            <DivNm>
              <Label htmlFor="nickname">Nickname:</Label>
            </DivNm>
            <Inputnm
              type="text"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              required
            />
            {/* 유효성 검사 오류 메시지 */}
            <Span>{availabilityMessages.nickname}</Span>
          </NmContainer>
          <PwContainer>
            <DivPw>
              <Label htmlFor="pw">Password:</Label>
            </DivPw>
            <Inputpw
              type="password"
              id="pw"
              name="pw"
              value={formData.pw}
              onChange={handleChange}
              required
              maxLength={10}
            />
            <span>{errors.pw}</span>
          </PwContainer>

          <ButtonContainer>
            <CheckButton type="submit">회원가입</CheckButton>
            <CheckButton type="button" onClick={handleBack}>
              돌아가기
            </CheckButton>
          </ButtonContainer>
        </form>
      </Container>
    </MainContainer>
  );
}

export default RegisterPage;
