import React, { useState, useEffect } from "react";
import Walkscore from "./Walkscore";
import styled from "styled-components";
import { FaBed, FaBath, FaCouch, FaSmoking, FaSnowflake } from "react-icons/fa";

export default function Result(props) {
  const adObject = props.ad;

  const [showScore, walkscoreToggle] = useState(false);
  const [showMore, moreToggle] = useState(false);
  const [fullDescription, toggleDescription] = useState(false);
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
        numberAttributes.push({ key, element });
      //numberAttributes.push(key + "=>" + element);
    }
  }
  console.log(numberAttributes);

  const iconMatch = text => {
    switch (text) {
      case "numberbedrooms":
        return <FaBed />;
      case "numberbathrooms":
        return <FaBath />;
      case "furnished":
        return <FaCouch />;
      case "smokingpermitted":
        return <FaSmoking />;
      case "airconditioning":
        return <FaSnowflake />;
      default:
        return text;
    }
  };

  return (
    <Container className='resultContainer'>
      <Image src={adObject.images[0]}></Image>
      <Text>
        <Main>
          <Title href={adObject.url}>{adObject.title}</Title>
          <Price className='price'>{"$" + adObject.attributes.price}</Price>
        </Main>
        <div className='more'>
          <div className='moreinfoButton' onClick={() => moreToggle(!showMore)}>
            ^
          </div>
        </div>
        <Details visible={showMore}>
          <Section>Amenities</Section>
          <Attributes>
            {numberAttributes.map((attribute, i) => (
              <span key={"attr-" + i}>
                {iconMatch(attribute.key)}
                {" " + attribute.element}
              </span>
            ))}
            <div>{location.mapAddress}</div>
          </Attributes>
          <Description>
            <div>
              <div>
                {/* prettier-ignore */
                adObject.description && !fullDescription ? adObject.description.slice(0, 450)
                : adObject.description && fullDescription ? adObject.description
                : ""}
              </div>
              <button onClick={() => toggleDescription(!fullDescription)}>
                {" "}
                {!fullDescription ? "... show more" : "show less"}
              </button>
            </div>
          </Description>
          <input
            type='checkbox'
            id='walkscoreToggle'
            name='walkscoreToggle'
            value='walkscoreToggle'
            checked={showScore}
            onClick={() => walkscoreToggle(!showScore)}
          />
          <span>Walkscore</span>
          {showScore ? (
            <Walkscore locationData={{ address, latitude, longitude }} />
          ) : (
            ""
          )}
        </Details>
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
  .more {
    display: flex;
    flex-direction: column;
    position: relative;
    height: 20px;

    .moreinfoButton {
      position: absolute;
      right: 0;
      height: 20px;
      width: 20px;
      font-weight: 200;
      border-radius: 20px;
      border: 1px solid grey;
      transform: translateY(-50%) rotate(180deg);
    }
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
  height: 218px;
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
const Section = styled.div`
  border-top: solid 2px #2222;
  font-weight: bold;
  width: 100%;
  text-align: left;
  font-size: 1.1rem;
`;
const Price = styled.div`
  text-align: right;
`;
const Details = styled.div`
  > div,
  > div > div {
    padding: 1rem 0;
  }
  font-size: 0.7rem;
  flex-wrap: wrap;
  display: ${props => (props.visible ? "flex" : "none")};
`;

const Attributes = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  text-align: left;
  border: solid 1px black;
  font-size: 1rem;
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
  font-size: 1.1rem;
  text-align: left;
  padding: 1rem 0;
`;
