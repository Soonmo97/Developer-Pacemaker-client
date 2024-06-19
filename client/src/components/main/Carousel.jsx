import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";
import UserCalendar from "../userplanner/UserCalendar";
import { ThemeProvider } from "styled-components";
import { Link } from "react-router-dom";

import { FcNext, FcPrevious } from "react-icons/fc";
import styled from "styled-components";
import axios from "axios";

const theme = {
  blue_1: "#0260f8",
  primary_2: "#fa9805",
  primary_3: "#ffaa0c",
  yellow_2: "#f9e8c3",
  br_2: "#666666",
};

const CardButton = styled.button`
  padding: 1vh 1vw;
  border: none;
  background-color: #fff;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #007bff;
    color: #fff;
  }
`;

const CarouselWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 1rem 0;
`;

const SlideItem = styled.div`
  background: white;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const SlideImage = styled.img`
  width: 100%;
  height: 13rem;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
`;

const SlideContent = styled.div`
  padding: 10px;
`;

const SlideTitle = styled.h3`
  margin: 1rem 0;
`;

const SlideDescription = styled.p`
  /* font-size: 14px; */
  /* color: #666; */
`;

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <FcPrevious
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <FcNext
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
};

const SliderWrapper = styled(Slider)`
  .slick-track {
    margin-bottom: 2rem;
  }
`;

const Carousel = () => {
  const [studyGroups, setStudyGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/api/study-group/openAll`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("추천스터디 :", response.data);
        setStudyGroups(response.data);
      } catch (error) {
        console.error("스터디 그룹 데이터를 불러오는데 실패했습니다:", error);
      }
    };

    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200, // 1200px 이하
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 992, // 992px 이하
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // 768px 이하
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // 480px 이하
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div>
        <div className="carousel" style={{ marginBottom: "5rem" }}>
          <h1>추천 스터디</h1>
          <CarouselWrapper>
            <SliderWrapper {...settings}>
              {studyGroups.map((group) => (
                <SlideItem key={group.sgSeq}>
                  <SlideImage
                    src="https://www.korea.kr/newsWeb/resources/temp/images/000043/img_02.jpg"
                    alt=""
                  />
                  <SlideContent>
                    <SlideTitle>{group.name}</SlideTitle>
                    <SlideDescription>
                      <Link to={`/main/mystudygroup/${group.sgSeq}`}>
                        <CardButton>더보기</CardButton>
                      </Link>
                    </SlideDescription>
                  </SlideContent>
                </SlideItem>
              ))}
            </SliderWrapper>
          </CarouselWrapper>
        </div>
        <ThemeProvider theme={theme}>
          <UserCalendar />
        </ThemeProvider>
      </div>
    </>
  );
};

export default Carousel;
