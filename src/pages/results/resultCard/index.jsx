import React from "react";
import Main from "./main";
import Images from "./images";
import Amenities from "./amenities";
import Description from "./description";
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
        data={{ title, image, price }}
        focused={isOpen}
        onClick={() => setOpen(true)}
      ></Main>
      {isOpen ? (
        <>
          <Images images={images}>Other Pictures</Images>
          <hr></hr>
          <Amenities data={attributes}>Amenities</Amenities>
          <hr></hr>
          <Description text={description} />
          <hr></hr>
          <div>Location</div>
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
