import React, { useState, useRef } from "react";
import Walkscore from "./Walkscore";
import styled from "styled-components";
import {
  FaBed,
  FaBath,
  FaCouch,
  FaSmoking,
  FaSnowflake,
  FaPaw,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowUp } from "react-icons/io";

export default function Result(props) {
  const focusedResult = useSelector(state => state.focusedResult);
  const dispatch = useDispatch();

  const [showMore, moreToggle] = useState(false);
  const [fullDescription, toggleDescription] = useState(false);
  const frameRef = useRef();
  const adObject = props.ad;
  const index = props.index;
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
  //console.log(numberAttributes);

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
      case "petsallowed":
        return (
          <div>
            <FaPaw /> <div>Pets allowed</div>
          </div>
        );
      default:
        return text;
    }
  };

  const toggleMore = ref => {
    //EXPANDS THE VIEW
    //Toggles global state focus
    const position = ref.target.parentElement.offsetTop;
    window.scrollTo(0, position - 32);
    dispatch({
      type: "focusedResult",
      payload: { show: focusedResult.show, index },
    });
    moreToggle(!showMore);
  };

  return (
    <Container className='resultContainer' ref={frameRef}>
      <Image src={adObject.images[0]} onClick={toggleMore} />
      <Text>
        <Main visible={showMore}>
          <Title
            visible={showMore}
            href={adObject.url}
            onClick={() => moreToggle(true)}
          >
            {adObject.title}
          </Title>
          <Price className='price'>{"$" + adObject.attributes.price}</Price>
        </Main>
        <Details visible={showMore}>
          <Section>Description</Section>
          <Description>
            <div>
              <div>
                {/* prettier-ignore */
                adObject.description && !fullDescription ? adObject.description.slice(0, 450) 
                : adObject.description && fullDescription ? adObject.description
                : ""}
              </div>
              <div onClick={() => toggleDescription(!fullDescription)}>
                {!fullDescription ? "... show more" : "show less"}
              </div>
            </div>
          </Description>
          <Section>Amenities</Section>
          <Attributes>
            <div className='attrs'>
              {numberAttributes.map((attribute, i) => (
                <span key={"attr-" + i}>
                  {iconMatch(attribute.key)}
                  {" " + attribute.element}
                </span>
              ))}
            </div>
          </Attributes>
          <Section>Location</Section>
          <Location>
            <div className='address regularSpace'>{address}</div>
            {showMore ? (
              <Walkscore
                className='regularSpace'
                locationData={{ address, latitude, longitude }}
              />
            ) : (
              ""
            )}
            {showMore ? (
              <Kijiji
                visible={showMore}
                href={adObject.url}
                onClick={() => window.open(adObject.url)}
              >
                See in Kijiji
              </Kijiji>
            ) : (
              ""
            )}
          </Location>
        </Details>
      </Text>
      <div className='more' onClick={toggleMore}>
        <MoreInfoButton open={showMore} className='moreinfoButton'>
          <IoIosArrowUp />
        </MoreInfoButton>
      </div>
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
    height: 2rem;
    margin: 0 0 2rem 0;
    border-bottom: solid 1px #2222;

    .moreinfoButton {
    }
  }
  .regularSpace {
    padding: 1rem 0;
  }
`;

const MoreInfoButton = styled.div`
  position: absolute;
  right: ${props => (props.open ? "auto" : "50%")};
  left: ${props => (props.open ? "50%" : "auto")};
  top: ${props => (props.open ? "50%" : "33%")};
  transform: ${props =>
    props.open
      ? "translateY(-50%) rotate(0deg) translateX(-50%)"
      : "translateY(-50%) rotate(180deg) translateX(-50%)"};
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
const Kijiji = styled.span`
  background: #373373;
  border-radius: 5px;
  box-shadow: 5px 5px grey;
  font-size: 1rem;
  color: white;
  -webkit-text-decoration: none;
  -webkit-text-decoration: none;
  text-decoration: none;
  border: 1px #2222 solid;
  margin: 1rem 0;
  padding: 0.5rem;
  max-width: 10rem;
`;
const Main = styled.div`
  margin: 12px auto 6px auto;
  padding: 0.5rem 0;
  display: grid;
  grid-template-columns: ${props => (props.visible ? "1fr" : "3fr 1fr")};
  width: 100%;
  transition: font-size 0.3s ease-in-out;
  font-size: ${props => (props.visible ? "2rem" : "1rem")};
  font-weight: ${props => (props.visible ? "bold" : "normal")};
  > div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem 0;
  }
  .price {
    justify-content: flex-start;
  }
`;
const Section = styled.div`
  border-top: solid 2px #2222;
  font-weight: bold;
  width: 100%;
  text-align: left;
  font-size: 1.1rem;
  padding-top: 1rem;
`;
const Price = styled.div`
  justify-content: flex-end;
`;
const Details = styled.div`
  > div {
    padding: 1rem 0;
  }
  font-size: 0.7rem;
  flex-wrap: wrap;
  display: ${props => (props.visible ? "flex" : "none")};
`;

const Location = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  font-size: 1rem;
  > div {
    flex-wrap: wrap;
  }
`;

const Attributes = styled.div`
  width: 100%;
  padding: 0 !important;
  .attrs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: left;
    span {
      padding: 1rem 0;
    }
  }
  .address {
  }

  font-size: 1rem;
  > span {
  }
`;
const Title = styled.div`
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
