import styled from "styled-components";

export const Wrapper = styled.div`
  /* border: 2px #2222 solid;
  border-radius: 6px; */
  margin: 2rem 0;
  width: 100%;

  .icn {
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }
  .score {
    padding-top: 1rem;
    font-weight: bold;
    font-size: 1.5rem;
  }

  .desc {
    font-family: "Work Sans", sans-serif;
  }

  .line {
    display: flex;
    text-align: left;
    justify-content: center;
    > * {
      padding-right: 1rem;
    }
  }

  > div {
    display: flex;
    justify-content: left;
    align-items: center;
    flex-flow: column;
    text-align: center;
    padding: 1rem 0;
    font-size: 1.3rem;
    > div {
      padding: 1rem 0;
    }
  }
`;
