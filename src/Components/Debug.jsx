import React from "react";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";

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

export default function Debug() {
  return (
    <div>
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
