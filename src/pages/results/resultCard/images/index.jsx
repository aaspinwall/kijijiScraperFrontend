import React from "react";
import { Wrapper } from "./elements";

const Images = ({ images }) => (
  <Wrapper>
    {images.map((image, i) => (
      <img src={image} key={`image-k-${i}`} />
    ))}
  </Wrapper>
);

export default Images;
