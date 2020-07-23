import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FiMap } from "react-icons/fi";
import { FaListUl } from "react-icons/fa";

export default function FloatingButton(props) {
  const [counter, changeCounter] = useState(0);
  const dispatch = useDispatch();
  const footerRef = useRef();
  const { windowInfo, showMap } = useSelector((state) => state);

  const flipCounter = () => {
    dispatch({ type: "toggleMap" });
    if (counter === 1) changeCounter(0);
    else changeCounter(1);
  };

  return (
    <Container
      bottom={windowInfo.footerHeight}
      onClick={() => flipCounter(1)}
      ref={footerRef}
    >
      <div>{!showMap ? props.text[0] : props.text[1]}</div>
      <div>{!showMap ? <FiMap /> : <FaListUl />}</div>
    </Container>
  );
}

const Container = styled.div`
  z-index: 999;
  > div {
    padding: 0 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  position: fixed;
  grid-template-columns: 1fr 1fr;
  transition: bottom 1s ease-in-out;
  bottom: ${(props) => `${props.bottom}px`};
  left: 50%;
  transform: translate(-50%, 40%);
  background: white;
  display: flex;
  border-radius: 40px;
  border: #2222 solid 1px;
  padding: 1rem;
  box-shadow: 2px 4px #2222;
`;
