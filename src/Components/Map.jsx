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

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API;

function Map() {
  const { filteredSearch, focusedResult, windowInfo } = useSelector(
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
    if (filteredSearch.length < 1) {
      setDebug(false);
    }
    const mapPosition = mapElement.current.offsetTop;

    window.addEventListener("resize", () => {
      const { innerWidth: width, innerHeight: height } = window;

      changeHeight({ height, width });
    });

    //Got to the map whenever it renders
    window.scrollTo(0, mapPosition - 32);
  }, []);

  useEffect(() => {
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
  };

  return (
    <Container
      ref={mapElement}
      id='mapContainer'
      mobile={window.innerWidth < 1024}
      top={windowInfo}
    >
      <div
        className='mapContainer'
        style={{
          height:
            (() => {
              return windowSize.height - windowInfo.footerHeight * 2;
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
            center={{ lat: location.lat, lng: location.long }}
            defaultZoom={location.zoom}
          >
            {filteredSearch.map((result, i) => {
              const testLat = result.attributes.location.latitude;
              const testlong = result.attributes.location.longitude;
              const title = result.title;
              const isActive = focusedResult.show && i === focusedResult.index;
              return (
                <Pin lat={testLat} lng={testlong} key={"pin" + i}>
                  <div
                    className={`pin ${isActive ? "" : "pinActive"}`}
                    onClick={pinClick}
                    id={"pin" + i}
                    ref={pinElement}
                  >
                    📍
                  </div>
                  {isActive ? <ResultMini /> : ""}
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
  position: ${(props) => (props.mobile ? "static" : "fixed")};
  top: ${(props) => props.top.topHeight + "px"};
  left: 50%;
  width: ${(props) => (props.mobile ? "auto" : "50%")};
  padding-bottom: ${(props) => (props.mobile ? "1rem" : 0)};
  z-index: 500;
  transition: 0.7s ease-in-out;
  .mapContainer {
    top: 0;
  }
`;

const Pin = styled.div`
  .pinActive {
    filter: opacity(0.5) grayscale(20%);
  }
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
