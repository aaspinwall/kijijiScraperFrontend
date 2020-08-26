import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { Wrapper } from "./elements";
import { focus } from "../../../results/dispatchers";

const Thumb = ({ focused, i }) => {
  const dispatch = useDispatch();
  const d = dispatch;

  const close = () => {
    focus(null, d);
  };
  const goTo = () => {
    focus(i, d);
    const thatElement = document.querySelector(`#result_${i}`);
    thatElement.scrollIntoView();
  };
  return (
    <Wrapper>
      <div className='closeMini' onClick={close}>
        <AiOutlineClose />
      </div>
      <div onClick={goTo}>
        <img src={focused.images[0]}></img>
        <div className='text'>
          <div className='title'>{focused.title}</div>
          <div className='price'>{"$ " + focused.attributes.price}</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Thumb;
