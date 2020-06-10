import React, { useState, useRef } from "react";
import Walkscore from "./Walkscore";
import styled from "styled-components";
import { Button } from "../Styles/Components";
import {
  FaBed,
  FaBath,
  FaCouch,
  FaSmoking,
  FaSnowflake,
  FaPaw,
  FaCheck,
} from "react-icons/fa";
import { GiGrass } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowUp } from "react-icons/io";

export default function Result(props) {
  //const focusedResult = useSelector((state) => state.focusedResult);
  const { focusedResult, showMap } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [showMore, moreToggle] = useState(false);
  const [focusedImage, setFocus] = useState();
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

  const icons = {
    numberbedrooms: { icon: <FaBed /> },
    numberbathrooms: { icon: <FaBath /> },
    furnished: { icon: <FaCouch /> },
    smokingpermitted: { icon: <FaSmoking /> },
    airconditioning: { icon: <FaSnowflake /> },
    yard: { text: "Yard", icon: <GiGrass /> },
    petsallowed: { text: "Pets allowed", icon: <FaPaw /> },
    sample: { text: "Sample text", icon: <GiGrass /> },
  };
  const findIcon = (text) => {
    if (icons[text]) {
      const ob = icons[text];
      //return icons[text].icon;
      if (ob.icon) {
        return (
          <div className='icon'>
            {ob.icon} <div className='slideRight'>{ob.text}</div>
          </div>
        );
      } else {
        return (
          <div className='icon'>
            <div className='slideRight'>{ob.text}</div>
          </div>
        );
      }
    } else {
      return (
        <div className='icon'>
          <FaCheck /> <div className='slideRight'>{" " + text}</div>
        </div>
      );
    }
  };

  const toggleMore = (ref) => {
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

  const getAllImages = (arr) => {
    return arr.map((image, i) => (
      <img src={image} onClick={() => setFocus(image)} />
    ));
  };

  const getDescription = (adObject) => {
    if (!adObject) return null;
    const description = adObject.description;
    const len = description.length;
    const limit = 450;
    return (
      <Description>
        <div>
          <div>
            {
              /* prettier-ignore */
              !fullDescription ? description.slice(0, limit) + ' ...'
                : fullDescription ? description
                : ""
            }
          </div>
          {len >= limit ? (
            <div
              className='showMore'
              onClick={() => toggleDescription(!fullDescription)}
            >
              {!fullDescription ? "show more" : "show less"}
            </div>
          ) : null}
        </div>
      </Description>
    );
  };

  return (
    <Container className='resultContainer' ref={frameRef} id={props.identifier}>
      <Image
        focused={showMore}
        src={focusedImage ? focusedImage : adObject.images[0]}
        onClick={toggleMore}
      />
      {showMore ? (
        <AllImages> {getAllImages(adObject.images)}</AllImages>
      ) : null}
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
          {getDescription(adObject)}
          <Section>Amenities</Section>
          <Attributes>
            <div className='attrs'>
              {numberAttributes.map((attribute, i) => (
                <span key={"attr-" + i}>
                  {findIcon(attribute.key)}
                  {" : " + attribute.element}
                </span>
              ))}
            </div>
          </Attributes>
          <Section>Location</Section>
          <Location>
            <div className='address regularSpace'>{address}</div>
            {showMore ? (
              <Walkscore locationData={{ address, latitude, longitude }} />
            ) : (
              ""
            )}
          </Location>
          <Button
            onClick={() => {
              window.scrollTo(0, -32);
              if (!showMap) {
                dispatch({
                  type: "mapVisibility",
                  payload: true,
                });
                if (focusedResult.false) {
                  dispatch({
                    type: "focusedResult",
                    payload: { index: index, show: true },
                  });
                }
              }
            }}
          >
            Show in map
          </Button>
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
  .more {
    display: flex;
    flex-direction: column;
    position: relative;
    height: 2rem;
    .moreinfoButton {
    }
  }
  .regularSpace {
    padding: 1rem 0;
    margin: 2rem 0;
  }
`;
const MoreInfoButton = styled.div`
  position: absolute;
  right: ${(props) => (props.open ? "auto" : "50%")};
  left: ${(props) => (props.open ? "50%" : "auto")};
  top: ${(props) => (props.open ? "50%" : "33%")};
  transform: ${(props) =>
    props.open
      ? "translateY(-50%) rotate(0deg) translateX(-50%)"
      : "translateY(-50%) rotate(180deg) translateX(-50%)"};
`;
const Image = styled.img`
  display: flex;
  justify-content: center;
  background-origin: border-box;
  border-radius: 5px;
  object-fit: ${(props) => (props.focused ? "contain" : "cover")};
  height: ${(props) => (props.focused ? "70vh" : "30vh")};
  width: 100%;
  transition: height 0.4s ease-in-out;

  @media only screen and (min-width: 1024px) {
    height: ${(props) => (props.focused ? "50vh" : "30vh")};
  }
`;
const AllImages = styled.div`
  border-radius: 20px;
  display: flex;
  overflow-x: scroll;
  padding: 1rem 0;
  > img {
    object-fit: cover;
    width: 30vw;
    max-height: 15vh;
  }
`;

const Text = styled.div`
  /* @media only screen and (min-width: 1024px) {
    text-align: right;
  } */
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
  /* max-width: 10rem; */
  width: 100%;
`;
const Main = styled.div`
  margin: 12px auto 6px auto;
  padding: 0.5rem 0;
  display: grid;
  grid-template-columns: ${(props) => (props.visible ? "1fr" : "3fr 1fr")};
  width: 100%;
  transition: font-size 0.3s ease-in-out;
  font-size: ${(props) => (props.visible ? "2rem" : "1rem")};
  font-weight: ${(props) => (props.visible ? "bold" : "normal")};
  > div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem 0;
  }
  .price {
    justify-content: flex-end;
    align-items: baseline;
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
  display: ${(props) => (props.visible ? "flex" : "none")};
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
  .address {
    font-size: 1.2rem;
    font-weight: bold;
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

  font-size: 1rem;
  > span {
  }
  .icon {
    display: inline-flex;
  }
  .slideRight {
    padding-left: 0.5rem;
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
const Description = styled.p`
  font-size: 1.1rem;
  text-align: left;
  padding: 1rem 0;
  line-height: ${(props) => (props.open ? "normal" : "1.7rem")};
  white-space: pre-wrap;
  .showMore {
    padding-top: 1rem;
    font-weight: bold;
  }
`;
