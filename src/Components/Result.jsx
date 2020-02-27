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
              ? this.props.ad.description.slice(0, 100) + "..."
              : ""}
          </Description>
        </Info>
        <More className='price'>
          {this.props.ad.attributes
            ? "$" + this.props.ad.attributes.price
            : "Search for something to see results"}
        </More>
      </Container>
    );
  }
}

const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 0.3rem;
`;
const Image = styled.img`
  object-fit: cover;
  background-origin: border-box;
  width: 20vw;
  height: 120px;
  border-radius: 20px;
  padding: 0.7rem;
`;
const Info = styled.div`
  font-size: 1rem;
  text-align: left;
`;
const Title = styled.a`
  color: white;
  font-size: 1rem;
`;
const Description = styled.div``;
const More = styled.div``;
