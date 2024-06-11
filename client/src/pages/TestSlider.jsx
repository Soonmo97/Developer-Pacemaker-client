import React, { useState } from "react";
import styled from "styled-components";
import { BsArrowLeftCircleFill } from "react-icons/bs";

const StyledCarousel = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 400px;
`;

const Slide = styled.img`
  border-radius: 0.5rem;
  box-shadow: 0px 0px 7px #666;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.isActive ? "block" : "none")};
`;

const Arrow = styled(BsArrowLeftCircleFill)`
  position: absolute;
  filter: drop-shadow(0px 0px 5px #555);
  width: 2rem;
  height: 2rem;
  color: white;
  cursor: pointer;
`;

const LeftArrow = styled(Arrow)`
  left: 1rem;
`;

const RightArrow = styled(Arrow)`
  right: 1rem;
  transform: rotate(180deg); // 화살표를 180도로 회전
`;

const Indicators = styled.span`
  display: flex;
  position: absolute;
  bottom: 1rem;
`;

const Indicator = styled.button`
  background-color: ${(props) => (props.isActive ? "white" : "grey")};
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 100%;
  border: none;
  outline: none;
  box-shadow: 0px 0px 5px #555;
  margin: 0 0.2rem;
  cursor: pointer;
`;

const TestSlider = () => {
  // 임시로 데이터 배열 생성
  const data = [
    { id: 1, title: "스터디1" },
    { id: 2, title: "스터디2" },
    { id: 3, title: "스터디3" },
    { id: 4, title: "스터디4" },
  ];

  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };

  return (
    <StyledCarousel>
      <LeftArrow onClick={prevSlide} />
      {[1, 2, 3, 4].map((item, idx) => (
        <Slide
          src={item.src}
          alt={item.alt}
          key={idx}
          isActive={slide === idx}
        />
      ))}
      <RightArrow onClick={nextSlide} />
      <Indicators>
        {[1, 2, 3, 4].map((_, idx) => (
          <Indicator
            key={idx}
            isActive={slide === idx}
            onClick={() => setSlide(idx)}
          />
        ))}
      </Indicators>
    </StyledCarousel>
  );
};

export default TestSlider;
