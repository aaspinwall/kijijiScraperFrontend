import React, { useState, useEffect } from "react";
import Walkscore from "./Walkscore";
import styled from "styled-components";

export default function Result(props) {
  const [showScore, walkscoreToggle] = useState(false);
  const adObject = props.ad;
  const textAttributes = [];
  const numberAttributes = [];

  const location = adObject.attributes.location;
  const { mapAddress: address, latitude, longitude } = location;
  for (const key in adObject.attributes) {
    if (adObject.attributes.hasOwnProperty(key)) {
      const element = adObject.attributes[key];
      //Text attributes
      if (typeof element !== "number" && typeof element != "object")
        textAttributes.push(key + "=>" + element);
      //Binary attributes
      if (typeof element === "number" && element !== 0)
        numberAttributes.push(key + ": " + element);
      //numberAttributes.push(key + "=>" + element);
    }
  }

  return (
    <Container className='resultContainer'>
      <Image src={adObject.image}></Image>
      <Text>
        <Main>
          <Title href={adObject.url}>{adObject.title}</Title>
          <Price className='price'>{"$" + adObject.attributes.price}</Price>
        </Main>
        <Description>
          {adObject.description
            ? adObject.description.slice(0, 450) + "..."
            : ""}
        </Description>
        <Details>
          {numberAttributes.map((attribute, i) => (
            <div key={"attr-" + i}>{attribute}</div>
          ))}
          <div>{location.mapAddress}</div>
        </Details>
        <span>Walkscore</span>
        <input
          type='checkbox'
          id='walkscoreToggle'
          name='walkscoreToggle'
          value='walkscoreToggle'
          checked={showScore}
          onClick={() => walkscoreToggle(!showScore)}
        />
        {showScore ? (
          <Walkscore locationData={{ address, latitude, longitude }} />
        ) : (
          ""
        )}
      </Text>
    </Container>
  );
}

const Container = styled.div`
  @media only screen and (min-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 2fr;
    padding: 1rem;
    border-top: solid 1px #2222;
    margin: 0.5rem;
  }
`;
const Image = styled.img`
  @media only screen and (min-width: 1024px) {
    object-fit: cover;
    width: 100%;
  }
  display: flex;
  justify-content: center;
  background-origin: border-box;
  border-radius: 5px;
  object-fit: cover;
  width: 100%;
  height: 200px;
`;
const Text = styled.div`
  @media only screen and (min-width: 1024px) {
    text-align: right;
  }
  display: grid;
`;
const Main = styled.div`
  margin: 12px auto 6px auto;
  padding: 0.5rem 0;
  display: grid;
  grid-template-columns: 3fr 1fr;
  width: 100%;
`;
const Price = styled.div`
  text-align: right;
`;
const Details = styled.div`
  font-size: 0.7rem;
  display: flex;
  flex-wrap: wrap;
`;
const Title = styled.a`
  width: 100%;
  text-align: left;
  color: black;
  text-decoration: none;

  :visited {
    color: black;
    text-decoration: none;
  }
`;
const Description = styled.div`
  display: none;
`;
