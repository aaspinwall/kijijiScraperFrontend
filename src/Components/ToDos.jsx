import React from "react";
import { Debugger } from "../Styles/styled-components";
//import "../App.css";

export default function ToDos() {
  return (
    <Debugger>
      <div>
        <h4>Front end</h4>
        <div>Loading screen</div>
        <div>Error loading results</div>
        <div>Map</div>
        <div>Authentication screen</div>
        <div>Local storage for fetched results</div>
      </div>
      <div>
        <h4>Back end</h4>
        <div>Authentication endpoint</div>
        <div>Write cookies for quick login</div>
      </div>
      <div>
        <h4>Database</h4>
        <div>Define data structure</div>
      </div>
    </Debugger>
  );
}
