import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* position: absolute;
  bottom: 0; */
  width: 100%;
  font-size: 1rem;
  color: white;
  background: grey;
  padding: 1rem;
  text-align: center;
  box-sizing: border-box;
  z-index: 999;
  > div {
    padding: 0.25rem 0;
  }

  .icons {
    a,
    :visited,
    :active {
      color: white;
      font-size: 1.5rem;
      padding: 0 0.5rem;
    }
  }
  @media only screen and (min-width: 1024px) {
    width: 50%;
  }
`;
