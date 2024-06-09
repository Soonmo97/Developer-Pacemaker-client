import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Main/Carousel.css";
import { Button } from "@mui/material";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MakeButton = styled(Button)`
  && {
    height: 4rem;
    margin-top: 1rem;
    border-radius: 15px;
  }
`;

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

const MyGroup = () => {
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>내 스터디 그룹</h1>{" "}
          <MakeButton variant="contained" color="primary">
            스터디 그룹 만들기
          </MakeButton>
        </div>
        <Slider {...settings}>
          {[1, 2, 3, 4].map((id) => (
            <div className="carousel-item" key={id}>
              <div className="card">
                <div className="card-top">스터디{id}</div>
                <div className="card-middle">
                  <Link to={`/main/mystudygroup/info/${id}`}>
                    <button className="card-button">더보기</button>
                  </Link>
                </div>
                <div className="card-bottom"></div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default MyGroup;
