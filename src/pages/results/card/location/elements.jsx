import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  font-size: 1rem;
  > div {
    flex-wrap: wrap;
  }
  .address {
    font-size: 1.2rem;
    font-weight: bold;
  }
`;
