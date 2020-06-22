W;
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdDirectionsBike } from "react-icons/md";

export default function Walkscore(props) {
  const [serverResponse, writeResponse] = useState("");
  useEffect(() => {
    const connect = async (url, message) => {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      try {
        const req = await fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: myHeaders,
          redirect: "follow",
          body: JSON.stringify(message), // body data type must match "Content-Type" header
        });
        const body = await req.text();
        console.log(body);
        //writeResponse(body.data);
        //console.log("The response was: ", body);
      } catch (error) {
        console.log(error);
        console.log(`Error connecting to ${url}`);
      }
    };

    //CONSTRUCT THE MESSAGE
    const formatAddress = (str) => {
      let res;
      res = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      res = res.replace(/([ ,%.'])+/g, "%20");
      return res;
    };

    const formatCoord = (num) => {
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
    const apiKey = "144a9e29e7c6ce77340eb291ef0b23ab";
    const formattedUrl = {
      api: `http://api.walkscore.com/score?format=json&address=${message.address}&lat=${message.latitude}&lon=${message.longitude}&transit=1&bike=1&wsapikey=${apiKey}`,
    };
    const url = `http://localhost:8888/.netlify/functions/node-fetch`;
    connect(url, formattedUrl);
  }, []);

  const logo = () => {
    return serverResponse.logo_url ? (
      <img src={serverResponse.logo_url}></img>
    ) : (
      ""
    );
  };

  return (
    <Container>
      <div className='walk'>
        <div>
          {logo()}
          <div className='score'>{serverResponse.walkscore}</div>
        </div>
        <div className='desc'>{serverResponse.description}</div>
      </div>
      <div className='bike'>
        <div>
          <div className='line'>
            <MdDirectionsBike className='icn' /> <div>Bike score: </div>
          </div>
          <div className='score'>
            {serverResponse.bike ? serverResponse.bike.score : ""}
          </div>
        </div>
        <div className='desc'>
          {serverResponse.bike ? serverResponse.bike.description : ""}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  border: 2px #2222 solid;
  border-radius: 6px;
  margin: 2rem 0;
  width: 100%;

  .icn {
    font-size: 1.5rem;
  }
  .score {
    padding-top: 1rem;
    font-weight: bold;
    font-size: 1.5rem;
  }

  .desc {
    font-family: "Work Sans", sans-serif;
  }

  .line {
    display: flex;
    text-align: left;
    justify-content: center;
    > * {
      padding-right: 1rem;
    }
  }

  > div {
    display: flex;
    justify-content: left;
    flex-flow: column;
    text-align: center;
    padding: 1rem 0;
    font-size: 1.3rem;
    > div {
      padding: 1rem 0;
    }
  }
`;
