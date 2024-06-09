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
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
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

const CheckButton = styled.button`
  padding: 7px 10px;
  margin-top: 3px;
  margin-left: 5px;
  cursor: pointer;
  background-color: #00154b;
  color: white;
  border: none;
  border-radius: 4px;
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
      } catch (err) {
        setError("Failed to fetch user profile");
        console.error(err);
      }
    };

    fetchUserProfile();
  }, []);

  const handleNicknameChange = (e) => setNickname(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleCheckNickname = () => {
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const updateData = {};
      if (nickname !== "") {
        // 빈 문자열인 경우에는 추가하지 않음
        updateData.newNickname = nickname;
      }
      if (password !== "") {
        // 빈 문자열인 경우에는 추가하지 않음
        updateData.newPw = password;
      }
      const response = await axios.patch(
        `${process.env.REACT_APP_API_SERVER}/api/user/nickname`,
        { newNickname: nickname },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (password) {
        await axios.patch(
          `${process.env.REACT_APP_API_SERVER}/api/user/password`,
          { newPw: password },
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
      // 빈 값을 저장했을 경우, 원래 정보로 대체
      setNickname(
        updatedProfile.data.nickname
          ? JSON.parse(updatedProfile.data.nickname).newNickname
          : user.nickname
      );
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
            <>
              <ProfileItem>
                <strong>Email:</strong> {user.email}
              </ProfileItem>
              <ProfileItem>
                <strong>Nickname:</strong> {user.nickname}
              </ProfileItem>
              <Button onClick={() => setIsEditing(true)}>수정하기</Button>
            </>
          )}
        </ProfileContainer>
      </Container>
      <Footer />
    </>
  );
};

export default MyPage;
