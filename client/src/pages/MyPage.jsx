import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ProfileContainer = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 20px;
  height: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
`;

const Imgdiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  margin-right: 20px;
  background-color: #ccc;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 1em;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
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

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const MyPage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

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
        setUser(response.data);
        setNickname(response.data.nickname);
      } catch (err) {
        setError("Failed to fetch user profile");
        console.error(err);
      }
    };

    fetchUserProfile();
  }, []);

  const handleNicknameChange = (e) => setNickname(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      alert("Profile updated successfully");
      setIsEditing(false);
      setPassword("");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleDeleteAccount = async () => {
    if (!window.confirm("정말로 회원탈퇴를 하시겠습니까?")) {
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
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

  return (
    <>
      <Navbar />
      <Container>
        <h2>My Page</h2>
        <ProfileContainer>
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div>
                <Label>Email:</Label>
                <Input type="text" value={user.email} disabled />
              </div>
              <div>
                <Label>
                  닉네임:
                  <Input
                    type="text"
                    value={nickname}
                    onChange={handleNicknameChange}
                  />
                </Label>
              </div>
              <div>
                <Label>
                  비밀번호:
                  <Input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </Label>
              </div>

              <Button type="submit">Save Changes</Button>
              <Button type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
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
              <Imgdiv>
                <img src={user.img || "/images/sesac.png"} alt="Profile" />
              </Imgdiv>
              <Infodiv>
                <ProfileItem>
                  <strong>이메일:</strong> {user.email}
                </ProfileItem>
                <ProfileItem>
                  <strong>닉네임:</strong> {user.nickname}
                </ProfileItem>
                <Buttondiv>
                  <Button onClick={() => setIsEditing(true)}>수정하기</Button>

                  <Button onClick={handleDeleteAccount}>탈퇴하기</Button>
                </Buttondiv>
              </Infodiv>
            </div>
          )}
        </ProfileContainer>
      </Container>
      <Footer />
    </>
  );
};

export default MyPage;