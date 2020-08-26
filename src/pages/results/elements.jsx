import styled from "styled-components";

export const Wrapper = styled.div`
  font-family: Cabin;
`;

export const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media only screen and (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;
