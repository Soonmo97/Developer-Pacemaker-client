import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

    @media (max-width: 480px) {
      width: 45vw;
      margin-left: auto;
    }
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Container = styled.div`
  min-height: 64vh;

  @media (max-width: 480px) {
    min-height: 40vh;
  }
`;

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
  width: 65%;
  margin: 0 auto;
  padding: 1rem 0;
`;

const SlideItem = styled.div`
  background: white;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 30vh;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const SlideImage = styled.img`
  width: 100%;
  height: 15vh;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
  margin-bottom: 1rem;
`;

const SlideContent = styled.div`
  padding: 10px;
  height: 5vh;
`;

const SlideTitle = styled.h3`
  margin: -0.5rem 0;
`;

const SlideDescription = styled.p``;

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

const CarouselTitle = styled.h1`
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const MyGroup = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [myStudyGroups, setMyStudyGroups] = useState([]);
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    const fetchGroupList = async () => {
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
        setGroupList(response.data);
      } catch (error) {}
    };

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/api/study-group/leader-groups`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        fetchGroupList();
        setMyStudyGroups(response.data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  const difference = groupList.filter(
    (item2) => !myStudyGroups.some((item1) => item1.sgSeq === item2.sgSeq)
  );

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
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="carousel">
        <TitleContainer>
          <div>
            <h1>내 스터디 그룹</h1>
          </div>
          <MakeButton
            variant="contained"
            color="primary"
            onClick={() => setModalIsOpen(true)}
          >
            스터디 그룹 만들기
          </MakeButton>
        </TitleContainer>

        <CarouselWrapper>
          <CarouselTitle>내가 그룹장인 그룹</CarouselTitle>
          <SliderWrapper {...settings}>
            {myStudyGroups.map((group) => (
              <SlideItem key={group.sgSeq}>
                <SlideImage
                  src="https://images.velog.io/images/kshired/post/d8a48a1f-4106-480f-8307-d20eae1f9486/image.png"
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
      <br />
      <Container>
        <CarouselWrapper>
          <CarouselTitle>내가 그룹원인 그룹</CarouselTitle>
          <SliderWrapper {...settings}>
            {difference.map((group) => (
              <SlideItem key={group.sgSeq}>
                <SlideImage
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFli9XwcQWaJjbLRAYfPfctxO1j8_INSuyihTE7AatXGWmdaHpMT_DrvkfKB5lIlVlfFg&usqp=CAU"
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
      </Container>
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
