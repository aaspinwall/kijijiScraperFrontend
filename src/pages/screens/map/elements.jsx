import styled from "styled-components";

export const Container = styled.div`
  position: ${(props) => (props.mobile ? "static" : "fixed")};
  top: ${(props) => props.top.topHeight + "px"};
  left: 50%;
  width: ${(props) => (props.mobile ? "auto" : "50%")};
  padding-bottom: ${(props) => (props.mobile ? "1rem" : 0)};
  z-index: 500;
  transition: 0.7s ease-in-out;
  .mapContainer {
    top: 0;
  }
`;

export const Pin = styled.div`
  .pinActive {
    filter: opacity(0.5) grayscale(20%);
  }
  .pin {
    font-size: 2rem;
    position: absolute;
    left: 0;
    top: 0;
    transform: translate(-50%, -50%);
  }
  .label {
    display: none;
    padding-left: 2rem;
    font-size: 1rem;
    text-align: left;
    width: 300px;
    position: absolute;
    top: 0;
    left: 0;
  }

  :hover .label {
    display: block;
  }
  #mapContainer {
  }
`;
