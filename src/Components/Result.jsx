import React from "react";
import styled from "styled-components";

export default function Result(props) {
  const adObject = props.ad;
  const textAttributes = [];
  const numberAttributes = [];
  const location = adObject.attributes.location;
  for (const key in adObject.attributes) {
    if (adObject.attributes.hasOwnProperty(key)) {
      const element = adObject.attributes[key];
      //Text attributes
      if (typeof element !== "number" && typeof element != "object")
        textAttributes.push(key + "=>" + element);
      //Binary attributes
      if (typeof element === "number" && element !== 0)
        numberAttributes.push(key + "=>" + element);
    }
  }
  console.log(location);
  //console.log(textAttributes);
  return (
    <Container>
      <Image src={adObject.image}></Image>
      <Info>
        <Title href={adObject.url}>{adObject.title}</Title>
        <Description>
          {adObject.description
            ? adObject.description.slice(0, 450) + "..."
            : /* ? adObject.description.slice(0, 200) + "..." */
              ""}
        </Description>
      </Info>

      <More>
        <div className='price'>{"$" + adObject.attributes.price}</div>
        <Details>
          {numberAttributes.map((attribute, i) => (
            <div key={"attr-" + i}>{attribute}</div>
          ))}
          <div>{location.mapAddress}</div>
        </Details>
      </More>
    </Container>
  );
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
const Details = styled.div`
  font-size: 0.7rem;
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
