import React, { useEffect, useState, useRef } from "react";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};
//const median = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

const apiKey = "AIzaSyA7G5DGlaGV4O2-Vr6M5b5Odvf6ikYZG_U";

function Map() {
  const selectedData = useSelector(state => state);
  const [longAvg, changeLong] = useState(0);
  const [latAvg, changeLat] = useState(0);
  const [windowHeight, changeHeight] = useState(window.innerHeight);
  const { filteredSearch } = selectedData;
  const mapElement = useRef(null);

  useEffect(() => {
    const latitudeArray = [];
    const longitudeArray = [];
    if (filteredSearch.length > 2) {
      //console.log("State changed");
      //console.log(filteredSearch);
      for (const {
        attributes: {
          location: { latitude, longitude },
        },
      } of filteredSearch) {
        longitudeArray.push(longitude);
        latitudeArray.push(latitude);
      }
      const longitudeAvg = median(longitudeArray);
      const latitudeAvg = median(latitudeArray);
      changeLong(longitudeAvg);
      changeLat(latitudeAvg);
    }
  }, [filteredSearch]);

  useEffect(() => {
    console.log("Height changed to", windowHeight);
  }, [windowHeight]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      changeHeight(window.innerHeight);
    });
  }, []);

  //const testLat = filteredSearch[0].attributes.location.latitude;
  //const testlong = filteredSearch[0].attributes.location.longitude;
  return (
    <Container>
      <div
        ref={mapElement}
        className='mapContainer'
        style={{
          height:
            (() => {
              return windowHeight * 0.85;
            })().toString() + "px",
          width: "100%",
          padding: "0",
        }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: apiKey }}
          defaultCenter={{
            lat: latAvg,
            lng: longAvg,
          }}
          defaultZoom={15}
        >
          {filteredSearch.map((result, i) => {
            const testLat = result.attributes.location.latitude;
            const testlong = result.attributes.location.longitude;
            const title = result.title;
            return (
              <Pin lat={testLat} lng={testlong} key={"pin" + i}>
                <div className='pin'>📍</div>
                <span className='label'>{title}</span>
              </Pin>
            );
          })}
        </GoogleMapReact>
      </div>
    </Container>
  );
}
const Container = styled.div`
  padding-bottom: 1rem;
  z-index: 500;
  .mapContainer {
    top: 0;
  }
`;

const Pin = styled.div`
  .pin {
    font-size: 2rem;
    position: absolute;
    left: 0;
    top: 0;
    transform: translate(-50%, -50%);
  }
  filter: opacity(0.5);
  .label {
    display: none;
    padding-left: 2rem;
    font-size: 1rem;
    text-align: left;
    width: 300px;
    position: absolute;
    top: 0;
    left: 0;
  }
  :hover {
    filter: opacity(1);
  }
  :hover .label {
    display: block;
  }
`;

export default Map;
