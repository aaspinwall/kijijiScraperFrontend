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

const apiKey = "AIzaSyA7G5DGlaGV4O2-Vr6M5b5Odvf6ikYZG_U";
const defaultProps = {
  center: {
    lat: 59.95,
    lng: 30.33,
  },
  zoom: 11,
};

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
      //console.log("State changed");
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
      changeLong(longitudeAvg);
      changeLat(latitudeAvg);
    }
  }, [props.searchResults]);

  const testLat = props.searchResults[0].attributes.location.latitude;
  const testlong = props.searchResults[0].attributes.location.longitude;
  return (
    <div>
      <div>
        <div>{longAvg}</div>
        <div>{latAvg}</div>
      </div>
      <div style={{ height: "600px", width: "100vw" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: apiKey }}
          defaultCenter={{
            lat: latAvg,
            lng: longAvg,
          }}
          defaultZoom={15}
        >
          {/* <div lat={testLat} lng={testlong} text='My Marker'>
            <div>.📍</div>
            <span className='label'>1</span>
          </div> */}
          {props.searchResults.map((result, i) => {
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
    </div>
  );
}

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

export default connect(mapState, mapDispatch)(Debug);
