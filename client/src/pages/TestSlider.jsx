import React, { useState, useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background: #ededed;
    padding: 0 20px;
    margin: 0;
    font-family: 'Open Sans', Arial, sans-serif;
  }

  h1 {
    text-align: center;
    margin: 80px 0;
  }
`;

const NavContainer = styled.nav`
  position: relative;
`;

const Ul = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
`;

const Li = styled.li`
  &:not(:last-child) {
    margin-right: 20px;
  }
`;

const LinkItem = styled.a`
  display: block;
  font-size: 20px;
  color: black;
  text-decoration: none;
  padding: 7px 15px;
  opacity: ${(props) => (props.active ? "1" : "0.25")};
  transition: all 0.35s ease-in-out;
  position: relative;
`;

const Target = styled.span`
  display: block;
  border-bottom: 4px solid transparent;
  z-index: -1;
  transition: all 0.35s ease-in-out;
  position: relative; /* 상대적인 위치 */
`;

const colors = [
  "deepskyblue",
  "orange",
  "firebrick",
  "gold",
  "magenta",
  "black",
  "darkblue",
];

const TestSlider = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const targetRef = useRef();

  const handleMouseEnter = (index, event) => {
    setActiveIndex(index);
    const { width, height, left, top } = event.target.getBoundingClientRect();
    const color = colors[Math.floor(Math.random() * colors.length)];

    targetRef.current.style.width = `${width}px`;
    targetRef.current.style.height = `4px`; // Target height to match the underline size
    targetRef.current.style.left = `${left + window.pageXOffset}px`;
    targetRef.current.style.top = `${top + window.pageYOffset + height}px`; // Positioning just below the text
    targetRef.current.style.borderColor = color;
    targetRef.current.style.transform = "none";
  };

  const handleResize = () => {
    if (activeIndex !== null) {
      const activeLink = document.querySelectorAll(".mynav a")[activeIndex];
      const { width, height, left, top } = activeLink.getBoundingClientRect();
      targetRef.current.style.width = `${width}px`;
      targetRef.current.style.height = `4px`;
      targetRef.current.style.left = `${left + window.pageXOffset}px`;
      targetRef.current.style.top = `${top + window.pageYOffset + height}px`;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex]);

  return (
    <>
      <GlobalStyle />
      <h1>Hover over the links</h1>
      <NavContainer className="mynav">
        <Ul>
          {["Home", "About", "Company", "Work", "Clients", "Contact"].map(
            (text, index) => (
              <Li key={index}>
                <LinkItem
                  href="#"
                  active={activeIndex === index}
                  onMouseEnter={(e) => handleMouseEnter(index, e)}
                >
                  {text}
                </LinkItem>
              </Li>
            )
          )}
        </Ul>
        <Target ref={targetRef} className="target" />
      </NavContainer>
    </>
  );
};

export default TestSlider;
