import styled from "styled-components";

export const Banner = styled.div`
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

export const Gradient = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  transition: opacity 0.4s ease-in-out;

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

export const Text = styled.div`
  z-index: 100;
  font-size: 2rem;
  width: 50%;
  > * {
    transition: opacity 0.4s ease-in-out;
  }
`;

export const Header = styled.h1`
  margin: 0;
`;
export const SubHeader = styled.h1`
  opacity: 0;
  font-size: 1.4rem;
  font-weight: bold;
  :hover {
    opacity: 1;
  }
`;
