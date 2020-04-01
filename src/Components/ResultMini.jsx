import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";

export default function ResultMini() {
  const dispatch = useDispatch();
  const focusedElement = useSelector(state => {
    return state.filteredSearch[state.focusedResult.index];
  });

  useEffect(() => {
    console.log(focusedElement);
  }, []);
  const close = e => {
    dispatch({ type: "focusedResult", payload: { show: false, index: 0 } });
  };
  return (
    <Container>
      <img src={focusedElement.images[0]}></img>
      <div className='text'>
        <div className='title'>{focusedElement.title}</div>
        <div className='price'>{"$ " + focusedElement.attributes.price}</div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  border-radius: 20px;
  background: white;
  z-index: 999;
  position: absolute;
  display: grid;

  .text {
    font-size: 1rem;
    padding: 1rem;
  }
  .price {
    font-weight: bold;
  }
  img {
    border-radius: 20px 20px 0 0;
    object-fit: cover;
    height: 100px;
    width: 200px;
  }
`;
