import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function Walkscore(props) {
  const [serverResponse, writeResponse] = useState("");
  useEffect(() => {
    const connect = async (url, message) => {
      try {
        const req = await fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: { "Content-Type": "application/json" },
          body: message, // body data type must match "Content-Type" header
        });
        const body = await req.json();
        writeResponse(body);
        console.log("The response was: ", body);
      } catch (error) {
        console.log(error);
        console.log(`Error connecting to ${url}`);
      }
    };

    //CONSTRUCT THE MESSAGE
    const formatAddress = str => {
      let res;
      res = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      res = res.replace(/([ ,%.'])+/g, "%20");
      return res;
    };

    const formatCoord = num => {
      return num.toFixed(7);
    };

    let address = props.locationData
      ? props.locationData.address
      : "1105 Rue de l'Église, Verdun, QC H4G 2N8, Canada";
    const latitude = props.locationData
      ? props.locationData.latitude
      : 45.4634046;
    const longitude = props.locationData
      ? props.locationData.longitude
      : -73.5776328;
    const message = JSON.stringify({
      address: formatAddress(address),
      latitude: formatCoord(latitude),
      longitude: formatCoord(longitude),
    });
    const url =
      "https://av2bnw0v0h.execute-api.us-east-1.amazonaws.com/dev/walkscore";
    connect(url, message);
    console.log(props);
  }, []);
  return (
    <Container>
      <div>
        <div>Walkscore:</div>
        <div>{serverResponse.walkscore}</div>
        <div>Description:</div>
        <div>{serverResponse.description}</div>
        {serverResponse.logo_url ? (
          <img src={serverResponse.logo_url}></img>
        ) : (
          ""
        )}
        <div>Bike:</div>
        <div>Score:</div>
        <div>{serverResponse.bike ? serverResponse.bike.score : ""}</div>
        <div>Description:</div>
        <div>{serverResponse.bike ? serverResponse.bike.description : ""}</div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  div {
    font-size: 0.7rem;
  }
`;
