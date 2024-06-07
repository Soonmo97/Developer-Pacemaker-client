import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";
import UserCalendar from "./UserCalendar";
import { ThemeProvider } from "styled-components";

const theme = {
  // gray_1: "#0260f8",
  red_1: "#FF0000",
  blue_1: "#0260f8",
  primary_2: "#fa9805",
  primary_3: "#ffaa0c",
  yellow_2: "#f9e8c3",
  br_2: "#666666",
  // 추가적인 테마 값들...
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        backgroundColor: "black",
      }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", backgroundColor: "black" }}
      onClick={onClick}
    />
  );
};

const Carousel = () => {
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
      <div className="carousel">
        <h2>추천 스터디</h2>
        <Slider {...settings}>
          <div className="carousel-item">
            <div className="card">
              <div className="card-top">스터디1</div>
              <div className="card-middle">
                <button className="card-button">더보기</button>
              </div>
              <div className="card-bottom"></div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="card">
              <div className="card-top">스터디2</div>
              <div className="card-middle">
                <button className="card-button">더보기</button>
              </div>
              <div className="card-bottom"></div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="card">
              <div className="card-top">스터디3</div>
              <div className="card-middle">
                <button className="card-button">더보기</button>
              </div>
              <div className="card-bottom"></div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="card">
              <div className="card-top">스터디4</div>
              <div className="card-middle">
                <button className="card-button">더보기</button>
              </div>
              <div className="card-bottom"></div>
            </div>
          </div>
        </Slider>
      </div>
      <ThemeProvider theme={theme}>
        <UserCalendar />
      </ThemeProvider>
    </>
  );
};

export default Carousel;
