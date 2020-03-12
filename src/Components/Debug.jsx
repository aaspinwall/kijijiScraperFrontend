import React, { useEffect, useState, useRef } from "react";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { readLocalStorage } from "../Utilities/utilityFunctions";

function localStorageCheck(props) {
  //TODO add flags
  //Check if local storage exists to load the previous search
  const localStorage = readLocalStorage();
  if (localStorage) {
    //Load previous search
    props.writeSearchResults(localStorage);
    console.log("Local storage found and loaded");
  } else {
    //If no local storage, query database
    console.log("No local storage");
    console.log("This runs as page connects. Username: ", props.username);
    //connectToDB(props.username);
  }
}

const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};
//const median = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

const apiKey = "AIzaSyA7G5DGlaGV4O2-Vr6M5b5Odvf6ikYZG_U";

function Debug() {
  const selectedData = useSelector(state => state);
  const [longAvg, changeLong] = useState(0);
  const [latAvg, changeLat] = useState(0);
  const { filteredSearch } = selectedData;
  const mapElement = useRef(null);
  const dispatch = useDispatch();

  const testText = e => {
    const value = e.target.value;
    dispatch({ type: "test", payload: value });
  };
  const writeSearchResults = results => {
    dispatch({ type: "results", payload: results });
  };
  const newSearch = () => {
    dispatch({ type: "clearResults" });
  };

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

  //const testLat = filteredSearch[0].attributes.location.latitude;
  //const testlong = filteredSearch[0].attributes.location.longitude;
  return (
    <Container>
      <div
        ref={mapElement}
        className='mapContainer'
        style={{ height: "600px", width: "100%" }}
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
  z-index: -999;
  .mapContainer {
    top: 0;
    width: 100%;
    /* height: 100%; */
  }
  width: 100%;
  /* height: 100%; */
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

export default Debug;
