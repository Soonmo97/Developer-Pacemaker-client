// src/components/StudyForm.js
import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
`;

const Subtitle = styled.h2`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  height: 150px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #28a745;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const StudyForm2 = () => {
  const [formData, setFormData] = useState({
    title: "",
    tags: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 폼 제출 로직을 여기에 추가
    console.log("Form submitted:", formData);
  };

  return (
    <FormContainer>
      <Title>제목에 핵심 내용을 요약해보세요.</Title>
      <Subtitle>태그를 설정하세요 (최대 10개)</Subtitle>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          placeholder="제목을 입력하세요"
          value={formData.title}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="tags"
          placeholder="태그를 입력하세요"
          value={formData.tags}
          onChange={handleChange}
        />
        <TextArea
          name="content"
          placeholder="[개발 스터디 모집 내용 예시]&#10;&#10;• 스터디 주제 :&#10;• 스터디 목표 :&#10;• 예상 스터디 일정(횟수) :&#10;• 예상 커리큘럼 간략히 :&#10;• 예상 모집인원 :&#10;• 스터디 소개와 개설 이유 :&#10;• 스터디 관련 주의사항 :&#10;• 스터디에 지원할 수 있는 방법을 남겨주세요. (이메일, 카카오 오픈채팅방, 구글폼 등.) :"
          value={formData.content}
          onChange={handleChange}
        />
        <Button type="submit">등록</Button>
      </form>
    </FormContainer>
  );
};

export default StudyForm2;
