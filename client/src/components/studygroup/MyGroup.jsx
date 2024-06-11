import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../main/Carousel.css";
import { Button } from "@mui/material";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import CreateStudyGroup from "./CreateStudyGroup";

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
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
          <h1>내 스터디 그룹</h1>
          <MakeButton
            variant="contained"
            color="primary"
            onClick={() => setModalIsOpen(true)}
          >
            스터디 그룹 만들기
          </MakeButton>
        </div>
        <Slider {...settings}>
          {[1, 2, 3, 4].map((id) => (
            <div className="carousel-item" key={id}>
              <div className="card">
                <div className="card-top">스터디{id}</div>
                <div className="card-middle">
                  <Link to={`info/${id}`}>
                    <button className="card-button">더보기</button>
                  </Link>
                </div>
                <div className="card-bottom"></div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={() => setModalIsOpen(false)}>Close</Button>
        </div>
        <CreateStudyGroup />
      </Modal>
    </>
  );
};

export default MyGroup;
