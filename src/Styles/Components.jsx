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

export const Section = styled.div``;

export const Content = styled.div`
  padding-bottom: ${(props) =>
    props.footerHeight ? props.footerHeight + "px" : "18rem"};
`;
