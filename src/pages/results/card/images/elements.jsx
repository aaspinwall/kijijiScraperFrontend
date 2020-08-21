import styled from "styled-components";

export const Wrapper = styled.div`
  border-radius: 20px;
  display: flex;
  overflow-x: scroll;
  padding: 1rem 0;
  > img {
    object-fit: cover;
    width: 30vw;
    max-height: 15vh;
  }
`;
