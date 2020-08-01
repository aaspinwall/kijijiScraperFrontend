import React from "react";
import { ReactComponent as svgLogo } from "../logo.svg";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Logo({ click, style }) {
  const defaultStyle = {
    width: "5rem",
    zIndex: 1000,
    position: "absolute",
    left: 0,
    top: "1rem",
  };

  return (
    <Link
      style={style ? style : defaultStyle}
      onClick={click ? click : () => console.log("clicked")}
      to={"/"}
    >
      <SVG />
    </Link>
  );
}

const SVG = styled(svgLogo)`
  .st0 {
    stroke-width: 10;
    stroke: white;
  }
`;
