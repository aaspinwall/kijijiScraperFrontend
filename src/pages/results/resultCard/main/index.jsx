import React from "react";
import { Image } from "./elements";

const Main = ({ data, focused }) => {
  const { title, price, image } = data;
  return (
    <>
      <div>{title}</div>
      <Image src={image} focused={focused} />
      <div>Price: {price}</div>
    </>
  );
};

export default Main;
