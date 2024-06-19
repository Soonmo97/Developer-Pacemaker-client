import styled from "styled-components";
const ImgEditdiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  margin-right: 20px;
  background-color: #ccc;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 3%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function UserImg({ userImg }) {
  return (
    <ImgEditdiv>
      {userImg === null && <img src="/images/default.png" alt="기본 이미지" />}
      {userImg === "1" && <img src="/images/boy.jpg" alt="이미지 1" />}
      {userImg === "2" && <img src="/images/girl.jpg" alt="이미지 2" />}
    </ImgEditdiv>
  );
}
