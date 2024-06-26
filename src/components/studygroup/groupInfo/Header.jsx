import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import axios from "axios";

import UserImg from "../../user/UserImg";

const InfoContainer = styled.div`
  padding: 1rem;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ddd;
`;

const GoalsContainer = styled.div`
  padding: 1rem;
  background-color: #e0e0e0;
  text-align: center;
  border-bottom: 1px solid #ddd;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f8f8f8;
  border-bottom: 1px solid #ddd;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Title = styled.h1`
  margin: 0;
`;

const SetBtns = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 480px) {
    justify-content: flex-end;
    margin-left: auto;
  }
`;

const SettingsButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
`;

const ManagementModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: white;
  border: 1px solid #ddd;
  height: auto;
  margin: 5rem auto;
  width: 40vw;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
`;

const Section = styled.div`
  display: flex;

  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-left: -2rem;
  }
`;

const SectionHeader = styled.div`
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  width: 100%;
  text-align: center;
  padding: 0.5rem;
`;

const List = styled.div`
  width: 18vw;
  border: 1px solid #ddd;
  padding: 1rem;
  max-height: 14rem;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    max-height: none;
    width: 100%;
  }
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
`;

const InviteButton = styled.button`
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
`;

const RemoveButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
`;

const AuthorizeToBtn = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
`;

const customStyles = {
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem",
    backgroundColor: "white",
    border: "1px solid #ddd",
    width: "90%",
    maxWidth: "600px",
    height: "auto",
    margin: "5rem auto",
    overflowY: "auto",
    maxHeight: "50vh",
  },
};

const MemberDetailModal = styled(Modal)`
  ${customStyles.content}

  @media (max-width: 768px) {
    width: 90%;
    max-width: none;
    height: auto;
  }
`;

const CloseSetButton = styled.button`
  align-self: flex-end;
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
`;

const DetailTitle = styled.h1`
  margin-top: 0;
  margin-bottom: 2.5rem;
`;

const DetailContent = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  flex-direction: column;

  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

const DetailContainer = styled.div`
  margin-right: 5rem;
  text-align: center;

  @media (max-width: 768px) {
    text-align: left;
    margin-right: 1rem;
  }
`;

const DetailModalContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-left: 0;
  }
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  flex-direction: column;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-left: 0;
  }
`;

const Label = styled.label`
  width: 100%;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 0.5rem;
  }
`;

const CheckButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #64b5f6;
  color: white;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #1695fc;
  }

  @media (max-width: 768px) {
    margin-top: 0.5rem;
    margin-left: 0;
  }
`;

const DropButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #f85044;
  color: white;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #f92314;
  }

  @media (min-width: 768px) {
    width: 50%;
  }
