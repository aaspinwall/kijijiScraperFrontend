import React, { Component } from "react";
import styled from "styled-components";

export default class Result extends Component {
  render() {
    return (
      <Container>
        <Image src={this.props.ad.image}></Image>
        <Info>
          <Title href={this.props.ad.url}>{this.props.ad.title}</Title>
          <Description>
            {this.props.ad.description
              ? this.props.ad.description.slice(0, 700) + "..."
              : /* ? this.props.ad.description.slice(0, 200) + "..." */
                ""}
          </Description>
        </Info>
        <More className='price'>
          {this.props.ad.attributes ? "$" + this.props.ad.attributes.price : ""}
        </More>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 1rem;
  border-top: solid 1px #2222;
  margin: 0.5rem;
`;
const Image = styled.img`
  object-fit: cover;
  background-origin: border-box;
  width: 300px;
  height: 200px;
  border-radius: 20px;
  padding: 0.7rem;
`;
const Info = styled.div`
  padding: 0 2rem 0 1rem;
  font-size: 1rem;
  text-align: left;
  flex: 2;
`;
const Title = styled.a`
  color: #2222;
  color: black;
  font-size: 1rem;
  font-style: none;
  :visited {
    color: black;
    font-style: none;
  }
`;
const Description = styled.div``;
const More = styled.div``;
