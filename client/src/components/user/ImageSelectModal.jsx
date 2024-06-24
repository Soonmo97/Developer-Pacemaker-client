import React from "react";
import styled from "styled-components";

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
  text-align: center;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const ImageItem = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  cursor: pointer;
`;

const Button = styled.button`
  margin: 5px;
  padding: 10px;
  font-size: 1em;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;

  &:hover {
    background-color: #0056b3;
  }
`;

const ImageSelectModal = ({ isOpen, onClose, onSelect }) => {
  const handleImageClick = (imageNumber) => {
    onSelect(imageNumber);
  };

  return (
    <ModalContainer isOpen={isOpen}>
      <ModalContent>
        <h2>이미지 선택</h2>
        <ImageContainer>
          <ImageItem
            src="/images/default.png"
            alt="이미지 1"
            onClick={() => handleImageClick(null)}
          />
          <ImageItem
            src="/images/boy.jpg"
            alt="이미지 2"
            onClick={() => handleImageClick("1")}
          />
          <ImageItem
            src="/images/girl.jpg"
            alt="이미지 3"
            onClick={() => handleImageClick("2")}
          />
        </ImageContainer>
        <br />
        <Button onClick={onClose}>닫기</Button>
      </ModalContent>
    </ModalContainer>
  );
};

export default ImageSelectModal;
