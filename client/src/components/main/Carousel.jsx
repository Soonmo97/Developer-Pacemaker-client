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


const Div = styled.div`
  /* background-color: yellow; */
`;
const SlickList = styled.div`
  border: "1px solid black";

  .slick-list {
    margin-left: 5%;
    padding: 1rem;
    /* width: 100%; */
  }
`;

const Card = styled.div`
  width: 10vw;
  height: 30vh;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #eee;
  margin-top: 5vh;
  margin-bottom: 2vh;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardTop = styled.div`
  height: 5vh;
  background-color: #ddd;
`;

const CardBottom = styled.div`
  height: 5vh;
  background-color: #ddd;
`;

const CardMiddle = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardButton = styled.button`
  padding: 1vh 1vw;
  border: none;
  background-color: #fff;
  cursor: pointer;
  text-align: center;

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

const Carousel = () => {
  const [studyGroups, setStudyGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/api/study-group`
        );
        console.log(response.data);
        setStudyGroups(response.data);
      } catch (error) {
        console.error("스터디 그룹 데이터를 불러오는데 실패했습니다:", error);
      }
    };

    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <>
      <div>

        <div className="carousel" style={{ marginBottom: "5rem" }}>
          <h2>추천 스터디</h2>
          <SlickList>
            <Slider {...settings} style={{ border: "1px solid black" }}>
              {studyGroups.map((group) => (
                <div className="carousel-item" key={group.sgSeq}>
                  <Card>
                    <CardTop
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {group.name}
                    </CardTop>
                    <CardMiddle></CardMiddle>
                    <CardBottom
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <Link to={`/main/studygroupinfo/${group.sgSeq}`}>
                        <CardButton>더보기</CardButton>
                      </Link>
                    </CardBottom>
                  </Card>
                </div>
              ))}
            </Slider>
          </SlickList>
        </div>
        <ThemeProvider theme={theme}>
          <UserCalendar />
        </ThemeProvider>

      </div>
    </>
  );
};

export default Carousel;
