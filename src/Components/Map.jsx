import React, { useEffect, useState, useRef } from "react";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import ResultMini from "./ResultMini";

const median = (arr) => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};
//const median = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

const apiKey = "AIzaSyA7G5DGlaGV4O2-Vr6M5b5Odvf6ikYZG_U";

function Map() {
  const { filteredSearch, focusedResult, showMap } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  //const [showMini, toggleMini] = useState(false);
  const [debug, setDebug] = useState(false);
  const [location, changeLocation] = useState({ zoom: 15 });
  const [windowSize, changeHeight] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const mapElement = useRef();
  const pinElement = useRef();

  useEffect(() => {
    console.log("MAP: Filteredsearch changed to: ", filteredSearch);
    const latitudeArray = [];
    const longitudeArray = [];
    if (filteredSearch.length > 2) {
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
      changeLocation({ ...location, long: longitudeAvg, lat: latitudeAvg });
    }
  }, [filteredSearch]);

  useEffect(() => {
    console.log("MAP: Window changed to", windowSize);
  }, [windowSize]);

  useEffect(() => {
    if (filteredSearch.length < 1) {
      console.log("DONRENDERMAP");
      setDebug(false);
    }
    console.log("MAP: Map rendered: ", focusedResult);
    const mapPosition = mapElement.current.offsetTop;
    window.addEventListener("resize", () => {
      const { innerWidth: width, innerHeight: height } = window;
      changeHeight({ height, width });
    });
    window.scrollTo(0, mapPosition - 32);
  }, []);

  useEffect(() => {
    console.log("MAP: Focused result changed to: ", focusedResult);
    //return;
    if (focusedResult.show) {
      const { latitude, longitude } = filteredSearch[
        focusedResult.index
      ].attributes.location;
      changeLocation({ ...location, long: longitude, lat: latitude });
    }
  }, [focusedResult]);

  const pinClick = (e) => {
    const index = Number(e.target.id.replace("pin", ""));
    dispatch({ type: "focusedResult", payload: { show: true, index } });
    //const pinLocation = e.target.getBoundingClientRect();
    const { x, y } = e.target.getBoundingClientRect();
    //focusedResult(!showMini);
    console.log("You clicked on i: ", index);
    console.log("The matching ref is", { x, y });
  };

  return (
    <Container ref={mapElement} id='mapContainer'>
      <div
        className='mapContainer'
        style={{
          height:
            (() => {
              return windowSize.height * 0.75;
            })().toString() + "px",
          width: "100%",
          padding: "0",
        }}
      >
        {debug ? null : (
          <GoogleMapReact
            bootstrapURLKeys={{ key: apiKey }}
            defaultCenter={{
              lat: location.lat,
              lng: location.long,
            }}
            /* center={{ lat: location.lat, lng: location.long }} */
            defaultZoom={location.zoom}
          >
            {filteredSearch.map((result, i) => {
              const testLat = result.attributes.location.latitude;
              const testlong = result.attributes.location.longitude;
              const title = result.title;
              return (
                <Pin lat={testLat} lng={testlong} key={"pin" + i}>
                  <div
                    className='pin'
                    onClick={pinClick}
                    id={"pin" + i}
                    ref={pinElement}
                  >
                    📍
                  </div>
                  {focusedResult.show && i === focusedResult.index ? (
                    <ResultMini />
                  ) : (
                    ""
                  )}
                </Pin>
              );
            })}
          </GoogleMapReact>
        )}
      </div>
    </Container>
  );
}
const Container = styled.div`
  position: relative;
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

  :hover .label {
    display: block;
  }
  #mapContainer {
  }
`;

export default Map;
