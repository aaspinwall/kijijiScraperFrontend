import React from "react";

const Main = ({ data }) => {
  const { title, price, image } = data;
  return (
    <>
      <div>{title}</div>
      <img src={image} />
      <div>Price: {price}</div>
    </>
  );
};

export default Main;
