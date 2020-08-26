import React, { useEffect, useState, useRef } from "react";
import GoogleMapReact from "google-map-react";
import Thumb from "./thumb";
import { Container, Pin } from "./elements";
import { useSelector, useDispatch } from "react-redux";
import { median } from "../../../Utilities/median";
import { focus } from "../../results/dispatchers";
import debounce from "lodash/debounce";

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API;

const Map = ({ results }) => {
  const { focusedResult, display } = useSelector((state) => state);
  const d = useDispatch();
  const [location, changeLocation] = useState({ zoom: 15 });
  const [windowSize, changeHeight] = useState(null);
  const mapElement = useRef();
  const pinElement = useRef();

  useEffect(() => {
    const latitudeArray = [];
    const longitudeArray = [];
    if (results.length > 2) {
      for (const {
        attributes: {
          location: { latitude, longitude },
        },
      } of results) {
        longitudeArray.push(longitude);
        latitudeArray.push(latitude);
      }
      const longitudeAvg = median(longitudeArray);
      const latitudeAvg = median(latitudeArray);
      changeLocation({ ...location, long: longitudeAvg, lat: latitudeAvg });
    }
  }, [results]);

  useEffect(() => {
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
      const { latitude, longitude } = results[
        focusedResult.index
      ].attributes.location;
      changeLocation({ ...location, long: longitude, lat: latitude });
    }
  }, [focusedResult]);

  const pinClick = (e) => {
    const index = Number(e.target.id.replace("pin", ""));
    focus(index, d);
  };
  return (
    <Container
      ref={mapElement}
      id='mapContainer'
      mobile={window.innerWidth < 1024}
      top={"4rem"}
    >
      <div
        className='mapContainer'
        style={{
          height: `${window.innerWidth < 1024 ? "50vh" : "100vh"}`,
          /* height: `${window.innerHeight}px`, */
          width: "100%",
          padding: "0",
        }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: apiKey }}
          defaultCenter={{
            lat: location.lat,
            lng: location.long,
          }}
          center={{ lat: location.lat, lng: location.long }}
          defaultZoom={location.zoom}
        >
          {results.map((result, i) => {
            const testLat = result.attributes.location.latitude;
            const testlong = result.attributes.location.longitude;
            const title = result.title;
            const isActive = display.i === i;
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
                {isActive ? <Thumb focused={result} i={i} /> : ""}
              </Pin>
            );
          })}
        </GoogleMapReact>
      </div>
    </Container>
  );
};

export default Map;
