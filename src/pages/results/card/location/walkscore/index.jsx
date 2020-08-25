import React, { useEffect, useState } from "react";
import { Wrapper } from "./elements";
import { MdDirectionsBike } from "react-icons/md";
import { post } from "../../../../../Utilities/api";
import { Spinner, Box, Grid, Flex, Badge } from "@chakra-ui/core";

export default function Walkscore({ locationData }) {
  const { address, latitude, longitude } = locationData;

  const [serverResponse, writeResponse] = useState(null);
  useEffect(() => {
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

    const message = {
      address: formatAddress(address),
      latitude: formatCoord(latitude),
      longitude: formatCoord(longitude),
    };
    const url = `/.netlify/functions/hello`;
    const apiKey = "144a9e29e7c6ce77340eb291ef0b23ab";
    const formattedUrl = `http://api.walkscore.com/score?format=json&address=${message.address}&lat=${message.latitude}&lon=${message.longitude}&transit=1&bike=1&wsapikey=${apiKey}`;

    post(url, formattedUrl, writeResponse);
  }, []);

  useEffect(() => {
    console.log(serverResponse);
  }, [serverResponse]);

  const Logo = () => {
    return serverResponse.logo_url ? (
      <img src={serverResponse.logo_url}></img>
    ) : (
      <Spinner />
    );
  };

  const color = (score) => {
    if (score >= 70) {
      return "green";
    } else {
      if (score > 50) {
        return "yellow";
      } else {
        return "red";
      }
    }
  };

  return (
    <Wrapper>
      {serverResponse ? (
        <Box>
          <img
            id='walkscoreLogo'
            style={{ width: "120px", height: "19px" }}
            src={serverResponse.logo_url}
          ></img>

          <Grid>
            <Box>{serverResponse.walkscore}</Box>
            <Badge variantColor={color(serverResponse.walkscore)}>
              {serverResponse.description}
            </Badge>
          </Grid>
          <Grid>
            <Flex>
              <MdDirectionsBike className='icn' />
              <Box>Bike score:</Box>
            </Flex>
            <Box>{serverResponse.bike.score}</Box>
            <Badge variantColor={color(serverResponse.bike.score)}>
              {serverResponse.bike.description}
            </Badge>
          </Grid>
        </Box>
      ) : (
        <Spinner />
      )}
      {/*       <div className='walk'>
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
      </div> */}
    </Wrapper>
  );
}