`;
const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSetModalOpen, setIsSetModalOpen] = useState(false);
  const [studyGroups, setStudyGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupGoal, setGroupGoal] = useState("");
  const [whoAmI, setWhoAmI] = useState(false);
  const { sgSeq } = useParams();
  const [joinData, setJoinData] = useState([]);
  const [members, setMembers] = useState([]);
  const [uSeq, setUSeq] = useState(null);
  const [isGroupMember, setIsGroupMember] = useState(false);
  const [nickname, setNickname] = useState("");

  const [userImg, setUserImg] = useState(null);
  const [user, setUser] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

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
        setNickname(response.data.nickname);
        setUSeq(response.data.useq);
        setUser(response.data);
      } catch (err) {}
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/api/study-group`
        );

        const filteredData = response.data.filter(
          (item) => item.sgSeq.toString() === sgSeq
        );
        if (filteredData.length > 0) {
          setStudyGroups(filteredData[0]);
        } else {
          setStudyGroups(null);
        }
      } catch (error) {}
    };

    const RecruitmentStatus = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/api/study-group/status/${sgSeq}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {}
    };

    fetchData();
    RecruitmentStatus();
  }, [sgSeq]);

  useEffect(() => {
    const checkUserMembership = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/api/study-group/check-uSeq-me/${sgSeq}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setWhoAmI(response.data);
      } catch (error) {
        throw error;
      }
    };
    checkUserMembership();
  }, [sgSeq]);

  useEffect(() => {
    const joinData = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/api/join/${sgSeq}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        throw error;
      }
    };
    joinData();
  }, [sgSeq]);

  useEffect(() => {
    const joinData = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/api/join/${sgSeq}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setJoinData(response.data);
      } catch (error) {
        throw error;
      }
    };
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/api/group-members/${sgSeq}`
        );
        setMembers(response.data);
      } catch (error) {}
    };

    fetchMembers();
    joinData();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      const fetchMembers = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_SERVER}/api/group-members/${sgSeq}`
          );

          setMembers(response.data);
        } catch (error) {}
      };

      fetchMembers();
    }
  }, [isModalOpen, sgSeq]);

  useEffect(() => {
    if (members.find((member) => member.nickname === nickname)) {
      setIsGroupMember(true);
    }
  }, [members, nickname]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleAccept = async (jSeq, uSeq) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${process.env.REACT_APP_API_SERVER}/api/join/accept/${jSeq}`,
        {
          sgSeq: sgSeq,
          uSeq: uSeq,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("수락완료!");
      window.location.reload();
    } catch (error) {}
  };

  const handleReject = async (jSeq, uSeq) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.delete(
        `${process.env.REACT_APP_API_SERVER}/api/join/reject/${jSeq}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("거절완료!");
      window.location.reload();
    } catch (error) {}
  };

  const handleAuthorize = async (newUSeq) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.patch(
        `${process.env.REACT_APP_API_SERVER}/api/study-group/change-uSeq`,
        {
          sgSeq: sgSeq,
          newUSeq: newUSeq,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("그룹장이 위임되었습니다.");
      window.location.reload();
    } catch (error) {}
  };

  const handleKick = async (kickUSeq) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.delete(
        `${process.env.REACT_APP_API_SERVER}/api/group-members/kick`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            sgSeq: sgSeq,
            uSeq: kickUSeq,
          },
        }
      );
      alert("그룹원이 강퇴되었습니다.");

      window.location.reload();
    } catch (error) {}
  };

  const closeModal = () => setIsModalOpen(false);

  const openSetModal = () => setIsSetModalOpen(true);
  const closeSetModal = () => setIsSetModalOpen(false);

  const handleGroupNameChange = (e) => setGroupName(e.target.value);
  const handleGroupGoalChange = (e) => setGroupGoal(e.target.value);

  const handleGroupNameUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("accessToken");
      const checkResponse = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/api/study-group/check-name`,
        {
          params: { name: groupName },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (checkResponse.data) {
        alert("이미 사용 중인 그룹 이름입니다. 다른 이름을 입력해주세요.");
        return;
      }
      await axios.patch(
        `${process.env.REACT_APP_API_SERVER}/api/study-group/name`,
        {
          name: groupName,
          sgSeq: sgSeq,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("그룹 이름이 수정되었습니다.");
      window.location.reload();
    } catch (error) {
      alert("그룹 이름 수정에 실패했습니다.");
    }
  };

  const handleGroupGoalUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_SERVER}/api/study-group/goal`,
        {
          goal: groupGoal,
          sgSeq: sgSeq,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("그룹 목표가 수정되었습니다.");
      window.location.reload();
    } catch (error) {}
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_SERVER}/api/join`,
        {
          sgSeq: sgSeq,
          useq: uSeq,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("신청완료!");
    } catch (error) {
      alert("신청하기에 실패했습니다.");
    }
  };

  const QuitGruop = async (e) => {
    e.preventDefault();
    if (whoAmI) {
      alert("그룹장 위임을 먼저 해주세요!");
      return;
    }
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_SERVER}/api/group-members`,
        {
          sgSeq: sgSeq,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("탈퇴완료");
    } catch (error) {
      alert("탈퇴 실패했습니다.");
    }
  };

  return (
    <>
      <HeaderContainer>
        <Title>{studyGroups.name}</Title>
        <SetBtns>
          {whoAmI ? (
            <>
              <SettingsButton onClick={openModal}>관리</SettingsButton>
              <SettingsButton onClick={openSetModal}>설정</SettingsButton>
            </>
          ) : isGroupMember ? (
            <SettingsButton onClick={openSetModal}>설정</SettingsButton>
          ) : (
            <SettingsButton onClick={handleJoin} disabled={isSubmitting}>
              {isSubmitting ? "신청완료" : "신청하기"}
            </SettingsButton>
          )}
        </SetBtns>
      </HeaderContainer>

      <ManagementModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Management Modal"
      >
        <CloseButton onClick={closeModal}>X</CloseButton>
        <h1>스터디그룹 관리</h1>
        <Section>
          <List>
            <SectionHeader>신청현황 {joinData?.length}</SectionHeader>
            {joinData &&
              joinData?.map((item, index) => (
                <ListItem key={index}>
                  <div>
                    <strong>{item.nickname}</strong>
                  </div>
                  <InviteButton
                    onClick={() =>
                      handleAccept(item.joinRequest.jseq, item.joinRequest.useq)
                    }
                  >
                    수락
                  </InviteButton>
                  <RemoveButton
                    onClick={() =>
                      handleReject(item.joinRequest.jseq, item.joinRequest.useq)
                    }
                  >
                    거절
                  </RemoveButton>
                </ListItem>
              ))}
          </List>
          <List>
            <SectionHeader>그룹원 관리</SectionHeader>
            {members
              .filter((member) => member.useq !== uSeq)
              .map((item, index) => (
                <ListItem key={index}>
                  <div>{item.nickname}</div>

                  <div style={{ gap: "1rem" }}>
                    <AuthorizeToBtn
                      onClick={() => {
                        if (window.confirm("정말 위임하시겠습니까?")) {
                          handleAuthorize(item.useq);
                        }
                      }}
                    >
                      위임
                    </AuthorizeToBtn>
                    <RemoveButton
                      onClick={() => {
                        if (window.confirm("정말 강퇴하시겠습니까?")) {
                          handleKick(item.useq);
                        }
                      }}
                    >
                      강퇴
                    </RemoveButton>
                  </div>
                </ListItem>
              ))}
          </List>
        </Section>
      </ManagementModal>

      <MemberDetailModal
        isOpen={isSetModalOpen}
        onRequestClose={closeSetModal}
        contentLabel="Member Detail Modal"
      >
        <CloseSetButton onClick={closeSetModal}>X</CloseSetButton>
        <DetailTitle>내 정보</DetailTitle>
        <DetailModalContainer>
          <DetailContainer>
            <DetailContent>
              <UserImg userImg={userImg} />
            </DetailContent>
            가입일 : 2021-01-01
            <br />
            이메일 : sesac@trees.com
            <DropButton onClick={QuitGruop}>그룹 탈퇴</DropButton>
          </DetailContainer>
          <div>
            <br />
            {whoAmI && (
              <form style={{ overFlowY: "auto", maxHeight: "14rem" }}>
                <FormGroup>
                  <Label>그룹 이름</Label>

                  <Input
                    type="text"
                    value={groupName}
                    onChange={handleGroupNameChange}
                  />
                  <CheckButton type="submit" onClick={handleGroupNameUpdate}>
                    수정
                  </CheckButton>
                </FormGroup>

                <FormGroup>
                  <Label>팀 공동목표</Label>

                  <Input
                    type="text"
                    value={groupGoal}
                    onChange={handleGroupGoalChange}
                  />
                  <CheckButton type="submit" onClick={handleGroupGoalUpdate}>
                    수정
                  </CheckButton>
                </FormGroup>
              </form>
            )}
          </div>
        </DetailModalContainer>
      </MemberDetailModal>
      <InfoContainer>그룹원 {studyGroups.current}/15명</InfoContainer>
      <GoalsContainer>공동목표 : {studyGroups.goal}</GoalsContainer>
    </>
  );
};

export default Header;
