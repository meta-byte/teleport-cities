import React, { Fragment } from "react";
import "./App.css";

import CityWindow from "./components/CityWindow";

function App() {
  return (
    <Fragment>
      <div className="container">
        <CityWindow />
      </div>
      <div className="container">
        <CityWindow />
      </div>
    </Fragment>
  );
}

export default App;
