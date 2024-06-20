import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import axios from "axios";

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
`;

const Title = styled.h1`
  margin: 0;
`;

const SetBtns = styled.div`
  display: flex;
  gap: 1rem;
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
  width: 40%;
  height: 50%;
  margin: 5rem auto;
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
  justify-content: space-between;
  width: 100%;
  margin: 2.5rem 0;
`;

const SectionHeader = styled.div`
  font-weight: bold;
  border-bottom: 1px solid #ddd;
  width: 100%;
  text-align: center;
  padding: 0.5rem;
`;

const List = styled.div`
  width: 45%;
  border: 1px solid #ddd;
  padding: 1rem;
  max-height: 14rem;
  overflow-y: auto;
  overflow-x: hidden;
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

const MemberDetailModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: white;
  border: 1px solid #ddd;
  width: 45%;
  height: 50%;
  margin: 5rem auto;
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
  /* display: flex;
  align-items: center;
  margin: 1rem 0; */
`;

const DetailContainer = styled.div`
  /* margin-right: 5rem; */
`;

const DetailModalContainer = styled.div`
  display: flex;
  margin-left: 5rem;
`;

const ProfilePhoto = styled.div`
  width: 6rem;
  height: 6em;
  border-radius: 50%;
  background-color: #ccc;
  margin-right: 1rem;
`;

const ActionButton = styled.button`
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 0.5rem 0.7rem;
  border-radius: 25px;
  margin-left: 1rem;
  /* margin-right: 2rem; */
  cursor: pointer;
`;

const FormGroup = styled.div`
  /* display: flex;
  align-items: center;
  margin-bottom: 1rem; */
`;

const Label = styled.label`
  width: 5vw;
  /* margin-right: 3rem; */
`;

const Input = styled.input`
  /* flex: 1; */
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const CheckButton = styled.button`
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #64b5f6;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #1695fc;
  }
`;

const DropButton = styled.button`
  width: 50%;
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
  // const [jSeq, setJSeq] = useState();
  const [uSeq, setUSeq] = useState(null);
  const [isGroupMember, setIsGroupMember] = useState(false);
  const [nickname, setNickname] = useState("");

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
        console.log("response.data", response.data);
        console.log("response.data.nickname", response.data.nickname);
        console.log("response.data.useq", response.data.useq);
        setNickname(response.data.nickname);
        setUSeq(response.data.useq);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/api/study-group`
        );

        console.log(">>:", response.data);
        const filteredData = response.data.filter(
          (item) => item.sgSeq.toString() === sgSeq
        );
        if (filteredData.length > 0) {
          setStudyGroups(filteredData[0]);
        } else {
          setStudyGroups(null);
        }
      } catch (error) {
        console.error("스터디 그룹 데이터를 불러오는데 실패했습니다:", error);
      }
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
        console.log("모집여부 데이터:", response.data);
      } catch (error) {
        console.error("모집 여부 데이터를 불러오는데 실패했습니다:", error);
      }
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
        console.error("그룹장 확인에 실패했습니다:", error);
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

        console.log(response.data);
      } catch (error) {
        console.error("가입신청 데이터를 받아오지 못했습니다.:", error);
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

        console.log("신청 데이터 :", response.data);
        setJoinData(response.data);
        // if (response.data) {
        //   const foundItem = response.data.find(
        //     (item) => item.nickname ===
        //   );
        //   const jseqValue = foundItem?.joinRequest.jseq;
        //   const uSeqValue = foundItem?.joinRequest.useq;
        //   console.log("abcd ", foundItem);
        //   setJSeq(jseqValue);
        //   setUSeq(uSeqValue);
        //   console.log("jSeq:", jSeq);
        // }
      } catch (error) {
        console.error("가입신청 데이터를 받아오지 못했습니다.:", error);
        throw error;
      }
    };
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/api/group-members/${sgSeq}`
        );
        console.log("members", response.data);
        setMembers(response.data);
      } catch (error) {
        console.error("Failed to fetch members", error);
      }
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
          console.log("모달 오픈 안에서 members", response.data);
          setMembers(response.data);
        } catch (error) {
          console.error("Failed to fetch members", error);
        }
      };

      fetchMembers();
    }
  }, [isModalOpen, sgSeq]);

  useEffect(() => {
    if (members.find((member) => member.nickname === nickname)) {
      setIsGroupMember(true);
    }
  }, [members, nickname]);

  // console.log(`post 데이터: seSeq는 ${sgSeq}, useq는 ${uSeq}`);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleAccept = async (jSeq, uSeq) => {
    try {
      const token = localStorage.getItem("accessToken");
      console.log("dddd", jSeq);
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
      console.log("수락성공!", response.data);
      alert("수락완료!");
      window.location.reload();
    } catch (error) {
      console.error("Failed to fetch members", error);
    }
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
      console.log(`그룹장 위임 성공! sgSeq: ${sgSeq}, newUSeq: ${newUSeq}`);
      alert("그룹장이 위임되었습니다.");
      window.location.reload();
    } catch (error) {
      console.error("그룹장 위임에 실패했습니다:", error);
    }
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

      // 그룹 이름 중복 확인
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

      // 그룹 이름 수정
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
      // setGroupName(updateGroupName.data);
    } catch (error) {
      console.error("그룹 이름 수정에 실패했습니다:", error);
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
    } catch (error) {
      console.error("그룹 목표 수정에 실패했습니다:", error);
    }
  };

  const handleJoin = async (e) => {
    e.preventDefault();
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
      console.log(response.data);
      console.log("신청완료!");
      alert("신청완료");
    } catch (error) {
      console.error("신청하기에 실패했습니다:", error);
      alert("신청하기에 실패했습니다.");
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
            <SettingsButton onClick={handleJoin}>신청하기</SettingsButton>
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
                    <strong>{item.nickname}</strong>님
                  </div>
                  <div>스터디 그룹 신청합니다!</div>
                  <InviteButton
                    onClick={() =>
                      handleAccept(item.joinRequest.jseq, item.joinRequest.useq)
                    }
                  >
                    수락
                  </InviteButton>
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
                    <RemoveButton>강퇴</RemoveButton>
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
              <ProfilePhoto />
              프로필사진
              <ActionButton>변경</ActionButton>
            </DetailContent>
            가입일 : 2021-01-01
            <br />
            이메일 : sesac@trees.com
            <DropButton type="submit">그룹 탈퇴</DropButton>
          </DetailContainer>
          <div>
            <br />
            {whoAmI && (
              <form>
                <FormGroup>
                  <Label>그룹 이름</Label>
                  <br />
                  <Input
                    type="text"
                    value={groupName}
                    onChange={handleGroupNameChange}
                  />
                  <CheckButton type="submit" onClick={handleGroupNameUpdate}>
                    수정
                  </CheckButton>
                </FormGroup>
                <div>
                  <br />
                </div>
                <FormGroup>
                  <Label>팀 공동목표</Label>
                  <br />
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
