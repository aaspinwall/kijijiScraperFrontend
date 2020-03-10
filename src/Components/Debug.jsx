import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import { connect } from "react-redux";
import { readLocalStorage } from "../Utilities/utilityFunctions";

// Maps `state` to `props`:
// These will be added as props to the component.
function mapState(state) {
  const { searchResults } = state;
  return {
    searchResults: searchResults,
  };
}

// Maps `dispatch` to `props`:
function mapDispatch(dispatch) {
  return {
    testText(e) {
      const value = e.target.value;
      dispatch({ type: "test", payload: value });
    },
    userInput(e) {
      const value = e.target.value;
      const id = e.target.id;
      dispatch({ type: "input", payload: value, id: id });
    },
    writeSearchResults(results) {
      dispatch({ type: "results", payload: results });
    },
    newSearch() {
      dispatch({ type: "clearResults" });
    },
  };
}

const apiKey = "AIzaSyA7G5DGlaGV4O2-Vr6M5b5Odvf6ikYZG_U";
const defaultProps = {
  center: {
    lat: 59.95,
    lng: 30.33,
  },
  zoom: 11,
};

const Pin = styled.div`
  font-size: 2rem;
  display: flex;
  span {
    font-size: 1rem;
    width: 200px;
    display: block;
  }
  :hover {
    filter: opacity(0.5);
  }
  :hover span {
    display: block;
  }
`;

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

const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
//const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

function Debug(props) {
  const [longAvg, changeLong] = useState(0);
  const [latAvg, changeLat] = useState(0);
  useEffect(() => {
    localStorageCheck(props);
  }, []);
  useEffect(() => {
    const latitudeArray = [];
    const longitudeArray = [];
    if (props.searchResults.length > 2) {
      console.log("State changed");
      console.log(props.searchResults);
      for (const {
        attributes: {
          location: { latitude: latitude, longitude: longitude },
        },
      } of props.searchResults) {
        longitudeArray.push(longitude);
        latitudeArray.push(latitude);
      }
      const longitudeAvg = arrAvg(longitudeArray);
      const latitudeAvg = arrAvg(latitudeArray);
      console.log(longitudeAvg, latitudeAvg);
      changeLong(longitudeAvg);
      changeLat(latitudeAvg);
      console.log(longAvg, latAvg);
    }
  }, [props.searchResults]);
  return (
    <div>
      <div>
        {props.searchResults.map(result => {
          return (
            <div>
              <div>{result.attributes.location.latitude}</div>
              <div>{result.attributes.location.longitude}</div>
            </div>
          );
        })}
      </div>
      <div style={{ height: "400px", width: "400px" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: apiKey }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <Pin lat={59.955413} lng={30.337844} text='My Marker'>
            <div>📍</div>
            <span>This is a pin</span>
          </Pin>
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default connect(mapState, mapDispatch)(Debug);
