import React, { Component } from "react";
import styled from "styled-components";

export default class Map extends Component {
  render() {
    return (
      <div>
        <h3>My Google Maps Demo</h3>
        <MapContainer id='map'></MapContainer>
      </div>
    );
  }
}

const MapContainer = styled.div`
  height: 400px; /* The height is 400 pixels */
  width: 100%; /* The width is the width of the web page */
`;
