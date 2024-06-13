import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../main/Carousel.css";
import { Button } from "@mui/material";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import CreateStudyGroup from "./CreateStudyGroup";
import { FcNext, FcPrevious } from "react-icons/fc";
import axios from "axios";

const MakeButton = styled(Button)`
  && {
    height: 4rem;
    margin-top: 1rem;
    border-radius: 15px;
  }
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
  margin-bottom: 5vh;
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
const MyGroup = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [mystudyGroups, setMyStudyGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/api/study-group/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setMyStudyGroups(response.data);
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
        <SlickList>
          <Slider {...settings} style={{ border: "1px solid black" }}>
            {mystudyGroups.map((group) => (
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
                    <Link to={`/main/mystudygroup/${group.sgSeq}`}>
                      <CardButton>더보기</CardButton>
                    </Link>
                  </CardBottom>
                </Card>
              </div>
            ))}
          </Slider>
        </SlickList>
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
            backgroundColor: "#e5f2ff",
          },
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={() => setModalIsOpen(false)}>Close</Button>
        </div>
        <CreateStudyGroup
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
      </Modal>
    </>
  );
};

export default MyGroup;
