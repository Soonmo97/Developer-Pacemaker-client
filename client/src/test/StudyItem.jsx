// src/components/StudyItem.js
import React from "react";
import styled from "styled-components";

const ItemContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h2`
  font-size: 18px;
  margin: 0;
`;

const Description = styled.p`
  font-size: 14px;
  color: #555;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #888;
`;

const Tags = styled.div`
  display: flex;
  gap: 5px;
`;

const Tag = styled.span`
  background-color: #dff0d8;
  color: #3c763d;
  padding: 3px 7px;
  border-radius: 5px;
`;

const StudyItem = ({ study }) => {
  return (
    <ItemContainer>
      <Title>{study.title}</Title>
      <Description>{study.description}</Description>
      <Footer>
        <span>
          {study.author} · {study.time}
        </span>
        <Tags>
          {study.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </Tags>
      </Footer>
    </ItemContainer>
  );
};

export default StudyItem;
