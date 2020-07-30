import React from "react";
import styled from "styled-components";

import { ReactComponent as Logo } from "../logo.svg";

import Featured from "./Featured";

export default function Intro() {
  const [full, setFull] = React.useState(false);

  const sizes = [133, 676, 885, 1190, 1900];

  return (
    <div>
      <Logo
        stroke='blue'
        style={{
          width: "4rem",
          zIndex: 1000,
          position: "absolute",
          left: "2rem",
          top: "2rem",
        }}
      />
      <TopBanner full={full}>
        <img
          src={`https://www.nationalgeographic.com/content/dam/travel/2017-digital/canada/montreal-article/moins-sombre.adapt.${
            full ? sizes[4] : sizes[3]
          }.1.jpg`}
          alt='montreal-image'
        />
        <WrappedText>
          {full ? null : (
            <Welcome onClick={() => setFull(!full)}>
              <div>Welcome to Moving Day</div>
              <div>This text should go away</div>
            </Welcome>
          )}
        </WrappedText>
      </TopBanner>
      <div
        style={{
          height: "30vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src='/imgs/searchholder.png'
          style={{
            width: "100%",
            height: "100%",
            objectFit: "scale-down",
          }}
        />
      </div>
      <Featured>
        <h3>Explore Montreal's Buroughs</h3>
      </Featured>
    </div>
  );
}

const TopBanner = styled.div`
  transition: height 1.3s linear;
  position: relative;
  height: ${(props) => (props.full ? "100vh" : "50vh")};
  width: 100%;
  img {
    position: relative;
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
  }
`;

const WrappedText = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;

  ::before {
    content: " ";
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgb(2, 0, 36);
    background: linear-gradient(
      0deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(255, 90, 95, 1) 32%,
      rgba(255, 255, 255, 1) 95%
    );
    opacity: 0.3;
  }
`;

const Welcome = styled.div`
  z-index: 100;
  font-size: 3rem;
  > div {
    transition: opacity 0.4s ease-in-out;
  }
  :hover > :nth-child(2) {
    opacity: 0;
  }
`;
