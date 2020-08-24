import React from "react";
import { ReactComponent as svgLogo } from "../../assets/icons/main.svg";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Logo = () => {
  return (
    <Link to={"/"}>
      <SVG />
    </Link>
  );
};

const SVG = styled(svgLogo)`
  height: 2rem;
  .st0 {
    stroke-width: 2;
    stroke: red;
    fill: red;
  }
`;

export default Logo;
