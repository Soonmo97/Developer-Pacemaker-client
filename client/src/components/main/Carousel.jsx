import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";
import UserCalendar from "../userplanner/UserCalendar";
import { ThemeProvider } from "styled-components";
import { Link } from "react-router-dom";
import { FcNext, FcPrevious } from "react-icons/fc"; // FcPrevious 아이콘 import

const theme = {
  blue_1: "#0260f8",
  primary_2: "#fa9805",
  primary_3: "#ffaa0c",
  yellow_2: "#f9e8c3",
  br_2: "#666666",
};

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
        <div className="carousel">
          <h2>추천 스터디</h2>
          <Slider {...settings}>
            {[1, 2, 3, 4].map((id) => (
              <div className="carousel-item" key={id}>
                <div className="card">
                  <div className="card-top">스터디{id}</div>
                  <div className="card-middle">
                    <Link to={`studygroupinfo/${id}`}>
                      <button className="card-button">더보기</button>
                    </Link>
                  </div>
                  <div className="card-bottom"></div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <ThemeProvider theme={theme}>
          <UserCalendar />
        </ThemeProvider>
      </div>
    </>
  );
};

export default Carousel;
