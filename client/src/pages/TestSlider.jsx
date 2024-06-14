import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FcNext, FcPrevious } from "react-icons/fc";

const CarouselWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 40px 0;
`;

const SlideItem = styled.div`
  background: white;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
`;

const SlideContent = styled.div`
  padding: 10px;
`;

const SlideTitle = styled.h3`
  font-size: 18px;
  margin: 10px 0;
`;

const SlideDescription = styled.p`
  font-size: 14px;
  color: #666;
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
const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const slidesData = [
    {
      id: 1,
      image: "path/to/image1.jpg",
      title: "Slide 1 Title",
      description: "Slide 1 Description",
    },
    {
      id: 2,
      image: "path/to/image2.jpg",
      title: "Slide 2 Title",
      description: "Slide 2 Description",
    },
    {
      id: 3,
      image: "path/to/image3.jpg",
      title: "Slide 3 Title",
      description: "Slide 3 Description",
    },
    {
      id: 4,
      image: "path/to/image4.jpg",
      title: "Slide 4 Title",
      description: "Slide 4 Description",
    },
  ];

  return (
    <CarouselWrapper>
      <Slider {...settings}>
        {slidesData.map((slide) => (
          <SlideItem key={slide.id}>
            <SlideImage src={slide.image} alt={slide.title} />
            <SlideContent>
              <SlideTitle>{slide.title}</SlideTitle>
              <SlideDescription> 더보기</SlideDescription>
            </SlideContent>
          </SlideItem>
        ))}
      </Slider>
    </CarouselWrapper>
  );
};

export default SliderComponent;
