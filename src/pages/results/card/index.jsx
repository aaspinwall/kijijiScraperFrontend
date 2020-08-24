import React from "react";
import Main from "./main";
import Amenities from "./amenities";
import Description from "./description";
import Location from "./location";
import Drawer from "../../../Components/buttons/discrete";
import { Wrapper } from "./elements";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

const Result = ({ ad }) => {
  const {
    attributes: { price, ...attributes },
    title,
    description,
    image,
    images,
    url,
  } = ad;
  const [isOpen, setOpen] = React.useState(false);

  return (
    <Wrapper>
      <Main
        data={{ title, image, images, price }}
        focused={isOpen}
        onClick={() => setOpen(!isOpen)}
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
      <Drawer
        width={"100%"}
        size={"lg"}
        p={"1rem"}
        onClick={() => setOpen(!isOpen)}
      >
        {isOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
      </Drawer>
    </Wrapper>
  );
};

export default Result;
