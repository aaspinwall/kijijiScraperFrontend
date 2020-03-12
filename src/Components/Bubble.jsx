import React from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown";

export default class Bubble extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false, dropdownVisible: false };
  }
  clicked = () => {
    this.setState({
      open: !this.state.open,
      dropdownVisible: !this.state.dropdownVisible,
    });
  };
  handleClickOutside = e => {
    const clickedOutside = !this.node.contains(e.target);
    if (clickedOutside) {
      this.setState({ open: false, dropdownVisible: false });
    }
  };
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    console.log("Component mounted");
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  render() {
    return (
      <Container ref={node => (this.node = node)}>
        <ButtonBody onClick={this.clicked}>
          <Text>{this.props.label}</Text>
          <Arrow></Arrow>
        </ButtonBody>
        <Dropdown
          type={this.props.type}
          content={this.props.content}
          visible={this.state.dropdownVisible}
        />
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
  transform: translate(100%, 0%);
`;
