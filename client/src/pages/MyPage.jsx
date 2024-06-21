import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PasswordCheckModal from "../components/PasswordCheckModal";
import ImageSelectModal from "../components/user/ImageSelectModal";
import UserImg from "../components/user/UserImg";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
`;

const ProfileContainer = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 20px;
  height: 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f2ebdc;
  min-height: 62vh;
`;

const TitleDiv = styled.div`
  margin-top: 2%;
  margin-bottom: 3%;
`;

const NameDiv = styled.div`
  display: flex;
  align-items: center; /* 수직 정렬 */
  margin-bottom: 10px; /* 간격 조정 */
`;

const SuccessModal = styled.div`
  position: absolute; /* 위치를 절대값으로 설정 */
  top: 40%; /* 위에서 20% 지점에 위치하도록 설정 */
  left: 50%;
  transform: translate(-50%, -20%); /* 가운데 정렬을 위해 translate 사용 */
  width: 60%;
  max-width: 400px;
  margin: 0 auto; /* 가운데 정렬을 위해 margin auto 추가 */
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  z-index: 1000;

  @media (max-width: 768px) {
    width: 90%; /* Adjusted width for smaller screens */
    max-width: 300px; /* Adjusted max-width for smaller screens */
  }

  @media (min-width: 1024px) {
    width: 50%; /* Adjusted width for larger screens */
    max-width: 500px; /* Adjusted max-width for larger screens */
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const FirstDiv = styled.div`
  width: 70px;
`;
const Infodiv = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */
`;

const ProfileItem = styled.div`
  margin: 10px 0;
  font-size: 1.2em;
  color: #333;
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

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 1em;
  color: #fff;
  background-color: #2b3115;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 2%;

  &:hover {
    background-color: #2b3115;
  }
`;

const Buttondiv = styled.div`
  display: flex;
  gap: 10px;
`;

const Label = styled.label`
  @media (max-width: 768px) {
    font-size: 0.8em;
  }

  @media (min-width: 1024px) {
    font-size: 1em;
  }
`;

const ModalContainer = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background-color: white;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 400px;
  border-radius: 5px;
`;

const ImageList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;
const CheckButton = styled.button`
  padding: 8px 10px;
  margin-left: 5px;
  cursor: pointer;
  background-color: #2b3115;
  color: white;
  border: none;
  border-radius: 4px;

  @media (max-width: 768px) {
    font-size: 0.6em; /* 768px 이하에서 작은 텍스트 크기로 설정 */
    padding: 6px 8px; /* 작은 화면에서 버튼 패딩 조정 */
  }
`;
const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  color: #666;
`;
const ImageItem = styled.div`
  cursor: pointer;
`;

const images = [
  { id: 1, src: "/images/logo.png", alt: "기본 이미지" },
  { id: 2, src: "/images/sesac.png", alt: "이미지 1" },
  { id: 3, src: "/images/sesac.png", alt: "이미지 2" },
  { id: 4, src: "/images/sesac.png", alt: "이미지 3" },
];

const ProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ProfileDiv1 = styled.div`
  display: flex;
  justify-content: center;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SuccessMessageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MyPage = () => {
  const [formData, setFormData] = useState({
    nickname: "",
    pw: "",
  });
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordCheckModalOpen, setIsPasswordCheckModalOpen] =
    useState(false);
  const [isImageSelectModalOpen, setIsImageSelectModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [availabilityMessages, setAvailabilityMessages] = useState({
    nickname: "",
  });

  const [userImg, setUserImg] = useState(null);

  const [originalNickname, setOriginalNickname] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/api/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setUser(response.data);
        setNickname(response.data.nickname);
        setOriginalNickname(response.data.nickname);
      } catch (err) {
        setError("Failed to fetch user profile");
        console.error(err);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => setUserImg(user?.img ?? null), [user]);

  const handleNicknameChange = (e) => setNickname(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (availabilityMessages.nickname === "이미 사용 중인 닉네임 입니다.") {
      alert("닉네임을 변경해주세요.");
      return;
    }
    try {
      const token = localStorage.getItem("accessToken");

      if (nickname) {
        await axios.patch(
          `${process.env.REACT_APP_API_SERVER}/api/user/nickname`,
          { nickname },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      if (password) {
        await axios.patch(
          `${process.env.REACT_APP_API_SERVER}/api/user/password`,
          { pw: password },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      const updatedProfile = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/api/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(updatedProfile.data);
      setShowModal(true);
      // alert("변경성공");
      setIsEditing(false);
      setPassword("");
    } catch (err) {
      console.error(err);
      alert("변경실패");
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("정말로 회원탈퇴를 하시겠습니까?")) {
      return;
    }

    try {
      console.log("aa");
      const token = localStorage.getItem("accessToken");
      console.log("bb");
      // 그룹장인지 확인하는 API 호출
      const response = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/api/study-group/check-uSeq`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("cc");
      // response.data가 true이면 그룹장이므로 탈퇴 불가
      if (response.data === true) {
        alert(
          "회원탈퇴를 할 수 없습니다. 그룹장을 다른 사람에게 위임해주세요."
        );
        return;
      }

      // 그룹장이 아니면 탈퇴 진행9
      await axios.delete(`${process.env.REACT_APP_API_SERVER}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("accessToken");
      alert("회원탈퇴가 성공적으로 처리되었습니다.");
      window.location.href = "/"; // 탈퇴 후 로그인 페이지로 이동
    } catch (err) {
      console.error(err);
      alert("회원탈퇴에 실패했습니다.");
    }
  };

  const closeModalAndNavigate = () => {
    setShowModal(false);
    navigate("/mypage");
  };

  const handleOpenPasswordCheckModal = () => {
    setIsPasswordCheckModalOpen(true);
  };

  const handleClosePasswordCheckModal = () => {
    setIsPasswordCheckModalOpen(false);
  };

  const handlePasswordCheckSuccess = () => {
    setIsPasswordCheckModalOpen(false);
    setIsEditing(true);
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    handleNicknameChange(e);
    if (value === originalNickname) {
      setAvailabilityMessages({
        ...availabilityMessages,
        [name]: ``,
      });
      return;
    }

    if (name === "nickname") {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/api/user/check-${name}?${name}=${value}`
        );
        const isDuplicate = response.data; // 서버에서 반환한 중복 여부 값 사용

        if (isDuplicate) {
          setAvailabilityMessages({
            ...availabilityMessages,
            [name]: `이미 사용 중인 닉네임 입니다.`,
          });
        } else {
          setAvailabilityMessages({
            ...availabilityMessages,
            [name]: `사용 가능한 닉네임 입니다.`,
          });
        }
      } catch (error) {
        console.error(`Error checking ${name} availability:`, error);
      }
    }
  };

  const handleImageChangeClick = () => setIsImageSelectModalOpen(true);

  const handleImageSelect = async (imageNumber) => {
    console.log(`선택된 이미지 번호: ${imageNumber}`);

    try {
      const token = localStorage.getItem("accessToken");
      await axios.patch(
        `${process.env.REACT_APP_API_SERVER}/api/user/img`,
        { img: imageNumber },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserImg(imageNumber);
      // 이미지 변경 성공 시 사용자 상태 업데이트 등 추가 작업 가능
      setIsImageSelectModalOpen(false);
      // alert("프로필 이미지가 성공적으로 변경되었습니다.");
    } catch (error) {
      console.error("프로필 이미지 변경 실패:", error);
      alert("프로필 이미지 변경에 실패했습니다.");
    }
  };
  const handleImageModalClose = () => setIsImageSelectModalOpen(false);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Container>
        <TitleDiv>
          <h2>내 정보</h2>
        </TitleDiv>
        <ProfileContainer>
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <ProfileDiv>
                <UserImg userImg={userImg} />

                <Button type="button" onClick={handleImageChangeClick}>
                  이미지 변경
                </Button>
              </ProfileDiv>
              <NameDiv>
                <FirstDiv>
                  <Label>이메일:</Label>
                </FirstDiv>
                <div>
                  {" "}
                  <Input type="text" value={user.email} disabled />
                </div>
              </NameDiv>
              <NameDiv>
                <FirstDiv>
                  <Label>닉네임: </Label>
                </FirstDiv>
                <Input
                  type="text"
                  name="nickname"
                  value={nickname}
                  onChange={handleChange}
                />
                <Span>{availabilityMessages.nickname}</Span>
              </NameDiv>
              <NameDiv>
                <FirstDiv>
                  <Label>비밀번호: </Label>
                </FirstDiv>
                <Input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </NameDiv>
              <ProfileDiv1>
                <Button type="submit">저장하기</Button>
                <Button type="button" onClick={() => setIsEditing(false)}>
                  취소하기
                </Button>
              </ProfileDiv1>
            </form>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <UserImg userImg={userImg} />

              <Infodiv>
                <ProfileItem>
                  <strong>이메일:</strong> {user.email}
                </ProfileItem>
                <ProfileItem>
                  <strong>닉네임:</strong> {user.nickname}
                </ProfileItem>
                <Buttondiv>
                  <Button onClick={handleOpenPasswordCheckModal}>
                    수정하기
                  </Button>
                  <Button onClick={handleDeleteAccount}>탈퇴하기</Button>
                </Buttondiv>
              </Infodiv>
            </div>
          )}
        </ProfileContainer>

        {showModal && (
          <SuccessModal>
            <ModalHeader>
              <p></p>
              <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
            </ModalHeader>
            <SuccessMessageContainer>
              <p>회원 정보 수정 완료!</p>
              <CheckButton onClick={closeModalAndNavigate}>확인</CheckButton>
            </SuccessMessageContainer>
          </SuccessModal>
        )}

        <PasswordCheckModal
          isOpen={isPasswordCheckModalOpen}
          onClose={handleClosePasswordCheckModal}
          onSuccess={handlePasswordCheckSuccess}
        />

        <ImageSelectModal
          isOpen={isImageSelectModalOpen}
          onClose={handleImageModalClose}
          onSelect={handleImageSelect}
        />
      </Container>
      <Footer />
    </>
  );
};

export default MyPage;
