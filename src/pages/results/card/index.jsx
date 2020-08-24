import React from "react";
import Main from "./main";
import Amenities from "./amenities";
import Description from "./description";
import Location from "./location";
import Toggler from "../../../Components/buttons/discrete";
import { useSelector, useDispatch } from "react-redux";
import { Wrapper } from "./elements";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { focus } from "../dispatchers";

const Result = ({ ad, i }) => {
  const {
    attributes: { price, ...attributes },
    title,
    description,
    images,
  } = ad;
  const globallyFocused = useSelector((state) => state.display.i);
  const isInFocus = globallyFocused === i;
  const [isOpen, setOpen] = React.useState(isInFocus);
  const wrapRef = React.useRef(null);
  const d = useDispatch();

  const toggle = () => {
    if (isInFocus) {
      focus(null, d);
    } else {
      focus(i, d);
    }
  };

  React.useEffect(() => {
    setOpen(isInFocus);
  }, [globallyFocused]);

  return (
    <Wrapper isOpen={isOpen} ref={wrapRef}>
      <Main
        data={{ title, images, price }}
        focused={isOpen}
        onClick={toggle}
      ></Main>
      {isOpen ? (
        <>
          <Amenities data={attributes} />
          <hr></hr>
          <Description text={description} />
          <hr></hr>
          <Location data={attributes.location} />
        </>
      ) : null}
      <Toggler width={"100%"} size={"lg"} p={"1rem"} onClick={toggle}>
        {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
      </Toggler>
    </Wrapper>
  );
};

export default Result;
