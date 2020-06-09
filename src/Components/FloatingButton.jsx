import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FiMap } from "react-icons/fi";
import { FaListUl } from "react-icons/fa";

export default function FloatingButton(props) {
  const [counter, changeCounter] = useState(0);
  const dispatch = useDispatch();
  const footerRef = useRef();
  const visible = useSelector((state) => state.showFloating);
  useEffect(() => {
    const elementHeight = footerRef.current.offsetHeight * 2;
    /*     window.addEventListener("scroll", () => {
      const visible =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - elementHeight;
      console.log(visible);
    }); */
  }, []);

  const flipCounter = () => {
    dispatch({ type: "toggleMap" });
    if (counter === 1) changeCounter(0);
    else changeCounter(1);
  };
  return (
    <Container visible={visible} onClick={() => flipCounter(1)} ref={footerRef}>
      <div>{props.text[counter]}</div>
      <div>{counter === 0 ? <FiMap /> : <FaListUl />}</div>
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
  display: ${(props) => (props.visible ? "grid" : "none")};
  grid-template-columns: 1fr 1fr;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 20px;
  border: #2222 solid 1px;
  padding: 0.5rem;
  box-shadow: 2px 4px #2222;
`;
