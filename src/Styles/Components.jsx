import styled from "styled-components";

export const colors = {
  accent: "#373373",
};

export const Button = styled.div`
  color: white;
  background: rgb(255, 90, 95);
  text-align: center;
  padding: 2rem;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1.2rem;
  width: 100%;
`;

export const Debug = styled.div``;

export const Top = styled.div`
  padding: 1rem;
  max-width: 1000px;
  margin: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /*   @media only screen and (min-width: 1024px) {
    flex-direction: column;
  } */
`;

export const Section = styled.div``;

export const Content = styled.div`
  padding-bottom: ${(props) =>
    props.footerHeight ? props.footerHeight + "px" : "18rem"};
`;

export const FeaturedImages = styled.div`
  display: flex;
  justify-content: space-around;

  > div {
    width: 100%;
    height: 50vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;

    > img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      filter: opacity(0.4);
      object-fit: cover;
    }
    > p {
      display: none;
    }
  }
`;
