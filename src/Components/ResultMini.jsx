import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";

export default function ResultMini() {
  const dispatch = useDispatch();
  const focusedElement = useSelector((state) => {
    return state.filteredSearch[state.focusedResult.index];
  });
  const index = useSelector((state) => state.focusedResult.index);

  const close = (e) => {
    dispatch({ type: "focusedResult", payload: { show: false, index: 0 } });
  };
  const goTo = () => {
    const thatElement = document.querySelector(`#result_${index}`);
    console.log("That element is: ", thatElement);
    thatElement.scrollIntoView();
  };
  return (
    <Container>
      <div className='closeMini' onClick={close}>
        <AiOutlineClose />
      </div>
      <div onClick={goTo}>
        <img src={focusedElement.images[0]}></img>
        <div className='text'>
          <div className='title'>{focusedElement.title}</div>
          <div className='price'>{"$ " + focusedElement.attributes.price}</div>
        </div>
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
    > div {
      padding-bottom: 1rem;
    }
  }
  .price {
    font-weight: bold;
  }
  img {
    border-radius: 20px 20px 0 0;
    object-fit: cover;
    height: 20vh;
    min-height: 100px;
    width: 15vw;
    min-width: 200px;
  }
  .closeMini {
    position: absolute;
    border-radius: 50px;
    text-align: right;
    padding: 0.25rem;
    font-size: 1.2rem;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    top: -1rem;
    right: -1rem;
  }
`;
