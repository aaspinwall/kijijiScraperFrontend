import styled from "styled-components";

export const colors = {
  accent: "#373373",
};

export const Button = styled.div`
  color: white;
  background: rgb(255, 90, 95);
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1.2rem;
  width: auto;
  /* box-shadow: 0px 5px 4px 2px #00000024; */
  cursor: pointer;
  :hover {
  }
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

    :hover {
    }

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

export const Input = styled.input`
  font-size: 1.1rem;
  border: 1px solid gainsboro;
  padding: 0.7rem;
`;

export const Card = styled.div`
  border: 2px solid #8080803b;
  border-radius: 15px;
  padding: 2rem 2rem 1rem;
  margin: 0 1rem 1rem;
  box-shadow: 10px 7px #8080802b;
`;

export const Label = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 0.5rem 0;
`;
