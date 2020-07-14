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
  const [visible, changeVisible] = useState(null);

  const flipCounter = () => {
    dispatch({ type: "toggleMap" });
    if (counter === 1) changeCounter(0);
    else changeCounter(1);
  };

  return (
    <Container visible={visible} onClick={() => flipCounter(1)} ref={footerRef}>
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
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  display: flex;
  border-radius: 40px;
  border: #2222 solid 1px;
  padding: 1rem;
  box-shadow: 2px 4px #2222;
`;
