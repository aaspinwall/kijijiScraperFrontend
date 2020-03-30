import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";

export default function ResultMini() {
  const dispatch = useDispatch();
  const focusedElement = useSelector(state => {
    return state.filteredSearch[state.miniResult.index];
  });

  useEffect(() => {
    console.log(focusedElement);
  }, []);
  const close = e => {
    dispatch({ type: "toggleMini", payload: { show: false, index: 0 } });
  };
  return (
    <Container>
      <div className='close' onClick={close}>
        <AiOutlineClose />
      </div>
      <div className='title'>{focusedElement.title}</div>
      <img src={focusedElement.images[0]}></img>
      <div>{"$ " + focusedElement.attributes.price}</div>
    </Container>
  );
}

const Container = styled.div`
  border-radius: 20px;
  background: white;
  z-index: 999;
  position: absolute;
  top: 25%;
  left: 25%;
  width: 50%;
  height: 31%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  padding-bottom: 1rem;
  text-align: left;
  .close {
    padding-right: 2rem;
    width: 100%;
    text-align: right;
    font-size: 1rem;
  }
  .title {
    font-size: 1rem;
    padding: 0 1rem;
  }
  img {
    object-fit: cover;
    height: 100px;
    width: 200px;
    border-radius: 10px;
  }
`;
