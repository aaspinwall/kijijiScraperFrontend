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
    console.log("formatted url", formattedUrl);

    //post(url, formattedUrl, writeResponse);
  }, []);

  const logo = () => {
    return serverResponse.logo_url ? (
      <img src={serverResponse.logo_url}></img>
    ) : (
      <Spinner />
    );
  };

  return (
    <Wrapper>
      {!serverResponse ? (
        <Box>
          <div
            id='walkscoreLogo'
            style={{ width: "120px", height: "19px", background: "red" }}
          ></div>
          <Grid>
            <Box>89</Box>
            <Badge variantColor={"green"}>Very walkable</Badge>
          </Grid>
          <Grid>
            <Flex>
              <MdDirectionsBike className='icn' />
              <Box>Bike score:</Box>
            </Flex>
            <Box>91</Box>
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
