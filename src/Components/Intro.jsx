import React, { useState } from "react";
import styled from "styled-components";
import Overlay from "./Overlay";
import Logo from "./Logo";
import Featured from "./Featured";
import Loading from "./Loading";
import { search as s } from "../Utilities/utilityFunctions";

export default function Intro() {
  const sizes = [133, 676, 885, 1190, 1900];
  const [initial, setInital] = useState(true);

  return (
    <Container>
      <Logo id='logo' />
      <TopBanner>
        <img
          src={`https://www.nationalgeographic.com/content/dam/travel/2017-digital/canada/montreal-article/moins-sombre.adapt.${sizes[3]}.1.jpg`}
          alt='montreal-image'
        />
        <WrappedText>
          <Welcome>
            <div>Welcome to Moving Day</div>
            <div>Start your search here</div>
          </Welcome>
        </WrappedText>
      </TopBanner>
      <Interactive>
        {initial ? (
          <Overlay
            forceVisible={{ height: "30vh" }}
            submit={(result) => {
              setInital(false);
              console.log("submitted, ", result);
            }}
          />
        ) : (
          <Loading />
        )}
      </Interactive>
      <Featured>
        <h3>Explore Montreal's Buroughs</h3>
      </Featured>
    </Container>
  );
}

const handleSubmit = () => {
  //show cats instead of search
};

const Interactive = styled.div`
  margin: 0 15%;
  min-height: 40vh;
`;

const Container = styled.div`
  #logo {
    width: "5rem";
    z-index: 1000;
    position: "absolute";
    left: 0;
    top: "1rem";
  }
`;

const TopBanner = styled.div`
  /* transition: height 1.3s linear; */
  position: relative;
  height: 30vh;
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
    opacity: 0.35;
  }
`;

const Welcome = styled.div`
  z-index: 100;
  font-size: 3rem;
  > div {
    transition: opacity 0.4s ease-in-out;
  }
  > :nth-child(2) {
    opacity: 0;
    font-size: 1.4rem;
    font-weight: bold;
  }
  :hover > :nth-child(2) {
    opacity: 1;
  }
`;
