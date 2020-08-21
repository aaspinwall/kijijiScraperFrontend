import styled from "styled-components";

export const Image = styled.img`
  display: flex;
  justify-content: center;
  background-origin: border-box;
  border-radius: 5px;
  object-fit: ${(props) => (props.focused ? "contain" : "cover")};
  height: ${(props) => (props.focused ? "40vh" : "30vh")};
  width: 100%;
  transition: height 0.4s ease-in-out;

  @media only screen and (min-width: 1024px) {
    height: ${(props) => (props.focused ? "50vh" : "30vh")};
  }
`;

export const Wrapper = styled.div`
  > * {
    margin-bottom: 1rem;
  }
`;
