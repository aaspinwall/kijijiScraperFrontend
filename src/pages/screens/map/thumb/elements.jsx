import styled from "styled-components";

export const Wrapper = styled.div`
  border-radius: 20px;
  background: white;
  z-index: 999;
  position: absolute;
  display: grid;

  .text {
    font-size: 1rem;
    padding: 1rem;
    > div {
      padding-bottom: 1rem;
    }
  }
  .price {
    font-weight: bold;
  }
  img {
    border-radius: 20px 20px 0 0;
    object-fit: cover;
    height: 30vh;
    min-height: 100px;
    width: 50vw;
    min-width: 200px;
    max-width: 400px;
  }
  .closeMini {
    position: absolute;
    border-radius: 50px;
    text-align: right;
    padding: 0.25rem;
    font-size: 1.2rem;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    top: -1rem;
    right: -1rem;
  }
  @media only screen and (min-width: 1024px) {
    img {
      width: 30vw;
    }
  }
`;
