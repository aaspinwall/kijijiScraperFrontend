import React from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown";

export default class Bubble extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false, dropdownVisible: false };
  }
  clicked = () => {
    this.setState(
      (this.state = {
        open: !this.state.open,
        dropdownVisible: !this.state.dropdownVisible,
      }),
      () => console.log(this.state)
    );
  };
  render() {
    return (
      <Container>
        <ButtonBody onClick={this.clicked}>
          <Text>{this.props.text}</Text>
          <Arrow></Arrow>
        </ButtonBody>
        <Dropdown visible={this.state.dropdownVisible} data={this.props.data} />
      </Container>
    );
  }
}

const Text = styled.div``;

const outsidePadding = "0.6rem";

const ButtonBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${outsidePadding} 2.4rem ${outsidePadding} ${outsidePadding};
  border-radius: 20px;
  border: solid #2222 1px;
`;

const Container = styled.div`
  display: flex;
  position: relative;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 1);
  color: black;

  user-select: none;
  transition: background-color 0.4s ease-in-out;
  :hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;
const ArrowSize = ".35rem";
const Arrow = styled.div`
  width: 0;
  height: 0;
  border-left: ${ArrowSize} solid transparent;
  border-right: ${ArrowSize} solid transparent;
  border-top: ${ArrowSize} solid black;
/*   position: absolute;
  right: ${outsidePadding};
  top: 50%; */
  transform: translate(100%,0%);
`;
