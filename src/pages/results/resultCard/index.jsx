import React from "react";
import Main from "./main";
import { Wrapper } from "./elements";

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
      <Main data={{ title, image, price }} onClick={() => setOpen(true)}></Main>
      {isOpen ? (
        <>
          <div>Other Pictures</div>
          <div>Title and price</div>
          <div>Amenities</div>
          <div>Description</div>
          <div>Location</div>
        </>
      ) : null}
      <div onClick={() => setOpen(!isOpen)}>{!isOpen ? "+++" : "---"}</div>
    </Wrapper>
  );
};

export default Result;
